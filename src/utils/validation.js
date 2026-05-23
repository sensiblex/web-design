export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

export const validatePassword = (password) => {
  const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/;
  return re.test(password);
};

export const validateLoginForm = (email, password) => {
  const errors = {};
  
  if (!email) {
    errors.email = 'Введите email';
  } else if (!validateEmail(email)) {
    errors.email = 'Введите действительный email';
  }
  
  if (!password) {
    errors.password = 'Введите пароль';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

export const validateRegisterForm = (email, password, confirmPassword) => {
  const errors = {};
  
  if (!email) {
    errors.email = 'Введите email';
  } else if (!validateEmail(email)) {
    errors.email = 'Введите действительный email';
  }
  
  if (!password) {
    errors.password = 'Введите пароль';
  } else if (!validatePassword(password)) {
    errors.password = 'Пароль должен содержать минимум 8 символов, включая заглавную букву, строчную букву и цифру';
  }
  
  if (!confirmPassword) {
    errors.confirmPassword = 'Подтвердите пароль';
  } else if (password !== confirmPassword) {
    errors.confirmPassword = 'Пароли не совпадают';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};
