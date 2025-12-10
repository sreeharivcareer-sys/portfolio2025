import React, { useState } from 'react'
import { Wish } from '../WishComponent/Wish'
import styles from './HeaderBanner.module.scss';

export const HeaderBanner = ({ blackMenu, blackWish, notMain }) => {
    const [openMenu, toggleOpenMenu] = useState(false);
    return (<>
        <div className={styles.mobMenu}>
            <div className={styles.menuButton} onClick={() => toggleOpenMenu(!openMenu)}>
                <img src="/assets/menu.png" width={30} />
            </div>

            <div className={`${styles.menuPopUp} ${openMenu ? styles.show : ''}`}>
                <div className={styles.menuHeader}>
                    <div className={styles.menuLabel}>Menu</div>
                    <div className={styles.closeMenu} onClick={() => toggleOpenMenu(!openMenu)}>close</div>
                </div>
                <div className={styles.menuContainer}>
                    <div className={styles.menuItem}>Index</div> 
                    <div className={styles.menuItem}>Skills</div> 
                    <div className={styles.menuItem}>Gear</div> 
                    <div className={styles.menuItem}>Education</div> 
                    <div className={styles.menuItem}>Reference</div> 
                    <div className={styles.menuItem}>Contact</div>
                </div>
            </div>
            <div className={styles.wishContainer}>
               {notMain ? <></> : <Wish blackMenu={blackMenu} blackWish={blackWish} />}
            </div>
        </div>
        <div className={styles.bannerContainer}>
            <Wish blackMenu={blackMenu} blackWish={blackWish} />
            <div className={styles.linkContainer}>
                <a href="https://linkedin.com/in/sreehari-v-1249b1103" className={styles.bannerLink}>LinkedIn</a> /
                <a href="https://linkedin.com/in/sreehari-v-1249b1103" className={styles.bannerLink}>Resume</a>
            </div>
            <div className={styles.menuContainer}>
                <div className={styles.menuItem}>Index</div> /
                <div className={styles.menuItem}>Skills</div> /
                    <div className={styles.menuItem}>Gear</div> /
                <div className={styles.menuItem}>Education</div> /
                <div className={styles.menuItem}>Reference</div> /
                <div className={styles.menuItem}>Contact</div>
            </div>
            <div className={styles.talk}>Lets Talk!</div>
        </div>
    </>
    )
}
