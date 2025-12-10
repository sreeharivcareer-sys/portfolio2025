import { useEffect, useState } from "react";

export default function CircularScore({
    value = 75,
    max = 100,
    color = "#FE5710",
    trackColor = "#2d393d",
    duration = 1000,
    animate = false,
    eduObj
}) {
    const [responsiveSize, setResponsiveSize] = useState(160);
    const [responsiveStroke, setResponsiveStroke] = useState(12);

    useEffect(() => {
        function handleResize() {
            const screenWidth = window.innerWidth;

            const radius = screenWidth * 0.18;        // radius = 25% of screen width
            const size = radius * 2;                  // convert to diameter

            const stroke = screenWidth * 0.02;        // stroke = 2% of width

            setResponsiveSize(size);
            setResponsiveStroke(stroke);
        }

        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const radius = (responsiveSize - responsiveStroke) / 2;
    const circumference = 2 * Math.PI * radius;
    const [offset, setOffset] = useState(circumference);

    useEffect(() => {
        if (animate) {
            const progress = circumference - (value / max) * circumference;
            requestAnimationFrame(() => setOffset(progress));
        } else {
            setOffset(circumference);
        }
    }, [animate, value, max, circumference]);

    const displayText =
        eduObj.scoreType === "CGPA"
            ? `CGPA: ${value}`
            : `${value}%`;

    return (
        <svg width={responsiveSize} height={responsiveSize}>
            <circle
                cx={responsiveSize / 2}
                cy={responsiveSize / 2}
                r={radius}
                stroke={trackColor}
                strokeWidth={responsiveStroke}
                fill="none"
                transform={`rotate(-90 ${responsiveSize / 2} ${responsiveSize / 2})`}
            />

            <circle
                cx={responsiveSize / 2}
                cy={responsiveSize / 2}
                r={radius}
                stroke={color}
                strokeWidth={responsiveStroke}
                fill="none"
                strokeDasharray={circumference}
                strokeDashoffset={offset}
                strokeLinecap="round"
                transform={`rotate(-90 ${responsiveSize / 2} ${responsiveSize / 2})`}
                style={{ transition: `stroke-dashoffset ${duration}ms ease` }}
            />

            <text
                x="50%"
                y="50%"
                dominantBaseline="middle"
                textAnchor="middle"
                fontSize={"1.5rem"}
                fontWeight="bold"
                fill="#fff"
            >
                {displayText}
            </text>
        </svg>
    );
}
