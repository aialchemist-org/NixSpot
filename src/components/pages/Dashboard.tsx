// src/components/pages/Dashboard.tsx
import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars, Line } from '@react-three/drei';
import * as THREE from 'three';
import {
  GitBranch, GitPullRequest, GitCommit, GitMerge, GitFork,
  Code, Star, Users, Clock, Cpu, Shield, BarChart2,
  Zap, RefreshCw, Cloud, Terminal, Database, Server
} from 'lucide-react';

// Device type hook
const useDeviceType = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    
    return () => {
      window.removeEventListener('resize', checkIfMobile);
    };
  }, []);

  return { isMobile };
};

// 3D Graph Component
const GraphVisualization = () => {
  const groupRef = useRef<THREE.Group>(null);
  const lineRef = useRef<THREE.Line>(null);

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = clock.getElapsedTime() * 0.1;
    }
  });

  const nodes = [
    new THREE.Vector3(0, 0, 0),
    new THREE.Vector3(2, 1, 0),
    new THREE.Vector3(1, 2, 1),
    new THREE.Vector3(-1, 1, 2),
    new THREE.Vector3(-2, -1, 1),
    new THREE.Vector3(0, -2, 0),
  ];

  const connections = [
    [0, 1], [0, 2], [0, 3], [0, 4], [0, 5],
    [1, 2], [2, 3], [3, 4], [4, 5], [5, 1]
  ];

  return (
    <group ref={groupRef}>
      {nodes.map((node, i) => (
        <mesh key={i} position={node}>
          <sphereGeometry args={[0.1, 16, 16]} />
          <meshStandardMaterial 
            color={i === 0 ? '#3b82f6' : '#8b5cf6'} 
            emissive={i === 0 ? '#3b82f6' : '#8b5cf6'} 
            emissiveIntensity={0.5}
          />
        </mesh>
      ))}

      {connections.map(([start, end], i) => (
        <Line
          key={i}
          points={[nodes[start], nodes[end]]}
          color={i % 2 === 0 ? '#3b82f6' : '#8b5cf6'}
          lineWidth={1}
          dashed={false}
        />
      ))}
    </group>
  );
};

// Loading Animation
const IntroAnimation = ({ onComplete }: { onComplete: () => void }) => {
  const [step, setStep] = useState(0);
  const messages = [
    "Booting NixSpot Core...",
    "Initializing Version Control Matrix...",
    "Establishing Secure Connections...",
    "Loading Repository Network...",
    "Systems Nominal"
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setStep(prev => {
        if (prev < messages.length - 1) return prev + 1;
        clearInterval(timer);
        setTimeout(onComplete, 500);
        return prev;
      });
    }, 800);
    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <motion.div 
      className="fixed inset-0 bg-gray-950 z-50 flex flex-col items-center justify-center space-y-8"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div 
        animate={{ 
          scale: [0.9, 1.05, 0.95, 1],
          rotate: [0, 3, -3, 0]
        }}
        transition={{ 
          duration: 2.5,
          repeat: Infinity,
          repeatType: "mirror"
        }}
        className="text-blue-400"
      >
        <Terminal className="w-20 h-20" />
      </motion.div>
      
      <div className="text-center space-y-2">
        <AnimatePresence mode="wait">
          <motion.h1
            key={step}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="text-3xl font-mono text-gray-300"
          >
            {messages[step]}
          </motion.h1>
        </AnimatePresence>
        
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: step === messages.length - 1 ? "100%" : `${(step + 1) * 20}%` }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="h-1.5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full mt-6"
        />
      </div>
    </motion.div>
  );
};

// NixSpot Brand Intro
const NixSpotIntro = ({ onComplete }: { onComplete: () => void }) => {
  return (
    <motion.div
      className="fixed inset-0 bg-gray-950 z-40 flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="max-w-4xl mx-auto px-8 text-center">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ 
            delay: 0.3,
            duration: 0.8,
            ease: [0.17, 0.67, 0.83, 0.67]
          }}
        >
          <h1 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 mb-6">
            NIXSPOT
          </h1>
        </motion.div>
        
        <motion.p
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ 
            delay: 0.7,
            duration: 0.6
          }}
          className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto"
        >
          The next-generation version control visualization platform
        </motion.p>
        
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ 
            delay: 1.0,
            duration: 0.6
          }}
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onComplete}
            className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl text-lg font-medium shadow-xl"
          >
            Enter Dashboard
          </motion.button>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ 
            delay: 1.4,
            duration: 0.6
          }}
          className="mt-12 text-gray-500 text-sm"
        >
          v2.7.0 | Enterprise Edition
        </motion.div>
      </div>
    </motion.div>
  );
};

