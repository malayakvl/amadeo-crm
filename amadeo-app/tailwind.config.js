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
            xs: [
                '12px',
                {
                    lineHeight: '17px',
                    letterSpacing: '0.004em'
                }
            ],
            sm: [
                '14px',
                {
                    lineHeight: '23px',
                    letterSpacing: '0.004em'
                }
            ],
            tiny: '.875rem',
            base: [
                '16px',
                {
                    lineHeight: '21px',
                    letterSpacing: '0.004em'
                }
            ],
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
                blue: {
                    350: '#99ABCE'
                },
                gray: {
                    150: '#ECEFF1',
                    180: '#CFD8DC',
                    250: '#FAFAFA',
                    350: '#4F5B84',
                    450: '#90A4AE'
                },
                green: {
                    250: '#00C868'
                }
            }
        }
    },
    variants: {
        extend: {}
    },
    plugins: []
};
