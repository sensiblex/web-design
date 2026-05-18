const BASE_URL = 'https://api.coingecko.com/api/v3';

export const cryptoApi = {
  // Get list of cryptocurrencies with market data
  getCryptos: async (currency = 'usd', perPage = 100, page = 1) => {
    try {
      const response = await fetch(
        `${BASE_URL}/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=${perPage}&page=${page}&sparkline=false&price_change_percentage=24h`
      );
      const data = await response.json();
      return data.map(coin => ({
        id: coin.id,
        symbol: coin.symbol.toUpperCase(),
        name: coin.name,
        image: coin.image,
        current_price: coin.current_price,
        price_change_percentage_24h: coin.price_change_percentage_24h,
        total_volume: coin.total_volume,
        market_cap: coin.market_cap,
        high_24h: coin.high_24h,
        low_24h: coin.low_24h,
      }));
    } catch (error) {
      console.error('Error fetching cryptos:', error);
      return [];
    }
  },

  // Get crypto by ID
  getCryptoById: async (id) => {
    try {
      const response = await fetch(
        `${BASE_URL}/coins/${id}?localization=false&tickers=false&community_data=false&developer_data=false`
      );
      return await response.json();
    } catch (error) {
      console.error('Error fetching crypto by ID:', error);
      return null;
    }
  },

  // Get market chart data
  getMarketChart: async (id, days = 7) => {
    try {
      const response = await fetch(
        `${BASE_URL}/coins/${id}/market_chart?vs_currency=usd&days=${days}`
      );
      const data = await response.json();
      return data.prices.map(([timestamp, price]) => ({
        timestamp,
        price,
      }));
    } catch (error) {
      console.error('Error fetching market chart:', error);
      return [];
    }
  },

  // Get global market data
  getGlobalData: async () => {
    try {
      const response = await fetch(`${BASE_URL}/global`);
      return await response.json();
    } catch (error) {
      console.error('Error fetching global data:', error);
      return null;
    }
  },
};
