export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: { extend: {
    colors: { bg: '#080808', s1: '#101010', s2: '#191919', s3: '#242424', line: '#343434', mute: '#B8B8B8', ink: '#F2F2F2', accent: 'var(--accent)' },
    fontFamily: { display: ['"Playfair Display"', 'serif'], body: ['Inter', 'sans-serif'], deva: ['"Noto Serif Devanagari"', 'serif'] },
  } },
  plugins: [],
};
