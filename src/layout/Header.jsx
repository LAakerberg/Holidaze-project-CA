/* import { Navbar } from './navigation/Navbar'; */
import { Link } from 'react-router-dom';
import headerbg from '../assets/img/david-vives-ELf8M_YWRTY-unsplash-holidaze-bg2.jpg';
import { Navbar } from './navigation/Navbar';
import { VenueSearch } from '../hooks/venues/searchHook';
import { BiSearch } from 'react-icons/bi';
import { useState, useEffect, useRef } from 'react';

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleRef = useRef(null);
  const scrollThreshold = 200; // Adjust this value to your desired scroll threshold

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event) => {
    if (toggleRef.current && !toggleRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  const handleScroll = () => {
    if (window.scrollY > scrollThreshold) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    window.addEventListener('scroll', handleScroll);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <header className="relative">
        <div
          className="header_content relative z-20"
          style={{
            backgroundImage: `url(${headerbg})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundPosition: '50%',
          }}
        >
          <div className="bg-gradient-to-b from-light_salmon to-topaz drop-shadow-lg">
            <div className="flex flex-row-reverse md:flex-row w-full lg:w-4/5 max-w-screen-2xl m-auto px-1">
              <div className="flex">
                <h1 className="text-shandy logo">
                  <Link to="/" className="header-logo">
                    Holidaze
                  </Link>
                </h1>
              </div>
              <div className="flex flex-auto flex-row md:flex-row">
                <div className="flex md:flex-1 z-40">
                  <div className="flex flex-col z-40 pt-2">
                    <Navbar />
                  </div>
                </div>
                <div className="flex flex-initial z-40">
                  <div className="flex flex-col z-40 pt-2">
                    <button onClick={toggleOpen}>
                      <BiSearch className="icons-style icons-profile drop-shadow-xl mr-4" />
                    </button>
                  </div>
                </div>
                <div className="top-20 z-40 m-auto flex justify-center hidden">
                  {isOpen && (
                    <div className="bg-gradient-to-b from-topaz to-light_salmon m-auto drop-shadow-lg p-1 rounded-xl z-40">
                      <VenueSearch />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute left-2 md:right-2 md:left-auto top-16 z-30 m-auto flex justify-center">
          {isOpen && (
            <div
              ref={toggleRef}
              className="bg-gradient-to-b from-topaz to-light_salmon m-auto drop-shadow-lg p-1 rounded-xl z-40"
            >
              <VenueSearch />
            </div>
          )}
        </div>
        <div className="hidden absolute top-64 z-20 w-full"></div>
      </header>
    </>
  );
}
