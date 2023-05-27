import { NavLinks } from './Navlinks';
import classes from './Navbar.module.css';

export function Navigation() {
  return (
    <>
      <nav className={classes.navigation}>
        <NavLinks />
      </nav>
    </>
  );
}
