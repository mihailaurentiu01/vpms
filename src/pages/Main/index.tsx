import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import parkingLogo from '../../assets/img/parking.png';
import styles from './main.module.css';

const Main = () => {
  return (
    <>
      <CssBaseline />
      <Container maxWidth={false}>
        <Grid container spacing={2} justifyContent='center' sx={{ p: 1 }}>
          <Grid item>
            <h1>VEHICLE PARKING MANAGEMENT SYSTEM</h1>

            <img
              className={styles.center}
              src={parkingLogo}
              alt='Parking logo'
              width='250'
            />
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Main;
