import { NavLinks } from './Navlinks';
import { AiOutlineMenu } from 'react-icons/ai';
import { AiFillCloseCircle } from 'react-icons/ai';
import classes from './Navbar.module.css';
import { useState } from 'react';

/**
 * Renders the mobile navigation bar with a hamburger icon that toggles
 * the navigation links when clicked.
 */
export function MobileNavigation() {
  const [openNav, setOpenNav] = useState(false);

  const hamburgerOpen = (
    <AiOutlineMenu
      className={classes.Hamburger}
      size="30px"
      color="black"
      onClick={() => setOpenNav(!openNav)}
    />
  );

  const hamburgerClose = (
    <AiFillCloseCircle
      className={classes.Hamburger}
      size="30px"
      color="black"
      onClick={() => setOpenNav(!openNav)}
    />
  );

  /**
   * Closes the mobile navigation menu.
   */
  const closeMobile = () => setOpenNav(false);

  return (
    <>
      <nav className={classes.mobile_navigation}>
        {openNav ? hamburgerClose : hamburgerOpen}
        {openNav && <NavLinks isMobile={true} closeMobile={closeMobile} />}
      </nav>
    </>
  );
}
