import { forwardRef, RefObject } from 'react';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertColor, AlertProps } from '@mui/material/Alert';
import { SNACKBAR_DURATION } from '../../helpers/constants';

const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />;
});

const SnackBarCustom: React.FC<{
  open: boolean;
  duration?: number;
  handleClose: (event?: React.SyntheticEvent | Event, reason?: string) => void;
  type: AlertColor;
  msg: string;
}> = (props) => {
  return (
    <Stack spacing={2} sx={{ width: '100%' }}>
      <Snackbar
        open={props.open}
        autoHideDuration={props.duration || SNACKBAR_DURATION}
        onClose={props.handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
      >
        <Alert
          onClose={props.handleClose}
          severity={props.type}
          sx={{ width: '100%' }}
        >
          {props.msg}
        </Alert>
      </Snackbar>
    </Stack>
  );
};

export default SnackBarCustom;
