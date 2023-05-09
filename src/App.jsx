import { Routes, Route, Outlet } from 'react-router-dom';
import { Header } from './layout/Header';
import { Footer } from './layout/Footer';
import { Home } from './pages/HomePage/HomePage';
import { Venues } from './pages/VenuePage';
import { AuthUser } from './pages/AuthPage/Index';
import { Register } from './pages/AuthPage/Register/RegisterPage';
import { Login } from './pages/AuthPage/Login/LoginPage';
import { ProfilePage } from './pages/ProfilePage/ProfilePage';

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
          <Route path="venues" element={<Venues />} />
          <Route path="auth" element={<AuthUser />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile/:name" element={<ProfilePage />} />
          <Route path="*" element={<RouteNotFound />} />
        </Route>
      </Routes>
    </>
  );
}
