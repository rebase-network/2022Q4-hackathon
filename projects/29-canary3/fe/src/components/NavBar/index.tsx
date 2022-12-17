import React from 'react';
import Logo from '@/assets/logo.svg';
import styles from './style/index.module.less';

function Navbar() {
  return (
    <div className={styles.navbar}>
      <div className={styles.left}>
        <div className={styles.logo}>
          <Logo />
          <div className={styles['logo-name']}>Canary3</div>
        </div>
      </div>
      <ul className={styles.right}>
        <li className={styles.content}>
          <span>
            盈利: 28 USDC
          </span>
          <span>
            余额: 7,883 USDC
          </span>
          <span>dYdX key: JX6...D5A</span>
          <span className={styles.metamask}>0xB93...7A5A</span>
        </li>
      </ul>
    </div>
  );
}

export default Navbar;
