export type ThemeType = typeof theme;

const theme = {
  color: {
    main: '#D80416',
    fg: '#333',
    fg2: '#666',
    bg: '#FFF',
    bg2: '#f0f0f0',
  },

  boxShadow: '1px 1px 15px #ccc',
  boxShadowThin: '0px 0px 8px lightgrey',
  borderRadius: '5px',
  transitionAll: 'all ease-out 200ms',

  mixins: {
    transition: (transitionProperties: string) => `
      transition-property: ${transitionProperties};
      transition-duration: 200ms;
      transition-timing-function: ease-out;
    `,
  },
};

export default theme;
