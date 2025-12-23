/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './App.{js,jsx,ts,tsx}',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        // Cores baseadas na logo "Blog do Saber"
        primary: {
          DEFAULT: '#2E7D32',
          dark: '#1B5E20',
          light: '#66BB6A',
        },
        secondary: {
          DEFAULT: '#FF8F00',
          dark: '#E65100',
          light: '#FFB300',
        },
        accent: {
          DEFAULT: '#1976D2',
          light: '#42A5F5',
        },
        highlight: '#FDD835',
        success: '#4CAF50',
        warning: '#FF9800',
        danger: '#F44336',
        info: '#2196F3',
        background: {
          DEFAULT: '#F5F5F5',
          light: '#FAFAFA',
        },
        surface: '#FFFFFF',
        text: {
          DEFAULT: '#212121',
          secondary: '#757575',
          light: '#9E9E9E',
          'on-primary': '#FFFFFF',
          'on-secondary': '#FFFFFF',
        },
        border: {
          DEFAULT: '#E0E0E0',
          light: '#F5F5F5',
        },
        divider: '#EEEEEE',
      },
      borderRadius: {
        xs: '4px',
        sm: '8px',
        md: '12px',
        lg: '16px',
        xl: '20px',
        '2xl': '24px',
      },
      spacing: {
        xs: '4px',
        sm: '8px',
        md: '16px',
        lg: '24px',
        xl: '32px',
        '2xl': '48px',
        '3xl': '64px',
      },
      fontSize: {
        xs: '11px',
        sm: '13px',
        base: '15px',
        md: '15px',
        lg: '17px',
        xl: '20px',
        '2xl': '24px',
        '3xl': '32px',
        '4xl': '40px',
      },
      fontWeight: {
        light: '300',
        normal: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
        extrabold: '800',
      },
    },
  },
  plugins: [],
};
