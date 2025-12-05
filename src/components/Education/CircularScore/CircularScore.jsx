import { useEffect, useState } from "react";

export default function CircularScore({
    value = 75,
    max = 100,
    size = 160,
    strokeWidth = 12,
    color = "#FE5710",
    trackColor = "#2d393d",
    duration = 1000,
    animate = false,
    eduObj
}) {
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const [offset, setOffset] = useState(circumference);

    useEffect(() => { console.log('scoreType in CircularScore: ', eduObj.scoreType) }, [eduObj]);

    useEffect(() => {
        if (animate) {
            const progress =
                circumference - (value / max) * circumference;

            requestAnimationFrame(() => setOffset(progress));
        } else {
            // Reset when out of view
            setOffset(circumference);
        }
    }, [animate, value, max, circumference]);

    const displayText =
        eduObj.scoreType === "CGPA"
            ? `CGPA: ${value}`
            : `${value}%`;

    return (
        <svg width={size} height={size}>
            {/* Background ring */}
            <circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                stroke={trackColor}
                strokeWidth={strokeWidth}
                fill="none"
                transform={`rotate(-90 ${size / 2} ${size / 2})`}
            />

            {/* Foreground progress */}
            <circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                stroke={color}
                strokeWidth={strokeWidth}
                fill="none"
                strokeDasharray={circumference}
                strokeDashoffset={offset}
                strokeLinecap="round"
                transform={`rotate(-90 ${size / 2} ${size / 2})`}
                style={{
                    transition: `stroke-dashoffset ${duration}ms ease`
                }}
            />

            {/* Value text */}
            <text
                x="50%"
                y="50%"
                dominantBaseline="middle"
                textAnchor="middle"
                fontSize={42}
                fontWeight="bold"
                fill="#2d393d"
            >

                {displayText}
            </text>
        </svg >
    );
}
