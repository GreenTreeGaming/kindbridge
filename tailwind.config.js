/** @type {import('tailwindcss').Config} */
export default {
  theme: {
    colors: {
      primary: {
        DEFAULT: '#2B7A78',  // Deep teal — main brand
        light: '#3AAFA9',
        dark: '#204F4E',
      },
      accent: '#DEF2F1',       // Mint blue-gray
      background: '#FEFFFF',   // Off-white background
      text: {
        primary: '#17252A',    // Charcoal
        secondary: '#52646B',  // Muted gray
      },
      success: '#3BB273',      // Clean green
      warning: '#FFD166',      // Soft amber
      error: '#EF476F',        // Red-pink
      neutral: '#E6EAEA',      // Light gray
      white: '#FFFFFF',
      black: '#000000',
    },
    fontFamily: {
      sans: ['Inter', 'system-ui', 'sans-serif'],
    },
    borderRadius: {
      xl: '1rem',
      '2xl': '1.5rem',
    },
    boxShadow: {
      soft: '0 4px 12px rgba(0, 0, 0, 0.05)',
      card: '0 2px 10px rgba(0, 0, 0, 0.08)',
    },
  },
};