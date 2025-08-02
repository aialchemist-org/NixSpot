import React, { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { 
  Play, 
  Save, 
  Share, 
  Users, 
  MessageSquare, 
  Brain,
  Settings,
  Maximize,
  FileText,
  Terminal
} from 'lucide-react'
import { useVoice } from '../../contexts/VoiceContext'

const CodeEditor: React.FC = () => {
  const { speak, isEnabled } = useVoice()
  const [code, setCode] = useState(`// Welcome to NixSpot Code Editor
// Real-time collaborative coding with AI assistance

import React, { useState } from 'react'

const WelcomeComponent: React.FC = () => {
  const [message, setMessage] = useState('Hello NixSpot!')
  
  return (
    <div className="welcome-container">
      <h1>{message}</h1>
      <button onClick={() => setMessage('AI-Powered Coding!')}>
        Click me
      </button>
    </div>
  )
}

export default WelcomeComponent`)

  const [isAIAssistantOpen, setIsAIAssistantOpen] = useState(false)
  const [collaborators] = useState([
    { id: 1, name: 'Alice', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=alice', cursor: { line: 5, column: 10 } },
    { id: 2, name: 'Bob', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=bob', cursor: { line: 12, column: 5 } }
  ])

  useEffect(() => {
    if (isEnabled) {
      speak("Welcome to the collaborative code editor! You can write code, get AI suggestions, and collaborate with your team in real-time.")
    }
  }, [])

  const handleRunCode = () => {
    speak("Running your code with AI-powered optimization")
    // Simulate code execution
  }

  const handleAIAssist = () => {
    setIsAIAssistantOpen(!isAIAssistantOpen)
    if (!isAIAssistantOpen) {
      speak("AI assistant activated. I can help you with code suggestions, bug fixes, and optimizations.")
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="h-screen flex flex-col"
    >
      {/* Editor Header */}
      <div className="glass dark:glass-dark border-b border-white/20 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">
              nixspot-core/src/components/Welcome.tsx
            </h1>
            <div className="flex items-center space-x-2">
              {collaborators.map((collaborator) => (
                <div key={collaborator.id} className="flex items-center space-x-1">
                  <img
                    src={collaborator.avatar}
                    alt={collaborator.name}
                    className="w-6 h-6 rounded-full border-2 border-blue-500"
                  />
                  <span className="text-xs text-gray-600 dark:text-gray-400">
                    {collaborator.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleRunCode}
              className="flex items-center space-x-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors"
            >
              <Play className="w-4 h-4" />
              <span>Run</span>
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center space-x-2 px-4 py-2 glass dark:glass-dark border border-white/20 rounded-lg hover:bg-white/10 transition-colors"
            >
              <Save className="w-4 h-4" />
              <span>Save</span>
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAIAssist}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                isAIAssistantOpen 
                  ? 'bg-blue-500 text-white' 
                  : 'glass dark:glass-dark border border-white/20 hover:bg-white/10'
              }`}
            >
              <Brain className="w-4 h-4" />
              <span>AI</span>
            </motion.button>
          </div>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Code Editor */}
        <div className="flex-1 flex flex-col">
          <div className="flex-1 relative">
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full h-full p-4 bg-gray-900 text-gray-100 font-mono text-sm resize-none focus:outline-none"
              style={{ fontFamily: 'Monaco, Consolas, "Courier New", monospace' }}
            />
            
            {/* Collaboration Cursors */}
            {collaborators.map((collaborator) => (
              <div
                key={collaborator.id}
                className="absolute pointer-events-none"
                style={{
                  top: `${collaborator.cursor.line * 20 + 16}px`,
                  left: `${collaborator.cursor.column * 8 + 16}px`
                }}
              >
                <div className="w-0.5 h-5 bg-blue-500 animate-pulse"></div>
                <div className="bg-blue-500 text-white text-xs px-2 py-1 rounded mt-1 whitespace-nowrap">
                  {collaborator.name}
                </div>
              </div>
            ))}
          </div>
          
          {/* Terminal */}
          <div className="h-48 glass dark:glass-dark border-t border-white/20 p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Terminal className="w-4 h-4 text-green-500" />
              <span className="text-sm font-medium text-gray-900 dark:text-white">Terminal</span>
            </div>
            <div className="bg-black rounded-lg p-3 h-32 overflow-y-auto font-mono text-sm">
              <div className="text-green-400">$ npm run dev</div>
              <div className="text-gray-400">Starting development server...</div>
              <div className="text-blue-400">✓ Server running on http://localhost:3000</div>
              <div className="text-green-400">$ <span className="animate-pulse">|</span></div>
            </div>
          </div>
        </div>

        {/* AI Assistant Panel */}
        {isAIAssistantOpen && (
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 400, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            className="glass dark:glass-dark border-l border-white/20 flex flex-col"
          >
            <div className="p-4 border-b border-white/20">
              <div className="flex items-center space-x-2">
                <Brain className="w-5 h-5 text-blue-500" />
                <h3 className="font-semibold text-gray-900 dark:text-white">AI Assistant</h3>
              </div>
            </div>
            
            <div className="flex-1 p-4 space-y-4 overflow-y-auto">
              <div className="bg-blue-500/20 border border-blue-500/30 rounded-lg p-3">
                <div className="flex items-center space-x-2 mb-2">
                  <Brain className="w-4 h-4 text-blue-400" />
                  <span className="text-sm font-medium text-blue-400">Code Analysis</span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Your React component looks good! Consider adding TypeScript interfaces for better type safety.
                </p>
              </div>
              
              <div className="bg-green-500/20 border border-green-500/30 rounded-lg p-3">
                <div className="flex items-center space-x-2 mb-2">
                  <Brain className="w-4 h-4 text-green-400" />
                  <span className="text-sm font-medium text-green-400">Suggestion</span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Add error handling for the button click event to improve user experience.
                </p>
              </div>
              
              <div className="bg-yellow-500/20 border border-yellow-500/30 rounded-lg p-3">
                <div className="flex items-center space-x-2 mb-2">
                  <Brain className="w-4 h-4 text-yellow-400" />
                  <span className="text-sm font-medium text-yellow-400">Performance</span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Consider using useCallback for the button handler to prevent unnecessary re-renders.
                </p>
              </div>
            </div>
            
            <div className="p-4 border-t border-white/20">
              <div className="flex space-x-2">
                <input
                  type="text"
                  placeholder="Ask AI anything..."
                  className="flex-1 px-3 py-2 glass dark:glass-dark border border-white/20 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
                >
                  Ask
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}

export default CodeEditor