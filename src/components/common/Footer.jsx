import React from 'react';
import { Bitcoin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="w-full bg-primary px-[120px] py-[80px]">
      <div className="flex justify-between">
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center">
              <Bitcoin className="w-6 h-6 text-white" />
            </div>
            <span className="font-inter font-semibold text-lg tracking-wider text-white">
              CRAPPO
            </span>
          </div>
                  </div>

        <div className="flex flex-col gap-8">
          <h3 className="text-white text-xl font-medium leading-9">Быстрые ссылки</h3>
          <div className="flex flex-col gap-[38px]">
            <a href="#" className="text-grey-6 text-base font-normal leading-9 hover:text-accent transition-colors">Главная</a>
            <a href="#" className="text-grey-6 text-base font-normal leading-9 hover:text-accent transition-colors">Продукты</a>
            <a href="#" className="text-grey-6 text-base font-normal leading-9 hover:text-accent transition-colors">О нас</a>
            <a href="#" className="text-grey-6 text-base font-normal leading-9 hover:text-accent transition-colors">Возможности</a>
            <a href="#" className="text-grey-6 text-base font-normal leading-9 hover:text-accent transition-colors">Контакты</a>
          </div>
        </div>

        <div className="flex flex-col gap-8">
          <h3 className="text-white text-xl font-medium leading-9">Ресурсы</h3>
          <div className="flex flex-col gap-[38px]">
            <a href="#" className="text-grey-5 text-base font-normal leading-9 hover:text-accent transition-colors">Скачать Whitepaper</a>
            <a href="#" className="text-grey-5 text-base font-normal leading-9 hover:text-accent transition-colors">Умный токен</a>
            <a href="#" className="text-grey-5 text-base font-normal leading-9 hover:text-accent transition-colors">Обозреватель блокчейна</a>
            <a href="#" className="text-grey-5 text-base font-normal leading-9 hover:text-accent transition-colors">Крипто API</a>
            <a href="#" className="text-grey-5 text-base font-normal leading-9 hover:text-accent transition-colors">Интересы</a>
          </div>
        </div>

              </div>

      <div className="flex gap-6 mt-[366px]">
        <a href="#" className="text-white hover:text-accent transition-colors">Facebook</a>
        <a href="#" className="text-white hover:text-accent transition-colors">Instagram</a>
        <a href="#" className="text-white hover:text-accent transition-colors">LinkedIn</a>
      </div>
    </footer>
  );
};

export default Footer;
