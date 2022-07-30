const DEFAULT_LIGHT_COLOR = 'rgb(245 245 245)';
const DEFAULT_DARK_COLOR = 'rgb(33 33 33)';

export const light = {
  theme: '#d35400',
  primary: DEFAULT_LIGHT_COLOR,
  secondary: 'rgb(224 224 224)',
  fontColor: DEFAULT_DARK_COLOR,
  light: DEFAULT_LIGHT_COLOR,
  dark: DEFAULT_DARK_COLOR,
  defaultBackground: 'rgba(245 245 245 / 80%)',
  bodyBackground: 'rgb(250 250 250)',
};

export const dark = {
  ...light,
  primary: DEFAULT_DARK_COLOR,
  secondary: 'rgb(40 40 40)',
  fontColor: DEFAULT_LIGHT_COLOR,
  defaultBackground: 'rgba(33 33 33 / 80%)',
  bodyBackground: 'rgb(38 50 56)',
};
