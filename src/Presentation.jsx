import { useState, useEffect, useRef, useMemo } from 'react';
import './presentation.css';

const Presentation = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [cannonFired, setCannonFired] = useState(false);
  const [ramHit, setRamHit] = useState(false);
  const [animationKey, setAnimationKey] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [curtainsOpen, setCurtainsOpen] = useState(false);
  const [curtainsFullyOpen, setCurtainsFullyOpen] = useState(false);
  const [showFireworks, setShowFireworks] = useState(false);
  const [curtainsClosing, setCurtainsClosing] = useState(false);
  const [showFinale, setShowFinale] = useState(false);
  const audioRef = useRef(null);

  // Handle finish button click
  const handleFinish = () => {
    setCurtainsClosing(true); // Start closing animation immediately
    setTimeout(() => {
      setShowFinale(true);
    }, 8000); // Show finale text after curtains fully close (8s)
  };

  // Open curtains after a short delay and play music
  useEffect(() => {
    const timer = setTimeout(() => {
      setCurtainsOpen(true);
      // Play music when curtains start opening
      if (audioRef.current) {
        audioRef.current.play().catch(e => console.log('Audio play failed:', e));
      }
    }, 500);
    
    // Mark curtains as fully open after animation completes (4s animation + 0.5s delay)
    const fullyOpenTimer = setTimeout(() => {
      setCurtainsFullyOpen(true);
    }, 4500);
    
    return () => {
      clearTimeout(timer);
      clearTimeout(fullyOpenTimer);
    };
  }, []);

  // Stable moon positions - generated once and never change
  const moonData = useMemo(() => 
    [...Array(12)].map(() => ({
      left: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 5 + Math.random() * 5
    })), []
  );

  // Stable fireworks positions
  const fireworksData = useMemo(() => 
    [...Array(12)].map(() => ({
      left: 10 + Math.random() * 80,
      top: 10 + Math.random() * 50,
      delay: Math.random() * 2
    })), []
  );

  // Handle first user interaction to enable audio
  useEffect(() => {
    const handleFirstInteraction = () => {
      if (!hasInteracted) {
        setHasInteracted(true);
        setIsMuted(false);
        if (audioRef.current) {
          audioRef.current.play().catch(e => console.log('Audio play failed:', e));
        }
      }
    };

    document.addEventListener('click', handleFirstInteraction);
    document.addEventListener('keydown', handleFirstInteraction);

    return () => {
      document.removeEventListener('click', handleFirstInteraction);
      document.removeEventListener('keydown', handleFirstInteraction);
    };
  }, [hasInteracted]);

  const slides = [
    {
      title: "React Web Development",
      subtitle: "A Modern Approach to Building Web Applications",
      content: (
        <div className="intro-slide">
          <h3>Topics Covered:</h3>
          <ul>
            <li>Client-Side Technologies</li>
            <li>ES.Next Features</li>
            <li>HTML5</li>
            <li>CSS3</li>
            <li>JavaScript</li>
            <li>Bootstrap</li>
            <li>React.js</li>
          </ul>
        </div>
      )
    },
    {
      title: "Client-Side Technologies",
      subtitle: "Building Interactive Web Applications",
      content: (
        <div className="content-slide">
          <h3>What are Client-Side Technologies?</h3>
          <ul>
            <li><strong>Definition:</strong> Code that runs in the user's browser</li>
            <li><strong>Benefits:</strong>
              <ul>
                <li>Instant user feedback</li>
                <li>Reduced server load</li>
                <li>Better user experience</li>
                <li>Offline capabilities</li>
              </ul>
            </li>
            <li><strong>Key Technologies:</strong> HTML, CSS, JavaScript</li>
            <li><strong>Modern Frameworks:</strong> React, Vue, Angular</li>
          </ul>
        </div>
      )
    },
    {
      title: "HTML5",
      subtitle: "The Structure of Modern Web",
      content: (
        <div className="content-slide">
          <h3>HTML5 Features</h3>
          <div className="two-column">
            <div>
              <h4>Semantic Elements:</h4>
              <ul>
                <li>&lt;header&gt;, &lt;nav&gt;, &lt;main&gt;</li>
                <li>&lt;article&gt;, &lt;section&gt;</li>
                <li>&lt;aside&gt;, &lt;footer&gt;</li>
              </ul>
            </div>
            <div>
              <h4>New Capabilities:</h4>
              <ul>
                <li>Video & Audio elements</li>
                <li>Canvas for graphics</li>
                <li>Local Storage API</li>
                <li>Geolocation</li>
                <li>Form validation</li>
              </ul>
            </div>
          </div>
          <pre className="code-example">
{`<main>
  <article>
    <h1>Article Title</h1>
    <p>Content goes here...</p>
  </article>
</main>`}
          </pre>
        </div>
      )
    },
    {
      title: "CSS3",
      subtitle: "Styling the Modern Web",
      content: (
        <div className="content-slide">
          <h3>CSS3 Features</h3>
          <div className="two-column">
            <div>
              <h4>Visual Effects:</h4>
              <ul>
                <li>Flexbox & Grid Layout</li>
                <li>Transitions & Animations</li>
                <li>Box Shadow & Text Shadow</li>
                <li>Border Radius</li>
                <li>Gradients</li>
              </ul>
            </div>
            <div>
              <h4>Advanced Features:</h4>
              <ul>
                <li>Media Queries (Responsive)</li>
                <li>Custom Properties (Variables)</li>
                <li>Transform & Rotate</li>
                <li>Multiple Backgrounds</li>
              </ul>
            </div>
          </div>
          <pre className="code-example">
{`.card {
  display: flex;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  transition: transform 0.3s ease;
}`}
          </pre>
        </div>
      )
    },
    {
      title: "JavaScript",
      subtitle: "The Language of the Web",
      content: (
        <div className="content-slide">
          <h3>JavaScript Fundamentals</h3>
          <ul>
            <li><strong>Dynamic & Flexible:</strong> Loosely typed language</li>
            <li><strong>Event-Driven:</strong> Responds to user interactions</li>
            <li><strong>Asynchronous:</strong> Promises, async/await</li>
            <li><strong>Object-Oriented:</strong> Prototypes & Classes</li>
            <li><strong>Functional:</strong> First-class functions, closures</li>
          </ul>
          <pre className="code-example">
{`// Modern JavaScript
const fetchData = async () => {
  try {
    const response = await fetch('/api/data');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
  }
};`}
          </pre>
        </div>
      )
    },
    {
      title: "ES.Next",
      subtitle: "Modern JavaScript Features",
      content: (
        <div className="content-slide">
          <h3>Latest JavaScript Features</h3>
          <div className="two-column">
            <div>
              <h4>ES6+ Features:</h4>
              <ul>
                <li>Arrow Functions</li>
                <li>Destructuring</li>
                <li>Spread/Rest Operators</li>
                <li>Template Literals</li>
                <li>Modules (import/export)</li>
                <li>Classes</li>
              </ul>
            </div>
            <div>
              <h4>Recent Additions:</h4>
              <ul>
                <li>Optional Chaining (?.)</li>
                <li>Nullish Coalescing (??)</li>
                <li>Promise.allSettled()</li>
                <li>BigInt</li>
                <li>Top-level await</li>
              </ul>
            </div>
          </div>
          <pre className="code-example">
{`// Arrow functions & destructuring
const { name, age } = user;
const greet = (name) => \`Hello, \${name}!\`;

// Optional chaining
const city = user?.address?.city ?? 'Unknown';`}
          </pre>
        </div>
      )
    },
    {
      title: "Bootstrap",
      subtitle: "CSS Framework for Rapid Development",
      content: (
        <div className="content-slide">
          <h3>Bootstrap Features</h3>
          <ul>
            <li><strong>Responsive Grid System:</strong> 12-column flexible layout</li>
            <li><strong>Pre-built Components:</strong> Buttons, cards, modals, navbar</li>
            <li><strong>Utility Classes:</strong> Spacing, colors, typography</li>
            <li><strong>JavaScript Plugins:</strong> Carousel, tooltips, dropdowns</li>
            <li><strong>Customizable:</strong> SASS variables and themes</li>
          </ul>
          <pre className="code-example">
{`<div class="container">
  <div class="row">
    <div class="col-md-6 col-lg-4">
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">Card Title</h5>
          <p class="card-text">Content here</p>
          <button class="btn btn-primary">Action</button>
        </div>
      </div>
    </div>
  </div>
</div>`}
          </pre>
        </div>
      )
    },
    {
      title: "React.js - Introduction",
      subtitle: "A JavaScript Library for Building UIs",
      content: (
        <div className="content-slide">
          <h3>What is React?</h3>
          <ul>
            <li><strong>Component-Based:</strong> Build encapsulated components</li>
            <li><strong>Declarative:</strong> Design views for each state</li>
            <li><strong>Learn Once, Write Anywhere:</strong> Web, mobile, desktop</li>
            <li><strong>Virtual DOM:</strong> Efficient updates and rendering</li>
            <li><strong>Unidirectional Data Flow:</strong> Predictable state management</li>
          </ul>
          <pre className="code-example">
{`function Welcome({ name }) {
  return <h1>Hello, {name}!</h1>;
}

function App() {
  return (
    <div>
      <Welcome name="World" />
    </div>
  );
}`}
          </pre>
        </div>
      )
    },
    {
      title: "React Components",
      subtitle: "Building Blocks of React Applications",
      content: (
        <div className="content-slide">
          <h3>Types of Components</h3>
          <div className="two-column">
            <div>
              <h4>Functional Components:</h4>
              <ul>
                <li>Modern approach</li>
                <li>Use Hooks for state</li>
                <li>Simpler syntax</li>
                <li>Better performance</li>
              </ul>
            </div>
            <div>
              <h4>Key Concepts:</h4>
              <ul>
                <li>Props (Properties)</li>
                <li>State Management</li>
                <li>Lifecycle with Hooks</li>
                <li>Event Handling</li>
              </ul>
            </div>
          </div>
          <pre className="code-example">
{`import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <button onClick={() => setCount(count + 1)}>
      Clicked {count} times
    </button>
  );
}`}
          </pre>
        </div>
      )
    },
    {
      title: "React Hooks",
      subtitle: "State and Side Effects in Functional Components",
      content: (
        <div className="content-slide">
          <h3>Commonly Used Hooks</h3>
          <ul>
            <li><strong>useState:</strong> Add state to components</li>
            <li><strong>useEffect:</strong> Handle side effects (API calls, subscriptions)</li>
            <li><strong>useContext:</strong> Access context values</li>
            <li><strong>useRef:</strong> Reference DOM elements</li>
            <li><strong>useMemo:</strong> Memoize expensive calculations</li>
            <li><strong>useCallback:</strong> Memoize functions</li>
            <li><strong>Custom Hooks:</strong> Reusable stateful logic</li>
          </ul>
          <pre className="code-example">
{`import { useState, useEffect } from 'react';

function DataFetcher() {
  const [data, setData] = useState(null);
  
  useEffect(() => {
    fetch('/api/data')
      .then(res => res.json())
      .then(setData);
  }, []); // Empty array = run once
  
  return <div>{data?.message}</div>;
}`}
          </pre>
        </div>
      )
    },
    {
      title: "React & Bootstrap",
      subtitle: "Combining React with Bootstrap",
      content: (
        <div className="content-slide">
          <h3>Integration Options</h3>
          <ul>
            <li><strong>React-Bootstrap:</strong> Bootstrap components as React components</li>
            <li><strong>Reactstrap:</strong> Another React wrapper for Bootstrap</li>
            <li><strong>Direct Usage:</strong> Use Bootstrap classes in JSX</li>
          </ul>
          <h4>React-Bootstrap Example:</h4>
          <pre className="code-example">
{`import { Button, Card, Container } from 'react-bootstrap';

function MyComponent() {
  return (
    <Container>
      <Card>
        <Card.Body>
          <Card.Title>React + Bootstrap</Card.Title>
          <Card.Text>Easy to use!</Card.Text>
          <Button variant="primary">Click Me</Button>
        </Card.Body>
      </Card>
    </Container>
  );
}`}
          </pre>
        </div>
      )
    },
    {
      title: "React Development Tools",
      subtitle: "Essential Tools for React Developers",
      content: (
        <div className="content-slide">
          <h3>Development Ecosystem</h3>
          <div className="two-column">
            <div>
              <h4>Build Tools:</h4>
              <ul>
                <li>Vite (Fast & Modern)</li>
                <li>Create React App</li>
                <li>Next.js (Framework)</li>
                <li>Webpack</li>
              </ul>
            </div>
            <div>
              <h4>Developer Tools:</h4>
              <ul>
                <li>React DevTools</li>
                <li>ESLint</li>
                <li>Prettier</li>
                <li>VS Code Extensions</li>
              </ul>
            </div>
          </div>
          <h4>State Management:</h4>
          <ul>
            <li>Context API (Built-in)</li>
            <li>Redux / Redux Toolkit</li>
            <li>Zustand</li>
            <li>Jotai, Recoil</li>
          </ul>
        </div>
      )
    },
    {
      title: "Best Practices",
      subtitle: "Writing Better React Code",
      content: (
        <div className="content-slide">
          <h3>React Best Practices</h3>
          <ul>
            <li><strong>Component Organization:</strong> Keep components small and focused</li>
            <li><strong>Props Validation:</strong> Use PropTypes or TypeScript</li>
            <li><strong>State Management:</strong> Lift state up when needed</li>
            <li><strong>Avoid Prop Drilling:</strong> Use Context or state management</li>
            <li><strong>Code Splitting:</strong> Lazy load components</li>
            <li><strong>Memoization:</strong> Optimize re-renders with memo, useMemo</li>
            <li><strong>Accessibility:</strong> Use semantic HTML and ARIA attributes</li>
            <li><strong>Testing:</strong> Write tests with Jest and React Testing Library</li>
          </ul>
        </div>
      )
    },
    {
      title: "Real-World Project: EscanorHub",
      subtitle: "A Modern Movie Explorer Application",
      content: (
        <div className="content-slide project-showcase">
          <h3>🎬 EscanorHub - Movie Explorer</h3>
          <p className="project-description">
            A responsive React application for discovering and exploring movies using TMDB API
          </p>
          
          <div className="two-column">
            <div>
              <h4>🎯 Key Features:</h4>
              <ul>
                <li>Browse Popular & Top-Rated Movies</li>
                <li>Real-time Search Functionality</li>
                <li>Detailed Movie Information</li>
                <li>Favorites & Watch Later Lists</li>
                <li>Dark/Light Theme Toggle</li>
                <li>Responsive Design (Mobile-First)</li>
              </ul>
            </div>
            <div>
              <h4>💻 Tech Stack:</h4>
              <ul>
                <li>React 19 + Hooks</li>
                <li>Vite (Build Tool)</li>
                <li>React Router 7</li>
                <li>Bootstrap 5 + React-Bootstrap</li>
                <li>Axios (API Calls)</li>
                <li>TMDB API Integration</li>
              </ul>
            </div>
          </div>

          <h4>🚀 React Concepts Applied:</h4>
          <ul>
            <li><strong>Component Architecture:</strong> Reusable MovieCard, Header, and page components</li>
            <li><strong>State Management:</strong> useState for local state, localStorage for persistence</li>
            <li><strong>Side Effects:</strong> useEffect for API calls and data fetching</li>
            <li><strong>Routing:</strong> React Router for navigation between pages</li>
            <li><strong>Modern ES6+:</strong> Arrow functions, destructuring, async/await, modules</li>
          </ul>

          <div className="project-link">
            <a href="https://github.com/IbrahimAlBatrawshy/Moive-using-React-ITI" 
               target="_blank" 
               rel="noopener noreferrer"
               style={{ color: '#667eea', textDecoration: 'none', fontSize: '1.1rem', fontWeight: 'bold' }}>
              🔗 View Project on GitHub →
            </a>
          </div>
        </div>
      )
    },
    {
      title: "Thank You!",
      subtitle: "React Web Development",
      content: (
        <div className="conclusion-slide">
          <h3>Summary</h3>
          <p>We've covered:</p>
          <ul>
            <li>✓ Client-Side Technologies</li>
            <li>✓ HTML5 & CSS3</li>
            <li>✓ JavaScript & ES.Next</li>
            <li>✓ Bootstrap Framework</li>
            <li>✓ React.js Fundamentals</li>
            <li>✓ React Hooks & Components</li>
            <li>✓ Best Practices</li>
            <li>✓ Real-World Project Example</li>
          </ul>
          <div className="footer-message">
            <h2>Start Building with React Today! 🚀</h2>
          </div>
        </div>
      )
    }
  ];

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'ArrowRight') nextSlide();
    if (e.key === 'ArrowLeft') prevSlide();
  };

  // Check if current slide is first or last
  const isFirstOrLastSlide = currentSlide === 0 || currentSlide === slides.length - 1;

  // Fire cannon effect once when entering first or last slide (only after curtains open)
  useEffect(() => {
    if (isFirstOrLastSlide && curtainsFullyOpen) {
      setCannonFired(false);
      setRamHit(false);
      setShowFireworks(false);
      // Small delay then fire
      const fireTimer = setTimeout(() => {
        setCannonFired(true);
        setAnimationKey(prev => prev + 1);
      }, 500);
      // Delay for hit effect (when cannonball reaches Ram.png)
      const hitTimer = setTimeout(() => {
        setRamHit(true);
      }, 1800);
      // Trigger fireworks after hit
      const fireworksTimer = setTimeout(() => {
        setShowFireworks(true);
      }, 2200);
      // Hide fireworks after some time
      const hideFireworksTimer = setTimeout(() => {
        setShowFireworks(false);
      }, 6000);
      return () => {
        clearTimeout(fireTimer);
        clearTimeout(hitTimer);
        clearTimeout(fireworksTimer);
        clearTimeout(hideFireworksTimer);
      };
    } else if (!isFirstOrLastSlide) {
      setCannonFired(false);
      setRamHit(false);
      setShowFireworks(false);
    }
  }, [currentSlide, isFirstOrLastSlide, curtainsFullyOpen]);

  return (
    <div className="presentation" onKeyDown={handleKeyPress} tabIndex={0}>
      {/* Theater Curtains */}
      <div className={`curtain-container ${curtainsOpen ? 'open' : ''} ${curtainsClosing ? 'closing' : ''} ${showFinale ? 'finale' : ''}`}>
        <div className="curtain curtain-left">
          <div className="curtain-fold"></div>
          <div className="curtain-fold"></div>
          <div className="curtain-fold"></div>
          <div className="curtain-fold"></div>
          <div className="curtain-fold"></div>
        </div>
        <div className="curtain curtain-right">
          <div className="curtain-fold"></div>
          <div className="curtain-fold"></div>
          <div className="curtain-fold"></div>
          <div className="curtain-fold"></div>
          <div className="curtain-fold"></div>
        </div>
        {/* Finale Text on Curtains */}
        {showFinale && (
          <div className="finale-content-on-curtains">
            <h1 className="finale-text">رمضان يجمعنا</h1>
            <div className="finale-stars">
              
            </div>
          </div>
        )}
      </div>

      {/* Background Music */}
      <audio ref={audioRef} autoPlay loop muted={isMuted}>
        <source src="/assets/hussin.mpeg" type="audio/mpeg" />
      </audio>

      {/* Falling Crescent Moons Animation */}
      <div className="falling-moons">
        {moonData.map((moon, i) => (
          <div key={i} className="moon" style={{ 
            left: `${moon.left}%`, 
            animationDelay: `${moon.delay}s`,
            animationDuration: `${moon.duration}s`
          }}>
            ☪
          </div>
        ))}
      </div>

      {/* Fireworks Animation */}
      {showFireworks && (
        <div className="fireworks-container">
          {fireworksData.map((fw, i) => (
            <div 
              key={i} 
              className="firework"
              style={{
                left: `${fw.left}%`,
                top: `${fw.top}%`,
                animationDelay: `${fw.delay}s`
              }}
            >
              <div className="firework-explosion">
                {[...Array(12)].map((_, j) => (
                  <span key={j} className="firework-particle" style={{ '--angle': `${j * 30}deg` }}></span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Ramadan Image - Left Side - Appears after shots fired */}
      {(ramHit || !isFirstOrLastSlide) && (
        <div className={`ramadan-container-left ${ramHit ? 'hit appearing' : ''}`} key={`ram-${animationKey}`}>
          <img src="/assets/Ram.png" alt="Ramadan Kareem" className="ramadan-image-left" />
        </div>
      )}

      {/* Ramadan Image 2 - Top Left */}
      <div className="ramadan-container-top-left">
        <img src="/assets/ramda.png" alt="Ramadan" className="ramadan-image-top-left" />
      </div>

      {/* Boom Image - Bottom Left */}
      <div className={`boom-container-main ${isFirstOrLastSlide && cannonFired ? 'firing' : ''}`}>
        <img src="/assets/boom.png" alt="Boom" className="boom-image-main" />
        {/* Custom image projectiles shooting towards Ram.png - only on first/last slide */}
        {isFirstOrLastSlide && cannonFired && (
          <div className="cannonball-container" key={animationKey}>
            {[...Array(3)].map((_, i) => (
              <div key={i} className="image-projectile image-projectile-once" style={{ animationDelay: `${i * 0.3}s` }}>
                <img src="/assets/assw.png" alt="projectile" className="projectile-image" />
                <div className="projectile-trail"></div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="logo-container-outside">
        <img src="/assets/es.png" alt="Logo" className="presentation-logo-outside" />
      </div>
      <div className="social-links">
        <a href="https://github.com/IbrahimAlBatrawshy" target="_blank" rel="noopener noreferrer" className="social-link github">
          <i className="fab fa-github"></i>
        </a>
        <a href="https://www.linkedin.com/in/ibrahimal-batrawshy/?locale=en" target="_blank" rel="noopener noreferrer" className="social-link linkedin">
          <i className="fab fa-linkedin"></i>
        </a>
      </div>
      <div className="slide">
        <div className="slide-header">
          <h1>{slides[currentSlide].title}</h1>
          <h2>{slides[currentSlide].subtitle}</h2>
        </div>
        <div className="slide-content">
          {slides[currentSlide].content}
        </div>
        <div className="slide-footer">
          <div className="slide-number">
            {currentSlide + 1} / {slides.length}
          </div>
        </div>
      </div>

      <div className="controls">
        <button 
          onClick={prevSlide} 
          disabled={currentSlide === 0}
          className="control-btn"
        >
          ← Previous
        </button>
        <button 
          onClick={() => setIsMuted(!isMuted)}
          className="control-btn sound-btn"
          title={isMuted ? 'Unmute' : 'Mute'}
        >
          {isMuted ? '🔇' : '🔊'}
        </button>
        <div className="dots">
          {slides.map((_, index) => (
            <span
              key={index}
              className={`dot ${index === currentSlide ? 'active' : ''}`}
              onClick={() => goToSlide(index)}
            />
          ))}
        </div>
        <button 
          onClick={nextSlide} 
          disabled={currentSlide === slides.length - 1}
          className="control-btn"
        >
          Next →
        </button>
        {currentSlide === slides.length - 1 && (
          <button 
            onClick={handleFinish}
            className="control-btn finish-btn"
          >
            ✨ Finish ✨
          </button>
        )}
      </div>

      <div className="keyboard-hint">
        Use ← → arrow keys to navigate
      </div>
    </div>
  );
};

export default Presentation;
