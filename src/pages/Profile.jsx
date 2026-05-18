import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import Button from '../components/common/Button';
import { useAuth } from '../context/AuthContext';
import { useCrypto } from '../context/CryptoContext';
import { LogOut, Settings, User, Heart } from 'lucide-react';

const Profile = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const { favorites } = useCrypto();
  const navigate = useNavigate();

  if (!isAuthenticated) {
    navigate('/login');
    return null;
  }

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-primary">
      <Header />
      
      <section className="w-full px-[120px] py-[80px]">
        <h1 className="text-[48px] font-bold leading-[72px] text-white mb-[60px]">
          My Profile
        </h1>

        {/* User Info Card */}
        <div className="bg-secondary rounded-2xl p-8 mb-8">
          <div className="flex items-center gap-6 mb-8">
            <div className="w-20 h-20 bg-accent/20 rounded-full flex items-center justify-center">
              <User className="w-10 h-10 text-accent" />
            </div>
            <div>
              <h2 className="text-white text-2xl font-bold mb-2">{user?.name || 'User'}</h2>
              <p className="text-grey-5 text-base">{user?.email || 'user@example.com'}</p>
            </div>
          </div>

          <div className="flex gap-4">
            <Button variant="secondary" className="flex items-center gap-2">
              <Settings className="w-5 h-5" />
              Edit Profile
            </Button>
            <Button variant="red" className="flex items-center gap-2" onClick={handleLogout}>
              <LogOut className="w-5 h-5" />
              Logout
            </Button>
          </div>
        </div>

        {/* Favorites */}
        <div className="bg-secondary rounded-2xl p-8 mb-8">
          <div className="flex items-center gap-2 mb-6">
            <Heart className="w-6 h-6 text-red" />
            <h2 className="text-white text-2xl font-bold">Favorite Cryptocurrencies</h2>
          </div>
          
          {favorites.length === 0 ? (
            <p className="text-grey-5 text-base">You haven't added any favorites yet.</p>
          ) : (
            <div className="space-y-4">
              {favorites.map((cryptoId) => (
                <div key={cryptoId} className="p-4 bg-white/5 rounded-xl">
                  <p className="text-white font-bold">{cryptoId}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Account Settings */}
        <div className="bg-secondary rounded-2xl p-8">
          <h2 className="text-white text-2xl font-bold mb-6">Account Settings</h2>
          
          <div className="space-y-6">
            <div>
              <label className="block text-grey-5 text-sm mb-2">Email</label>
              <input
                type="email"
                value={user?.email || ''}
                readOnly
                className="w-full h-[55px] bg-white/10 border border-white/20 rounded-32 px-6 text-white"
              />
            </div>
            
            <div>
              <label className="block text-grey-5 text-sm mb-2">Username</label>
              <input
                type="text"
                value={user?.name || ''}
                readOnly
                className="w-full h-[55px] bg-white/10 border border-white/20 rounded-32 px-6 text-white"
              />
            </div>

            <Button variant="primary">Save Changes</Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Profile;
