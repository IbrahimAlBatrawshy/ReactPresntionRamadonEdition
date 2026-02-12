import { useState, useEffect } from 'react';
import './ramadan-ending.css';

const RamadanEnding = ({ isActive, onClose }) => {
  const [phase, setPhase] = useState(0);
  const [showCannon, setShowCannon] = useState(false);
  const [fired, setFired] = useState(false);
  const [showText, setShowText] = useState(false);
  const [showParticles, setShowParticles] = useState(false);

  useEffect(() => {
    if (isActive) {
      // Reset states
      setPhase(0);
      setShowCannon(false);
      setFired(false);
      setShowText(false);
      setShowParticles(false);

      // Animation sequence
      const timeline = [
        { delay: 500, action: () => setShowCannon(true) },
        { delay: 2000, action: () => setFired(true) },
        { delay: 2300, action: () => setShowParticles(true) },
        { delay: 2500, action: () => setShowText(true) },
        { delay: 3000, action: () => setPhase(1) },
      ];

      const timeouts = timeline.map(({ delay, action }) => 
        setTimeout(action, delay)
      );

      return () => timeouts.forEach(clearTimeout);
    }
  }, [isActive]);

  if (!isActive) return null;

  // Generate particles
  const particles = [...Array(50)].map((_, i) => ({
    id: i,
    left: 45 + (Math.random() - 0.5) * 30,
    delay: Math.random() * 0.5,
    duration: 1 + Math.random() * 2,
    size: 3 + Math.random() * 8,
    angle: Math.random() * 360,
  }));

  // Generate stars
  const stars = [...Array(100)].map((_, i) => ({
    id: i,
    left: Math.random() * 100,
    top: Math.random() * 60,
    size: 1 + Math.random() * 3,
    delay: Math.random() * 3,
  }));

  // Generate lanterns
  const lanterns = [...Array(8)].map((_, i) => ({
    id: i,
    left: 5 + i * 12 + Math.random() * 5,
    top: 10 + Math.random() * 20,
    delay: Math.random() * 2,
    scale: 0.6 + Math.random() * 0.4,
  }));

  return (
    <div className="ramadan-ending-overlay">
      {/* Sound Effects */}
      <audio autoPlay>
        <source src="/assets/cannon-sound.mp3" type="audio/mpeg" />
      </audio>

      {/* Night Sky Background */}
      <div className="night-sky">
        {stars.map(star => (
          <div
            key={star.id}
            className="star"
            style={{
              left: `${star.left}%`,
              top: `${star.top}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              animationDelay: `${star.delay}s`,
            }}
          />
        ))}
      </div>

      {/* Crescent Moon */}
      <div className={`crescent-moon ${phase >= 0 ? 'visible' : ''}`}>
        <div className="moon-glow"></div>
        <div className="moon-shape">☪</div>
      </div>

      {/* Islamic Patterns */}
      <div className="islamic-patterns">
        <div className="pattern-left"></div>
        <div className="pattern-right"></div>
        <div className="pattern-bottom"></div>
      </div>

      {/* Floating Lanterns */}
      <div className="lanterns-container">
        {lanterns.map(lantern => (
          <div
            key={lantern.id}
            className="lantern"
            style={{
              left: `${lantern.left}%`,
              top: `${lantern.top}%`,
              animationDelay: `${lantern.delay}s`,
              transform: `scale(${lantern.scale})`,
            }}
          >
            <div className="lantern-top"></div>
            <div className="lantern-body">
              <div className="lantern-light"></div>
              <div className="lantern-pattern"></div>
            </div>
            <div className="lantern-bottom"></div>
          </div>
        ))}
      </div>

      {/* Cannon */}
      <div className={`cannon-container ${showCannon ? 'visible' : ''}`}>
        <div className={`cannon ${fired ? 'fired' : ''}`}>
          <div className="cannon-base"></div>
          <div className="cannon-wheel left"></div>
          <div className="cannon-wheel right"></div>
          <div className="cannon-barrel">
            <div className="cannon-opening"></div>
          </div>
          {fired && <div className="cannon-smoke"></div>}
          {fired && <div className="cannon-flash"></div>}
        </div>
      </div>

      {/* Boom Image - Bottom Left */}
      <div className={`boom-container ${fired ? 'visible' : ''}`}>
        <img src="/assets/boom.png" alt="Boom" className="boom-image" />
        {/* Cannonballs shooting towards Ram.png */}
        {fired && (
          <div className="finale-cannonball-container">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="finale-cannonball" style={{ animationDelay: `${i * 1.5}s` }}>
                <div className="finale-cannonball-trail"></div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Ram.png Target - Top Right */}
      <div className={`finale-ram-container ${fired ? 'hit' : ''}`}>
        <img src="/assets/Ram.png" alt="Ramadan Target" className="finale-ram-image" />
      </div>

      {/* Sparkle Particles */}
      {showParticles && (
        <div className="particles-container">
          {particles.map(particle => (
            <div
              key={particle.id}
              className="particle"
              style={{
                left: `${particle.left}%`,
                '--angle': `${particle.angle}deg`,
                animationDelay: `${particle.delay}s`,
                animationDuration: `${particle.duration}s`,
                width: `${particle.size}px`,
                height: `${particle.size}px`,
              }}
            />
          ))}
        </div>
      )}

      {/* Main Text - Ramadan in Arabic Calligraphy */}
      <div className={`ramadan-text-container ${showText ? 'visible' : ''}`}>
        <div className="ramadan-arabic">رمضان</div>
        <div className="ramadan-subtitle">كريم</div>
        <div className="ramadan-english">Ramadan Kareem</div>
        <div className="text-glow"></div>
      </div>

      {/* Decorative Elements */}
      <div className="decorative-border top"></div>
      <div className="decorative-border bottom"></div>

      {/* Close Button */}
      <button className="ending-close-btn" onClick={onClose}>
        ✕
      </button>

      {/* Credits/Message */}
      <div className={`ending-message ${phase >= 1 ? 'visible' : ''}`}>
        <p>May this blessed month bring peace and joy to all</p>
      </div>
    </div>
  );
};

export default RamadanEnding;
