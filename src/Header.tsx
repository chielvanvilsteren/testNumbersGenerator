import React from 'react';
import styles from './Header.module.css';
import logo from './logo.svg';

const avatars = [
  'https://randomuser.me/api/portraits/lego/1.jpg',
  'https://randomuser.me/api/portraits/lego/2.jpg',
  'https://randomuser.me/api/portraits/lego/3.jpg',
  'https://randomuser.me/api/portraits/lego/4.jpg',
  'https://randomuser.me/api/portraits/lego/5.jpg',
];

const Header: React.FC = () => (
  <header className={styles.header}>
    <div className={styles.left}>
      <img src={logo} alt="Ready logo" className={styles.logo} />
      <img src="/favicon.ico" alt="Favicon" className={styles.favicon} />
    </div>
    <div className={styles.avatars}>
      {avatars.map((src, i) => (
        <img key={i} src={src} alt="avatar" className={styles.avatar} />
      ))}
    </div>
  </header>
);

export default Header;
