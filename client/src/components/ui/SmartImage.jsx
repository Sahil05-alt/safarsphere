import { useState } from 'react';
// Responsive lazy image with a graceful fallback when an asset is unavailable.
export default function SmartImage({ src, alt = '', w, h, className = '', imgClass = '', priority = false, sizes = '(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw', style }) {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);
  const srcSet = src?.match(/\.webp$/i)
    ? `${src.replace(/\.webp$/i, '-640.webp')} 640w, ${src.replace(/\.webp$/i, '-1280.webp')} 1280w, ${src} 1600w`
    : undefined;
  return (
    <div className={`relative overflow-hidden bg-s2 ${className}`} style={style}>
      {!failed && src && (
        <img src={src} srcSet={srcSet} sizes={srcSet ? sizes : undefined} alt={alt} width={w} height={h} decoding="async"
          loading={priority ? 'eager' : 'lazy'} fetchPriority={priority ? 'high' : 'auto'}
          onLoad={() => setLoaded(true)} onError={() => setFailed(true)}
          className={`absolute inset-0 h-full w-full object-cover transition-[opacity,transform] duration-700 ${loaded ? 'opacity-100 scale-100' : 'opacity-0 scale-[1.02]'} ${imgClass}`} />
      )}
      {(failed || !src) && (
        <div className="absolute inset-0 grid place-items-center bg-gradient-to-br from-s2 to-s3 text-center text-xs text-mute p-3" role="img" aria-label={alt}>
          <span className="font-deva text-2xl" style={{ color: 'var(--accent)', opacity: .5 }}>सफ़र</span>
        </div>
      )}
    </div>
  );
}
