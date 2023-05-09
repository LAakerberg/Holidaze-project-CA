import { Routes, Route, Outlet } from 'react-router-dom';
import { Header } from './layout/Header';
import { Footer } from './layout/Footer';
import { Home } from './pages/HomePage/HomePage';
import { Venues } from './pages/VenuePage';
import { AuthUser } from './pages/AuthPage/Index';
import { Register } from './pages/AuthPage/Register/RegisterPage';
import { Login } from './pages/AuthPage/Login/LoginPage';
import { ProfilePage } from './pages/ProfilePage/ProfilePage';
import { VenuesSpecific } from './pages/VenuePage/DetailsPage';

function RouteNotFound() {
  return <div>Page not found</div>;
}

export function Main() {
  return (
    <>
      <main className="relative flex flex-col w-full md:w-4/5 max-w-screen-2xl px-1 z-10">
        <div className="mt-32"></div>
        <div className="">
          <h3>Main</h3>
          <Outlet />
        </div>
      </main>
    </>
  );
}

export function Layout() {
  return (
    <>
      <Header />
      <Main />
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
          <Route path="/venues" element={<Venues />} />
          <Route path="venues/details/:id" element={<VenuesSpecific />} />
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
