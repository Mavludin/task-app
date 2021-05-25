import React from 'react';
import styles from './Header.module.css';
import searchIcon from './../../assets/img/search.png'

export const Header = () => {
  return (
    <header className={styles.mainHeader}>
      <form className={styles.searchForm}>
        <input type="search" />
        <img src={searchIcon} alt="Search" />
      </form>
    </header>
  )
}
