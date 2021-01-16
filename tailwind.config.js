const { tailwindExtractor } = require('tailwindcss/lib/lib/purgeUnusedStyles');
const colors = require('tailwindcss/colors');

module.exports = {
	// darkMode: "media",
	purge: {
		content: [
			'./src/**/*.html',
			'./src/**/*.svelte',
		],
		options: {
			defaultExtractor: (content) => [
				// This is an internal Tailwind function that we're not supposed to be allowed to use
				// So if this stops working, please open an issue at
				// https://github.com/babichjacob/sapper-postcss-template/issues
				// rather than bothering Tailwind Labs about it
				...tailwindExtractor(content),
				// Match Svelte class: directives (https://github.com/tailwindlabs/tailwindcss/discussions/1731)
				...[...content.matchAll(/(?:class:)*([\w\d-/:%.]+)/gm)].map(([_match, group, ..._rest]) => group),
			],
			keyframes: false,
		},
	},
	theme: {
		extend: {
			boxShadow: {
				'3xl': '0 35px 60px -15px rgba(0, 0, 0, 0.4)',
			},
			colors: {
				blue: {
					1000: '#1f1e52',
				},
				brown: {
					50: '#f9f8f3',
					100: '#f1efe5',
					200: '#ded9c3',
					300: '#d3c9b0',
					400: '#b7a683',
				},
			},
			rotate: {
				'-33': '-33deg',
				33: '33deg',
				'-23': '-23deg',
				23: '23deg',
			},
			transitionProperty: {
				rotate: 'rotate',
			},
		},
		borderWidth: {
			DEFAULT: '3px',
			0: '0',
			1: '1px',
			2: '2px',
			4: '4px',
			6: '6px',
			8: '8px',
		},
		colors: {
			transparent: 'transparent',
			current: 'currentColor',
			black: colors.black,
			white: colors.white,
			gray: colors.warmGray,
			green: colors.lime,
			blue: colors.indigo,
		},
		container: {
			screens: {
				sm: '100%',
				md: '100%',
				lg: '1024px',
				xl: '1380px',
			},
		},
		fontFamily: {
			usual: 'usual, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
		},
	},
	variants: {
		extend: {},
	},
	plugins: [],
};
