import React from 'react';
import { FaGithub, FaTwitter, FaInstagram, FaLinkedin, FaQuoteLeft } from 'react-icons/fa';

const Footer = () => {
  const cosmicQuote = "The universe is not only stranger than we imagine, it is stranger than we can imagine.";
  const quoteAuthor = "Sir Arthur Eddington";

  return (
    <footer className="relative bg-[#070714] text-white py-16 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-6">
            <h3 className="text-3xl font-orbitron font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#8A2BE2] to-[#FF69B4]">
              Cosmic Vault
            </h3>
            <p className="text-xl text-[#E6E6FA]">Explore the Universe of Memories</p>
            <div className="flex space-x-4">
              {[FaGithub, FaTwitter, FaInstagram, FaLinkedin].map((Icon, index) => (
                <a key={index} href="#" className="text-[#E6E6FA] hover:text-white transition-colors duration-300 transform hover:scale-110">
                  <Icon className="w-6 h-6" />
                </a>
              ))}
            </div>
          </div>
          <div className="space-y-6">
            <h4 className="text-2xl font-semibold font-orbitron text-[#8A2BE2]">Cosmic Quote of the Day</h4>
            <div className="bg-[#1C1C2E] p-6 rounded-lg shadow-lg">
              <FaQuoteLeft className="text-[#FF69B4] w-8 h-8 mb-4" />
              <p className="text-[#E6E6FA] italic mb-4">{cosmicQuote}</p>
              <p className="text-right text-[#8A2BE2]">- {quoteAuthor}</p>
            </div>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-[#8A2BE2] text-center">
          <p className="text-[#E6E6FA]">&copy; 2024 Cosmic Vault. All rights reserved.</p>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#8A2BE2] via-[#FF69B4] to-[#8A2BE2]"></div>
      <div className="stars absolute inset-0 z-0 opacity-30"></div>
      <div className="absolute bottom-0 right-0 -mb-20 -mr-20 w-80 h-80 bg-[#8A2BE2] rounded-full filter blur-3xl opacity-10"></div>
      <div className="absolute top-0 left-0 -mt-20 -ml-20 w-80 h-80 bg-[#FF69B4] rounded-full filter blur-3xl opacity-10"></div>
    </footer>
  );
};

export default Footer;
