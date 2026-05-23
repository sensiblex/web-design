import React, { createContext, useContext, useState, useEffect } from 'react';

const CryptoContext = createContext(null);

export const CryptoProvider = ({ children }) => {
  const [cryptos, setCryptos] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [wallet, setWallet] = useState({
    balance: 0,
    assets: [],
    transactions: []
  });

  useEffect(() => {
    const savedFavorites = localStorage.getItem('favorites');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }

    const savedWallet = localStorage.getItem('wallet');
    if (savedWallet) {
      setWallet(JSON.parse(savedWallet));
    }
  }, []);

  const toggleFavorite = (cryptoId) => {
    setFavorites(prev => {
      const newFavorites = prev.includes(cryptoId)
        ? prev.filter(id => id !== cryptoId)
        : [...prev, cryptoId];
      localStorage.setItem('favorites', JSON.stringify(newFavorites));
      return newFavorites;
    });
  };

  const buyCrypto = (cryptoId, amount, price) => {
    const crypto = cryptos.find(c => c.id === cryptoId);
    if (!crypto) return;

    const totalCost = amount * price;
    if (wallet.balance < totalCost) return;

    const newAssets = [...wallet.assets];
    const existingAsset = newAssets.find(a => a.id === cryptoId);

    if (existingAsset) {
      existingAsset.amount += amount;
    } else {
      newAssets.push({
        id: cryptoId,
        name: crypto.name,
        symbol: crypto.symbol,
        amount,
        price
      });
    }

    const newTransaction = {
      id: Date.now(),
      type: 'buy',
      cryptoId,
      amount,
      price,
      total: totalCost,
      date: new Date().toISOString()
    };

    const newWallet = {
      balance: wallet.balance - totalCost,
      assets: newAssets,
      transactions: [...wallet.transactions, newTransaction]
    };

    setWallet(newWallet);
    localStorage.setItem('wallet', JSON.stringify(newWallet));
  };

  const sellCrypto = (cryptoId, amount, price) => {
    const asset = wallet.assets.find(a => a.id === cryptoId);
    if (!asset || asset.amount < amount) return;

    const totalRevenue = amount * price;
    const newAssets = wallet.assets.filter(a => a.id !== cryptoId);
    
    if (asset.amount > amount) {
      newAssets.push({
        ...asset,
        amount: asset.amount - amount
      });
    }

    const newTransaction = {
      id: Date.now(),
      type: 'sell',
      cryptoId,
      amount,
      price,
      total: totalRevenue,
      date: new Date().toISOString()
    };

    const newWallet = {
      balance: wallet.balance + totalRevenue,
      assets: newAssets,
      transactions: [...wallet.transactions, newTransaction]
    };

    setWallet(newWallet);
    localStorage.setItem('wallet', JSON.stringify(newWallet));
  };

  return (
    <CryptoContext.Provider value={{ 
      cryptos, 
      setCryptos, 
      favorites, 
      toggleFavorite, 
      wallet, 
      setWallet,
      buyCrypto, 
      sellCrypto 
    }}>
      {children}
    </CryptoContext.Provider>
  );
};

export const useCrypto = () => {
  const context = useContext(CryptoContext);
  if (!context) {
    throw new Error('useCrypto must be used within a CryptoProvider');
  }
  return context;
};
