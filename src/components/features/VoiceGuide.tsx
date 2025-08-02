import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Mic, MicOff, Volume2, VolumeX } from 'lucide-react'
import { useVoice } from '../../contexts/VoiceContext'

const VoiceGuide: React.FC = () => {
  const { isEnabled, isListening, toggleVoice, startListening, stopListening } = useVoice()
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    // Auto-hide after 5 seconds if not enabled
    if (!isEnabled) {
      const timer = setTimeout(() => setIsVisible(false), 5000)
      return () => clearTimeout(timer)
    } else {
      setIsVisible(true)
    }
  }, [isEnabled])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          className="fixed bottom-6 right-6 z-50"
        >
          <div className="flex items-center space-x-2">
            {/* Voice Status Indicator */}
            {isEnabled && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="glass dark:glass-dark px-3 py-2 rounded-lg border border-white/20"
              >
                <div className="flex items-center space-x-2">
                  <div className={`w-2 h-2 rounded-full ${isListening ? 'bg-red-500 animate-pulse' : 'bg-green-500'}`}></div>
                  <span className="text-xs text-gray-600 dark:text-gray-400">
                    {isListening ? 'Listening...' : 'Voice Guide Active'}
                  </span>
                </div>
              </motion.div>
            )}

            {/* Voice Toggle Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleVoice}
              className={`w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 ${
                isEnabled
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 neon-glow voice-pulse'
                  : 'glass dark:glass-dark border border-white/20 hover:bg-white/10'
              }`}
            >
              {isEnabled ? (
                <Volume2 className="w-6 h-6 text-white" />
              ) : (
                <VolumeX className="w-6 h-6 text-gray-400" />
              )}
            </motion.button>

            {/* Microphone Button */}
            {isEnabled && (
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={isListening ? stopListening : startListening}
                className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                  isListening
                    ? 'bg-red-500 animate-pulse'
                    : 'glass dark:glass-dark border border-white/20 hover:bg-white/10'
                }`}
              >
                {isListening ? (
                  <MicOff className="w-5 h-5 text-white" />
                ) : (
                  <Mic className="w-5 h-5 text-gray-400" />
                )}
              </motion.button>
            )}
          </div>

          {/* Voice Guide Tooltip */}
          {!isEnabled && isVisible && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute bottom-16 right-0 glass dark:glass-dark p-3 rounded-lg border border-white/20 w-64"
            >
              <div className="flex items-center space-x-2 mb-2">
                <Volume2 className="w-4 h-4 text-blue-400" />
                <span className="text-sm font-medium text-blue-400">Voice Guide Available</span>
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                Click to enable voice navigation and get spoken guidance throughout NixSpot.
              </p>
              <div className="mt-2 text-xs text-gray-500">
                Try saying: "Help", "Dashboard", "Repositories"
              </div>
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default VoiceGuide