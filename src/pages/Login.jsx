import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import { useAuth } from '../context/AuthContext';
import { validateLoginForm } from '../utils/validation';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setFieldErrors({});

    const validation = validateLoginForm(email, password);
    if (!validation.isValid) {
      setFieldErrors(validation.errors);
      return;
    }

    setLoading(true);

    try {
      login(email, password);
      navigate('/profile');
    } catch (err) {
      setError(err.message || 'Ошибка входа. Попробуйте ещё раз.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-primary">
      <Header />
      
      <section className="w-full px-[120px] py-[80px] flex justify-center">
        <div className="w-full max-w-md">
          <h1 className="text-[48px] font-bold leading-[72px] text-white mb-[60px] text-center">
            Вход
          </h1>

          <div className="bg-secondary rounded-2xl p-8">
            {error && (
              <div className="bg-red/20 border border-red rounded-xl p-4 mb-6">
                <p className="text-red text-base">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <Input
                type="email"
                label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Введите ваш email"
                required
                error={fieldErrors.email}
              />

              <Input
                type="password"
                label="Пароль"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Введите ваш пароль"
                required
                error={fieldErrors.password}
              />

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? 'Выполняется вход...' : 'Войти'}
              </Button>
            </form>

            <p className="text-center text-grey-5 text-base mt-6">
              Нет аккаунта?{' '}
              <Link to="/register" className="text-accent hover:underline">
                Регистрация
              </Link>
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Login;
