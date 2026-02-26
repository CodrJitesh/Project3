/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#2b6cee',
        'background-dark': '#0f1115',
        'surface-dark': '#181b21',
        'border-dark': '#232730',
        dark: {
          bg: '#0f1115',
          surface: '#181b21',
          elevated: '#1f2329',
          border: '#232730',
          text: '#e4e7ec',
          muted: '#8b92a7'
        },
        light: {
          bg: '#f8fafc',
          surface: '#ffffff',
          elevated: '#f1f5f9',
          border: '#e2e8f0',
          text: '#0f172a',
          muted: '#64748b'
        },
        accent: {
          primary: '#2b6cee',
          secondary: '#8b5cf6',
          success: '#10b981',
          warning: '#f59e0b',
          danger: '#ef4444'
        }
      },
      backgroundImage: {
        'bokeh-mesh': "radial-gradient(circle at 15% 50%, rgba(43, 108, 238, 0.08) 0%, transparent 25%), radial-gradient(circle at 85% 30%, rgba(16, 185, 129, 0.05) 0%, transparent 25%), radial-gradient(circle at 50% 80%, rgba(245, 158, 11, 0.05) 0%, transparent 30%)",
      },
      animation: {
        'slide-in': 'slideIn 0.3s ease-out',
        'fade-in': 'fadeIn 0.2s ease-out',
        'scale-in': 'scaleIn 0.2s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite'
      },
      keyframes: {
        slideIn: {
          '0%': { transform: 'translateX(100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' }
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' }
        }
      }
    },
  },
  plugins: [],
}
