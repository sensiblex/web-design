import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import { useAuth } from '../context/AuthContext';
import { validateRegisterForm } from '../utils/validation';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setFieldErrors({});

    const validation = validateRegisterForm(email, password, confirmPassword);
    if (!validation.isValid) {
      setFieldErrors(validation.errors);
      return;
    }

    setLoading(true);

    try {
      register(email, password);
      navigate('/profile');
    } catch (err) {
      setError(err.message || 'Ошибка регистрации. Попробуйте ещё раз.');
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
            Регистрация
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
                placeholder="Минимум 8 символов, заглавная, строчная, цифра"
                required
                error={fieldErrors.password}
              />

              <Input
                type="password"
                label="Подтвердите пароль"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Подтвердите ваш пароль"
                required
                error={fieldErrors.confirmPassword}
              />

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? 'Регистрация...' : 'Зарегистрироваться'}
              </Button>
            </form>

            <p className="text-center text-grey-5 text-base mt-6">
              Уже есть аккаунт?{' '}
              <Link to="/login" className="text-accent hover:underline">
                Войти
              </Link>
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Register;
