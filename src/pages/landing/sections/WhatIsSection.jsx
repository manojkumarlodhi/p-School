import { useState, useEffect, useRef, useCallback } from 'react';
import iphoneImg from '../../../assets/images/iPhone.png';
import './whatissection.css';

/* Concentric circles — used on all cards */
function Circles() {
  return (
    <div className="wis__card-circles">
      <div className="wis__circle wis__circle--1" />
      <div className="wis__circle wis__circle--2" />
      <div className="wis__circle wis__circle--3" />
      <div className="wis__circle wis__circle--4" />
    </div>
  );
}

const CARDS = [
  {
    id: 'left',
    variant: 'left',
    title: 'Learn by Doing',
    desc: 'Not just watching videos. Practice-driven learning with real coding, electronics, and robotics projects.',
    phonePos: 'top',   // phone overflows from top, text at bottom
  },
  {
    id: 'center',
    variant: 'center',
    title: 'No Physical Labs Required',
    desc: 'Full STEM labs in your pocket. Design circuits, write code, and build robots—all virtually.',
    phonePos: 'bottom', // text at top, phone overflows from bottom
  },
  {
    id: 'right',
    variant: 'right',
    title: 'Real-World Skills',
    desc: 'Develop practical abilities that matter in tech, engineering, and innovation careers.',
    phonePos: 'top',   // phone overflows from top, text at bottom
  },
];

const AUTO_PLAY_INTERVAL = 3000; // 3 s

export default function WhatIsSection() {
  const [active, setActive] = useState(0);
  const [animDir, setAnimDir] = useState('next'); // 'next' | 'prev'
  const [animating, setAnimating] = useState(false);
  const timerRef = useRef(null);
  const total = CARDS.length;

  const goTo = useCallback(
    (index, dir = 'next') => {
      if (animating) return;
      setAnimDir(dir);
      setAnimating(true);
      setTimeout(() => {
        setActive(index);
        setAnimating(false);
      }, 400); // matches CSS transition
    },
    [animating]
  );

  const next = useCallback(() => {
    goTo((active + 1) % total, 'next');
  }, [active, total, goTo]);

  const prev = useCallback(() => {
    goTo((active - 1 + total) % total, 'prev');
  }, [active, total, goTo]);

  /* Auto-play */
  const resetTimer = useCallback(() => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(next, AUTO_PLAY_INTERVAL);
  }, [next]);

  useEffect(() => {
    resetTimer();
    return () => clearInterval(timerRef.current);
  }, [resetTimer]);

  const handleDotClick = (i) => {
    const dir = i > active ? 'next' : 'prev';
    goTo(i, dir);
    resetTimer();
  };

  const handlePrev = () => { prev(); resetTimer(); };
  const handleNext = () => { next(); resetTimer(); };

  const card = CARDS[active];

  return (
    <section id="features" className="wis">
      <div className="wis__inner">

        {/* Heading */}
        <div className="wis__hd">
          <h2 className="wis__h2">What is P-SCHOOL?</h2>
          <p className="wis__sub">
            A mobile-first STEM learning platform designed for practical,
            real-world skill development
          </p>
        </div>

        {/* ── Desktop: 3-column grid (unchanged) ── */}
        <div className="wis__cards wis__cards--desktop">
          <div className="wis__card wis__card--left">
            <Circles />
            <div className="wis__card-phone"><img src={iphoneImg} alt="PSchool App" /></div>
            <div className="wis__card-body">
              <h3>Learn by Doing</h3>
              <p>Not just watching videos. Practice-driven learning with real coding, electronics, and robotics projects.</p>
            </div>
          </div>

          <div className="wis__card wis__card--center">
            <Circles />
            <div className="wis__card-body">
              <h3>No Physical Labs Required</h3>
              <p>Full STEM labs in your pocket. Design circuits, write code, and build robots—all virtually.</p>
            </div>
            <div className="wis__card-phone"><img src={iphoneImg} alt="PSchool App" /></div>
          </div>

          <div className="wis__card wis__card--right">
            <Circles />
            <div className="wis__card-phone"><img src={iphoneImg} alt="PSchool App" /></div>
            <div className="wis__card-body">
              <h3>Real-World Skills</h3>
              <p>Develop practical abilities that matter in tech, engineering, and innovation careers.</p>
            </div>
          </div>
        </div>

        {/* ── Mobile: single-card carousel ── */}
        <div className="wis__carousel">
          {/* Prev arrow */}
          <button
            className="wis__carousel-arrow wis__carousel-arrow--prev"
            onClick={handlePrev}
            aria-label="Previous"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          {/* Card viewport */}
          <div className="wis__carousel-viewport">
            <div
              key={card.id}
              className={`wis__card wis__card--${card.variant} wis__carousel-card wis__carousel-card--${animDir} ${animating ? 'wis__carousel-card--exit' : 'wis__carousel-card--enter'}`}
            >
              <Circles />
              {card.phonePos === 'top' ? (
                <>
                  <div className="wis__card-phone"><img src={iphoneImg} alt="PSchool App" /></div>
                  <div className="wis__card-body">
                    <h3>{card.title}</h3>
                    <p>{card.desc}</p>
                  </div>
                </>
              ) : (
                <>
                  <div className="wis__card-body">
                    <h3>{card.title}</h3>
                    <p>{card.desc}</p>
                  </div>
                  <div className="wis__card-phone"><img src={iphoneImg} alt="PSchool App" /></div>
                </>
              )}
            </div>
          </div>

          {/* Next arrow */}
          <button
            className="wis__carousel-arrow wis__carousel-arrow--next"
            onClick={handleNext}
            aria-label="Next"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>

          {/* Dots */}
          <div className="wis__carousel-dots">
            {CARDS.map((c, i) => (
              <button
                key={c.id}
                className={`wis__dot${i === active ? ' wis__dot--active' : ''}`}
                onClick={() => handleDotClick(i)}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
