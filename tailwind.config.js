module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/widgets/**/*.{js,ts,jsx,tsx}',
    './src/features/**/*.{js,ts,jsx,tsx}',
    './src/entities/**/*.{js,ts,jsx,tsx}',
    './src/shared/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      // 커스텀 컬러(청량한 파스텔 톤)를 추가하거나 Tailwind 프리셋 사용
      colors: {
        pastelBlue: '#a8dadc',
        pastelGreen: '#d1fae5',
        pastelPink: '#ffdce0',
        // etc...
      },
    },
  },
  plugins: [],
};
