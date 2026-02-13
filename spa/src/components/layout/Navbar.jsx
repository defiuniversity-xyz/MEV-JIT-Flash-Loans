import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Zap, Menu, X } from 'lucide-react';
import { SECTIONS } from '../../data/constants';

export default function Navbar({ visitedSections, onSectionVisible }) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState('hero');
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = totalHeight > 0 ? window.scrollY / totalHeight : 0;
      setScrollProgress(progress);

      const sections = SECTIONS.map((s) => ({
        id: s.id,
        el: document.getElementById(s.id),
      })).filter((s) => s.el);

      for (let i = sections.length - 1; i >= 0; i--) {
        const rect = sections[i].el.getBoundingClientRect();
        if (rect.top <= 120) {
          setActiveSection(sections[i].id);
          onSectionVisible(sections[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [onSectionVisible]);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setMobileOpen(false);
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass" aria-label="Main navigation">
      <div className="absolute bottom-0 left-0 h-[2px] bg-defi-blue transition-all duration-150"
        style={{ width: `${scrollProgress * 100}%` }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-14">
          <div className="flex items-center gap-3">
            <button onClick={() => scrollTo('hero')} className="flex items-center gap-2 text-white font-bold text-lg">
              <Zap className="w-5 h-5 text-defi-blue" />
              <span className="hidden sm:inline">DeFi Academy</span>
            </button>
            {visitedSections.size > 1 && (
              <span className="hidden sm:inline-flex items-center gap-1 text-[10px] text-defi-muted bg-defi-dark px-2 py-1 rounded-full border border-defi-border">
                <span className="text-defi-blue font-bold">{visitedSections.size}</span>
                <span>/ {SECTIONS.length}</span>
              </span>
            )}
          </div>

          <div className="hidden lg:flex items-center gap-1">
            {SECTIONS.slice(1).map((section) => {
              const visited = visitedSections.has(section.id);
              return (
                <button
                  key={section.id}
                  onClick={() => scrollTo(section.id)}
                  className={`relative px-2.5 py-1.5 rounded-md text-xs font-medium transition-colors ${
                    activeSection === section.id
                      ? 'text-defi-blue bg-defi-blue/10'
                      : visited
                        ? 'text-defi-text/70 hover:text-defi-text hover:bg-white/5'
                        : 'text-defi-muted hover:text-defi-text hover:bg-white/5'
                  }`}
                >
                  {section.label}
                  {visited && activeSection !== section.id && (
                    <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-full bg-defi-green" />
                  )}
                </button>
              );
            })}
          </div>

          <button
            className="lg:hidden text-defi-muted hover:text-white p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:hidden glass border-t border-defi-border"
        >
          <div className="px-4 py-3 grid grid-cols-2 gap-1">
            {SECTIONS.map((section) => (
              <button
                key={section.id}
                onClick={() => scrollTo(section.id)}
                className={`px-3 py-2 rounded-md text-sm text-left ${
                  activeSection === section.id
                    ? 'text-defi-blue bg-defi-blue/10'
                    : 'text-defi-muted hover:text-white'
                }`}
              >
                {section.label}
              </button>
            ))}
          </div>
        </motion.div>
      )}
    </nav>
  );
}
