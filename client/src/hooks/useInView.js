import { useEffect, useRef, useState } from 'react';
// Returns [ref, inView]. Used to mount/unmount canvases and play videos only when visible.
export default function useInView(options = { rootMargin: '200px' }) {
  const ref = useRef(null); const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), options);
    io.observe(el); return () => io.disconnect();
  }, []); // eslint-disable-line
  return [ref, inView];
}
