import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Search, 
  Filter, 
  Plus, 
  Star, 
  GitFork, 
  Eye,
  Calendar,
  Code,
  Lock,
  Globe
} from 'lucide-react'
import { useVoice } from '../../contexts/VoiceContext'

const Repositories: React.FC = () => {
  const { speak, isEnabled } = useVoice()
  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState('all')

  useEffect(() => {
    if (isEnabled) {
      speak("You're viewing your repositories. You can search, filter, or create new repositories here.")
    }
  }, [])

  const repositories = [
    {
      id: 1,
      name: 'nixspot-core',
      description: 'Core platform for NixSpot - Next-gen GitHub alternative',
      language: 'TypeScript',
      stars: 45,
      forks: 12,
      watchers: 8,
      isPrivate: false,
      updatedAt: '2 hours ago',
      aiScore: 95
    },
    {
      id: 2,
      name: 'veonix-cli',
      description: 'Command-line interface for Veonix version control',
      language: 'JavaScript',
      stars: 23,
      forks: 6,
      watchers: 4,
      isPrivate: false,
      updatedAt: '1 day ago',
      aiScore: 88
    },
    {
      id: 3,
      name: 'web3-integration',
      description: 'Web3 and IPFS integration for decentralized repositories',
      language: 'Solidity',
      stars: 67,
      forks: 18,
      watchers: 15,
      isPrivate: true,
      updatedAt: '3 days ago',
      aiScore: 92
    },
    {
      id: 4,
      name: 'ai-code-review',
      description: 'AI-powered code review and suggestions engine',
      language: 'Python',
      stars: 89,
      forks: 24,
      watchers: 21,
      isPrivate: false,
      updatedAt: '5 days ago',
      aiScore: 97
    }
  ]

  const filteredRepos = repositories.filter(repo => {
    const matchesSearch = repo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         repo.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterType === 'all' || 
                         (filterType === 'private' && repo.isPrivate) ||
                         (filterType === 'public' && !repo.isPrivate)
    return matchesSearch && matchesFilter
  })

  const getLanguageColor = (language: string) => {
    const colors: { [key: string]: string } = {
      TypeScript: 'bg-blue-500',
      JavaScript: 'bg-yellow-500',
      Python: 'bg-green-500',
      Solidity: 'bg-purple-500'
    }
    return colors[language] || 'bg-gray-500'
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Repositories</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Manage your code repositories with AI-powered insights
          </p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-medium neon-glow"
        >
          <Plus className="w-4 h-4" />
          <span>New Repository</span>
        </motion.button>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search repositories..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 glass dark:glass-dark border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div className="flex items-center space-x-2">
          <Filter className="w-4 h-4 text-gray-400" />
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-4 py-3 glass dark:glass-dark border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Repositories</option>
            <option value="public">Public</option>
            <option value="private">Private</option>
          </select>
        </div>
      </div>

      {/* Repository Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredRepos.map((repo, index) => (
          <motion.div
            key={repo.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="glass dark:glass-dark p-6 rounded-xl border border-white/20 hover:border-blue-500/30 transition-all duration-300 group"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-2">
                {repo.isPrivate ? (
                  <Lock className="w-4 h-4 text-yellow-500" />
                ) : (
                  <Globe className="w-4 h-4 text-green-500" />
                )}
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-blue-400 transition-colors">
                  {repo.name}
                </h3>
              </div>
              <div className="flex items-center space-x-1 px-2 py-1 bg-green-500/20 border border-green-500/30 rounded-full">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-xs text-green-400 font-medium">AI: {repo.aiScore}%</span>
              </div>
            </div>

            <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
              {repo.description}
            </p>

            <div className="flex items-center space-x-4 mb-4">
              <div className="flex items-center space-x-1">
                <div className={`w-3 h-3 rounded-full ${getLanguageColor(repo.language)}`}></div>
                <span className="text-sm text-gray-600 dark:text-gray-400">{repo.language}</span>
              </div>
              <div className="flex items-center space-x-1 text-gray-600 dark:text-gray-400">
                <Star className="w-4 h-4" />
                <span className="text-sm">{repo.stars}</span>
              </div>
              <div className="flex items-center space-x-1 text-gray-600 dark:text-gray-400">
                <GitFork className="w-4 h-4" />
                <span className="text-sm">{repo.forks}</span>
              </div>
              <div className="flex items-center space-x-1 text-gray-600 dark:text-gray-400">
                <Eye className="w-4 h-4" />
                <span className="text-sm">{repo.watchers}</span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-1 text-gray-600 dark:text-gray-400">
                <Calendar className="w-4 h-4" />
                <span className="text-sm">Updated {repo.updatedAt}</span>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center space-x-1 px-3 py-1 bg-blue-500/20 border border-blue-500/30 rounded-lg text-blue-400 hover:bg-blue-500/30 transition-colors"
              >
                <Code className="w-4 h-4" />
                <span className="text-sm">View</span>
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>

      {filteredRepos.length === 0 && (
        <div className="text-center py-12">
          <Code className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            No repositories found
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            {searchTerm ? 'Try adjusting your search terms' : 'Create your first repository to get started'}
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-medium neon-glow"
          >
            Create Repository
          </motion.button>
        </div>
      )}
    </motion.div>
  )
}

export default Repositories