// tailwind.config.ts
import type { Config } from 'tailwindcss'

const config: Config = {
    content: [
        './index.html',
        './src/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        extend: {
            colors: {
                'dark': {
                    '900': '#0F172A',
                    '800': '#1E293B',
                    '700': '#334155',
                },
                'primary': {
                    '500': '#0EA5E9',
                    '600': '#0284c7',
                    '700': '#0369a1',
                },
            },
        },
    },
    plugins: [
        require('tailwindcss-textshadow')({
            textShadowColor: 'var(--tw-text-shadow-color)',
        }),
        require('@tailwindcss/line-clamp'),
    ],
}

export default config;