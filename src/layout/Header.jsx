/* import { Navbar } from './navigation/Navbar'; */
import { Link } from 'react-router-dom';
import headerbg from '../assets/img/david-vives-ELf8M_YWRTY-unsplash-holidaze-bg2.jpg';
import { Navbar } from './navigation/Navbar';
import { VenueSearch } from '../hooks/venues/searchHook';
import { GetCard } from '../hooks/venues/CardHook';

export function Header() {
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
                <div className="flex-1 z-40">
                  <div className="flex flex-col z-40 pt-2">
                    <Navbar />
                  </div>
                </div>
                <div className="top-20 w-full z-40 m-auto flex justify-center">
                  <div className="bg-gradient-to-b from-topaz to-light_salmon m-auto drop-shadow-lg p-1 rounded-xl z-40">
                    <VenueSearch />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute top-20 w-full z-30 m-auto flex justify-center hidden">
          <div className="w-72 h-20 bg-yellow_red rounded-lg border border-light_salmon flex justify-center items-center">
            <div className="hidden">
              <VenueSearch />
            </div>
          </div>
        </div>
        <div className="hidden absolute top-64 z-20 w-full">
          <GetCard />
        </div>
      </header>
    </>
  );
}
