import React from 'react';
import { Link } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import styles from './header.module.scss';

// Импортируем SVG как компоненты
import { ReactComponent as ShoppingCart } from '../../assets/bag-2.svg';
import { ReactComponent as Profile } from '../../assets/user.svg';
import { ReactComponent as LogoIcon } from '../../assets/Frame.svg';

const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      {/* Левая колонка: логотип */}
      <Link to="/" aria-label="Go to homepage">
        <div className={styles.header__logo}>
          <LogoIcon className={styles['header__logo-icon']} />
          <span className={styles['header__logo-text']}>Lalasia</span>
        </div>
      </Link>

      {/* Центральная колонка: навигация */}
      <nav className={styles.header__nav} aria-label="Main navigation">
        <ul>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? styles.activeLink : styles.navLink
              }
            >
              Products
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/category"
              className={({ isActive }) =>
                isActive ? styles.activeLink : styles.navLink
              }
            >
              Categories
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/aboutus"
              className={({ isActive }) =>
                isActive ? styles.activeLink : styles.navLink
              }
            >
              About us
            </NavLink>
          </li>
        </ul>
      </nav>

      {/* Правая колонка: иконки */}
      <div className={styles.header__icons}>
        <Link to="/cart" aria-label="Cart">
          <ShoppingCart className={styles.icon} />
        </Link>
        <Link to="/profile" aria-label="Profile">
          <Profile className={styles.icon} />
        </Link>
      </div>
    </header>
  );
};

export default Header;
