/* import { Navbar } from './navigation/Navbar'; */
import { Link } from 'react-router-dom';
import headerbg from '../assets/img/david-vives-ELf8M_YWRTY-unsplash-holidaze-bg2.jpg';
import { Navbar } from './navigation/Navbar';

export function Header() {
  /*   const getUserData = localStorage.getItem('userData');
  const userData = JSON.parse(getUserData); */

  return (
    <>
      <header className="static">
        <div
          className="header_content relative"
          style={{
            backgroundImage: `url(${headerbg})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundPosition: '50%',
          }}
        >
          <div className="bg-gradient-to-b from-light_salmon to-topaz drop-shadow-lg">
            <div className="flex flex-row w-full md:w-4/5 max-w-screen-2xl m-auto px-1">
              <div className="border flex">
                <h1 className="text-shandy">
                  <Link to="/">Holidaze</Link>
                </h1>
              </div>
              <div className="border flex flex-auto flex-row">
                <div className="flex-1 border">
                  <div className="flex flex-col">
                    <Navbar />
                  </div>
                </div>
                <div className="flex border hidden md:block">
                  <ul>
                    <li className="">
                      <Link to="/auth">Profile</Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="m-auto mt-6 bg-shandy opacity-95 min-w-min sm:w-9/12 max-w-xl h-16 outline-none outline-offset-0 outline-gray-400 rounded">
            <p>Search</p>
          </div>
        </div>
        {/*         <div className="absolute top-10">
          <Card />
        </div> */}
      </header>
    </>
  );
}
