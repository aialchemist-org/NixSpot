import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { NavLink } from 'react-router-dom'
import { 
  Home, 
  FolderGit2, 
  GitPullRequest, 
  Settings, 
  Shield,
  BarChart3,
  Users,
  Code,
  MessageSquare,
  Zap
} from 'lucide-react'

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const navItems = [
    { to: '/dashboard', icon: Home, label: 'Dashboard' },
    { to: '/repositories', icon: FolderGit2, label: 'Repositories' },
    { to: '/pull-requests', icon: GitPullRequest, label: 'Pull Requests' },
    { to: '/admin', icon: Shield, label: 'Admin Panel' },
    { to: '/settings', icon: Settings, label: 'Settings' },
  ]

  const sidebarVariants = {
    open: { x: 0 },
    closed: { x: -320 }
  }

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={onClose}
          />
        )}
      </AnimatePresence>

      <motion.aside
        variants={sidebarVariants}
        animate={isOpen ? 'open' : 'closed'}
        className="fixed left-0 top-20 bottom-0 w-64 glass dark:glass-dark border-r border-white/20 z-50 lg:z-30 lg:translate-x-0"
      >
        <div className="p-6">
          <nav className="space-y-2">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                    isActive
                      ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                      : 'hover:bg-white/10 text-gray-300 hover:text-white'
                  }`
                }
                onClick={() => window.innerWidth < 1024 && onClose()}
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </NavLink>
            ))}
          </nav>

          <div className="mt-8 pt-8 border-t border-white/10">
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">
              Quick Stats
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">Repositories</span>
                <span className="text-white font-medium">24</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">Pull Requests</span>
                <span className="text-white font-medium">8</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">Issues</span>
                <span className="text-white font-medium">12</span>
              </div>
            </div>
          </div>

          <div className="mt-8 p-4 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg border border-blue-500/30">
            <div className="flex items-center space-x-2 mb-2">
              <Zap className="w-4 h-4 text-yellow-400" />
              <span className="text-sm font-semibold text-white">Pro Tip</span>
            </div>
            <p className="text-xs text-gray-300">
              Use voice commands! Say "help" to get started with voice navigation.
            </p>
          </div>
        </div>
      </motion.aside>
    </>
  )
}

export default Sidebar