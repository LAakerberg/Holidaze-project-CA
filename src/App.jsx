import { Routes, Route, Outlet, Link } from 'react-router-dom';
import { Header } from './layout/Header';
import { Footer } from './layout/Footer';
import { Home } from './pages/HomePage/HomePage';
import { Booking } from './pages/BookingPage/BookingPage';
import { Register } from './pages/Register/RegisterPage';

function RouteNotFound() {
  return <div>Page not found</div>;
}

export function Main() {
  return (
    <>
      <main>
        <div>
          <div>Hello</div>
        </div>
      </main>
    </>
  );
}

export function Nav() {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/bookings">Venues</Link>
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
          <Route path="register" element={<Register />} />
          <Route path="*" element={<RouteNotFound />} />
        </Route>
      </Routes>
    </>
  );
}
