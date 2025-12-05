import { useRef, useState, useEffect } from 'react'
import styles from './RotaryDial.module.scss'

export default function RotaryDial({
  data = [],
  activeColor = '#111',
  inactiveColor = '#2d393d',
  ringWidth = 100,
  size = 400,
  onChange
}) {
  const [rotation, setRotation] = useState(0)
  const rotationRef = useRef(0)
  const targetRef = useRef(0)
  const animRef = useRef(null)
  const runningRef = useRef(false)
  const wrapperRef = useRef(null)
  const snapTimeout = useRef(null)

  const total = data.length
  const sliceAngle = 360 / Math.max(1, total)

  const selectedIndex = getSelectedIndex(rotation, total)

  useEffect(() => {
    if (onChange && data[selectedIndex]) {
      onChange(data[selectedIndex])
    }
  }, [selectedIndex, data, onChange])

  function startAnim() {
    if (runningRef.current) return
    runningRef.current = true

    const step = () => {
      const current = rotationRef.current
      const target = targetRef.current
      const diff = target - current

      const ease = 0.1

      if (Math.abs(diff) < 0.01) {
        rotationRef.current = target
        setRotation(target)
        runningRef.current = false
        animRef.current = null
        return
      }

      rotationRef.current = current + diff * ease
      setRotation(rotationRef.current)
      animRef.current = requestAnimationFrame(step)
    }

    animRef.current = requestAnimationFrame(step)
  }

  function stopAnim() {
    if (animRef.current) cancelAnimationFrame(animRef.current)
    animRef.current = null
    runningRef.current = false
  }

  useEffect(() => {
    const el = wrapperRef.current
    if (!el) return

    const onWheel = e => {
      e.preventDefault()

      const sensitivity = 0.4
      const delta = -e.deltaY * sensitivity
      targetRef.current += delta

      if (!runningRef.current) startAnim()

      clearTimeout(snapTimeout.current)
      snapTimeout.current = setTimeout(() => {
        const snapped =
          Math.round(targetRef.current / sliceAngle) * sliceAngle
        targetRef.current = snapped
        if (!runningRef.current) startAnim()
      }, 150)
    }

    el.addEventListener('wheel', onWheel, { passive: false })

    return () => {
      el.removeEventListener('wheel', onWheel)
      stopAnim()
    }
  }, [sliceAngle])

  useEffect(() => {
    rotationRef.current = rotation
  }, [rotation])

  function getSelectedIndex(rot, count) {
    if (count <= 0) return 0
    const slice = 360 / count
    const half = slice / 2

    let angle = ((rot % 360) + 360) % 360
    angle = (360 - angle) % 360
    angle = (angle + 270) % 360

    for (let i = 0; i < count; i++) {
      const center = i * slice
      let diff = Math.abs(angle - center)
      diff = Math.min(diff, 360 - diff)
      if (diff < half) return i
    }

    return 0
  }

  function polarToXY(angleDeg, radius) {
    const rad = (angleDeg - 90) * Math.PI / 180
    return {
      x: size / 2 + radius * Math.cos(rad),
      y: size / 2 + radius * Math.sin(rad)
    }
  }

  return (
    <div
      ref={wrapperRef}
      className={styles.wrapper}
      style={{ width: size, height: size }}
    >
      <div
        className={styles.ring}
        style={{
          borderWidth: ringWidth,
          borderColor: inactiveColor
        }}
      />

      <div className={styles.centerLabel}>
        <span>Scroll</span>
        <small>to select</small>
      </div>

      <div className={styles.dial} style={{ transform: `rotate(${rotation}deg)` }}>
        {data.map((item, i) => {
          const angle = i * sliceAngle
          const radius = size / 2 - ringWidth / 2
          const pos = polarToXY(angle, radius)
          const active = i === selectedIndex

          return (
            <div
              key={item.id}
              className={`${styles.item} ${active ? styles.active : ''}`}
              style={{
                left: pos.x,
                top: pos.y,
                color: active ? activeColor : '#fff',
                transform: `translate(-50%, -50%) rotate(${-rotation}deg)`
              }}
            >
              <div className={styles.name}>{item.name}</div>
              <div className={styles.role}>{item.role}</div>
            </div>
          )
        })}
      </div>

      <div className={styles.selectorLine} />
    </div>
  )
}
