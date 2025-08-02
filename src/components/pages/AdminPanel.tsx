import React, { useState, useEffect, Suspense } from 'react'
import { motion } from 'framer-motion'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Sphere, Text } from '@react-three/drei'
import { 
  Globe, 
  Users, 
  Activity, 
  Server, 
  Shield,
  BarChart3,
  Settings,
  AlertTriangle,
  TrendingUp,
  Database
} from 'lucide-react'
import { useVoice } from '../../contexts/VoiceContext'

// 3D Globe Component
const Globe3D: React.FC = () => {
  const [commits, setCommits] = useState<Array<{ lat: number; lng: number; intensity: number }>>([])

  useEffect(() => {
    // Generate random commit data
    const generateCommits = () => {
      const newCommits = Array.from({ length: 50 }, () => ({
        lat: (Math.random() - 0.5) * 180,
        lng: (Math.random() - 0.5) * 360,
        intensity: Math.random()
      }))
      setCommits(newCommits)
    }

    generateCommits()
    const interval = setInterval(generateCommits, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <group>
      {/* Earth */}
      <Sphere args={[2, 64, 64]}>
        <meshStandardMaterial
          color="#1e40af"
          transparent
          opacity={0.8}
          wireframe
        />
      </Sphere>
      
      {/* Commit Points */}
      {commits.map((commit, index) => {
        const phi = (commit.lat * Math.PI) / 180
        const theta = ((commit.lng - 180) * Math.PI) / 180
        const x = 2.1 * Math.cos(phi) * Math.cos(theta)
        const y = 2.1 * Math.sin(phi)
        const z = 2.1 * Math.cos(phi) * Math.sin(theta)
        
        return (
          <Sphere key={index} args={[0.02]} position={[x, y, z]}>
            <meshStandardMaterial
              color={commit.intensity > 0.7 ? "#ef4444" : commit.intensity > 0.4 ? "#f59e0b" : "#10b981"}
              emissive={commit.intensity > 0.7 ? "#ef4444" : commit.intensity > 0.4 ? "#f59e0b" : "#10b981"}
              emissiveIntensity={0.5}
            />
          </Sphere>
        )
      })}
    </group>
  )
}

const AdminPanel: React.FC = () => {
  const { speak, isEnabled } = useVoice()
  const [activeTab, setActiveTab] = useState('overview')

  useEffect(() => {
    if (isEnabled) {
      speak("Welcome to the admin panel! You can view the 3D globe showing worldwide commits, manage users, and monitor system health.")
    }
  }, [])

  const stats = [
    { icon: Users, label: 'Total Users', value: '12,847', change: '+12%', color: 'text-blue-500' },
    { icon: Database, label: 'Repositories', value: '3,421', change: '+8%', color: 'text-green-500' },
    { icon: Activity, label: 'Active Sessions', value: '1,234', change: '+15%', color: 'text-purple-500' },
    { icon: Server, label: 'Server Load', value: '67%', change: '-3%', color: 'text-yellow-500' },
  ]

  const recentActivity = [
    { type: 'user', message: 'New user registration: alice@example.com', time: '2 min ago' },
    { type: 'repo', message: 'Repository created: awesome-project', time: '5 min ago' },
    { type: 'security', message: 'Failed login attempt blocked', time: '8 min ago' },
    { type: 'system', message: 'Database backup completed', time: '15 min ago' },
  ]

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'settings', label: 'Settings', icon: Settings },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Admin Panel</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Monitor and manage your NixSpot platform with real-time 3D visualization
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-1 px-3 py-2 bg-green-500/20 border border-green-500/30 rounded-lg">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-sm text-green-400 font-medium">System Healthy</span>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="glass dark:glass-dark p-6 rounded-xl border border-white/20"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                  {stat.value}
                </p>
                <p className={`text-sm mt-1 ${stat.change.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                  {stat.change} this week
                </p>
              </div>
              <stat.icon className={`w-8 h-8 ${stat.color}`} />
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* 3D Globe Visualization */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="glass dark:glass-dark p-6 rounded-xl border border-white/20"
        >
          <div className="flex items-center space-x-2 mb-6">
            <Globe className="w-5 h-5 text-blue-500" />
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Global Activity</h2>
          </div>
          
          <div className="h-80 rounded-lg overflow-hidden bg-black/20">
            <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
              <ambientLight intensity={0.5} />
              <pointLight position={[10, 10, 10]} />
              <Suspense fallback={null}>
                <Globe3D />
                <OrbitControls enableZoom={true} enablePan={false} />
              </Suspense>
            </Canvas>
          </div>
          
          <div className="mt-4 grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-lg font-bold text-green-400">1,234</div>
              <div className="text-xs text-gray-400">Commits Today</div>
            </div>
            <div>
              <div className="text-lg font-bold text-blue-400">89</div>
              <div className="text-xs text-gray-400">Active Countries</div>
            </div>
            <div>
              <div className="text-lg font-bold text-purple-400">456</div>
              <div className="text-xs text-gray-400">Live Sessions</div>
            </div>
          </div>
        </motion.div>

        {/* System Health & Activity */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-6"
        >
          {/* System Health */}
          <div className="glass dark:glass-dark p-6 rounded-xl border border-white/20">
            <div className="flex items-center space-x-2 mb-4">
              <Server className="w-5 h-5 text-green-500" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">System Health</h3>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">CPU Usage</span>
                <span className="text-sm font-medium text-gray-900 dark:text-white">45%</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: '45%' }}></div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Memory</span>
                <span className="text-sm font-medium text-gray-900 dark:text-white">67%</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '67%' }}></div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Storage</span>
                <span className="text-sm font-medium text-gray-900 dark:text-white">23%</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div className="bg-blue-500 h-2 rounded-full" style={{ width: '23%' }}></div>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="glass dark:glass-dark p-6 rounded-xl border border-white/20">
            <div className="flex items-center space-x-2 mb-4">
              <Activity className="w-5 h-5 text-purple-500" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Activity</h3>
            </div>
            
            <div className="space-y-3">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start space-x-3 p-2 rounded-lg hover:bg-white/5 transition-colors">
                  <div className={`w-2 h-2 rounded-full mt-2 ${
                    activity.type === 'user' ? 'bg-blue-500' :
                    activity.type === 'repo' ? 'bg-green-500' :
                    activity.type === 'security' ? 'bg-red-500' : 'bg-purple-500'
                  }`} />
                  <div className="flex-1">
                    <p className="text-sm text-gray-900 dark:text-white">
                      {activity.message}
                    </p>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                      {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Admin Tabs */}
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
            </button>
          ))}
        </div>

        <div className="p-6">
          {activeTab === 'overview' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              <div className="bg-blue-500/20 border border-blue-500/30 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <TrendingUp className="w-5 h-5 text-blue-400" />
                  <span className="font-medium text-blue-400">Growth Rate</span>
                </div>
                <div className="text-2xl font-bold text-white">+24%</div>
                <div className="text-sm text-gray-400">This month</div>
              </div>
              
              <div className="bg-green-500/20 border border-green-500/30 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Users className="w-5 h-5 text-green-400" />
                  <span className="font-medium text-green-400">Active Users</span>
                </div>
                <div className="text-2xl font-bold text-white">8,432</div>
                <div className="text-sm text-gray-400">Last 24 hours</div>
              </div>
              
              <div className="bg-purple-500/20 border border-purple-500/30 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Database className="w-5 h-5 text-purple-400" />
                  <span className="font-medium text-purple-400">Data Usage</span>
                </div>
                <div className="text-2xl font-bold text-white">2.4 TB</div>
                <div className="text-sm text-gray-400">Total storage</div>
              </div>
            </motion.div>
          )}

          {activeTab === 'users' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                User Management
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Manage user accounts, permissions, and access controls
              </p>
            </motion.div>
          )}

          {activeTab === 'security' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <Shield className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Security Center
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Monitor security events, manage access logs, and configure security policies
              </p>
            </motion.div>
          )}

          {activeTab === 'settings' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <Settings className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                System Settings
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Configure platform settings, integrations, and system preferences
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  )
}

export default AdminPanel