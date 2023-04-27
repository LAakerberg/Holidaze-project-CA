/* import { Navbar } from './navigation/Navbar'; */
import { Nav } from '../App';
import headerbg from '../assets/img/david-vives-ELf8M_YWRTY-unsplash-holidaze-bg2.jpg';

export function Header() {
  return (
    <>
      <header className="">
        <div
          className="h-96 relative"
          style={{
            backgroundImage: `url(${headerbg})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundPosition: '50%',
          }}
        >
          <div className="bg-gradient-to-b from-light_salmon to-topaz drop-shadow-lg">
            <div className="flex w-full md:w-4/5 max-w-screen-2xl m-auto">
              <div className="border flex">
                <h1 className="text-shandy">Holidaze</h1>
              </div>
              <div className="border flex flex-auto flex-row">
                <div className="flex-1 border">
                  <div className="flex flex-col">
                    <Nav />
                  </div>
                </div>
                <div className="flex border">Profile</div>
              </div>
              {/*               <div className="border flex">
                <h3>Profile</h3>
              </div> */}
            </div>
          </div>
          <div className="m-auto mt-6 bg-shandy min-w-min sm:w-9/12 max-w-xl h-16 outline-none outline-offset-0 outline-gray-400 rounded">
            <p>Search</p>
          </div>
        </div>
        {/* <Navbar /> */}
      </header>
    </>
  );
}
