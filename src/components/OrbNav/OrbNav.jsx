import { useCallback, useId, useRef, useState } from 'react';
import { NavLink } from 'react-router';
import { AnimatePresence, m, useReducedMotion } from 'motion/react';
import site from '../../content/site.json';
import { getSiteLink } from '../../utils/links';
import { orbCurveOffset } from '../../utils/orbCurve';
import useDismissableMenu from '../../hooks/useDismissableMenu';
import SmartLink from '../SmartLink/SmartLink';
import './OrbNav.css';

const { nav } = site;
const STAGGER = 0.04;

const pillVariants = {
  hidden: ({ offset }) => ({ opacity: 0, x: offset + 32, scale: 0.85 }),
  visible: ({ offset, index, reduce }) => ({
    opacity: 1,
    x: offset,
    scale: 1,
    transition: reduce ? { duration: 0 } : { type: 'spring', stiffness: 420, damping: 30, delay: index * STAGGER },
  }),
  exit: ({ offset, index, count, reduce }) => ({
    opacity: 0,
    x: offset + 32,
    scale: 0.85,
    transition: reduce ? { duration: 0 } : { duration: 0.15, delay: (count - 1 - index) * 0.02 },
  }),
};

function PillContent({ item }) {
  return (
    <>
      <span className="orb-nav__number">{item.number}</span>
      <span>{item.label}</span>
    </>
  );
}

export default function OrbNav() {
  const [isOpen, setIsOpen] = useState(false);
  const navRef = useRef(null);
  const buttonRef = useRef(null);
  const listId = useId();
  const reduce = useReducedMotion();

  const close = useCallback(({ restoreFocus } = {}) => {
    setIsOpen(false);
    if (restoreFocus) buttonRef.current?.focus();
  }, []);

  useDismissableMenu(navRef, isOpen, close);

  const count = nav.items.length;

  return (
    <nav ref={navRef} className="orb-nav" aria-label={nav.ariaLabel}>
      <button
        ref={buttonRef}
        type="button"
        className={`orb-nav__button${isOpen ? ' is-open' : ''}`}
        aria-expanded={isOpen}
        aria-controls={isOpen ? listId : undefined}
        aria-label={isOpen ? nav.closeLabel : nav.openLabel}
        onClick={() => setIsOpen((open) => !open)}
      >
        <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true" focusable="false">
          {isOpen ? (
            <path d="M6 6l12 12M18 6 6 18" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" fill="none" />
          ) : (
            <g fill="currentColor">
              <circle cx="6" cy="12" r="2" />
              <circle cx="12" cy="12" r="2" />
              <circle cx="18" cy="12" r="2" />
            </g>
          )}
        </svg>
      </button>

      <AnimatePresence>
        {isOpen && (
          <m.ul key="menu" id={listId} className="orb-nav__list" role="list" exit={{ transition: { duration: 0.25 } }}>
            {nav.items.map((item, index) => {
              const custom = { offset: orbCurveOffset(index, count), index, count, reduce };
              return (
                <m.li key={item.label} custom={custom} variants={pillVariants} initial="hidden" animate="visible" exit="exit">
                  {item.to ? (
                    <NavLink
                      to={item.to}
                      end={item.to === '/'}
                      className={({ isActive }) => `orb-nav__pill${isActive ? ' is-active' : ''}`}
                      onClick={() => close()}
                    >
                      <PillContent item={item} />
                    </NavLink>
                  ) : (
                    <SmartLink href={getSiteLink(item.linkKey).href} className="orb-nav__pill" onClick={() => close()}>
                      <PillContent item={item} />
                    </SmartLink>
                  )}
                </m.li>
              );
            })}
          </m.ul>
        )}
      </AnimatePresence>
    </nav>
  );
}
