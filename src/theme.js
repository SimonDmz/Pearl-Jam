import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
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
  typography: {
    // fontSize: '16',
  },
});
export default theme;
