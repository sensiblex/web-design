import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import Button from '../components/common/Button';
import { useCrypto } from '../context/CryptoContext';
import { useAuth } from '../context/AuthContext';
import { ArrowUpRight, ArrowDownRight, TrendingUp, X } from 'lucide-react';

const Wallet = () => {
  const { wallet, cryptos, buyCrypto, sellCrypto, setWallet } = useCrypto();
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [showBuyModal, setShowBuyModal] = useState(false);
  const [showSellModal, setShowSellModal] = useState(false);
  const [showDepositModal, setShowDepositModal] = useState(false);
  const [selectedCrypto, setSelectedCrypto] = useState(null);
  const [amount, setAmount] = useState('');
  const [depositAmount, setDepositAmount] = useState('');

  if (!isAuthenticated) {
    navigate('/login');
    return null;
  }

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(price);
  };

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
          My Wallet
        </h1>

        {/* Balance Card */}
        <div className="bg-secondary rounded-2xl p-8 mb-8">
          <div className="flex justify-between items-start mb-8">
            <div>
              <p className="text-grey-5 text-base mb-2">Total Balance</p>
              <p className="text-white text-[48px] font-bold leading-[72px]">
                {formatPrice(wallet.balance + totalPortfolioValue)}
              </p>
            </div>
            <div className="flex gap-4">
              <Button variant="green" className="flex items-center gap-2" onClick={() => setShowDepositModal(true)}>
                <ArrowUpRight className="w-5 h-5" />
                Deposit
              </Button>
            </div>
          </div>

          <div className="flex gap-8">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-green" />
              <span className="text-green text-base font-medium">
                +12.5% this month
              </span>
            </div>
            <p className="text-grey-4 text-sm">
              USD Balance: {formatPrice(wallet.balance)}
            </p>
          </div>
        </div>

        {/* Assets */}
        <div className="bg-secondary rounded-2xl p-8 mb-8">
          <h2 className="text-white text-2xl font-bold mb-6">My Assets</h2>
          
          {wallet.assets.length === 0 ? (
            <p className="text-grey-5 text-base">You don't have any assets yet.</p>
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
                        <p className="text-grey-5 text-sm">{formatPrice(currentPrice)} per unit</p>
                      </div>
                      <div className="flex gap-2">
                        <Button 
                          variant="green" 
                          className="px-3 py-2 text-sm"
                          onClick={() => handleBuyClick(currentCrypto)}
                        >
                          Buy
                        </Button>
                        <Button 
                          variant="red" 
                          className="px-3 py-2 text-sm"
                          onClick={() => handleSellClick(currentCrypto)}
                        >
                          Sell
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Transaction History */}
        <div className="bg-secondary rounded-2xl p-8">
          <h2 className="text-white text-2xl font-bold mb-6">Transaction History</h2>
          
          {wallet.transactions.length === 0 ? (
            <p className="text-grey-5 text-base">No transactions yet.</p>
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

      {/* Buy Modal */}
      {showBuyModal && selectedCrypto && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-secondary rounded-2xl p-8 w-full max-w-md">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-white text-2xl font-bold">Buy {selectedCrypto.name}</h2>
              <button onClick={() => setShowBuyModal(false)} className="text-white hover:text-grey-5">
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-grey-5 text-sm mb-2">Amount</label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="Enter amount"
                  className="w-full h-[55px] bg-white/10 border border-white/20 rounded-32 px-6 text-white placeholder:text-grey-5"
                  min="0"
                  step="0.0001"
                />
              </div>
              <div className="bg-white/5 rounded-xl p-4">
                <p className="text-grey-5 text-sm">Price per unit</p>
                <p className="text-white font-bold">{formatPrice(selectedCrypto.current_price)}</p>
              </div>
              <div className="bg-white/5 rounded-xl p-4">
                <p className="text-grey-5 text-sm">Total cost</p>
                <p className="text-white font-bold">
                  {amount ? formatPrice(parseFloat(amount) * selectedCrypto.current_price) : '$0.00'}
                </p>
              </div>
              <div className="bg-white/5 rounded-xl p-4">
                <p className="text-grey-5 text-sm">Your balance</p>
                <p className="text-white font-bold">{formatPrice(wallet.balance)}</p>
              </div>
              <Button 
                onClick={handleBuy}
                className="w-full"
                disabled={!amount || parseFloat(amount) * selectedCrypto.current_price > wallet.balance}
              >
                Buy {selectedCrypto.symbol.toUpperCase()}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Sell Modal */}
      {showSellModal && selectedCrypto && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-secondary rounded-2xl p-8 w-full max-w-md">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-white text-2xl font-bold">Sell {selectedCrypto.name}</h2>
              <button onClick={() => setShowSellModal(false)} className="text-white hover:text-grey-5">
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-grey-5 text-sm mb-2">Amount</label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="Enter amount"
                  className="w-full h-[55px] bg-white/10 border border-white/20 rounded-32 px-6 text-white placeholder:text-grey-5"
                  min="0"
                  step="0.0001"
                />
              </div>
              <div className="bg-white/5 rounded-xl p-4">
                <p className="text-grey-5 text-sm">Price per unit</p>
                <p className="text-white font-bold">{formatPrice(selectedCrypto.current_price)}</p>
              </div>
              <div className="bg-white/5 rounded-xl p-4">
                <p className="text-grey-5 text-sm">You will receive</p>
                <p className="text-white font-bold">
                  {amount ? formatPrice(parseFloat(amount) * selectedCrypto.current_price) : '$0.00'}
                </p>
              </div>
              <div className="bg-white/5 rounded-xl p-4">
                <p className="text-grey-5 text-sm">Your {selectedCrypto.symbol.toUpperCase()} balance</p>
                <p className="text-white font-bold">
                  {wallet.assets.find(a => a.id === selectedCrypto.id)?.amount || 0} {selectedCrypto.symbol.toUpperCase()}
                </p>
              </div>
              <Button 
                onClick={handleSell}
                className="w-full"
                disabled={!amount || parseFloat(amount) > (wallet.assets.find(a => a.id === selectedCrypto.id)?.amount || 0)}
              >
                Sell {selectedCrypto.symbol.toUpperCase()}
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
              <h2 className="text-white text-2xl font-bold">Deposit Funds</h2>
              <button onClick={() => setShowDepositModal(false)} className="text-white hover:text-grey-5">
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-grey-5 text-sm mb-2">Amount (USD)</label>
                <input
                  type="number"
                  value={depositAmount}
                  onChange={(e) => setDepositAmount(e.target.value)}
                  placeholder="Enter amount"
                  className="w-full h-[55px] bg-white/10 border border-white/20 rounded-32 px-6 text-white placeholder:text-grey-5"
                  min="0"
                  step="0.01"
                />
              </div>
              <div className="bg-white/5 rounded-xl p-4">
                <p className="text-grey-5 text-sm">Current balance</p>
                <p className="text-white font-bold">{formatPrice(wallet.balance)}</p>
              </div>
              <div className="bg-white/5 rounded-xl p-4">
                <p className="text-grey-5 text-sm">New balance after deposit</p>
                <p className="text-white font-bold">
                  {depositAmount ? formatPrice(wallet.balance + parseFloat(depositAmount)) : formatPrice(wallet.balance)}
                </p>
              </div>
              <Button 
                onClick={handleDeposit}
                className="w-full"
                disabled={!depositAmount || parseFloat(depositAmount) <= 0}
              >
                Deposit
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
