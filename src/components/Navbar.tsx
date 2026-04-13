import React, { useState } from 'react';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [language, setLanguage] = useState<'zh' | 'en'>('zh');

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const switchLanguage = (lang: 'zh' | 'en') => {
    setLanguage(lang);
  };

  return (
    <nav className="bg-white shadow-md fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <a href="/" className="flex-shrink-0 flex items-center">
              <span className="text-xl font-bold text-gray-900">澳丽德新材料</span>
              <span className="ml-2 text-sm text-gray-500 hidden sm:inline">Ultra Leather</span>
            </a>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <a href="/" className="border-b-2 border-gray-900 text-gray-900 inline-flex items-center px-1 pt-1 text-sm font-medium">
                {language === 'zh' ? '首页' : 'Home'}
              </a>
              <a href="/products" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 text-sm font-medium">
                {language === 'zh' ? '产品' : 'Products'}
              </a>
              <a href="/about" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 text-sm font-medium">
                {language === 'zh' ? '关于我们' : 'About Us'}
              </a>
              <a href="/contact" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 text-sm font-medium">
                {language === 'zh' ? '联系我们' : 'Contact'}
              </a>
            </div>
          </div>
          <div className="flex items-center">
            <div className="flex items-center ml-4">
              <button
                onClick={() => switchLanguage('zh')}
                className={`px-2 py-1 text-xs font-medium ${language === 'zh' ? 'bg-gray-900 text-white' : 'text-gray-500 hover:bg-gray-100'}`}
              >
                中文
              </button>
              <button
                onClick={() => switchLanguage('en')}
                className={`px-2 py-1 text-xs font-medium ${language === 'en' ? 'bg-gray-900 text-white' : 'text-gray-500 hover:bg-gray-100'}`}
              >
                English
              </button>
            </div>
            <div className="hidden sm:ml-6 sm:block">
              <button
                type="button"
                className="bg-gray-900 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              >
                {language === 'zh' ? '联系我们' : 'Contact Us'}
              </button>
            </div>
            <div className="ml-4 flex items-center sm:hidden">
              <button
                onClick={toggleMenu}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-500"
              >
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  {isMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="sm:hidden">
          <div className="pt-2 pb-3 space-y-1">
            <a href="/" className="bg-gray-900 text-white block pl-3 pr-4 py-2 text-base font-medium">
              {language === 'zh' ? '首页' : 'Home'}
            </a>
            <a href="/products" className="border-transparent text-gray-500 hover:bg-gray-100 hover:text-gray-900 block pl-3 pr-4 py-2 text-base font-medium">
              {language === 'zh' ? '产品' : 'Products'}
            </a>
            <a href="/about" className="border-transparent text-gray-500 hover:bg-gray-100 hover:text-gray-900 block pl-3 pr-4 py-2 text-base font-medium">
              {language === 'zh' ? '关于我们' : 'About Us'}
            </a>
            <a href="/contact" className="border-transparent text-gray-500 hover:bg-gray-100 hover:text-gray-900 block pl-3 pr-4 py-2 text-base font-medium">
              {language === 'zh' ? '联系我们' : 'Contact'}
            </a>
          </div>
          <div className="pt-4 pb-3 border-t border-gray-200">
            <div className="flex items-center px-4">
              <div className="flex-shrink-0">
                <button
                  onClick={() => switchLanguage('zh')}
                  className={`px-2 py-1 text-xs font-medium ${language === 'zh' ? 'bg-gray-900 text-white' : 'text-gray-500 hover:bg-gray-100'}`}
                >
                  中文
                </button>
                <button
                  onClick={() => switchLanguage('en')}
                  className={`px-2 py-1 text-xs font-medium ${language === 'en' ? 'bg-gray-900 text-white' : 'text-gray-500 hover:bg-gray-100'}`}
                >
                  English
                </button>
              </div>
            </div>
            <div className="mt-3 px-2">
              <button
                type="button"
                className="w-full bg-gray-900 text-white px-4 py-2 rounded-md text-base font-medium hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              >
                {language === 'zh' ? '联系我们' : 'Contact Us'}
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;