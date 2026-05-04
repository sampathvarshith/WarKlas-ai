/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                srh: {
                    primary: '#FF3B00',
                    secondary: '#E63600',
                    accent: '#FF7A00',
                    bg: '#0B0B0B',
                    surface: '#1A1A1A',
                    text: '#FFFFFF',
                    textMuted: '#CCCCCC',
                }
            },
            fontFamily: {
                'inter': ['Inter', 'sans-serif'],
            },
            typography: {
                DEFAULT: {
                    css: {
                        color: '#CCCCCC', // srh textMuted
                        a: {
                            color: '#FF7A00', // srh accent
                            '&:hover': {
                                color: '#FF3B00', // srh primary
                            },
                        },
                        strong: {
                            color: '#FFFFFF',
                        },
                        'ul > li::marker': {
                            color: '#FF7A00', // srh accent
                        },
                        h1: { color: '#FFFFFF' },
                        h2: { color: '#FFFFFF' },
                        h3: { color: '#FFFFFF' },
                        h4: { color: '#FFFFFF' },
                        code: {
                            color: '#FFFFFF',
                            backgroundColor: 'rgba(255,255,255,0.1)',
                            padding: '2px 4px',
                            borderRadius: '4px',
                            fontWeight: '400',
                        },
                        'code::before': {
                            content: '""',
                        },
                        'code::after': {
                            content: '""',
                        },
                    },
                },
            },
            keyframes: {
                shimmer: {
                    '100%': { transform: 'translateX(200%)' },
                }
            },
            animation: {
                shimmer: 'shimmer 2s infinite',
            },
        },
    },
    plugins: [
        require('@tailwindcss/typography'),
    ],
}
