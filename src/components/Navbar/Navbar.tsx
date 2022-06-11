import { useState, useEffect, useCallback } from 'react';

import SearchBar from './SearchBar';

const Navbar = () => {
  const [showNav, setShowNav] = useState<boolean>(false);

  const handleShowNav = useCallback(() => {
    if (window.scrollY > 100) {
      setShowNav(true);
    } else {
      setShowNav(false);
    }
  }, [showNav]);

  useEffect(() => {
    window.addEventListener('scroll', handleShowNav);
    return () => window.removeEventListener('scroll', handleShowNav);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 p-4 w-full h-20 flex justify-between transition-colors items-center z-50 ${
        showNav ? 'bg-black/[0.6]' : 'border-b-[1px] border-white/[0.4]'
      }`}
    >
      <div className='text-xl text-cyan-500 font-medium uppercase cursor-default'>
        <span className='font-extrabold text-3xl'>M</span>oviestan
      </div>
      <SearchBar />
    </nav>
  );
};

export default Navbar;
