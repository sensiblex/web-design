import React, { useEffect, useState } from 'react';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import { useCrypto } from '../context/CryptoContext';
import { useAuth } from '../context/AuthContext';
import { Heart, Search, X } from 'lucide-react';
import { formatPrice, formatVolume, formatPercentage } from '../utils/formatters';

const Market = () => {
  const { cryptos, setCryptos, favorites, toggleFavorite, buyCrypto, wallet } = useCrypto();
  const { isAuthenticated } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('market_cap');
  const [loading, setLoading] = useState(true);
  const [showBuyModal, setShowBuyModal] = useState(false);
  const [selectedCrypto, setSelectedCrypto] = useState(null);
  const [amount, setAmount] = useState('');

  useEffect(() => {
    const fetchCryptos = async () => {
      try {
        const response = await fetch(
          'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=false&price_change_percentage=24h'
        );
        const data = await response.json();
        setCryptos(data);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCryptos();
  }, [setCryptos]);


  const filteredCryptos = cryptos
    .filter(crypto => 
      crypto.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      crypto.symbol.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'price':
          return b.current_price - a.current_price;
        case 'change':
          return b.price_change_percentage_24h - a.price_change_percentage_24h;
        case 'volume':
          return b.total_volume - a.total_volume;
        default:
          return b.market_cap - a.market_cap;
      }
    });

  return (
    <div className="min-h-screen bg-primary">
      <Header />
      
      <section className="w-full px-[120px] py-[80px]">
        <h1 className="text-[48px] font-bold leading-[72px] text-white mb-[60px]">
          Обзор рынка
        </h1>

        <div className="flex gap-6 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-grey-5 w-5 h-5" />
            <input
              type="text"
              placeholder="Поиск криптовалют..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full h-[55px] bg-white/10 border border-white/20 rounded-32 pl-12 pr-6 text-white placeholder:text-grey-5"
            />
          </div>
          
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="h-[55px] bg-white/10 border border-white/20 rounded-32 px-6 text-white"
          >
            <option value="market_cap">Рыночная капитализация</option>
            <option value="price">Цена</option>
            <option value="change">Изменение за 24ч</option>
            <option value="volume">Объём</option>
          </select>
        </div>

        {loading ? (
          <div className="text-center py-20 text-white text-xl">
            Загрузка данных рынка...
          </div>
        ) : (
          <div className="bg-secondary rounded-2xl overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="text-white text-sm font-semibold border-b border-white/10">
                  <th className="text-left p-6">#</th>
                  <th className="text-left p-6">Название</th>
                  <th className="text-left p-6">Цена</th>
                  <th className="text-left p-6">Изменение за 24ч</th>
                  <th className="text-left p-6">Объём (24ч)</th>
                  <th className="text-left p-6">Рыночная капитализация</th>
                  <th className="text-center p-6">Избранное</th>
                  <th className="text-center p-6">Действия</th>
                </tr>
              </thead>
              <tbody>
                {filteredCryptos.map((crypto, index) => (
                  <tr key={crypto.id} className="border-b border-white/10 hover:bg-white/5 transition-colors">
                    <td className="p-6 text-white">{index + 1}</td>
                    <td className="p-6">
                      <div className="flex items-center gap-3">
                        <img src={crypto.image} alt={crypto.name} className="w-10 h-10" />
                        <div>
                          <p className="text-white font-bold text-lg">{crypto.symbol.toUpperCase()}</p>
                          <p className="text-grey-5 text-sm">{crypto.name}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-6 text-white text-base font-medium">
                      {formatPrice(crypto.current_price)}
                    </td>
                    <td className="p-6">
                      <span className={`${
                        crypto.price_change_percentage_24h >= 0 
                          ? 'text-green' 
                          : 'text-red'
                      } text-base font-medium`}>
                        {formatPercentage(crypto.price_change_percentage_24h)}
                      </span>
                    </td>
                    <td className="p-6 text-white text-base">
                      {formatVolume(crypto.total_volume)}
                    </td>
                    <td className="p-6 text-white text-base">
                      {formatVolume(crypto.market_cap)}
                    </td>
                    <td className="p-6 text-center">
                      <button
                        onClick={() => toggleFavorite(crypto.id)}
                        className={`p-2 rounded-full transition-colors ${
                          favorites.includes(crypto.id) 
                            ? 'text-red' 
                            : 'text-grey-5 hover:text-red'
                        }`}
                      >
                        <Heart className={`w-6 h-6 ${favorites.includes(crypto.id) ? 'fill-current' : ''}`} />
                      </button>
                    </td>
                    <td className="p-6 text-center">
                      <Button 
                        variant="green" 
                        className="px-4 py-2 text-sm"
                        onClick={() => {
                          if (!isAuthenticated) {
                            alert('Пожалуйста, войдите в систему для покупки');
                            return;
                          }
                          setSelectedCrypto(crypto);
                          setShowBuyModal(true);
                        }}
                      >
                        Купить
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <Footer />

      {showBuyModal && selectedCrypto && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-secondary rounded-2xl p-8 w-full max-w-md">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-white text-2xl font-bold">Купить {selectedCrypto.name}</h2>
              <button onClick={() => {
                setShowBuyModal(false);
                setAmount('');
                setSelectedCrypto(null);
              }} className="text-white hover:text-grey-5">
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="space-y-4">
              <Input
                type="number"
                label="Количество"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Введите количество"
                min="0"
                step="0.0001"
              />
              <div className="bg-white/5 rounded-xl p-4">
                <p className="text-grey-5 text-sm">Цена за единицу</p>
                <p className="text-white font-bold">{formatPrice(selectedCrypto.current_price)}</p>
              </div>
              <div className="bg-white/5 rounded-xl p-4">
                <p className="text-grey-5 text-sm">Общая стоимость</p>
                <p className="text-white font-bold">
                  {amount ? formatPrice(parseFloat(amount) * selectedCrypto.current_price) : '$0.00'}
                </p>
              </div>
              <div className="bg-white/5 rounded-xl p-4">
                <p className="text-grey-5 text-sm">Ваш баланс</p>
                <p className="text-white font-bold">{formatPrice(wallet.balance)}</p>
              </div>
              <Button 
                onClick={() => {
                  if (!amount || parseFloat(amount) <= 0) return;
                  const cryptoAmount = parseFloat(amount);
                  const price = selectedCrypto.current_price;
                  buyCrypto(selectedCrypto.id, cryptoAmount, price);
                  setShowBuyModal(false);
                  setAmount('');
                  setSelectedCrypto(null);
                }}
                className="w-full"
                disabled={!amount || parseFloat(amount) <= 0 || parseFloat(amount) * selectedCrypto.current_price > wallet.balance}
              >
                Купить {selectedCrypto.symbol.toUpperCase()}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Market;
