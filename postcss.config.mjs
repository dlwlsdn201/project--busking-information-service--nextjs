const config = {
  plugins: {
    '@tailwindcss/postcss': {},
    'postcss-preset-mantine': {
      themeVariables: [
        '--mantine-breakpoint-xs',
        '--mantine-breakpoint-sm',
        '--mantine-breakpoint-md',
        '--mantine-breakpoint-lg',
        '--mantine-breakpoint-xl',
      ],
    },
    'postcss-simple-vars': {
      variables: {
        // Ref. src/app/config/COnfigProviders.tsx
        'mantine-breakpoint-xs': `320px`,
        'mantine-breakpoint-sm': `768px`,
        'mantine-breakpoint-md': `1024px`,
        'mantine-breakpoint-lg': `1440px`,
        'mantine-breakpoint-xl': `1920px`,
      },
    },
  },
};
export default config;
