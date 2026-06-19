module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        stoic: {
          dark: '#0B0F19',
          card: '#151D30',
          accent: '#3B82F6',
          success: '#10B981',
          warning: '#F59E0B',
          danger: '#EF4444',
          text: '#F3F4F6'
        }
      }
    },
  },
  plugins: [],
}
