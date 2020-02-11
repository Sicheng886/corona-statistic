import React from 'react';
import styles from './Header.module.css';
import InstallBtn from '../InstallBtn/InstallBtn';

const Header = ({ title, subtitle }) => {
  return (
    <div className={styles.wrapper}>
      <div>
        <h1 className={styles.title}>{title}</h1>
        <h2 className={styles.subtitle}>{subtitle}</h2>
      </div>
      <div>
        <InstallBtn />
      </div>
    </div>
  );
};

export default Header;
