import React, { useEffect, useRef, useState } from 'react';
import Layout from './components/Layout';

const App: React.FC = () => {
  const heroBgRef = useRef<HTMLDivElement>(null);
  const heroTextRef = useRef<HTMLDivElement>(null);
  const worksSectionRef = useRef<HTMLElement>(null);
  const parallaxRefs = useRef<(HTMLImageElement | null)[]>([]);

  // Form states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleTransmit = () => {
    alert(`Transmission Protocol Initiated!\nName: ${name}\nEmail: ${email}\nMessage: ${message}`);
  };

  useEffect(() => {
    // 1. Intersection Observer for Scroll Reveals
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.15,
    };

    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          
          // Trigger nested elements
          const clips = entry.target.querySelectorAll('.clip-reveal');
          clips.forEach((clip) => clip.classList.add('is-visible'));
          
          revealObserver.unobserve(entry.target);
        }
      });
    }, observerOptions);

    const revealElements = document.querySelectorAll('.reveal-up, .interface-reveal');
    revealElements.forEach((el) => revealObserver.observe(el));

    // 2. Observer for background theme shift in works section
    const themeObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.2) {
            document.body.classList.add('theme-shift');
          } else {
            document.body.classList.remove('theme-shift');
          }
        });
      },
      { threshold: [0.2, 0.8] }
    );

    if (worksSectionRef.current) {
      themeObserver.observe(worksSectionRef.current);
    }

    // 3. High Performance Scroll Animations (Parallax & Hero Zoom)
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollPos = window.scrollY;
          const vh = window.innerHeight;

          // Hero zoom & text fade
          if (scrollPos < vh) {
            const progress = scrollPos / vh;
            const currentScale = 1.15 - 0.15 * progress;
            const opacity = 1 - progress * 1.5;
            const yOffset = scrollPos * 0.4;

            if (heroBgRef.current) {
              heroBgRef.current.style.transform = `scale(${Math.max(1, currentScale)})`;
            }
            if (heroTextRef.current) {
              heroTextRef.current.style.opacity = `${Math.max(0, opacity)}`;
              heroTextRef.current.style.transform = `translateY(${yOffset}px)`;
            }
          }

          // Gallery Parallax
          parallaxRefs.current.forEach((img) => {
            if (img && img.parentElement) {
              const rect = img.parentElement.getBoundingClientRect();
              if (rect.top < window.innerHeight && rect.bottom > 0) {
                const centerOffset = window.innerHeight / 2 - (rect.top + rect.height / 2);
                const yShift = centerOffset * -0.25;
                img.style.transform = `translateY(${yShift}px)`;
              }
            }
          });

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll);

    // Initial load animations
    const initialClips = document.querySelectorAll('#hero-text .clip-reveal');
    const timer = setTimeout(() => {
      initialClips.forEach((c) => c.classList.add('is-visible'));
    }, 100);

    return () => {
      revealObserver.disconnect();
      themeObserver.disconnect();
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timer);
    };
  }, []);

  return (
    <Layout>
      {/* Hero Section */}
      <header className="relative h-screen w-full flex items-center justify-center">
        <div className="hero-zoom-container z-0">
          <div
            ref={heroBgRef}
            className="bg-cover bg-center w-full h-full opacity-50 grayscale hero-zoom"
            style={{
              backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuAuW4vR-FvRDhJ1xuOlhjHyosL_yvJuKha1trRqlpp6cke4QgkF9UbZ_EFdtebiw1NILe9lm-GRAwNp0Kpsb_OB9LtvFAE4vXxmddU4cSm4jcjWkr4N2dYuueWpDpKq-2U-I80MJnsZTXyzX8D_YWFgFl5oEP6GyEGbCIRNDx6KLYyfx0gsfQnyOeZLRp2xbfpGx9z4_v_cKELpRFJpuqVUo9t5nkBoWVK2QlEgMmTyAhWL2Exvdu2JeEjCaRNnUM0Tb5qra6bEwnAR')`,
            }}
          />
        </div>
        <div
          ref={heroTextRef}
          className="relative z-10 text-center px-margin-mobile md:px-margin-page fade-out"
          id="hero-text"
        >
          <div className="clip-container mb-4">
            <h1 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg text-primary clip-reveal is-visible">
              SYSTEM ARCHITECTURE
            </h1>
          </div>
          <br />
          <div className="clip-container">
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto clip-reveal delay-100 is-visible">
              Art Direction &amp; Interface Design
            </p>
          </div>
        </div>
      </header>

      {/* About Section */}
      <section
        className="py-section-gap px-margin-mobile md:px-margin-page border-b border-ink relative z-10 bg-canvas"
        id="about"
      >
        <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter relative">
          <div className="md:col-span-5 flex flex-col justify-center space-y-12">
            <div className="reveal-up">
              <div className="clip-container mb-4">
                <span className="inline-block border border-ink px-3 py-1 font-label-caps text-label-caps text-primary clip-reveal delay-100">
                  01. PHILOSOPHY
                </span>
              </div>
              <div className="clip-container mb-6 block">
                <h2 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary clip-reveal delay-200">
                  Designing the Invisible
                </h2>
              </div>
              <p className="font-body-md text-body-md text-on-surface-variant reveal-up delay-300">
                The interface is not the art; it is the frame. A meticulous approach to grid structures, negative space, and typographic hierarchy forms the foundation of every digital experience. The goal is silence.
              </p>
            </div>
            <div className="reveal-up">
              <div className="clip-container mb-4">
                <span className="inline-block border border-ink px-3 py-1 font-label-caps text-label-caps text-primary clip-reveal delay-100">
                  02. METHOD
                </span>
              </div>
              <div className="clip-container mb-6 block">
                <h2 className="font-headline-md text-headline-md text-primary clip-reveal delay-200">
                  Rigid Fluidity
                </h2>
              </div>
              <p className="font-body-md text-body-md text-on-surface-variant reveal-up delay-300">
                Constraints breed elegance. By enforcing a strict 12-column grid and a stark color palette, the content is forced to speak clearly. It is a mathematical approach to visual aesthetics.
              </p>
            </div>
          </div>
          <div className="md:col-span-6 md:col-start-7 flex items-center justify-center">
            <div className="relative w-full aspect-square border border-ink p-4 reveal-up overflow-hidden group">
              <div className="curtain-overlay"></div>
              <img
                className="object-cover w-full h-full grayscale group-hover:scale-105 transition-transform duration-1000 ease-in-out"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAE1B9KJOL7IHc18befP8P_va8mHCny8WUw8SMIZKEx106gBmWjm4vB5VCOcd8V-oQvxm2f131qT95WX7oTIrNT0GvnjyFLmzMPYtP37n4Pm7GFRh0lVxm8J8gVZEFbNRBmikJAtB0KZw4aYoUV_6Boru1ThylmqOjjUIaIh3r5tHL1A5BfEjJUfla-arC805RZ0Le9Mzq2ULUXUIueYuBY0dmpI-xUdUfhBy90XSn-d42qOXZIrp2eiSdvaWlLzkmwF0t34aNT4ELC"
                alt="Wireframe grid structure intersecting solid white shape"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Selected Works Section */}
      <section
        ref={worksSectionRef}
        className="py-section-gap px-margin-mobile md:px-margin-page border-b border-ink relative z-10 bg-canvas transition-colors duration-1000"
        id="works"
      >
        <div className="mb-12 reveal-up">
          <div className="clip-container">
            <span className="font-label-caps text-label-caps text-primary clip-reveal">
              SELECTED WORKS
            </span>
          </div>
        </div>
        <div className="flex flex-col gap-24">
          {/* Project 1 */}
          <div className="group cursor-pointer reveal-up">
            <div className="overflow-hidden h-[614px] border border-ink relative">
              <img
                ref={(el) => (parallaxRefs.current[0] = el)}
                className="object-cover w-full h-[140%] absolute top-[-20%] parallax-img grayscale group-hover:grayscale-0"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuANMPbqvgkHh1MnJPeeZ6197Z1QC9O2jxibs6oSxbot1kznis1f8ACef-WDyuvplT_0EzeKyR6-yMgCHh-XRNHNn70mEr1EtZp_LCtOoeFf3IB6x0wgHWOi5JeiNXgahHdt7pTZUemyylcimr53mdIgTrnHw5fDWnHqwGxrWNDYUT2rBICTui9IAcsCHjnW8_IVb-MvMGfcjLLtxH2UfMMypRRz-54wIhadQI5BsS4sGIYwS5JqHqeDcovxT4hlnkPC-wTXVojA-qpY"
                alt="Spatial Typography editorial design layout"
              />
            </div>
            <div className="mt-4 flex justify-between items-end border-b border-ink pb-4">
              <div className="clip-container">
                <h3 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary clip-reveal group-hover:translate-x-2 transition-transform duration-700 ease-in-out">
                  Spatial Typography
                </h3>
              </div>
              <span className="font-label-caps text-label-caps text-on-surface-variant reveal-up delay-100">
                EDITORIAL / 2024
              </span>
            </div>
          </div>

          {/* Project 2 */}
          <div className="group cursor-pointer reveal-up">
            <div className="overflow-hidden h-[614px] border border-ink relative md:w-3/4 md:ml-auto">
              <img
                ref={(el) => (parallaxRefs.current[1] = el)}
                className="object-cover w-full h-[140%] absolute top-[-20%] parallax-img grayscale group-hover:grayscale-0"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCdyIBIg8IjH60WUqf5NGBZT8K98K__PWrM8WpRSGJC27-JVcVdvieWeivvcMbVwA834SsxFeDmFtvyE6wFbZitdQJj_EW9SEQE1TEyJZO2vKHpIsdsUJgqVT6qM-F3aPSel02xY6a99UnrCJ9jEUrwRPwZFd1fPL7QzNWpzTEq7heYG7ndvKwsvjQMi2YCuAIXQozQLlTZUBMJFzQ4Y6vaN5f8XATitHYQrvUfRSJNtatxA0lh62DbUeyTnn1NBVd-btAWCKcIrblq"
                alt="Minimalist mobile interface mockup"
              />
            </div>
            <div className="mt-4 flex justify-between items-end border-b border-ink pb-4 md:w-3/4 md:ml-auto">
              <div className="clip-container">
                <h3 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary clip-reveal group-hover:translate-x-2 transition-transform duration-700 ease-in-out">
                  Archival System
                </h3>
              </div>
              <span className="font-label-caps text-label-caps text-on-surface-variant reveal-up delay-100">
                INTERFACE / 2023
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section
        className="min-h-screen flex items-center justify-center py-section-gap px-margin-mobile md:px-margin-page relative z-10 bg-canvas"
        id="contact"
      >
        <div className="w-full max-w-4xl border border-ink bg-surface-bright p-8 md:p-16 interface-reveal shadow-sm">
          <div className="text-center mb-12">
            <div className="clip-container mb-2">
              <h2 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg text-primary clip-reveal">
                Initiate
              </h2>
            </div>
            <p className="font-label-caps text-label-caps text-on-surface-variant mt-4 reveal-up delay-200">
              COMMUNICATION PROTOCOL
            </p>
          </div>
          <form className="space-y-8 reveal-up delay-300">
            <div className="relative">
              <label className="block font-label-caps text-label-caps text-primary mb-2">
                IDENTIFICATION
              </label>
              <input
                className="w-full bg-transparent border-0 border-b border-ink focus:ring-0 focus:border-signal font-body-md text-body-md text-primary px-0 py-2 placeholder-on-surface-variant transition-colors duration-300"
                placeholder="Enter Name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="relative">
              <label className="block font-label-caps text-label-caps text-primary mb-2">
                ROUTING
              </label>
              <input
                className="w-full bg-transparent border-0 border-b border-ink focus:ring-0 focus:border-signal font-body-md text-body-md text-primary px-0 py-2 placeholder-on-surface-variant transition-colors duration-300"
                placeholder="Enter Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="relative">
              <label className="block font-label-caps text-label-caps text-primary mb-2">
                TRANSMISSION
              </label>
              <textarea
                className="w-full bg-transparent border-0 border-b border-ink focus:ring-0 focus:border-signal font-body-md text-body-md text-primary px-0 py-2 placeholder-on-surface-variant resize-none h-24 transition-colors duration-300"
                placeholder="Enter Message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>
            <div className="pt-8 text-center">
              <button
                className="border border-ink px-8 py-4 font-label-caps text-label-caps text-primary hover:bg-signal hover:text-canvas hover:border-signal transition-colors duration-300 w-full md:w-auto"
                type="button"
                onClick={handleTransmit}
              >
                TRANSMIT DATA
              </button>
            </div>
          </form>
        </div>
      </section>
    </Layout>
  );
};

export default App;
