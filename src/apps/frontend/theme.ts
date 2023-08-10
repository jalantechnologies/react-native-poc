export const primitives = {};

export const breakpoints = {
  small: 577,
  medium: 769,
  large: 1201,
};

const ResponsiveTheme = Object.keys(breakpoints).reduce(
  (acc, key) => {
    acc.mediaQuery[
      key
    ] = `@media screen and (min-width: ${breakpoints[key]}px)`;
    return acc;
  },
  {
    breakpoints,
    mediaQuery: {},
  },
);

export const customOverrides = {
  breakpoints: ResponsiveTheme.breakpoints,
  mediaQuery: ResponsiveTheme.mediaQuery,
};
