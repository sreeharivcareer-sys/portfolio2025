import { useRef, useState, useEffect } from 'react'
import styles from './RotaryDial.module.scss'

export default function RotaryDial({
  data = [],
  activeColor = '#111',
  inactiveColor = '#2d393d',
  ringWidth = 100, // This is the maximum ring width
  size = 300, // This is the overall maximum dial diameter
  onChange
}) {
  const [rotation, setRotation] = useState(0)
  const [dialSize, setDialSize] = useState(size)
  const [dialRingWidth, setDialRingWidth] = useState(ringWidth)
  
  const rotationRef = useRef(0)
  const targetRef = useRef(0)
  const animRef = useRef(null)
  const runningRef = useRef(false)
  const wrapperRef = useRef(null)
  const snapTimeout = useRef(null)

  // drag state
  const dragging = useRef(false)
  const lastRawAngle = useRef(0)
  const accumulatedAngle = useRef(0)

  const total = data.length
  const sliceAngle = 360 / Math.max(1, total)

  // ----- Selection Logic (Unchanged for brevity) -----
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

  const selectedIndex = getSelectedIndex(rotation, total)

  useEffect(() => {
    if (onChange && data[selectedIndex]) {
      onChange(data[selectedIndex])
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedIndex, data])

  useEffect(() => {
    rotationRef.current = rotation
  }, [rotation])

  // ----- RESPONSIVENESS LOGIC (Size & Ring Width with new breakpoints) -----
  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth
      let newSize;
      
      // 1. Dynamic Dial Size (Updated Logic)
      if (screenWidth > 1400) {
        // Above 1000px: Use max size prop
        newSize = size;
      } else if (screenWidth > 700) {
        // Between 600px and 1000px: 40% of screen width, capped by max 'size'
        newSize = Math.min(size, screenWidth * 0.40);
      } else {
        // Below 600px: 80% of screen width, capped by max 'size'
        newSize = Math.min(size, screenWidth * 0.80);
      }
      
      setDialSize(newSize)

      // 2. Dynamic Ring Width (Make it thinner on small screens)
      // Recalculates proportional width based on newSize
      const minRingWidth = 20; 
      const proportionalWidth = (newSize / size) * ringWidth; 
      const newRingWidth = Math.max(minRingWidth, Math.min(ringWidth, proportionalWidth));
      
      setDialRingWidth(newRingWidth);
    }

    handleResize() // Set initial size
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [size, ringWidth])
  
  // ----- Animation Engine (Unchanged for brevity) -----
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

  // ----- Wheel Behaviour (Unchanged for brevity) -----
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
      clearTimeout(snapTimeout.current)
      stopAnim()
    }
  }, [sliceAngle])

  // ----- Drag Utility Functions (Unchanged for brevity) -----
  function getCenter() {
    const rect = wrapperRef.current.getBoundingClientRect()
    return { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 }
  }

  function angleFromPoint(clientX, clientY) {
    const { x: cx, y: cy } = getCenter()
    return Math.atan2(clientY - cy, clientX - cx) * (180 / Math.PI)
  }

  function unwrapAngle(newA, oldA) {
    let diff = newA - oldA
    if (diff > 180) diff -= 360
    if (diff < -180) diff += 360
    return diff
  }

  // ----- Drag Handlers (Unchanged for brevity) -----
  const startDrag = (x, y) => {
    stopAnim()
    dragging.current = true
    lastRawAngle.current = angleFromPoint(x, y)
    accumulatedAngle.current = targetRef.current
  }

  const moveDrag = (x, y) => {
    if (!dragging.current) return
    const a = angleFromPoint(x, y)
    const diff = unwrapAngle(a, lastRawAngle.current)
    lastRawAngle.current = a

    accumulatedAngle.current += diff
    targetRef.current = accumulatedAngle.current
    setRotation(accumulatedAngle.current)
  }

  const endDrag = () => {
    if (!dragging.current) return
    dragging.current = false
    const snapped = Math.round(targetRef.current / sliceAngle) * sliceAngle
    targetRef.current = snapped 
    startAnim()
  }

  // ----- Mouse Drag useEffect Hook (Unchanged for brevity) -----
  useEffect(() => {
    const el = wrapperRef.current
    if (!el) return

    const onDown = e => {
      e.preventDefault()
      startDrag(e.clientX, e.clientY)
    }
    const onMove = e => {
      if (!dragging.current) return
      e.preventDefault()
      moveDrag(e.clientX, e.clientY)
    }
    const onUp = e => {
      if (!dragging.current) return
      e.preventDefault()
      endDrag()
    }

    el.addEventListener('mousedown', onDown)
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseup', onUp)

    return () => {
      el.removeEventListener('mousedown', onDown)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseup', onUp)
    }
  }, [sliceAngle])

  // ----- Touch Drag useEffect Hook (Unchanged for brevity) -----
  useEffect(() => {
    const el = wrapperRef.current
    if (!el) return

    const opts = { passive: false }

    const tStart = e => {
      e.preventDefault()
      const t = e.touches[0]
      startDrag(t.clientX, t.clientY)
    }

    const tMove = e => {
      e.preventDefault()
      if (!dragging.current) return
      const t = e.touches[0]
      moveDrag(t.clientX, t.clientY)
    }

    const tEnd = e => {
      e.preventDefault()
      endDrag()
    }

    el.addEventListener('touchstart', tStart, opts)
    el.addEventListener('touchmove', tMove, opts)
    el.addEventListener('touchend', tEnd, opts)
    el.addEventListener('touchcancel', tEnd, opts)

    return () => {
      el.removeEventListener('touchstart', tStart, opts)
      el.removeEventListener('touchmove', tMove, opts)
      el.removeEventListener('touchend', tEnd, opts)
      el.removeEventListener('touchcancel', tEnd, opts)
    }
  }, [sliceAngle])

  // ----- Rendering Utility -----
  function polarToXY(angleDeg, radius) {
    const rad = (angleDeg - 90) * Math.PI / 180
    return {
      x: dialSize / 2 + radius * Math.cos(rad),
      y: dialSize / 2 + radius * Math.sin(rad)
    }
  }

  // ----- Render -----
  const radius = dialSize / 2 - dialRingWidth / 2
  
  return (
    <div
      ref={wrapperRef}
      className={styles.wrapper}
      style={{ 
        width: dialSize, 
        height: dialSize, 
        touchAction: 'none', 
        userSelect: 'none',
        // Add centering styles if the wrapper is smaller than its container
        // Note: The wrapper is centered by its parent container's CSS 
        // if using typical layouts (e.g., flex/grid on the parent).
        // These styles ensure it fills its defined space and keeps content centered.
      }}
    >
      <div
        className={styles.ring}
        style={{
          borderWidth: dialRingWidth, 
          borderColor: inactiveColor
        }}
      />

      <div 
        className={styles.centerLabel} 
        style={{ 
          color: activeColor,
          padding: `${dialRingWidth * 0.15}px` 
        }}
      >
        <div className={styles.dragScroll}>Drag / Scroll</div>
        <div className={styles.selectTag}>to select</div>
      </div>

      <div className={styles.dial} style={{ transform: `rotate(${rotation}deg)` }}>
        {data.map((item, i) => {
          const angle = i * sliceAngle
          const pos = polarToXY(angle, radius)
          const active = i === selectedIndex

          return (
            <div
              key={item.id ?? i}
              className={`${styles.item} ${active ? styles.active : ''}`}
              style={{
                left: pos.x,
                top: pos.y,
                color: active ? activeColor : '#fff',
                transform: `translate(-50%, -50%) rotate(${-rotation}deg)`
              }}
            >
              <div className={styles.name}>{item.name}</div>
              {item.role && <div className={styles.role}>{item.role}</div>}
            </div>
          )
        })}
      </div>

      <div className={styles.selectorLine} style={{ background: activeColor }} />
    </div>
  )
}