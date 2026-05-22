import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import Button from '../components/common/Button';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    setLoading(true);

    try {
      login(email, password);
      navigate('/wallet');
    } catch (err) {
      setError(err.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-primary">
      <Header />
      
      <section className="w-full px-[120px] py-[80px] flex justify-center">
        <div className="w-full max-w-md">
          <h1 className="text-[48px] font-bold leading-[72px] text-white mb-[60px] text-center">
            Login
          </h1>

          <div className="bg-secondary rounded-2xl p-8">
            {error && (
              <div className="bg-red/20 border border-red rounded-xl p-4 mb-6">
                <p className="text-red text-base">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-grey-5 text-sm mb-2">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full h-[55px] bg-white/10 border border-white/20 rounded-32 px-6 text-white placeholder:text-grey-5"
                  required
                />
              </div>

              <div>
                <label className="block text-grey-5 text-sm mb-2">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full h-[55px] bg-white/10 border border-white/20 rounded-32 px-6 text-white placeholder:text-grey-5"
                  required
                />
              </div>

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? 'Logging in...' : 'Login'}
              </Button>
            </form>

            <p className="text-center text-grey-5 text-base mt-6">
              Don't have an account?{' '}
              <Link to="/register" className="text-accent hover:underline">
                Register
              </Link>
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Login;
