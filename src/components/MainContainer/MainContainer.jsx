import React, { useEffect, useState } from 'react'
import styles from './MainContainer.module.scss';

export const MainContainer = () => {

    const companies = [
        "TCS",
        "KEYVALUE",
        "ASPIRE"
    ];

    const [index, setIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % companies.length);
        }, 2000); // change company every 2 seconds

        return () => clearInterval(interval);
    }, [companies.length]);


    return (
        <div className={styles.mainContainer}>
            <div className={styles.leftContainer}>
                <div className={styles.leftWrapper}>
                    <div className={styles.nameLabel}>Hi There, I am </div>
                    <div>
                        <span className={styles.name}>Sree</span>
                        <span className={styles.subName}>hari</span>
                        <span className={styles.name}> V</span>
                    </div>
                    <div className={styles.headTextContainer}>
                        <div className={styles.headText}>SENIOR WEB&MOBILE <br /> DEVELOPER FOR  </div>
                        
                        <div className={styles.headTextSmall}>SENIOR <br/> WEB-MOBILE <br /> DEV FOR  </div>
                    </div>
                    <div className={styles.scrollerContainer}>
                        <div key={index} className={`${styles.scrollerText} ${styles.scrollUp}`}>
                            {companies[index]}
                        </div>
                    </div>
                </div>
                <div className={styles.scrollLabel}>(Scroll to explore)</div>
            </div>
            <div className={styles.serviceLabelContainerTab}>
                    <div className={styles.serviceLabels}>Web Development</div>
                    <div className={styles.serviceLabels}>Mobile Development</div>
                    <div className={styles.serviceLabels}>App Designs</div>
                </div>
            <div className={styles.rightContainer}>
                <div className={styles.serviceLabelContainer}>
                    <div className={styles.serviceLabels}>Web Development</div>
                    <div className={styles.serviceLabels}>Mobile Development</div>
                    <div className={styles.serviceLabels}>App Designs</div>
                </div>
                <div className={styles.connectContainer}>
                    <div className={styles.connectLabel}>
                        Connect with me
                    </div>
                    <img src="/icons/right-up.png" alt="icon" className={styles.connectIcon} />
                </div>
                <div className={styles.profWrapper}>
                <div className={styles.profDescContainer}>
                    <div className={styles.profDesc}>
                        Senior React/React Native engineer with 8+ years building scalable web and mobile apps, leading modules, mentoring teams, and delivering high-performance UI systems across e-commerce, banking, and community platforms.
                    </div>
                </div>
                </div>
            </div>
        </div>
    )
}
