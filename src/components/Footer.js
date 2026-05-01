import React from 'react';
import { FaGithub, FaInstagram, FaLinkedin, FaQuoteLeft } from 'react-icons/fa';

const XIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);
const Footer = () => {
  const cosmicQuote = "The universe is not only stranger than we imagine, it is stranger than we can imagine.";
  const quoteAuthor = "Sir Arthur Eddington";

  const socialLinks = [
    {
      icon: FaGithub,
      url: "https://github.com/mohammadfaiz2722"
    },
    {
      icon: XIcon,
      url: "https://x.com/faiz272003?t=7J2Jt0zty3ShSz1-ze2icQ&s=09"
    },
    {
      icon: FaInstagram,
      url: "https://www.instagram.com/mohammadfaiz_27?igsh=MWE0ejdib2IzaDg5Zw== "
    },
    {
      icon: FaLinkedin,
      url: "https://www.linkedin.com/in/mohammad-faiz-a8596b309?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app "
    }
  ];

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
              {socialLinks.map(({ icon: Icon, url }, index) => (
                <a key={index} href={url} target="_blank" rel="noopener noreferrer" style={{fontSize:'25px'}} className="text-[#E6E6FA] hover:text-white transition-colors duration-300 transform hover:scale-110">
                  <Icon />
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
