import React, {useEffect} from 'react'
import { Wish } from '../WishComponent/Wish'
import styles from './DarkHeader.module.scss';

export const DarkHeader = ({blackMenu, blackWish}) => {
    
  return (
    <div className={styles.bannerContainer}>
        <Wish blackMenu={blackMenu} blackWish={blackWish}/>
        <div className={styles.linkContainer}>
            <a href="" className={styles.bannerLink}>LinkedIn</a> / 
            <a href="" className={styles.bannerLink}>Resume</a>
        </div>  
        <div className={styles.menuContainer}>
            <div className={styles.menuItem}>Index</div> /
            <div className={styles.menuItem}>Projects</div> /
            <div className={styles.menuItem}>Education</div> /
            <div className={styles.menuItem}>Reference</div> /
            <div className={styles.menuItem}>Contact</div>
        </div>
        <div className={styles.talk}>Lets Talk!</div>
    </div>
  )
}
