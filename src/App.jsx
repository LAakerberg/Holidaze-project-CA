import { Routes, Route, Outlet } from 'react-router-dom';
import { Header } from './layout/Header';
import { Footer } from './layout/Footer';
import { Home } from './pages/HomePage/HomePage';
import { VenuesPage } from './pages/VenuePage';
import { AuthUser } from './pages/AuthPage/Index';
import { Register } from './pages/AuthPage/Register';
import { Login } from './pages/AuthPage/Login';
import { ProfilePage } from './pages/ProfilePage/index';
import { DetailsPage } from './pages/VenuePage/DetailsPage';
/* import { SuccessLogin, SuccessRegistration } from './pages/Success'; */
import { SuccessLogin, SuccessRegister } from './components/Success';

function RouteNotFound() {
  return <div>Page not found</div>;
}

export function Main() {
  return (
    <>
      <main className="relative flex flex-col w-full md:w-4/5 max-w-screen-2xl p-1 pb-4 z-10">
        <div className="mt-2"></div>
        <div className="">
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
          <Route path="/venues" element={<VenuesPage />} />
          <Route path="venues/details/:id" element={<DetailsPage />} />
          <Route path="auth" element={<AuthUser />} />
          <Route path="/login" element={<Login />} />
          <Route path="/success/login" element={<SuccessLogin />} />
          <Route path="/success/register" element={<SuccessRegister />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile/:name" element={<ProfilePage />} />
          <Route path="*" element={<RouteNotFound />} />
        </Route>
      </Routes>
    </>
  );
}
