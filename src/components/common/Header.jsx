import React from 'react';
import { Link } from 'react-router-dom';
import { Bitcoin } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Header = () => {
  const { isAuthenticated, user, logout } = useAuth();
  return (
    <header className="w-full px-[120px] py-[60px] flex items-center justify-between">
      <Link to="/" className="flex items-center gap-4">
        <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center">
          <Bitcoin className="w-6 h-6 text-white" />
        </div>
        <span className="font-inter font-semibold text-lg tracking-wider text-white">
          CRAPPO
        </span>
      </Link>

      <nav className="flex items-center gap-8">
        <Link to="/market" className="text-white text-base font-normal hover:text-accent transition-colors">
          Рынок
        </Link>
        <Link to="/wallet" className="text-white text-base font-normal hover:text-accent transition-colors">
          Кошелек
        </Link>
      </nav>

      <div className="flex items-center gap-6">
        {isAuthenticated ? (
          <>
            <Link to="/profile" className="text-white text-base font-medium hover:text-accent transition-colors">
              Профиль
            </Link>
            <button 
              onClick={logout}
              className="text-white text-base font-medium hover:text-accent transition-colors"
            >
              Выйти
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="text-white text-base font-medium hover:text-accent transition-colors">
              Войти
            </Link>
            <Link to="/register">
              <button className="bg-accent text-white px-8 py-3.5 rounded-32 font-medium hover:bg-accent/90 transition-colors">
                Регистрация
              </button>
            </Link>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
