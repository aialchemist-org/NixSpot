import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useParams } from 'react-router-dom'
import { 
  Star, 
  GitFork, 
  Eye, 
  Code, 
  FileText, 
  GitBranch,
  Download,
  Share,
  Settings,
  MessageSquare,
  Users,
  Shield
} from 'lucide-react'
import { useVoice } from '../../contexts/VoiceContext'

const Repository: React.FC = () => {
  const { id } = useParams()
  const { speak, isEnabled } = useVoice()
  const [activeTab, setActiveTab] = useState('code')

  useEffect(() => {
    if (isEnabled) {
      speak("You're viewing a repository. You can browse the code, check pull requests, or start a live chat with collaborators.")
    }
  }, [])

  const repository = {
    name: 'nixspot-core',
    description: 'Core platform for NixSpot - Next-gen GitHub alternative with AI and Web3 integration',
    language: 'TypeScript',
    stars: 45,
    forks: 12,
    watchers: 8,
    isPrivate: false,
    owner: 'nixspot-team',
    defaultBranch: 'main',
    lastCommit: '2 hours ago',
    aiScore: 95,
    web3Hash: '0x1234...5678'
  }

  const files = [
    { name: 'src', type: 'folder', size: '-', modified: '2 hours ago' },
    { name: 'public', type: 'folder', size: '-', modified: '1 day ago' },
    { name: 'package.json', type: 'file', size: '2.1 KB', modified: '2 hours ago' },
    { name: 'README.md', type: 'file', size: '4.5 KB', modified: '3 hours ago' },
    { name: 'tsconfig.json', type: 'file', size: '856 B', modified: '1 day ago' },
    { name: 'vite.config.ts', type: 'file', size: '432 B', modified: '1 day ago' },
  ]

  const tabs = [
    { id: 'code', label: 'Code', icon: Code },
    { id: 'issues', label: 'Issues', icon: MessageSquare, count: 12 },
    { id: 'pulls', label: 'Pull Requests', icon: GitBranch, count: 3 },
    { id: 'collaborators', label: 'Collaborators', icon: Users, count: 8 },
    { id: 'security', label: 'Security', icon: Shield },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Repository Header */}
      <div className="glass dark:glass-dark p-6 rounded-xl border border-white/20">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-2">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                {repository.owner}/{repository.name}
              </h1>
              <span className="px-2 py-1 bg-green-500/20 border border-green-500/30 rounded-full text-xs text-green-400 font-medium">
                Public
              </span>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              {repository.description}
            </p>
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-1">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span className="text-sm text-gray-600 dark:text-gray-400">{repository.language}</span>
              </div>
              <div className="flex items-center space-x-1 text-gray-600 dark:text-gray-400">
                <Star className="w-4 h-4" />
                <span className="text-sm">{repository.stars}</span>
              </div>
              <div className="flex items-center space-x-1 text-gray-600 dark:text-gray-400">
                <GitFork className="w-4 h-4" />
                <span className="text-sm">{repository.forks}</span>
              </div>
              <div className="flex items-center space-x-1 text-gray-600 dark:text-gray-400">
                <Eye className="w-4 h-4" />
                <span className="text-sm">{repository.watchers}</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-1 px-3 py-2 bg-green-500/20 border border-green-500/30 rounded-lg">
              <Shield className="w-4 h-4 text-green-400" />
              <span className="text-sm text-green-400 font-medium">AI: {repository.aiScore}%</span>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
            >
              <Star className="w-4 h-4" />
              <span>Star</span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center space-x-2 px-4 py-2 glass dark:glass-dark border border-white/20 rounded-lg hover:bg-white/10 transition-colors"
            >
              <GitFork className="w-4 h-4" />
              <span>Fork</span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center space-x-2 px-4 py-2 glass dark:glass-dark border border-white/20 rounded-lg hover:bg-white/10 transition-colors"
            >
              <Download className="w-4 h-4" />
              <span>Clone</span>
            </motion.button>
          </div>
        </div>

        {/* Web3 Verification */}
        <div className="mt-4 p-3 bg-purple-500/20 border border-purple-500/30 rounded-lg">
          <div className="flex items-center space-x-2">
            <Shield className="w-4 h-4 text-purple-400" />
            <span className="text-sm font-medium text-purple-400">Web3 Verified</span>
            <span className="text-xs text-gray-400">IPFS: {repository.web3Hash}</span>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="glass dark:glass-dark rounded-xl border border-white/20 overflow-hidden">
        <div className="flex border-b border-white/10">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-6 py-4 transition-colors ${
                activeTab === tab.id
                  ? 'bg-blue-500/20 text-blue-400 border-b-2 border-blue-500'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-white/5'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              <span>{tab.label}</span>
              {tab.count && (
                <span className="px-2 py-1 bg-gray-500/20 rounded-full text-xs">
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {activeTab === 'code' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-4"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <select className="px-3 py-2 glass dark:glass-dark border border-white/20 rounded-lg text-sm">
                    <option>main</option>
                    <option>develop</option>
                    <option>feature/ai-integration</option>
                  </select>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Latest commit {repository.lastCommit}
                  </span>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center space-x-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors"
                >
                  <Code className="w-4 h-4" />
                  <span>Open in Editor</span>
                </motion.button>
              </div>

              <div className="border border-white/20 rounded-lg overflow-hidden">
                <div className="bg-white/5 px-4 py-2 border-b border-white/10">
                  <span className="text-sm font-medium text-gray-900 dark:text-white">Files</span>
                </div>
                <div className="divide-y divide-white/10">
                  {files.map((file, index) => (
                    <div key={index} className="flex items-center justify-between px-4 py-3 hover:bg-white/5 transition-colors">
                      <div className="flex items-center space-x-3">
                        {file.type === 'folder' ? (
                          <div className="w-4 h-4 bg-blue-500 rounded"></div>
                        ) : (
                          <FileText className="w-4 h-4 text-gray-400" />
                        )}
                        <span className="text-sm font-medium text-gray-900 dark:text-white">
                          {file.name}
                        </span>
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
                        <span>{file.size}</span>
                        <span>{file.modified}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'issues' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <MessageSquare className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Issues & Discussions
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Track bugs, feature requests, and collaborate with your team
              </p>
            </motion.div>
          )}

          {activeTab === 'pulls' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <GitBranch className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Pull Requests
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Review code changes with AI-powered insights
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  )
}

export default Repository