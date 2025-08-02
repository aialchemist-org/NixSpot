import React, { createContext, useContext, useEffect, useState } from 'react';

interface VoiceContextType {
  isEnabled: boolean;
  speak: (text: string) => void;
  toggleVoice: () => void;
}

const VoiceContext = createContext<VoiceContextType>({
  isEnabled: false,
  speak: () => {},
  toggleVoice: () => {}
});

export const VoiceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const [synth, setSynth] = useState<SpeechSynthesis | null>(null);
  const [voice, setVoice] = useState<SpeechSynthesisVoice | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      const synth = window.speechSynthesis;
      setSynth(synth);

      const loadVoices = () => {
        const voices = synth.getVoices();
        const preferredVoice = voices.find(v => v.name.includes('Google')) || 
                             voices.find(v => v.lang.includes('en-US')) || 
                             voices[0];
        setVoice(preferredVoice || null);
      };

      loadVoices();
      synth.onvoiceschanged = loadVoices;

      return () => {
        synth.onvoiceschanged = null;
      };
    }
  }, []);

  const speak = (text: string) => {
    if (!isEnabled || !synth || !voice) return;
    
    synth.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.voice = voice;
    utterance.rate = 0.9;
    utterance.pitch = 1.1;
    synth.speak(utterance);
  };

  const toggleVoice = () => {
    setIsEnabled(prev => !prev);
  };

  return (
    <VoiceContext.Provider value={{ isEnabled, speak, toggleVoice }}>
      {children}
    </VoiceContext.Provider>
  );
};

export const useVoice = () => {
  return useContext(VoiceContext);
};
