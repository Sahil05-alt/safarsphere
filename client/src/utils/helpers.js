import { site } from '../data/siteConfig';
export const waLink = (text = '') => `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}`;
export const debounce = (fn, ms = 150) => { let t; return (...a) => { clearTimeout(t); t = setTimeout(() => fn(...a), ms); }; };
export const lsGet = (k, d) => { try { return JSON.parse(localStorage.getItem(k)) ?? d; } catch { return d; } };
export const lsSet = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch { /* storage unavailable */ } };
export const lonLatToVec3 = (lon, lat, r = 1) => {
  const phi = (90 - lat) * (Math.PI / 180), theta = (lon + 180) * (Math.PI / 180);
  return [-r * Math.sin(phi) * Math.cos(theta), r * Math.cos(phi), r * Math.sin(phi) * Math.sin(theta)];
};
