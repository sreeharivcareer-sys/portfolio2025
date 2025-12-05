import React from 'react'
import styles from './Connect.module.scss'

export const Connect = () => {
    return (
        <div className={styles.connectContainer}>
            <div className={styles.connectHeader}>Contact Me</div>

            <section className={styles.contactSection}>
                <div className={styles.left}>
                    <div className={styles.group}>
                        <h4>Socials</h4>
                        <a href="https://linkedin.com/in/sreehari-v-1249b1103" target="_blank" rel="noreferrer">
                            LinkedIn
                        </a>
                        <a href="https://dribbble.com" target="_blank" rel="noreferrer">
                            Dribbble
                        </a>
                    </div>

                    <div className={styles.dot}></div>

                    <div className={styles.group}>
                        <h4>Contact Me</h4>
                        <a href="sreehariv7990@gmail.com">Email</a>
                        <a href="https://wa.me/919539982981" target="_blank" rel="noreferrer">
                            Whatsapp
                        </a>
                    </div>

                    <div className={styles.projectNote}>
                        <p>Got a project in mind?</p>
                        <h2>Let’s make something<br />happen together</h2>
                    </div>
                </div>

                <div className={styles.right}>
                    <p className={styles.bigText}>
                        As a senior frontend developer, I focus on building interfaces that
                        feel natural and fast.
                    </p>
                    <p className={styles.bigText}>
                        My job is to understand what users expect, then design systems that
                        are clean, logical, and scalable. I care about simplicity, accuracy
                        and reducing friction in every interaction.
                    </p>
                </div>
            </section>
        </div>
    )
}
