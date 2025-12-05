import { useEffect, useState } from "react";
import styles from './CircularSkill.module.scss';

const END = { r: 254, g: 32, b: 16 }; // rgba(254, 32, 16, 1)
const START   = {r: 244, g: 248,  b: 0}; // rgba(244, 248, 0, 1)

const interpolate = (s, e, t) => {
  const r = Math.round(s.r + (e.r - s.r) * t);
  const g = Math.round(s.g + (e.g - s.g) * t);
  const b = Math.round(s.b + (e.b - s.b) * t);
  return `rgb(${r}, ${g}, ${b})`;
};

export default function CircularSkill({ name, level, active }) {
  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const [offset, setOffset] = useState(circumference);

  const color = interpolate(START, END, level / 100);

  useEffect(() => {
    const progress = circumference - (level / 100) * circumference;
    setOffset(active ? progress : circumference);
  }, [active, level]);

  return (
    <div className={styles.skillWrapper}>
    <div style={{ width: 200, textAlign: "center" }}>
      <svg width="120" height="120">

        {/* track */}
        <circle
          cx="60"
          cy="60"
          r={radius}
          stroke="#e5e5e5"
          strokeWidth="8"
          fill="none"
        />

        {/* progress ring */}
        <circle
          cx="60"
          cy="60"
          r={radius}
          stroke={color}
          strokeWidth="8"
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          style={{
            transition: "stroke-dashoffset 1.3s ease",
            transform: "rotate(-90deg)",
            transformOrigin: "50% 50%"
          }}
        />

        {/* label */}
        <text
          x="50%"
          y="50%"
          dominantBaseline="middle"
          textAnchor="middle"
          fontSize="15"
          fontWeight="700"
          fill="#111"
        >
          {level}%
        </text>

      </svg>

      <div style={{ marginTop: 6 , fontSize: 20}}>{name}</div>
    </div>
    </div>
  );
}
