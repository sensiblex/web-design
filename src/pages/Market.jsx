import React, { useEffect, useState } from 'react';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import { useCrypto } from '../context/CryptoContext';
import { Heart, Search } from 'lucide-react';

const Market = () => {
  const { cryptos, setCryptos, favorites, toggleFavorite } = useCrypto();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('market_cap');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCryptos = async () => {
      try {
        const response = await fetch(
          'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=false&price_change_percentage=24h'
        );
        const data = await response.json();
        setCryptos(data);
      } catch (error) {
        console.error('Error fetching cryptos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCryptos();
  }, [setCryptos]);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(price);
  };

  const formatVolume = (volume) => {
    if (volume >= 1e9) {
      return `$${(volume / 1e9).toFixed(2)}B`;
    } else if (volume >= 1e6) {
      return `$${(volume / 1e6).toFixed(2)}M`;
    }
    return formatPrice(volume);
  };

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
          Market Overview
        </h1>

        {/* Search and Filter */}
        <div className="flex gap-6 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-grey-5 w-5 h-5" />
            <input
              type="text"
              placeholder="Search cryptocurrencies..."
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
            <option value="market_cap">Market Cap</option>
            <option value="price">Price</option>
            <option value="change">24h Change</option>
            <option value="volume">Volume</option>
          </select>
        </div>

        {/* Crypto Table */}
        {loading ? (
          <div className="text-center py-20 text-white text-xl">
            Loading market data...
          </div>
        ) : (
          <div className="bg-secondary rounded-2xl overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="text-white text-sm font-semibold border-b border-white/10">
                  <th className="text-left p-6">#</th>
                  <th className="text-left p-6">Name</th>
                  <th className="text-left p-6">Price</th>
                  <th className="text-left p-6">24h Change</th>
                  <th className="text-left p-6">Volume (24h)</th>
                  <th className="text-left p-6">Market Cap</th>
                  <th className="text-center p-6">Favorite</th>
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
                        {crypto.price_change_percentage_24h >= 0 ? '+' : ''}
                        {crypto.price_change_percentage_24h?.toFixed(2)}%
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
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
};

export default Market;
