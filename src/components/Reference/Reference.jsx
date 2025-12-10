import React, { useState } from 'react';
import styles from './Reference.module.scss';
import referenceData from '../../data/refData';
import RotaryDial from './RotaryDial/RotaryDial';

export const Reference = () => {
    const [selectedRef, setSelectedRef] = useState(referenceData[1])
    return (
        <div className={styles.referenceContainer}>

            <div className={styles.refHeader}>What People Say About Me</div>
            <div className={styles.refWrap}>

                <div className={styles.smallRefUser}>
                    <div className={styles.refUserName}>{selectedRef.name}</div>
                    <div className={styles.detailsWrapper}>
                        <div className={styles.designation}>{selectedRef.role}</div> at
                        <div className={styles.companyName}>{selectedRef.company}</div>
                    </div>
                </div>
                <div className={styles.refLeft}>
                    <div className={styles.refImageWrapper}>
                        <img
                            key={selectedRef.id}
                            src={`/assets/people/${selectedRef.image}`}
                            className={styles.preview}
                            alt=""
                        />
                    </div>
                </div>


                {/* <div className={styles.refCenter}> */}
                <div className={styles.refUserWrapper}>
                    <div className={styles.refWrapper}>
                        <div className={styles.refUserItem}>
                            <div className={styles.bigRefUser}>
                                <div className={styles.refUserName}>{selectedRef.name}</div>
                                <div className={styles.detailsWrapper}>
                                    <div className={styles.designation}>{selectedRef.role}</div> at
                                    <div className={styles.companyName}>{selectedRef.company}</div>
                                </div>
                            </div>
                            <div className={styles.commentWrapper}>
                                <div className={styles.comment}>
                                    {selectedRef.comment}
                                </div>
                            </div>
                            <div className={styles.contactRef}>
                                <a
                                    href={selectedRef.linkedIn}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={styles.linkedinBtn}
                                >
                                    <span className={styles.icon}>in</span>
                                    <span className={styles.text}>{selectedRef.name.split(' ')[0]}'s LinkedIn</span>
                                </a>
                                {selectedRef.email && (<a
                                    href={`mailto:${selectedRef.email}`}
                                    className={styles.mailBtn}
                                    aria-label={`Send email to ${selectedRef.name.split(' ')[0]}`}
                                >
                                    <span className={styles.mailIcon}>✉</span>
                                    <span className={styles.text}>Contact mail</span>
                                </a>)}
                            </div>

                            {/* </div> */}
                        </div>
                    </div>
                </div>
                <div className={styles.rotaryWrapper}>
                    <RotaryDial
                        data={referenceData}
                        activeColor="#FE5710"
                        inactiveColor="#2d393d"
                        ringWidth={180}
                        size={550}
                        onChange={(person) => { setSelectedRef(person); console.log('Selected:', person) }}
                    />
                </div>
            </div>

            {/* <WarningText messages={[
                "**********    Playback of real experiences    **********",
                "**********    Recorded impressions from colleagues    **********",
                "**********    Rewind if you missed the compliments    **********",
            ]}
                speed={20} /> */}
        </div >
    )
}
