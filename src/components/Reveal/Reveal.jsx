import { m, useReducedMotion } from 'motion/react';

/** Subtle fade-up on scroll (design.md: ≈16px, 0.4s). Plain element when reduced motion is on. */
export default function Reveal({ as = 'div', delay = 0, className, children, ...rest }) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    const Tag = as;
    return (
      <Tag className={className} {...rest}>
        {children}
      </Tag>
    );
  }

  const MotionTag = m[as];
  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.4, ease: 'easeOut', delay }}
      {...rest}
    >
      {children}
    </MotionTag>
  );
}
