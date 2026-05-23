import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import { useCrypto } from '../context/CryptoContext';
import { useAuth } from '../context/AuthContext';
import { ArrowUpRight, ArrowDownRight, TrendingUp, X } from 'lucide-react';
import { formatPrice } from '../utils/formatters';

const Wallet = () => {
  const { wallet, cryptos, buyCrypto, sellCrypto, setWallet, setCryptos } = useCrypto();
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [showBuyModal, setShowBuyModal] = useState(false);
  const [showSellModal, setShowSellModal] = useState(false);
  const [showDepositModal, setShowDepositModal] = useState(false);
  const [selectedCrypto, setSelectedCrypto] = useState(null);
  const [amount, setAmount] = useState('');
  const [depositAmount, setDepositAmount] = useState('');

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

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
      }
    };

    if (cryptos.length === 0) {
      fetchCryptos();
    }
  }, [cryptos.length, setCryptos]);

  if (!isAuthenticated) {
    return null;
  }


  const totalPortfolioValue = wallet.assets.reduce(
    (total, asset) => {
      const currentCrypto = cryptos.find(c => c.id === asset.id);
      const currentPrice = currentCrypto ? currentCrypto.current_price : asset.price;
      return total + asset.amount * currentPrice;
    },
    0
  );

  const handleBuyClick = (crypto) => {
    setSelectedCrypto(crypto);
    setShowBuyModal(true);
  };

  const handleSellClick = (crypto) => {
    setSelectedCrypto(crypto);
    setShowSellModal(true);
  };

  const handleBuy = () => {
    if (!selectedCrypto || !amount) return;
    const cryptoAmount = parseFloat(amount);
    const price = selectedCrypto.current_price;
    buyCrypto(selectedCrypto.id, cryptoAmount, price);
    setShowBuyModal(false);
    setAmount('');
    setSelectedCrypto(null);
  };

  const handleSell = () => {
    if (!selectedCrypto || !amount) return;
    const cryptoAmount = parseFloat(amount);
    const price = selectedCrypto.current_price;
    sellCrypto(selectedCrypto.id, cryptoAmount, price);
    setShowSellModal(false);
    setAmount('');
    setSelectedCrypto(null);
  };

  const handleDeposit = () => {
    if (!depositAmount) return;
    const amount = parseFloat(depositAmount);
    const newWallet = {
      ...wallet,
      balance: wallet.balance + amount
    };
    setWallet(newWallet);
    localStorage.setItem('wallet', JSON.stringify(newWallet));
    setShowDepositModal(false);
    setDepositAmount('');
  };

  return (
    <div className="min-h-screen bg-primary">
      <Header />
      
      <section className="w-full px-[120px] py-[80px]">
        <h1 className="text-[48px] font-bold leading-[72px] text-white mb-[60px]">
          Мой кошелёк
        </h1>

        <div className="bg-secondary rounded-2xl p-8 mb-8">
          <div className="flex justify-between items-start mb-8">
            <div>
              <p className="text-grey-5 text-base mb-2">Общий баланс</p>
              <p className="text-white text-[48px] font-bold leading-[72px]">
                {formatPrice(wallet.balance + totalPortfolioValue)}
              </p>
            </div>
            <div className="flex gap-4">
              <Button variant="green" className="flex items-center gap-2" onClick={() => setShowDepositModal(true)}>
                <ArrowUpRight className="w-5 h-5" />
                Депозит
              </Button>
            </div>
          </div>

          <div className="flex gap-8">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-green" />
              <span className="text-green text-base font-medium">
                +12.5% в этом месяце
              </span>
            </div>
            <p className="text-grey-4 text-sm">
              Баланс USD: {formatPrice(wallet.balance)}
            </p>
          </div>
        </div>

        <div className="bg-secondary rounded-2xl p-8 mb-8">
          <h2 className="text-white text-2xl font-bold mb-6">Мои активы</h2>
          
          {wallet.assets.length === 0 ? (
            <p className="text-grey-5 text-base">У вас пока нет активов.</p>
          ) : (
            <div className="space-y-4">
              {wallet.assets.map((asset) => {
                const currentCrypto = cryptos.find(c => c.id === asset.id);
                const currentPrice = currentCrypto ? currentCrypto.current_price : asset.price;
                const currentValue = asset.amount * currentPrice;
                return (
                  <div key={asset.id} className="flex justify-between items-center p-4 bg-white/5 rounded-xl">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-accent/20 rounded-full flex items-center justify-center">
                        <span className="text-accent font-bold">{asset.symbol.substring(0, 2)}</span>
                      </div>
                      <div>
                        <p className="text-white font-bold">{asset.name}</p>
                        <p className="text-grey-5 text-sm">{asset.amount} {asset.symbol}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="text-white font-bold">{formatPrice(currentValue)}</p>
                        <p className="text-grey-5 text-sm">{formatPrice(currentPrice)} за единицу</p>
                      </div>
                      <div className="flex gap-2">
                        <Button 
                          variant="green" 
                          className="px-3 py-2 text-sm"
                          onClick={() => handleBuyClick(currentCrypto)}
                        >
                          Купить
                        </Button>
                        <Button 
                          variant="red" 
                          className="px-3 py-2 text-sm"
                          onClick={() => handleSellClick(currentCrypto)}
                        >
                          Продать
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <div className="bg-secondary rounded-2xl p-8">
          <h2 className="text-white text-2xl font-bold mb-6">История транзакций</h2>
          
          {wallet.transactions.length === 0 ? (
            <p className="text-grey-5 text-base">Транзакций пока нет.</p>
          ) : (
            <div className="space-y-4">
              {wallet.transactions.slice().reverse().map((transaction) => (
                <div key={transaction.id} className="flex justify-between items-center p-4 bg-white/5 rounded-xl">
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      transaction.type === 'buy' ? 'bg-green/20' : 'bg-red/20'
                    }`}>
                      {transaction.type === 'buy' ? (
                        <ArrowUpRight className="w-5 h-5 text-green" />
                      ) : (
                        <ArrowDownRight className="w-5 h-5 text-red" />
                      )}
                    </div>
                    <div>
                      <p className="text-white font-bold capitalize">{transaction.type}</p>
                      <p className="text-grey-5 text-sm">
                        {new Date(transaction.date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`font-bold ${
                      transaction.type === 'buy' ? 'text-red' : 'text-green'
                    }`}>
                      {transaction.type === 'buy' ? '-' : '+'}{formatPrice(transaction.total)}
                    </p>
                    <p className="text-grey-5 text-sm">
                      {transaction.amount} units @ {formatPrice(transaction.price)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {showBuyModal && selectedCrypto && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-secondary rounded-2xl p-8 w-full max-w-md">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-white text-2xl font-bold">Купить {selectedCrypto.name}</h2>
              <button onClick={() => setShowBuyModal(false)} className="text-white hover:text-grey-5">
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
                onClick={handleBuy}
                className="w-full"
                disabled={!amount || parseFloat(amount) * selectedCrypto.current_price > wallet.balance}
              >
                Купить {selectedCrypto.symbol.toUpperCase()}
              </Button>
            </div>
          </div>
        </div>
      )}

      {showSellModal && selectedCrypto && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-secondary rounded-2xl p-8 w-full max-w-md">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-white text-2xl font-bold">Продать {selectedCrypto.name}</h2>
              <button onClick={() => setShowSellModal(false)} className="text-white hover:text-grey-5">
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
                <p className="text-grey-5 text-sm">Вы получите</p>
                <p className="text-white font-bold">
                  {amount ? formatPrice(parseFloat(amount) * selectedCrypto.current_price) : '$0.00'}
                </p>
              </div>
              <div className="bg-white/5 rounded-xl p-4">
                <p className="text-grey-5 text-sm">Ваш баланс {selectedCrypto.symbol.toUpperCase()}</p>
                <p className="text-white font-bold">
                  {wallet.assets.find(a => a.id === selectedCrypto.id)?.amount || 0} {selectedCrypto.symbol.toUpperCase()}
                </p>
              </div>
              <Button 
                onClick={handleSell}
                className="w-full"
                disabled={!amount || parseFloat(amount) > (wallet.assets.find(a => a.id === selectedCrypto.id)?.amount || 0)}
              >
                Продать {selectedCrypto.symbol.toUpperCase()}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Deposit Modal */}
      {showDepositModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-secondary rounded-2xl p-8 w-full max-w-md">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-white text-2xl font-bold">Пополнить счёт</h2>
              <button onClick={() => setShowDepositModal(false)} className="text-white hover:text-grey-5">
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="space-y-4">
              <Input
                type="number"
                label="Сумма (USD)"
                value={depositAmount}
                onChange={(e) => setDepositAmount(e.target.value)}
                placeholder="Введите сумму"
                min="0"
                step="0.01"
              />
              <div className="bg-white/5 rounded-xl p-4">
                <p className="text-grey-5 text-sm">Текущий баланс</p>
                <p className="text-white font-bold">{formatPrice(wallet.balance)}</p>
              </div>
              <div className="bg-white/5 rounded-xl p-4">
                <p className="text-grey-5 text-sm">Новый баланс после пополнения</p>
                <p className="text-white font-bold">
                  {depositAmount ? formatPrice(wallet.balance + parseFloat(depositAmount)) : formatPrice(wallet.balance)}
                </p>
              </div>
              <Button 
                onClick={handleDeposit}
                className="w-full"
                disabled={!depositAmount || parseFloat(depositAmount) <= 0}
              >
                Пополнить
              </Button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Wallet;
