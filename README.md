# NixSpot - Next-Gen GitHub Alternative

NixSpot is a modern, AI-powered, Web3-integrated GitHub alternative designed for the future of collaborative development. Built with cutting-edge technologies and featuring real-time collaboration, 3D visualization, and voice-guided navigation.

## 🚀 Features

### Core Platform
- **Repository Management**: Create, view, and manage repositories with advanced filtering
- **Pull Requests**: AI-powered code review with inline suggestions and risk scoring
- **Real-time Collaboration**: Live code editing with presence indicators
- **Voice Guide**: AI voice assistant for navigation and accessibility
- **3D Admin Panel**: Interactive globe visualization of worldwide commits
- **Web3 Integration**: IPFS verification and wallet-based authentication

### AI-Powered Features
- **Smart Code Review**: Automated PR analysis with suggestions
- **AI Assistant**: Context-aware code explanations and improvements
- **Issue Detection**: Automatic bug and tech debt identification
- **Performance Insights**: AI-generated repository health metrics

### Modern UI/UX
- **Responsive Design**: Mobile-first approach with fluid layouts
- **Dark/Light Themes**: Automatic theme switching with user preferences
- **Glassmorphism Effects**: Modern visual design with backdrop blur
- **Smooth Animations**: 60FPS animations with Framer Motion
- **Voice Navigation**: Hands-free platform navigation

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern React with hooks and concurrent features
- **Vite** - Lightning-fast build tool and dev server
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Smooth animations and transitions
- **Three.js** - 3D graphics and visualizations

### Backend Integration
- **Supabase** - Backend-as-a-Service for auth and database
- **Socket.io** - Real-time communication
- **Web3 APIs** - Blockchain and IPFS integration
- **OpenAI API** - AI-powered features

### Development Tools
- **ESLint** - Code linting and quality
- **Prettier** - Code formatting
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixes

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Modern web browser with WebGL support

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/aialchemist-org/nixspot.git
   cd nixspot
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   Navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
npm run preview
```

## 🎯 Key Components

### Voice Guide System
- Toggle voice assistance with the 🎙️ button
- Voice commands: "Help", "Dashboard", "Repositories", "Admin"
- Accessibility-first design with screen reader support

### 3D Admin Panel
- Real-time global commit visualization
- Interactive Earth globe with WebGL rendering
- Performance metrics and system health monitoring

### AI Code Review
- Automated pull request analysis
- Inline code suggestions and improvements
- Risk scoring and security recommendations

### Web3 Integration
- IPFS repository verification
- Wallet-based authentication
- Decentralized identity management

## 🔧 Configuration

### Environment Variables
Create a `.env.local` file:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_OPENAI_API_KEY=your_openai_api_key
```

### Customization
- **Themes**: Modify `tailwind.config.js` for custom colors
- **Animations**: Adjust Framer Motion variants in components
- **Voice Commands**: Extend voice recognition in `VoiceContext.tsx`

## 📱 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

**Required Features:**
- WebGL 2.0 (for 3D visualizations)
- Web Speech API (for voice features)
- WebRTC (for real-time collaboration)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🌟 Roadmap

- [ ] Real-time collaborative editing
- [ ] Advanced Web3 features
- [ ] Mobile app development
- [ ] Plugin marketplace
- [ ] Enterprise features
- [ ] Multi-language support

## 🔗 Links

- **Demo**: [https://nixspot-demo.vercel.app](https://nixspot-demo.vercel.app)
- **Documentation**: [https://docs.nixspot.dev](https://docs.nixspot.dev)
- **API Reference**: [https://api.nixspot.dev](https://api.nixspot.dev)

## 💬 Support

- **Discord**: [Join our community](https://discord.gg/nixspot)
- **Issues**: [GitHub Issues](https://github.com/aialchemist-org/nixspot/issues)
- **Email**: support@nixspot.dev

---

Built with ❤️ by the NixSpot team. Making code collaboration magical! ✨
