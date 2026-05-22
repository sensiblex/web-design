import React from 'react';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import Button from '../components/common/Button';
import { Shield, Zap, Lock, TrendingUp, Globe, Clock, ArrowRight } from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: Shield,
      title: 'Secure Storage',
      description: 'Your cryptocurrencies are stored in secure cold storage with multi-signature protection.',
    },
    {
      icon: Zap,
      title: 'Instant Transactions',
      description: 'Buy and sell cryptocurrencies instantly with our high-speed trading engine.',
    },
    {
      icon: Lock,
      title: 'Advanced Security',
      description: 'Bank-level security with 2FA, encryption, and regular security audits.',
    },
    {
      icon: TrendingUp,
      title: 'Real-time Analytics',
      description: 'Track your portfolio with advanced charts and real-time market data.',
    },
    {
      icon: Globe,
      title: 'Global Access',
      description: 'Access your account from anywhere in the world with our mobile app.',
    },
    {
      icon: Clock,
      title: '24/7 Support',
      description: 'Our support team is available around the clock to help you.',
    },
  ];

  return (
    <div className="min-h-screen bg-primary">
      <Header />
      
      <section className="w-full px-[120px] py-[80px]">
        <h1 className="text-[48px] font-bold leading-[72px] text-white mb-[20px]">
          Our Features
        </h1>
        <p className="text-grey-5 text-base mb-[60px]">
          Discover what makes our platform the best choice for cryptocurrency trading
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div key={index} className="bg-secondary rounded-2xl p-8 hover:bg-white/10 transition-colors">
              <div className="w-16 h-16 bg-accent/20 rounded-xl flex items-center justify-center mb-6">
                <feature.icon className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-white text-xl font-bold mb-4">{feature.title}</h3>
              <p className="text-grey-5 text-base">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-[80px] bg-gradient-to-r from-accent to-secondary rounded-2xl p-8 flex items-center justify-between">
          <div>
            <h2 className="text-white text-2xl font-bold mb-2">Ready to get started?</h2>
            <p className="text-white/80 text-base">Create your account and start trading today</p>
          </div>
          <Button className="flex items-center gap-2">
            Get Started
            <ArrowRight className="w-5 h-5" />
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Features;
