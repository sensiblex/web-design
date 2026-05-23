import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import { useAuth } from '../context/AuthContext';
import { useCrypto } from '../context/CryptoContext';
import { LogOut, Settings, User, Heart, Trash2 } from 'lucide-react';
import { formatPrice, formatPercentage } from '../utils/formatters';

const Profile = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const { favorites, cryptos, toggleFavorite } = useCrypto();
  const navigate = useNavigate();

  if (!isAuthenticated) {
    navigate('/login');
    return null;
  }


  const favoriteCryptos = cryptos.filter(crypto => favorites.includes(crypto.id));

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-primary">
      <Header />
      
      <section className="w-full px-[120px] py-[80px]">
        <h1 className="text-[48px] font-bold leading-[72px] text-white mb-[60px]">
          Мой профиль
        </h1>

        {/* User Info Card */}
        <div className="bg-secondary rounded-2xl p-8 mb-8">
          <div className="flex items-center gap-6 mb-8">
            <div className="w-20 h-20 bg-accent/20 rounded-full flex items-center justify-center">
              <User className="w-10 h-10 text-accent" />
            </div>
            <div>
              <h2 className="text-white text-2xl font-bold mb-2">{user?.name || 'Пользователь'}</h2>
              <p className="text-grey-5 text-base">{user?.email || 'user@example.com'}</p>
            </div>
          </div>

          <div className="flex gap-4">
            <Button variant="secondary" className="flex items-center gap-2">
              <Settings className="w-5 h-5" />
              Редактировать профиль
            </Button>
            <Button variant="red" className="flex items-center gap-2" onClick={handleLogout}>
              <LogOut className="w-5 h-5" />
              Выйти
            </Button>
          </div>
        </div>

        {/* Favorites */}
        <div className="bg-secondary rounded-2xl p-8 mb-8">
          <div className="flex items-center gap-2 mb-6">
            <Heart className="w-6 h-6 text-red" />
            <h2 className="text-white text-2xl font-bold">Избранные криптовалюты</h2>
          </div>
          
          {favoriteCryptos.length === 0 ? (
            <p className="text-grey-5 text-base">Вы ещё не добавили избранные криптовалюты.</p>
          ) : (
            <div className="space-y-4">
              {favoriteCryptos.map((crypto) => (
                <div key={crypto.id} className="flex justify-between items-center p-4 bg-white/5 rounded-xl">
                  <div className="flex items-center gap-4">
                    <img src={crypto.image} alt={crypto.name} className="w-10 h-10" />
                    <div>
                      <p className="text-white font-bold">{crypto.symbol.toUpperCase()}</p>
                      <p className="text-grey-5 text-sm">{crypto.name}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-white font-bold">{formatPrice(crypto.current_price)}</p>
                      <p className={`${
                        crypto.price_change_percentage_24h >= 0 ? 'text-green' : 'text-red'
                      } text-sm`}>
                        {formatPercentage(crypto.price_change_percentage_24h)}
                      </p>
                    </div>
                    <button
                      onClick={() => toggleFavorite(crypto.id)}
                      className="p-2 rounded-full hover:bg-red/20 transition-colors"
                    >
                      <Trash2 className="w-5 h-5 text-red" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Account Settings */}
        <div className="bg-secondary rounded-2xl p-8">
          <h2 className="text-white text-2xl font-bold mb-6">Настройки аккаунта</h2>
          
          <div className="space-y-6">
            <Input
              type="email"
              label="Email"
              value={user?.email || ''}
              readOnly
            />
            
            <Input
              type="text"
              label="Имя пользователя"
              value={user?.name || ''}
              readOnly
            />

            <Button variant="primary">Сохранить изменения</Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Profile;
