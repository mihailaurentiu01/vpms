import Navbar from '../Navbar';
import SnackBarCustom from '../SnackBarCustom';
import { SnackBarActions } from '../../modules/snackbar/snackbarSlice';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { RootState } from '../../app/store';

const Layout: React.FC<{ children: any }> = (props) => {
  const { open, message, type } = useAppSelector(
    (state: RootState) => state.snackbar
  );
  const dispatch = useAppDispatch();

  const onHandleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    dispatch(SnackBarActions.setClose(reason as string));
  };

  return (
    <>
      <Navbar />
      {props.children}

      <SnackBarCustom
        open={open}
        handleClose={onHandleClose}
        type={type}
        msg={message}
      />
    </>
  );
};

export default Layout;
