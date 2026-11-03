import { useEffect, useEffectEvent } from 'react';

const FOCUSABLE = 'a[href], button:not([disabled])';

/**
 * While `isOpen`: closes on Escape (restoring focus) or on a pointer press
 * outside `containerRef`, and keeps Tab / Shift+Tab focus inside it.
 */
export default function useDismissableMenu(containerRef, isOpen, onClose) {
  const close = useEffectEvent(onClose);

  useEffect(() => {
    if (!isOpen) return undefined;
    const container = containerRef.current;

    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        close({ restoreFocus: true });
        return;
      }
      if (event.key !== 'Tab') return;

      const focusable = [...container.querySelectorAll(FOCUSABLE)];
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement;

      if (!container.contains(active)) {
        event.preventDefault();
        first.focus();
      } else if (event.shiftKey && active === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    }

    function handlePointerDown(event) {
      if (!container.contains(event.target)) close({ restoreFocus: false });
    }

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('pointerdown', handlePointerDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('pointerdown', handlePointerDown);
    };
  }, [containerRef, isOpen]);
}
