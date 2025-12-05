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
  const [rotation, setRotation] = useState(0)      // current animated rotation (degrees)
  const targetRef = useRef(0)                      // where we want to end up (degrees)
  const animRef = useRef(null)
  const runningRef = useRef(false)
  const rotationRef = useRef(0)
  const wrapperRef = useRef(null)                 // mirror of current rotation for rAF loop

  const total = data.length
  const sliceAngle = 360 / Math.max(1, total)

  // compute selected index based on current (animated) rotation
  const selectedIndex = getSelectedIndex(rotation, total)

  // call onChange when selection changes
  useEffect(() => {
    if (onChange && data[selectedIndex]) onChange(data[selectedIndex])
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedIndex])

  // start/stop animation loop
  function startAnim() {
    if (runningRef.current) return
    runningRef.current = true
    const step = (now) => {
      const current = rotationRef.current
      const target = targetRef.current
      const diff = target - current


      // ease factor (0-1). larger = snappier. adjust for feel.
      const ease = 0.18

      // if very close, snap and stop
      if (Math.abs(diff) < 0.01) {
        rotationRef.current = target
        setRotation(roundDeg(rotationRef.current))
        runningRef.current = false
        animRef.current = null
        return
      }

      // lerp toward target
      rotationRef.current = current + diff * ease
      setRotation(roundDeg(rotationRef.current))

      animRef.current = requestAnimationFrame(step)
    }

    animRef.current = requestAnimationFrame(step)
  }

  function stopAnim() {
    if (animRef.current) {
      cancelAnimationFrame(animRef.current)
      animRef.current = null
    }
    runningRef.current = false
  }

  // helper so numbers are stable for selection math
  function roundDeg(v) {
    return Math.round(v * 1000) / 1000
  }

  // wheel listener (real DOM) - one tick => one slice
  useEffect(() => {
    const el = wrapperRef.current
    if (!el) return

    const onWheel = (e) => {
      e.preventDefault()
      const delta = e.deltaY > 0 ? -sliceAngle : sliceAngle
      targetRef.current += delta

      if (!runningRef.current) {
        rotationRef.current = rotationRef.current ?? rotation
        startAnim()
      }
    }

    el.addEventListener('wheel', onWheel, { passive: false })

    return () => {
      el.removeEventListener('wheel', onWheel)
      stopAnim()
    }
  }, [sliceAngle])


  // make sure rotationRef mirrors rotation on mount/changes outside rAF
  useEffect(() => {
    rotationRef.current = rotation
  }, [rotation])

  // selection function you already have, unchanged (centered selection)
  function getSelectedIndex(rotationValue, totalCount) {
    if (totalCount <= 0) return 0
    const slice = 360 / totalCount
    const half = slice / 2

    // Normalize angle to 0–360
    let angle = (rotationValue % 360 + 360) % 360

    // Reverse because you rotate anticlockwise with negative delta
    angle = (360 - angle) % 360

    // Shift so LEFT is the reference point (left = 270 CSS, we're aligning)
    angle = (angle + 270) % 360

    for (let i = 0; i < totalCount; i++) {
      const center = i * slice
      let diff = Math.abs(angle - center)
      diff = Math.min(diff, 360 - diff) // wrap-around safe
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

      {/* rotation is controlled by JS animation; remove CSS transition from .dial */}
      <div className={styles.dial} style={{ transform: `rotate(${rotation}deg)` }}>
        {data.map((person, i) => {
          const angle = i * sliceAngle
          const radius = size / 2 - ringWidth / 2
          const pos = polarToXY(angle, radius)
          const isActive = i === selectedIndex

          return (
            <div
              key={person.id}
              className={`${styles.item} ${isActive ? styles.active : ''}`}
              style={{
                left: pos.x,
                top: pos.y,
                color: isActive ? activeColor : '#fff',
                transform: `translate(-50%, -50%) rotate(${-rotation}deg)`
              }}
            >
              <div className={styles.name}>{person.name}</div>
              <div className={styles.role}>{person.role}</div>
            </div>
          )
        })}
      </div>

      <div className={styles.selectorLine} />
    </div>
  )
}
