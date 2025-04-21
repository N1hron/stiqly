export default {
  trailingComma: 'es5',
  tabWidth: 2,
  semi: true,
  singleQuote: true,
  jsxSingleQuote: true,
  arrowParens: 'always',
  endOfLine: 'auto',
  overrides: [
    {
      files: ['*.json', '.*rc'],
      options: {
        trailingComma: 'none',
        singleQuote: false,
        quoteProps: 'preserve',
      },
    },
    {
      files: ['*.config.{js,mjs,cjs,ts,mts,cts}'],
    },
  ],
};
