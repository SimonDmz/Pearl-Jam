import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#eeeeee',
    },
    secondary: {
      light: '#0066ff',
      main: '#0044ff',
      contrastText: '#ffcc00',
    },
  },
});
export default theme;
