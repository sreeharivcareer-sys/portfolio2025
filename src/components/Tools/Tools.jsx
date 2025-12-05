import React, { useState, useEffect } from 'react';
import styles from './Tools.module.scss';
import toolsData from '../../data/tools';

export const Tools = () => {

    const tools = [
        { id: "VSCode", name: "VS Code" },
        { id: "XD", name: "Adobe XD" },
        { id: "Illustrator", name: "Illustrator" },
        { id: "Inkscape", name: "Inkscape" },
        { id: "Photoshop", name: "Photoshop" },
        { id: "Blender", name: "Blender" },
        { id: "Figma", name: "Figma" },
        { id: "Jira", name: "Jira" },
        { id: "GitHub", name: "GitHub" }
    ];

    const [selectedTool, setSelectedTool] = useState({ id: "VSCode", name: "VS Code" })



    return (
        <div className={styles.toolsContainer}>
            <div className={styles.toolsHeader}>Gear</div>
            <div className={styles.toolsWraper}>
                <div className={styles.toolsLeft}>
                    <div className={styles.toolsGrid}>
                        {tools.map(tool => (
                            <div className={styles.tile} key={`${tool.id}-name`} onMouseEnter={() => setSelectedTool(tool)}>
                                <img className={styles.toolsIcon} src={`/assets/icons/${tool.id}.png`} />
                                <div className={styles.toolsText}>{tool.name}</div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className={styles.toolsRight}>
                    <div className={styles.mainToolWrapper}>
                        <div
                            key={`${selectedTool.id}-icon}`}
                            className={`${styles.selectedIcon} ${selectedTool ? styles.show : ''}`}
                        >
                            <img src={`/assets/icons/${selectedTool.id}.png`} alt="" />
                        </div>


                        <div
                            key={selectedTool?.id + '-name'}
                            className={`${styles.selectedToolName} ${selectedTool ? styles.nameSlide : ''}`}
                        >
                            {selectedTool?.name}
                        </div>


                    </div>
                    <div
                        key={selectedTool?.id + '-use'}
                        className={`${styles.toolUse} ${selectedTool ? styles.useSlideIn : ''}`}
                    >
                        {toolsData[selectedTool.id]?.use}
                    </div>
                    <div
                        key={selectedTool?.id + '-exp'}
                        className={`${styles.toolExp} ${selectedTool ? styles.expSlide : ''}`}
                    >
                        {toolsData[selectedTool.id]?.experience}
                    </div>
                </div>
            </div>
        </div >
    )
}
