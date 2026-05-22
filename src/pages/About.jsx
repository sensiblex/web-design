import React from 'react';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import Button from '../components/common/Button';
import { Target, Users, Award, Calendar } from 'lucide-react';

const About = () => {
  const milestones = [
    { year: '2019', event: 'Company founded' },
    { year: '2020', event: 'Reached 1M users' },
    { year: '2021', event: 'Launched mobile app' },
    { year: '2022', event: 'Expanded to 50 countries' },
    { year: '2023', event: 'Reached $10B in transactions' },
    { year: '2024', event: 'Launched advanced trading features' },
  ];

  const stats = [
    { icon: Users, value: '10M+', label: 'Active Users' },
    { icon: Award, value: '195', label: 'Countries' },
    { icon: Target, value: '$30B', label: 'Transactions' },
    { icon: Calendar, value: '5+', label: 'Years Experience' },
  ];

  return (
    <div className="min-h-screen bg-primary">
      <Header />
      
      <section className="w-full px-[120px] py-[80px]">
        <h1 className="text-[48px] font-bold leading-[72px] text-white mb-[20px]">
          About Us
        </h1>
        <p className="text-grey-5 text-base mb-[60px]">
          Learn about our mission, values, and journey in the cryptocurrency industry
        </p>

        {/* Mission Section */}
        <div className="bg-secondary rounded-2xl p-8 mb-8">
          <h2 className="text-white text-2xl font-bold mb-4">Our Mission</h2>
          <p className="text-grey-5 text-base leading-7">
            We're on a mission to make cryptocurrency accessible to everyone. Our platform provides a secure, 
            user-friendly experience for buying, selling, and managing digital assets. We believe in the future 
            of decentralized finance and are committed to building tools that empower people to take control 
            of their financial future.
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-secondary rounded-2xl p-6 text-center">
              <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                <stat.icon className="w-6 h-6 text-accent" />
              </div>
              <p className="text-white text-3xl font-bold mb-2">{stat.value}</p>
              <p className="text-grey-5 text-sm">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Timeline Section */}
        <div className="bg-secondary rounded-2xl p-8 mb-8">
          <h2 className="text-white text-2xl font-bold mb-6">Our Journey</h2>
          <div className="space-y-4">
            {milestones.map((milestone, index) => (
              <div key={index} className="flex items-center gap-4 p-4 bg-white/5 rounded-xl">
                <div className="w-20 h-20 bg-accent/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-accent font-bold text-xl">{milestone.year}</span>
                </div>
                <p className="text-white text-base">{milestone.event}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-accent to-secondary rounded-2xl p-8 flex items-center justify-between">
          <div>
            <h2 className="text-white text-2xl font-bold mb-2">Join Our Team</h2>
            <p className="text-white/80 text-base">We're always looking for talented people to join us</p>
          </div>
          <Button variant="secondary">View Open Positions</Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
