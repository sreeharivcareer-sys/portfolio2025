import React, { useState } from 'react'
import { Wish } from '../WishComponent/Wish'
import styles from './HeaderBanner.module.scss';

export const HeaderBanner = ({ blackMenu, blackWish, notMain, scrollToSection }) => {
    const [openMenu, toggleOpenMenu] = useState(false);


    const handleMenuItemClick = (refKey) => {
        scrollToSection(refKey);
        // Close the mobile menu after clicking
        if (openMenu) {
            toggleOpenMenu(false);
        }
    };
    // onClick = {() => handleMenuItemClick('refMain')} style = {{ cursor: 'pointer' }}
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
                    <div className={styles.menuItem} onClick={() => handleMenuItemClick('refMain')} style={{ cursor: 'pointer' }}>Index</div>
                    <div className={styles.menuItem} onClick={() => handleMenuItemClick('refSkills')} style={{ cursor: 'pointer' }}>Skills</div>
                    <div className={styles.menuItem} onClick={() => handleMenuItemClick('refTools')} style={{ cursor: 'pointer' }}>Gear</div>
                    <div className={styles.menuItem} onClick={() => handleMenuItemClick('refExp')} style={{ cursor: 'pointer' }}>Work</div>
                    <div className={styles.menuItem} onClick={() => handleMenuItemClick('refEdu')} style={{ cursor: 'pointer' }}>Education</div>
                    <div className={styles.menuItem} onClick={() => handleMenuItemClick('refReference')} style={{ cursor: 'pointer' }}>Reference</div>
                    <div className={styles.menuItem} onClick={() => handleMenuItemClick('refContact')} style={{ cursor: 'pointer' }}>Contact</div>
                    <div className={styles.resumeContainer}><a className={styles.menuResume} href="/assets/portfolio_resume.pdf" download="sernior_front-end_dev_sreehari_v_2025_.pdf">Download Resume</a></div>
                    <div><a className={styles.menuLinkedIn} href="https://linkedin.com/in/sreehari-v-1249b1103" >Visit LinkedIn</a></div>
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
                <a href="/assets/portfolio_resume.pdf" download="sernior_front-end_dev_sreehari_v_2025_.pdf" className={styles.bannerLink}>Resume</a>
            </div>


            <div className={styles.menuContainer}>
                <div className={styles.menuItem} onClick={() => handleMenuItemClick('refMain')} style={{ cursor: 'pointer' }}>Index</div> /
                <div className={styles.menuItem} onClick={() => handleMenuItemClick('refSkills')} style={{ cursor: 'pointer' }}>Skills</div> /
                <div className={styles.menuItem} onClick={() => handleMenuItemClick('refTools')} style={{ cursor: 'pointer' }}>Gear</div> /
                <div className={styles.menuItem} onClick={() => handleMenuItemClick('refExp')} style={{ cursor: 'pointer' }}>Organisations</div>/
                <div className={styles.menuItem} onClick={() => handleMenuItemClick('refEdu')} style={{ cursor: 'pointer' }}>Education</div> /
                <div className={styles.menuItem} onClick={() => handleMenuItemClick('refReference')} style={{ cursor: 'pointer' }}>Reference</div> /
                <div className={styles.menuItem} onClick={() => handleMenuItemClick('refContact')} style={{ cursor: 'pointer' }}>Contact</div>
            </div>
        </div>
    </>
    )
}
