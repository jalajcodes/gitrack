import { theme as chakraTheme } from '@chakra-ui/theme';

const theme = {
  ...chakraTheme,
  fonts: {
    ...chakraTheme.fonts,
    body: `Ubuntu,-apple-system,BlinkMacSystemFont,"Seoge UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Seoge UI Emoji","Seoge UI Symbol"`
  },
  fontWeights: {
    normal: 400,
    medium: 500,
    bold: 700
  },
  initialColorMode: 'light',
  useSystemColorMode: false
};

export default theme;
