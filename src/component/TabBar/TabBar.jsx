import React from 'react';
import { slide as Menu } from 'react-burger-menu';
import styles from './TabBar.module.css';

const TabBar = () => {
  const menuStyle = {
    bmBurgerButton: {
      position: 'fixed',
      width: '30px',
      height: '24px',
      left: '1rem',
      top: '1.2rem'
    },
    bmBurgerBars: {
      background: '#fff'
    },
    bmBurgerBarsHover: {
      background: '#a90000'
    },
    bmCrossButton: {
      height: '24px',
      width: '24px'
    },
    bmCross: {
      background: '#fff'
    },
    bmMenuWrap: {
      position: 'fixed',
      height: '100%'
    },
    /* General sidebar styles */
    bmMenu: {
      background: '#fcbc00',
      fontSize: '1.15em'
    },
    bmMorphShape: {
      fill: '#373a47'
    },
    bmItemList: {
      color: '#b8b7ad'
    },
    bmItem: {
      display: 'inline-block'
    },
    bmOverlay: {
      background: 'rgba(0, 0, 0, 0.3)'
    }
  };

  return (
    <Menu styles={menuStyle} width={280}>
      <div className={styles.itemWrapper}>
        <h1 className={styles.title}>Menu</h1>
        <a href='/' className={styles.index}>
          Home
        </a>
        <a href='/detail' className={styles.index}>
          Detail
        </a>
      </div>
    </Menu>
  );
};

export default TabBar;
