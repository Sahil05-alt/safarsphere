import { motion, useReducedMotion } from 'framer-motion';
// Scroll-reveal with optional stagger via `i`. Transform/opacity only.
export default function Reveal({ children, i = 0, y = 28, className = '', as = 'div' }) {
  const reduce = useReducedMotion(); const M = motion[as];
  return (
    <M className={className} initial={reduce ? false : { opacity: 0, y }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }} transition={{ duration: .7, delay: i * 0.08, ease: [.22, 1, .36, 1] }}>
      {children}
    </M>
  );
}
