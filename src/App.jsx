import { Routes, Route, Outlet } from 'react-router-dom';
import { Header } from './layout/Header';
import { Footer } from './layout/Footer';
import { Home } from './pages/HomePage/HomePage';
import { Booking } from './pages/BookingPage/BookingPage';
import { AuthUser } from './pages/AuthPage/Index';
import { Register } from './pages/AuthPage/Register/RegisterPage';
import { Login } from './pages/AuthPage/Login/LoginPage';
import { ProfilePage } from './pages/ProfilePage/Index';

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
          <Route path="auth" element={<AuthUser />} />
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/register" element={<Register />} />
          <Route path="/auth/profile" element={<ProfilePage />} />
          <Route path="*" element={<RouteNotFound />} />
        </Route>
      </Routes>
    </>
  );
}
