import React, { useState } from 'react';
import { HiMenu, HiX, HiSelector } from 'react-icons/hi';
import InformationBand from '../InformationBand/InformationBand';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isDropdownHovered, setIsDropdownHovered] = useState(false);

  const navigationItems = [
    {
      label: 'Select Option',
      type: 'select',
      options: [
        'Social Accounting Matrix Social Accounting Matrix',
        'Factor to Household',
        'Factor to Government',
      ],
    },
    { label: 'Generate SAM', type: 'button', variant: 'primary' },
    { label: 'Home', type: 'button', variant: 'danger' },
  ];

  const getButtonClass = (variant) => {
    const baseClasses =
      'px-4 py-2 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900';
    const variants = {
      primary: 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500',
      success: 'bg-emerald-600 hover:bg-emerald-700 focus:ring-emerald-500',
      danger: 'bg-rose-600 hover:bg-rose-700 focus:ring-rose-500',
    };
    return `${baseClasses} ${variants[variant]}`;
  };

  return (
    <>
      <header className="w-full bg-gradient-to-r from-gray-900 to-gray-800 text-white shadow-lg">
        <div className="flex items-center justify-between px-6 py-3">
          {/* Logo/Title - Compact Version */}
          <div className="flex items-center space-x-2">
            <h3 className="text-lg font-semibold tracking-tight">
              Social Accounting Matrix
            </h3>
          </div>

          {/* Mobile menu button */}
          <div className="sm:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Toggle menu"
            >
              {menuOpen ? <HiX size={18} /> : <HiMenu size={18} />}
            </button>
          </div>

          {/* Desktop navigation */}
          <nav className="hidden sm:flex sm:items-center sm:space-x-2">
            {/* Wider dropdown container */}
            <div
              className="relative min-w-[200px]"
              onMouseEnter={() => setIsDropdownHovered(true)}
              onMouseLeave={() => setIsDropdownHovered(false)}
            >
              <select className="w-full appearance-none bg-gray-800 border border-gray-700 text-white rounded-lg pl-3 pr-8 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 hover:bg-gray-750 cursor-pointer">
                <option value="">Select Option</option>
                {navigationItems[0].options.map((option, index) => (
                  <option
                    key={index}
                    value={option.toLowerCase().replace(' ', '-')}
                  >
                    {option}
                  </option>
                ))}
              </select>
              <HiSelector
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
                size={14}
              />
            </div>

            <button className={`text-sm ${getButtonClass('primary')}`}>
              Generate SAM
            </button>
            <button className={`text-sm ${getButtonClass('danger')}`}>
              Home
            </button>
          </nav>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="sm:hidden px-6 pb-4 space-y-2 animate-fade-in">
            {/* Mobile dropdown is already full width */}
            <div className="relative">
              <select className="w-full appearance-none bg-gray-800 border border-gray-700 text-white rounded-lg pl-3 pr-8 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                <option value="">Select Option</option>
                {navigationItems[0].options.map((option, index) => (
                  <option
                    key={index}
                    value={option.toLowerCase().replace(' ', '-')}
                  >
                    {option}
                  </option>
                ))}
              </select>
              <HiSelector
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
                size={14}
              />
            </div>

            <button className={`w-full text-sm ${getButtonClass('primary')}`}>
              Button 1
            </button>
            <button className={`w-full text-sm ${getButtonClass('success')}`}>
              Button 2
            </button>
            <button className={`w-full text-sm ${getButtonClass('danger')}`}>
              Button 3
            </button>
          </div>
        )}
      </header>

      {/* InformationBand that appears only on dropdown hover */}
      {isDropdownHovered && (
        <div className="animate-fade-in">
          <InformationBand>
            <div className="flex items-center justify-center space-x-2 text-sm">
              <svg
                className="w-4 h-4 text-blue-500"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                  clipRule="evenodd"
                />
              </svg>
              <span>
                Select an option from the dropdown to configure your Social
                Accounting Matrix
              </span>
            </div>
          </InformationBand>
        </div>
      )}
    </>
  );
};

export default Header;
