import React, { useState } from 'react';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import Button from '../components/common/Button';
import { Mail, Phone, MapPin, Send, Clock } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would normally send the form data to your backend
    console.log('Form submitted:', formData);
    setSubmitted(true);
    setFormData({ name: '', email: '', subject: '', message: '' });
    setTimeout(() => setSubmitted(false), 3000);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const contactInfo = [
    { icon: Mail, value: 'support@crappo.com', label: 'Email' },
    { icon: Phone, value: '+1 (555) 123-4567', label: 'Phone' },
    { icon: MapPin, value: 'San Francisco, CA', label: 'Address' },
    { icon: Clock, value: '24/7 Support', label: 'Hours' },
  ];

  return (
    <div className="min-h-screen bg-primary">
      <Header />
      
      <section className="w-full px-[120px] py-[80px]">
        <h1 className="text-[48px] font-bold leading-[72px] text-white mb-[20px]">
          Contact Us
        </h1>
        <p className="text-grey-5 text-base mb-[60px]">
          Get in touch with our team for support, inquiries, or feedback
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Info */}
          <div className="space-y-6">
            <div className="bg-secondary rounded-2xl p-8">
              <h2 className="text-white text-2xl font-bold mb-6">Get in Touch</h2>
              <div className="space-y-4">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-center gap-4 p-4 bg-white/5 rounded-xl">
                    <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center">
                      <info.icon className="w-6 h-6 text-accent" />
                    </div>
                    <div>
                      <p className="text-grey-5 text-sm">{info.label}</p>
                      <p className="text-white font-bold">{info.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-secondary rounded-2xl p-8">
              <h2 className="text-white text-2xl font-bold mb-4">Office Hours</h2>
              <div className="space-y-2 text-grey-5">
                <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                <p>Saturday: 10:00 AM - 4:00 PM</p>
                <p>Sunday: Closed</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-secondary rounded-2xl p-8">
            <h2 className="text-white text-2xl font-bold mb-6">Send us a Message</h2>
            
            {submitted && (
              <div className="bg-green/20 border border-green rounded-xl p-4 mb-6">
                <p className="text-green text-base">Thank you! Your message has been sent successfully.</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-grey-5 text-sm mb-2">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  className="w-full h-[55px] bg-white/10 border border-white/20 rounded-32 px-6 text-white placeholder:text-grey-5"
                  required
                />
              </div>

              <div>
                <label className="block text-grey-5 text-sm mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  className="w-full h-[55px] bg-white/10 border border-white/20 rounded-32 px-6 text-white placeholder:text-grey-5"
                  required
                />
              </div>

              <div>
                <label className="block text-grey-5 text-sm mb-2">Subject</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="How can we help?"
                  className="w-full h-[55px] bg-white/10 border border-white/20 rounded-32 px-6 text-white placeholder:text-grey-5"
                  required
                />
              </div>

              <div>
                <label className="block text-grey-5 text-sm mb-2">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us more about your inquiry..."
                  rows={5}
                  className="w-full bg-white/10 border border-white/20 rounded-32 px-6 py-4 text-white placeholder:text-grey-5 resize-none"
                  required
                />
              </div>

              <Button type="submit" className="w-full flex items-center justify-center gap-2">
                <Send className="w-5 h-5" />
                Send Message
              </Button>
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
