import LoginForm from '../../components/LoginForm';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { getUsers } from '../../modules/user/userSlice';
import { RootState } from '../../app/store';
import { useHistory } from 'react-router-dom';
import routes from '../../helpers/routes';

const LoginPage = () => {
  const dispatch = useAppDispatch();
  const { loggedIn } = useAppSelector((state: RootState) => state.auth);
  const history = useHistory();

  useEffect(() => {
    dispatch(getUsers());

    if (loggedIn) {
      history.push(routes.dashboard);
    }
  }, [getUsers, loggedIn]);

  return (
    <>
      <LoginForm></LoginForm>
    </>
  );
};

export default LoginPage;
