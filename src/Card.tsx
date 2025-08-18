import React from 'react';
import styles from './Card.module.css';

type CardProps = {
  label: string;
  value: string;
  onCopy: () => void;
  copied: boolean;
};

const Card: React.FC<CardProps> = ({ label, value, onCopy, copied }) => (
  <div className={styles.card}>
    <div className={styles.value}>{value}</div>
    <button className={styles.copyBtn} onClick={onCopy}>
      {copied ? 'Copied!' : `Kopieer ${label} naar klembord`}
    </button>
  </div>
);

export default Card;

