import { Routes, Route, Outlet, Link } from 'react-router-dom';
import { useEffect } from 'react';
import { Header } from './layout/Header';
import { Footer } from './layout/Footer';

export function Home() {
  useEffect(() => {
    document.title = 'Home page';
  }, []);

  return (
    <>
      <h2>Hello and welcome</h2>
    </>
  );
}

function Booking() {
  useEffect(() => {
    document.title = 'Booking page';
  }, []);

  return <div>Booking page</div>;
}

function RouteNotFound() {
  return <div>Page not found</div>;
}

export function Nav() {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/bookings">Booking</Link>
        </li>
      </ul>
    </nav>
  );
}

export function Layout() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="bookings" element={<Booking />} />
          <Route path="*" element={<RouteNotFound />} />
        </Route>
      </Routes>
    </>
  );
}
