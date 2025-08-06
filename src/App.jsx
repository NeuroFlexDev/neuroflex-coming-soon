import React, { useEffect, useRef, useState } from 'react'
import { FaVk, FaTelegramPlane } from 'react-icons/fa'

export default function App() {
  const subtitles = [
    "Собираем фронт...",
    "Так...",
    "Пока в процессе...",
    "Ещё немного..."
  ]
  const [current, setCurrent] = useState(0)
  const titleRef = useRef(null)
  const loaderRef = useRef(null)
  const subtitleRef = useRef(null)
  const socialRefs = useRef([])

  // Смена фраз
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent(i => (i + 1) % subtitles.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  // Рандомные глитчи
  useEffect(() => {
    const minDelay = 2000, maxDelay = 8000
    const minDur   = 100,  maxDur   = 400

    function scheduleGlitch(el) {
      if (!el) return
      const delay = Math.random() * (maxDelay - minDelay) + minDelay
      setTimeout(() => {
        el.classList.add('glitch-active')
        const dur = Math.random() * (maxDur - minDur) + minDur
        setTimeout(() => {
          el.classList.remove('glitch-active')
          scheduleGlitch(el)
        }, dur)
      }, delay)
    }

    scheduleGlitch(titleRef.current)
    scheduleGlitch(loaderRef.current)
    scheduleGlitch(subtitleRef.current)
    socialRefs.current.forEach(el => scheduleGlitch(el))
  }, [])

  return (
    <div className="container">
      <h1
        ref={titleRef}
        className="title"
        data-text="NeuroFlex"
      >
        NeuroFlex
      </h1>

      <p
        ref={subtitleRef}
        className="subtitle"
        data-text={subtitles[current]}
      >
        {subtitles[current]}
      </p>

      <div ref={loaderRef} className="loader">
        <div className="rings">
          <div className="ring ring-1"></div>
          <div className="ring ring-2"></div>
        </div>
        <div className="bars">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="bar"></div>
          ))}
        </div>
      </div>

      <div className="socials">
        <a
          href="https://vk.com/neuroflex"
          className="social-link"
          ref={el => (socialRefs.current[0] = el)}
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaVk className="social-icon" />
        </a>
        <a
          href="https://t.me/neuroflex_tg"
          className="social-link"
          ref={el => (socialRefs.current[1] = el)}
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaTelegramPlane className="social-icon" />
        </a>
      </div>
    </div>
  )
}
