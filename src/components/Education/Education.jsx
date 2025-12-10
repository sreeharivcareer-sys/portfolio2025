import React, { useState } from 'react';
import styles from './Education.module.scss';
import CircularScore from './CircularScore/CircularScore';
import eduData from '../../data/eduData';

export const Education = ({ animate }) => {
    const eduList = [
        {
            id: "graduation",
            name: "Bachelor of Technology"
        },
        {
            id: "higherSecondary",
            name: "Higher Secondary Examination"
        },
        {
            id: "school",
            name: "Secondary School Leaving Examination"
        },

    ];
    const [selectedEdu, setSelectedEdu] = useState({ ...eduList[0], ...eduData['graduation'] })


    return (
        <div className={styles.educationContainer}>
            <div className={styles.eduHeader}>Education</div>
            <div className={styles.eduWrapper}>
                <div className={styles.eduLeft}>
                    {eduList.map((edu) => (
                        <div
                            className={`${styles.eduItem} ${selectedEdu?.id === edu.id ? styles.activeEdu : ""}`}
                            key={`${edu.id}-item`}
                            onMouseEnter={() => setSelectedEdu({ id: edu.id, ...eduData[edu.id], ...edu })}>
                            {edu.name}
                        </div>
                    ))}
                </div>
                <div className={styles.eduCenter}>
                    <CircularScore
                        value={selectedEdu.score}
                        max={selectedEdu.scoreType === "CGPA" ? 10 : 100}
                        color="#FE5710"
                        animate={animate}
                        trackColor="#2d393d"
                        strokeWidth={15}
                        eduObj={selectedEdu}

                    />

                </div>

                <div className={styles.eduRight}>
                    <div className={styles.eduDegree}>{selectedEdu.degree || selectedEdu.exam}</div>
                    <div className={styles.eduLevel}>{selectedEdu.level}</div>
                    <div className={styles.eduInst}>{selectedEdu.institution}</div>

                </div>
                <div className={styles.eduListSmall}>
                    {eduList.map((edu) => (
                        <div
                            className={`${styles.eduItem} ${selectedEdu?.id === edu.id ? styles.activeEdu : ""}`}
                            key={`${edu.id}-item`}
                            onMouseEnter={() => setSelectedEdu({ id: edu.id, ...eduData[edu.id], ...edu })}>
                            {edu.name}
                        </div>
                    ))}
                </div>
            </div>
        </div >
    )
}
