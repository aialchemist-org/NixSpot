import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  GitPullRequest, 
  MessageSquare, 
  CheckCircle, 
  XCircle, 
  Clock,
  User,
  Calendar,
  Code,
  Brain,
  AlertTriangle
} from 'lucide-react'
import { useVoice } from '../../contexts/VoiceContext'

const PullRequests: React.FC = () => {
  const { speak, isEnabled } = useVoice()
  const [filter, setFilter] = useState('open')

  useEffect(() => {
    if (isEnabled) {
      speak("Here are your pull requests. You can review code changes, see AI analysis, and merge approved changes.")
    }
  }, [])

  const pullRequests = [
    {
      id: 1,
      title: 'Add voice guide integration to NixSpot',
      description: 'Implements voice navigation and accessibility features',
      author: 'alice-dev',
      repository: 'nixspot-core',
      status: 'open',
      createdAt: '2 hours ago',
      comments: 3,
      commits: 5,
      additions: 234,
      deletions: 12,
      aiScore: 92,
      aiSuggestions: ['Consider adding error handling', 'Optimize voice recognition performance'],
      reviewStatus: 'pending'
    },
    {
      id: 2,
      title: 'Implement Web3 authentication system',
      description: 'Adds wallet connection and smart contract integration',
      author: 'bob-blockchain',
      repository: 'veonix-cli',
      status: 'open',
      createdAt: '1 day ago',
      comments: 7,
      commits: 8,
      additions: 456,
      deletions: 23,
      aiScore: 88,
      aiSuggestions: ['Add unit tests for wallet functions', 'Improve gas optimization'],
      reviewStatus: 'approved'
    },
    {
      id: 3,
      title: 'Fix responsive layout issues on mobile',
      description: 'Resolves UI problems on small screens',
      author: 'charlie-ui',
      repository: 'nixspot-ui',
      status: 'merged',
      createdAt: '3 days ago',
      comments: 2,
      commits: 3,
      additions: 89,
      deletions: 45,
      aiScore: 95,
      aiSuggestions: [],
      reviewStatus: 'approved'
    }
  ]

  const filteredPRs = pullRequests.filter(pr => 
    filter === 'all' || pr.status === filter
  )

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'open':
        return <GitPullRequest className="w-4 h-4 text-green-500" />
      case 'merged':
        return <CheckCircle className="w-4 h-4 text-purple-500" />
      case 'closed':
        return <XCircle className="w-4 h-4 text-red-500" />
      default:
        return <Clock className="w-4 h-4 text-yellow-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open':
        return 'text-green-500 bg-green-500/20 border-green-500/30'
      case 'merged':
        return 'text-purple-500 bg-purple-500/20 border-purple-500/30'
      case 'closed':
        return 'text-red-500 bg-red-500/20 border-red-500/30'
      default:
        return 'text-yellow-500 bg-yellow-500/20 border-yellow-500/30'
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Pull Requests</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Review code changes with AI-powered insights and suggestions
          </p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-medium neon-glow"
        >
          New Pull Request
        </motion.button>
      </div>

      {/* Filter Tabs */}
      <div className="flex space-x-1 glass dark:glass-dark p-1 rounded-lg border border-white/20 w-fit">
        {['open', 'merged', 'closed', 'all'].map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors capitalize ${
              filter === status
                ? 'bg-blue-500 text-white'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            {status}
          </button>
        ))}
      </div>

      {/* Pull Requests List */}
      <div className="space-y-4">
        {filteredPRs.map((pr, index) => (
          <motion.div
            key={pr.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="glass dark:glass-dark p-6 rounded-xl border border-white/20 hover:border-blue-500/30 transition-all duration-300"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start space-x-3 flex-1">
                {getStatusIcon(pr.status)}
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                    {pr.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">
                    {pr.description}
                  </p>
                  <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
                    <div className="flex items-center space-x-1">
                      <User className="w-4 h-4" />
                      <span>{pr.author}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Code className="w-4 h-4" />
                      <span>{pr.repository}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>{pr.createdAt}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(pr.status)}`}>
                  {pr.status}
                </span>
                <div className="flex items-center space-x-1 px-2 py-1 bg-blue-500/20 border border-blue-500/30 rounded-full">
                  <Brain className="w-3 h-3 text-blue-400" />
                  <span className="text-xs text-blue-400 font-medium">AI: {pr.aiScore}%</span>
                </div>
              </div>
            </div>

            {/* PR Stats */}
            <div className="flex items-center space-x-6 mb-4">
              <div className="flex items-center space-x-1 text-sm text-gray-600 dark:text-gray-400">
                <MessageSquare className="w-4 h-4" />
                <span>{pr.comments} comments</span>
              </div>
              <div className="flex items-center space-x-1 text-sm text-gray-600 dark:text-gray-400">
                <GitPullRequest className="w-4 h-4" />
                <span>{pr.commits} commits</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <span className="text-green-500">+{pr.additions}</span>
                <span className="text-red-500">-{pr.deletions}</span>
              </div>
            </div>

            {/* AI Suggestions */}
            {pr.aiSuggestions.length > 0 && (
              <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-3 mb-4">
                <div className="flex items-center space-x-2 mb-2">
                  <AlertTriangle className="w-4 h-4 text-yellow-500" />
                  <span className="text-sm font-medium text-yellow-500">AI Suggestions</span>
                </div>
                <ul className="space-y-1">
                  {pr.aiSuggestions.map((suggestion, idx) => (
                    <li key={idx} className="text-sm text-gray-600 dark:text-gray-400">
                      • {suggestion}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Actions */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                {pr.reviewStatus === 'approved' && (
                  <span className="flex items-center space-x-1 text-green-500 text-sm">
                    <CheckCircle className="w-4 h-4" />
                    <span>Approved</span>
                  </span>
                )}
                {pr.reviewStatus === 'pending' && (
                  <span className="flex items-center space-x-1 text-yellow-500 text-sm">
                    <Clock className="w-4 h-4" />
                    <span>Review Pending</span>
                  </span>
                )}
              </div>
              
              <div className="flex items-center space-x-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 glass dark:glass-dark border border-white/20 rounded-lg text-sm hover:bg-white/10 transition-colors"
                >
                  Review
                </motion.button>
                {pr.status === 'open' && pr.reviewStatus === 'approved' && (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg text-sm transition-colors"
                  >
                    Merge
                  </motion.button>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {filteredPRs.length === 0 && (
        <div className="text-center py-12">
          <GitPullRequest className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            No pull requests found
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            {filter === 'all' ? 'Create your first pull request to get started' : `No ${filter} pull requests`}
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-medium neon-glow"
          >
            Create Pull Request
          </motion.button>
        </div>
      )}
    </motion.div>
  )
}

export default PullRequests