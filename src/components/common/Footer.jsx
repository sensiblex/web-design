import React from 'react';
import { Bitcoin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="w-full bg-primary px-[120px] py-[80px]">
      <div className="flex justify-between">
        {/* Logo */}
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center">
              <Bitcoin className="w-6 h-6 text-white" />
            </div>
            <span className="font-inter font-semibold text-lg tracking-wider text-white">
              CRAPPO
            </span>
          </div>
          <p className="text-white text-base font-normal leading-7">
            ©2021 CRAPPO. All rights reserved
          </p>
        </div>

        {/* Quick Link */}
        <div className="flex flex-col gap-8">
          <h3 className="text-white text-xl font-medium leading-9">Quick Link</h3>
          <div className="flex flex-col gap-[38px]">
            <a href="#" className="text-grey-6 text-base font-normal leading-9 hover:text-accent transition-colors">Home</a>
            <a href="#" className="text-grey-6 text-base font-normal leading-9 hover:text-accent transition-colors">Products</a>
            <a href="#" className="text-grey-6 text-base font-normal leading-9 hover:text-accent transition-colors">About</a>
            <a href="#" className="text-grey-6 text-base font-normal leading-9 hover:text-accent transition-colors">Features</a>
            <a href="#" className="text-grey-6 text-base font-normal leading-9 hover:text-accent transition-colors">Contact</a>
          </div>
        </div>

        {/* Resources */}
        <div className="flex flex-col gap-8">
          <h3 className="text-white text-xl font-medium leading-9">Resources</h3>
          <div className="flex flex-col gap-[38px]">
            <a href="#" className="text-grey-5 text-base font-normal leading-9 hover:text-accent transition-colors">Download Whitepapper</a>
            <a href="#" className="text-grey-5 text-base font-normal leading-9 hover:text-accent transition-colors">Smart Token</a>
            <a href="#" className="text-grey-5 text-base font-normal leading-9 hover:text-accent transition-colors">Blockchain Explorer</a>
            <a href="#" className="text-grey-5 text-base font-normal leading-9 hover:text-accent transition-colors">Crypto API</a>
            <a href="#" className="text-grey-5 text-base font-normal leading-9 hover:text-accent transition-colors">Interest</a>
          </div>
        </div>

        {/* Payment Systems */}
        <div className="flex flex-col gap-12">
          <h3 className="text-white text-2xl font-medium leading-12">We accept following payment systems</h3>
          <div className="flex gap-5">
            <div className="w-24 h-16 bg-grey-5/5 rounded-lg flex items-center justify-center">
              <Bitcoin className="w-10 h-10 text-grey-5" />
            </div>
            <div className="w-24 h-16 bg-grey-5/5 rounded-lg flex items-center justify-center">
              <div className="w-12 h-9 flex items-center justify-center">
                <div className="w-6 h-6 bg-grey-4 rounded-full" />
              </div>
            </div>
            <div className="w-24 h-16 bg-grey-5/5 rounded-lg flex items-center justify-center">
              <div className="w-12 h-12 flex items-center justify-center">
                <div className="w-6 h-6 bg-grey-5 rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Social Icons */}
      <div className="flex gap-6 mt-[366px]">
        <a href="#" className="text-white hover:text-accent transition-colors">Facebook</a>
        <a href="#" className="text-white hover:text-accent transition-colors">Instagram</a>
        <a href="#" className="text-white hover:text-accent transition-colors">LinkedIn</a>
      </div>
    </footer>
  );
};

export default Footer;
