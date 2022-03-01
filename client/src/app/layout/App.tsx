import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Container, CssBaseline, Typography } from "@mui/material";
import { useState } from 'react';
import { Route } from 'react-router-dom';
import Header from './Header';
import MoviesPage from '../../features/movies/MoviesPage';

function App() {
  const [darkMode, setDarkMode] = useState(true);
  const paletteType = darkMode ? 'dark' : 'light';
  const theme = createTheme({
    palette: {
      mode: paletteType,
      background: {
        default: paletteType === 'light' ? '#eaeaea' : '#121212'
      }
    }
  });



  function handleThemeChange() {
    setDarkMode(!darkMode);
  }

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Header darkMode={darkMode} handleThemeChange={handleThemeChange} />
        <Container>
          <Route exact path="/" component={MoviesPage} />
        </Container>
      </ThemeProvider>
    </>
  );
}

export default App;
