import {
  Play,
  Trophy,
  Target,
  Code,
  Users,
  Zap,
  ArrowRight,
  CheckCircle,
  Sparkles,
  Rocket,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <Code className="w-8 h-8 text-primary" />,
      title: 'Interactive Coding',
      description: 'Practice with real-world problems and get instant feedback on your solutions.',
    },
    {
      icon: <Zap className="w-8 h-8 text-warning" />,
      title: 'Auto Save',
      description: 'Never lose your progress. Your code is automatically saved as you type.',
    },
    {
      icon: <Target className="w-8 h-8 text-success" />,
      title: '15+ Language Support',
      description: 'Code in Python, JavaScript, and Java with full syntax highlighting.',
    },
    {
      icon: <Play className="w-8 h-8 text-secondary" />,
      title: 'Curated Playlists',
      description: 'Expertly crafted problem sets designed to enhance your coding skills.',
    },
    {
      icon: <Trophy className="w-8 h-8 text-primary" />,
      title: 'Detailed Profile Statistics',
      description:
        'Comprehensive analytics to track your progress and identify areas for improvement.',
    },
    {
      icon: <CheckCircle className="w-8 h-8 text-success" />,
      title: 'Browse Problems Without Login',
      description: 'Explore our extensive problem library before creating an account.',
    },
  ];

  const stats = [
    { number: '50K+', label: 'Problems Solved', icon: <Target className="w-6 h-6 text-success" /> },
    { number: '10K+', label: 'Active Users', icon: <Users className="w-6 h-6 text-primary" /> },
    { number: '15+', label: 'Languages', icon: <Code className="w-6 h-6 text-warning" /> },
    { number: '99.9%', label: 'Uptime', icon: <Zap className="w-6 h-6 text-info" /> },
  ];

  return (
    <div className="min-h-screen bg-base-200">
      {/* Hero Section */}
      <div className="hero min-h-screen bg-gradient-to-br from-primary/20 via-base-200 to-secondary/20">
        <div className="hero-content text-center max-w-6xl mx-auto px-6">
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="flex justify-center mb-6">
                <div className="p-6 bg-primary/10 rounded-full ring-4 ring-primary/20">
                  <Rocket className="w-16 h-16 text-primary" />
                </div>
              </div>
              <h1 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Master Coding
              </h1>
              <h2 className="text-2xl md:text-3xl font-bold text-base-content">
                One Problem at a Time
              </h2>
              <p className="text-xl md:text-2xl text-base-content/70 max-w-3xl mx-auto">
                Join thousands of developers sharpening their skills with our comprehensive coding
                platform. Track progress, solve challenges, and level up your programming abilities.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              {/* <button className="btn btn-primary btn-lg gap-2 shadow-lg hover:shadow-xl transition-all hover:scale-105">
                <Play className="w-6 h-6" />
                Start Coding Now
                <ArrowRight className="w-5 h-5" />
              </button> */}
              <button
                onClick={() => navigate('/problems')}
                className="btn btn-outline btn-lg gap-2 hover:scale-105 transition-all"
              >
                <Target className="w-6 h-6" />
                Browse Problems
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-20 bg-base-100">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Trusted by Developers Worldwide</h2>
            <p className="text-xl text-base-content/70">
              Join our growing community of problem solvers
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="card bg-base-200 shadow-xl hover:shadow-2xl transition-all hover:scale-105"
              >
                <div className="card-body text-center p-8">
                  <div className="flex justify-center mb-4">
                    <div className="p-3 bg-base-100 rounded-lg">{stat.icon}</div>
                  </div>
                  <h3 className="text-3xl font-bold text-primary">{stat.number}</h3>
                  <p className="text-base-content/70 font-medium">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-base-200">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-primary/10 rounded-lg">
                <Sparkles className="w-8 h-8 text-primary" />
              </div>
            </div>
            <h2 className="text-4xl font-bold mb-4">Why Choose Our Platform?</h2>
            <p className="text-xl text-base-content/70 max-w-2xl mx-auto">
              Everything you need to become a better programmer, all in one place
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all hover:scale-[1.02]"
              >
                <div className="card-body p-6">
                  <div className="flex flex-col items-center text-center gap-4">
                    <div className="p-4 bg-base-200 rounded-xl">{feature.icon}</div>
                    <div>
                      <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                      <p className="text-base-content/70 leading-relaxed">{feature.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