// Stats Card Component
const StatCard = ({ icon, value, label, color }: {
  icon: React.ReactNode;
  value: string;
  label: string;
  color: string;
}) => (
  <motion.div
    whileHover={{ y: -5 }}
    className={`bg-gray-900 rounded-xl p-6 border-l-4 ${color} shadow-lg`}
  >
    <div className="flex items-center space-x-4">
      <div className="p-3 rounded-lg bg-gray-800">
        {icon}
      </div>
      <div>
        <h3 className="text-2xl font-bold">{value}</h3>
        <p className="text-gray-400">{label}</p>
      </div>
    </div>
  </motion.div>
);

// Dashboard Main Component
const Dashboard: React.FC = () => {
  const { isMobile } = useDeviceType();
  const [appState, setAppState] = useState<'loading' | 'intro' | 'ready'>('loading');

  useEffect(() => {
    if (appState === 'loading') {
      const timer = setTimeout(() => setAppState('intro'), 4000);
      return () => clearTimeout(timer);
    }
  }, [appState]);

  if (appState === 'loading') {
    return <IntroAnimation onComplete={() => setAppState('intro')} />;
  }

  if (appState === 'intro') {
    return <NixSpotIntro onComplete={() => setAppState('ready')} />;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen bg-gray-950 text-gray-100"
    >
      {/* Navigation */}
      <nav className="border-b border-gray-800 bg-gray-900/80 backdrop-blur-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="flex items-center space-x-3"
            >
              <Code className="text-blue-400 h-6 w-6" />
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 font-mono">
                NIXSPOT
              </span>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex items-center space-x-4"
            >
              <button className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors">
                <RefreshCw className="h-5 w-5 text-gray-400" />
              </button>
            </motion.div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <motion.section
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mb-12 text-center"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
              Version Control
            </span>{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">
              Reimagined
            </span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Visualize, analyze and optimize your development workflow with NixSpot's intelligent version control platform
          </p>
        </motion.section>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
        >
          <StatCard
            icon={<GitBranch className="text-blue-400" />}
            value="247"
            label="Active Branches"
            color="border-blue-500"
          />
          <StatCard
            icon={<GitPullRequest className="text-purple-400" />}
            value="83"
            label="Open PRs"
            color="border-purple-500"
          />
          <StatCard
            icon={<GitCommit className="text-pink-400" />}
            value="1.2k"
            label="Commits (7d)"
            color="border-pink-500"
          />
          <StatCard
            icon={<Users className="text-green-400" />}
            value="42"
            label="Active Contributors"
            color="border-green-500"
          />
        </motion.div>

        {/* Main Visualization */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mb-12"
        >
          <div className="bg-gray-900 rounded-2xl overflow-hidden shadow-xl h-[500px] relative">
            <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
              <ambientLight intensity={0.5} />
              <pointLight position={[10, 10, 10]} />
              <GraphVisualization />
              <OrbitControls enableZoom={!isMobile} />
              <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
            </Canvas>
            
            <div className="absolute bottom-4 left-4 right-4 bg-gray-900/80 backdrop-blur-sm p-4 rounded-lg">
              <div className="flex justify-between items-center">
                <h3 className="font-medium">Repository Network Graph</h3>
                <div className="flex space-x-2">
                  <button className="px-3 py-1 bg-blue-600/50 rounded-md text-sm">Main</button>
                  <button className="px-3 py-1 bg-gray-800 rounded-md text-sm">Develop</button>
                  <button className="px-3 py-1 bg-gray-800 rounded-md text-sm">Feature</button>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Activity Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Recent Commits */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.0, duration: 0.6 }}
            className="bg-gray-900 rounded-2xl p-6 shadow-lg"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">Recent Activity</h2>
              <button className="text-blue-400 text-sm">View All</button>
            </div>
            
            <div className="space-y-6">
              {[1, 2, 3, 4].map((item) => (
                <div key={item} className="flex items-start space-x-4">
                  <div className="p-2 bg-gray-800 rounded-lg">
                    <GitCommit className="text-purple-400" />
                  </div>
                  <div>
                    <h3 className="font-medium">Added new authentication flow</h3>
                    <p className="text-sm text-gray-400">by @devuser • 2 hours ago</p>
                    <div className="mt-1 flex space-x-2">
                      <span className="text-xs px-2 py-0.5 bg-blue-900/50 text-blue-300 rounded-full">frontend</span>
                      <span className="text-xs px-2 py-0.5 bg-purple-900/50 text-purple-300 rounded-full">auth</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Performance Metrics */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.6 }}
            className="bg-gray-900 rounded-2xl p-6 shadow-lg"
          >
            <h2 className="text-xl font-semibold mb-6">Performance Metrics</h2>
            
            <div className="space-y-6">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-gray-400">Build Success Rate</span>
                  <span className="font-medium text-green-400">94%</span>
                </div>
                <div className="w-full bg-gray-800 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: '94%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-gray-400">Test Coverage</span>
                  <span className="font-medium text-blue-400">82%</span>
                </div>
                <div className="w-full bg-gray-800 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: '82%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-gray-400">Merge Conflict Rate</span>
                  <span className="font-medium text-yellow-400">12%</span>
                </div>
                <div className="w-full bg-gray-800 rounded-full h-2">
                  <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '12%' }}></div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Team Activity */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.2, duration: 0.6 }}
            className="bg-gray-900 rounded-2xl p-6 shadow-lg"
          >
            <h2 className="text-xl font-semibold mb-6">Top Contributors</h2>
            
            <div className="space-y-4">
              {[
                { name: "Alex Johnson", commits: 42, prs: 8 },
                { name: "Sam Wilson", commits: 38, prs: 5 },
                { name: "Taylor Smith", commits: 35, prs: 7 },
                { name: "Jordan Lee", commits: 28, prs: 4 },
                { name: "Casey Kim", commits: 25, prs: 6 }
              ].map((user, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                      <span className="font-medium">{user.name.charAt(0)}</span>
                    </div>
                    <span>{user.name}</span>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">{user.commits} commits</div>
                    <div className="text-sm text-gray-400">{user.prs} PRs</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Repository Status */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3, duration: 0.6 }}
          className="mb-12"
        >
          <div className="bg-gray-900 rounded-2xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">Repository Status</h2>
              <div className="flex space-x-2">
                <button className="px-3 py-1 bg-blue-600 rounded-md text-sm">Refresh</button>
                <button className="px-3 py-1 bg-gray-800 rounded-md text-sm">Settings</button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-gray-800 p-4 rounded-lg">
                <div className="flex items-center space-x-3 mb-2">
                  <Database className="text-blue-400" />
                  <span className="font-medium">Storage</span>
                </div>
                <div className="text-2xl font-bold mb-1">1.2 GB</div>
                <div className="text-sm text-gray-400">45% of limit</div>
              </div>
              
              <div className="bg-gray-800 p-4 rounded-lg">
                <div className="flex items-center space-x-3 mb-2">
                  <Server className="text-purple-400" />
                  <span className="font-medium">Uptime</span>
                </div>
                <div className="text-2xl font-bold mb-1">99.97%</div>
                <div className="text-sm text-gray-400">Last 30 days</div>
              </div>
              
              <div className="bg-gray-800 p-4 rounded-lg">
                <div className="flex items-center space-x-3 mb-2">
                  <Shield className="text-green-400" />
                  <span className="font-medium">Security</span>
                </div>
                <div className="text-2xl font-bold mb-1">A+</div>
                <div className="text-sm text-gray-400">No vulnerabilities</div>
              </div>
              
              <div className="bg-gray-800 p-4 rounded-lg">
                <div className="flex items-center space-x-3 mb-2">
                  <BarChart2 className="text-pink-400" />
                  <span className="font-medium">Activity</span>
                </div>
                <div className="text-2xl font-bold mb-1">High</div>
                <div className="text-sm text-gray-400">42 commits today</div>
              </div>
            </div>
          </div>
        </motion.section>
      </main>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.6 }}
        className="border-t border-gray-800 py-6"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <Code className="text-blue-400 h-5 w-5" />
              <span className="font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                NIXSPOT
              </span>
            </div>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Docs</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">API</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Support</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy</a>
            </div>
          </div>
          <div className="mt-4 text-center md:text-left text-sm text-gray-500">
            © {new Date().getFullYear()} NixSpot Technologies. All rights reserved.
          </div>
        </div>
      </motion.footer>
    </motion.div>
  );
};

export default Dashboard;