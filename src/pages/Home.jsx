import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import Button from '../components/common/Button';
import { Bitcoin, TrendingUp, Users, Globe, ArrowRight, Heart } from 'lucide-react';
import { useCrypto } from '../context/CryptoContext';
import { formatPrice, formatVolume } from '../utils/formatters';

const Home = () => {
  const { cryptos, setCryptos, favorites, toggleFavorite } = useCrypto();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCryptos = async () => {
      try {
        const response = await fetch(
          'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false&price_change_percentage=24h'
        );
        const data = await response.json();
        setCryptos(data);
      } catch (error) {
        console.error('Ошибка валют:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCryptos();
  }, [setCryptos]);


  return (
    <div className="min-h-screen bg-primary">
      <Header />
      
      <section className="w-full px-[120px] py-[163px]">
        <div className="flex justify-between items-center">
          <div className="w-[588px]">
            <div className="flex items-center gap-4 mb-[64px]">
              <div className="bg-white text-primary px-4 py-2 rounded-32 text-sm font-medium">
                75% SAVE
              </div>
              <span className="text-white text-base font-normal">
                Для выходных в Чёрную пятницу
              </span>
            </div>
            
            <h1 className="text-[64px] font-bold leading-[76px] text-white mb-[64px]">
              Самая быстрая и безопасная платформа для инвестиций в криптовалюту
            </h1>
            
            <p className="text-grey-5 text-base leading-7 mb-[88px]">
              Покупайте и продавайте криптовалюты, которым доверяют 10M кошельков с транзакциями на сумму более $30 миллиардов.
            </p>
            
            <Button className="flex items-center gap-6">
              Попробовать БЕСПЛАТНО
              <ArrowRight className="w-8 h-8" />
            </Button>
          </div>
          
          <div className="w-[604px] h-[585px] relative">
            <Bitcoin className="w-full h-full text-accent opacity-80" />
          </div>
        </div>
      </section>

      <section className="w-full px-[120px] py-[100px]">
        <div className="flex justify-between gap-[109px]">
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 bg-white/10 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-10 h-10 text-accent" />
            </div>
            <div>
              <p className="text-[40px] font-bold leading-[60px] text-white">$30B</p>
              <p className="text-grey-5 text-base leading-7">Обменено цифровой валюты</p>
            </div>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 bg-white/10 rounded-lg flex items-center justify-center">
              <Users className="w-10 h-10 text-accent" />
            </div>
            <div>
              <p className="text-[40px] font-bold leading-[60px] text-white">10M+</p>
              <p className="text-grey-5 text-base leading-7">Доверенных инвесторов кошельков</p>
            </div>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 bg-white/10 rounded-lg flex items-center justify-center">
              <Globe className="w-10 h-10 text-accent" />
            </div>
            <div>
              <p className="text-[40px] font-bold leading-[60px] text-white">195</p>
              <p className="text-grey-5 text-base leading-7">Поддерживаемых стран</p>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full px-[120px] py-[144px] bg-secondary">
        <div className="flex justify-between items-start mb-[296px]">
          <div className="w-[454px]">
            <h2 className="text-[32px] font-bold leading-[48px] text-white mb-[120px]">
              Увеличивайте свою прибыль и отслеживайте инвестиции
            </h2>
            <p className="text-grey-5 text-base leading-7 mb-[116px]">
              Используйте расширенные аналитические инструменты. Чёткие графики TradingView позволяют отслеживать текущие и исторические прибыли инвестиций.
            </p>
            <Button variant="secondary">Узнать больше</Button>
          </div>
          
          <div className="w-[610px]">
            <div className="bg-[#35068C] rounded-2xl p-8 backdrop-blur-sm">
              <table className="w-full">
                <thead>
                  <tr className="text-white text-sm font-semibold">
                    <th className="text-left pb-6">Название</th>
                    <th className="text-left pb-6">Цена</th>
                    <th className="text-left pb-6">Изменение</th>
                    <th className="text-left pb-6">Объём (24ч)</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan="4" className="text-center py-8 text-white">
                        Загрузка...
                      </td>
                    </tr>
                  ) : (
                    cryptos.slice(0, 5).map((crypto) => (
                      <tr key={crypto.id} className="border-t border-white/10">
                        <td className="py-4">
                          <div className="flex items-center gap-3">
                            <img src={crypto.image} alt={crypto.name} className="w-10 h-10" />
                            <div>
                              <p className="text-white font-bold text-xl">{crypto.symbol.toUpperCase()}</p>
                              <p className="text-grey-5 text-sm">{crypto.name}</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 text-white text-base">
                          {formatPrice(crypto.current_price)}
                        </td>
                        <td className="py-4">
                          <span className={`${
                            crypto.price_change_percentage_24h >= 0 
                              ? 'text-green' 
                              : 'text-red'
                          } text-base`}>
                            {crypto.price_change_percentage_24h >= 0 ? '+' : ''}
                            {crypto.price_change_percentage_24h?.toFixed(2)}%
                          </span>
                        </td>
                        <td className="py-4 text-white text-base">
                          {formatVolume(crypto.total_volume)}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full px-[120px] py-[88px] bg-gradient-to-b from-[#2B076E] to-primary">
        <div className="bg-accent rounded-2xl p-[88px] flex items-center justify-between">
          <div className="w-[501px]">
            <h2 className="text-[32px] font-bold leading-[48px] text-white mb-[64px]">
              Начните майнинг сейчас
            </h2>
            <p className="text-white text-base leading-7">
              Присоединяйтесь к CRAPPO сейчас, чтобы получать последние новости и начать майнинг
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            <input
              type="email"
              placeholder="Введите ваш email"
              className="w-[374px] h-[55px] bg-transparent border border-white/40 rounded-32 px-6 text-white placeholder:text-white"
            />
            <Button variant="secondary">Подписаться</Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
