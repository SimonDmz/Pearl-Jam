import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#eeeeee',
      main: '#ffffff',
      dark: '#cdcdcd',
      darker: '#666666',
    },
    secondary: {
      light: '#0066ff',
      main: '#0f417a',
      contrastText: '#ffcc00',
    },
    background: {
      default: '#ffffff',
    },
  },
  overrides: {
    MuiInput: {
      underline: {
        '&:after,.Mui-focused&:after': {
          transform: 'scaleX(0)',
        },
      },
    },
  },
});
export default theme;
