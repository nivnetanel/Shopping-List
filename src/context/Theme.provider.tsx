import { createTheme, ThemeProvider as MuiThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  direction: 'rtl',
});

export default function ThemeProvider(props: { children: React.ReactNode }) {
  return <MuiThemeProvider theme={theme}>{props.children}</MuiThemeProvider>;
}
