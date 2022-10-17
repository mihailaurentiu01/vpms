import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

const Main = () => {
  return (
    <>
      <CssBaseline />
      <Container maxWidth='sm' fixed>
        <Box sx={{ bgcolor: '#cfe8fc' }} />
      </Container>
    </>
  );
};

export default Main;
