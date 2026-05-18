import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import Button from '../components/common/Button';
import { useCrypto } from '../context/CryptoContext';
import { useAuth } from '../context/AuthContext';
import { ArrowUpRight, ArrowDownRight, TrendingUp } from 'lucide-react';

const Wallet = () => {
  const { wallet, cryptos } = useCrypto();
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

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
    (total, asset) => total + asset.amount * asset.price,
    0
  );

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
              <Button variant="green" className="flex items-center gap-2">
                <ArrowUpRight className="w-5 h-5" />
                Buy
              </Button>
              <Button variant="red" className="flex items-center gap-2">
                <ArrowDownRight className="w-5 h-5" />
                Sell
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
              {wallet.assets.map((asset) => (
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
                  <div className="text-right">
                    <p className="text-white font-bold">{formatPrice(asset.amount * asset.price)}</p>
                    <p className="text-grey-5 text-sm">{formatPrice(asset.price)} per unit</p>
                  </div>
                </div>
              ))}
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

      <Footer />
    </div>
  );
};

export default Wallet;
