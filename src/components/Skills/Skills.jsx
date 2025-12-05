import CircularSkill from "./skillChart/CircularSkill";
import React, { useState, useEffect } from 'react'
import styles from './Skills.module.scss';
import { useOnScreen } from "../../hooks/useOnScreen";
import skillData from "../../data/skills";


export default function Skills() {



    const [ref, visible] = useOnScreen({ threshold: 0.3 });
    const [selectedSkill, setSelectedSkill] = useState({ id: "HTML5", name: "HTML 5", level: 90 });
    const [skillDetails, setSkillDetails] = useState({});
    useEffect(() => {
        setSkillDetails(skillData[selectedSkill.id])
        console.log('selectedSkill:', selectedSkill)
        console.log('selectedSkillData:', skillData[selectedSkill.id])

    }, [selectedSkill]);


    // New manual order: frontend-first (frameworks, languages, backend, tooling)
    const skills = [
        { id: "React", name: "React", level: 85 },
        { id: "JavaScript", name: "JavaScript", level: 80 },
        { id: "TypeScript", name: "TypeScript", level: 75 },
        { id: "NextJs", name: "NextJs", level: 80 },
        { id: "Redux", name: "Redux", level: 70 },
        { id: "NodeJs", name: "Node JS", level: 70 },
        { id: "ReactNative", name: "React Native", level: 70 },
        { id: "HTML5", name: "HTML 5", level: 90 },
        { id: "SCSS", name: "SCSS", level: 85 },
        { id: "Tailwind", name: "Tailwind", level: 60 },
        { id: "GraphQL", name: "GraphQL", level: 60 },
        { id: "OpenAi", name: "Open Ai Integration", level: 60 }
    ];


    //     HTML       90
    // CSS/SCSS   85
    // React      85
    // JS         80
    // TypeScript 75
    // Redux      70
    // GraphQL    65
    // Tailwind   60
    // OpenAI     60


    const Tools = [
        { name: "Adobe Photoshop", level: 70 },
        { name: "Adobe Illustrator", level: 80 },
        { name: "Adobe Xd", level: 80 },
        { name: "Adobe Premiere Pro", level: 65 },
        { name: "Inkscape", level: 90 },
        { name: "Blender", level: 60 }
    ]

    return (
        <section ref={ref} className={styles.skillContainer}>
            <div className={styles.skillsHeader}>Technical Proficiency</div>
            <div className={styles.skillWrapper}>
                <div className={styles.skillLeft}>
                    <div className={styles.skillsGrid}>
                        {skills.map(skill => (
                            <div
                                key={skill.name}
                                onMouseEnter={() => { setSelectedSkill(skill) }}>
                                <CircularSkill
                                    {...skill}
                                    active={visible}
                                    showSkill={(name) => { setSelectedSkill(name); console.log('selectedSKill : ', name) }}
                                />
                            </div>
                        ))}
                    </div>
                </div>
                <div className={styles.skillRight}>
                    <div className={styles.skillHeaderWrapper}>
                        <div className={styles.skillHeader}>
                            <span
                                key={selectedSkill.name}
                                className={styles.skillText}
                            >
                                {selectedSkill.name}
                            </span>
                        </div>
                        <div className={styles.skillLogo}>
                            <span
                                key={`${selectedSkill.name}-logo`}
                                className={styles.skillLogoImg}
                            >
                                <img src={`/assets/icons/${selectedSkill.id}.png`} alt="flag" style={{ height: '38px' }} />
                            </span>
                        </div>
                    </div>
                    <div className={styles.skillUseWrapper}>
                        <span
                            key={`${selectedSkill.name}-desc`}
                            className={styles.skillDescUse}
                        >
                            {skillDetails.use}
                        </span>
                    </div>

                    <div className={styles.skillExpWrapper}>
                        <span
                            key={`${selectedSkill.name}-desc`}
                            className={styles.skillDescExp}
                        >
                            {skillDetails.experience}
                        </span>
                    </div>
                </div>
            </div>
        </section>
    );
}
