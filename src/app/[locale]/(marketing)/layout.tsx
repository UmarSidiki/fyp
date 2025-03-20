// import Header from '@/components/Header';
import React from 'react';
import Home from './page';

const Layout = () => {
  return (
    <div>
      {/* <Header /> */}
      <Home />

      {/* <MapHero /> */}
    </div>
  );
};

export default Layout;
// setIsDarkMode(!isDarkMode);
// const dropdownRef = useRef(null);

//  useEffect(() => {
//     const handleClickOutside = () => {
//       setIsDropdownOpen(false);
//     };

//     if (isDropdownOpen) {
//       document.addEventListener('click', handleClickOutside);
//     }

//     return () => {
//       document.removeEventListener('click', handleClickOutside);
//     };
//   }, [isDropdownOpen]);
