import { NavLinks } from './Navlinks';
import classes from './Navbar.module.css';

/**
 * Navigation component.
 * Renders the navigation menu of the website.
 */
export function Navigation() {
  return (
    <>
      <nav className={classes.navigation}>
        <NavLinks />
      </nav>
    </>
  );
}
