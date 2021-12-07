const { blue } = require('tailwindcss/colors');

require('tailwindcss/colors');

module.exports = {
    mode: 'jit',
    purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
    darkMode: 'class', // or 'media' or 'class'
    theme: {
        fontFamily: {
            montserrat: ['Montserrat'],
            sans: ['"Montserrat"']
        },
        fontSize: {
            xs: '.75rem',
            sm: [
                '14px',
                {
                    lineHeight: '21px',
                    letterSpacing: '0.004em'
                }
            ],
            tiny: '.875rem',
            base: '.875rem',
            lg: '1.125rem',
            xl: '1.25rem',
            '2xl': '1.5rem',
            '3xl': '1.875rem',
            '4xl': '2.25rem',
            '5xl': '3rem',
            '6xl': '4rem',
            '7xl': '5rem',
            '8xl': '5rem'
        },
        extend: {
            colors: {
                red: {
                    450: '#CA4573',
                    550: '#CA4573'
                },
                yellow: {
                    450: '#EFBB58'
                },
                blue: {
                    dark: '#141A3C',
                    medium: '#435B8C',
                    light: '#99ABCE'
                }
            }
        }
    },
    variants: {
        extend: {}
    },
    plugins: []
};
