import Layout from './components/Layout';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { Route, Switch, Redirect } from 'react-router-dom';

import en from './lang/en';
import es from './lang/es';

import Main from './pages/Main';
import LoginPage from './pages/LoginPage';

import routes from './helpers/routes';
import SignUpPage from './pages/SignUpPage';
import { useAppSelector } from './app/hooks';
import { RootState } from './app/store';
import Dashboard from './pages/Dashboard';
import AddCategory from './pages/Category/Add';
import ManageCategory from './pages/Category/Manage';
import AddVehicle from './pages/Vehicles/Add';
import ManageVehicles from './pages/Vehicles/Manage';

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: en,
    },
    es: {
      translation: es,
    },
  },
  lng: 'en',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

const PrivateRoute: React.FC<{
  component: any;
  rest?: any;
  path: any;
  exact?: boolean;
}> = ({ component: Component, ...rest }) => {
  const { loggedIn } = useAppSelector((state: RootState) => state.auth);

  return (
    <Route
      {...rest}
      render={(props) =>
        loggedIn ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: routes.welcome,
            }}
          />
        )
      }
    />
  );
};

function App() {
  return (
    <div className='App'>
      <Layout>
        <Switch>
          <Route path={routes.welcome} exact>
            <Main />
          </Route>
          <Route path={routes.login}>
            <LoginPage />
          </Route>
          <Route path={routes.signup}>
            <SignUpPage />
          </Route>
          <PrivateRoute path={routes.dashboard} exact component={Dashboard} />
          <PrivateRoute
            path={routes.category.add}
            exact
            component={AddCategory}
          />
          <PrivateRoute
            path={routes.category.base}
            exact
            component={ManageCategory}
          />
          <PrivateRoute path={routes.category.edit} component={AddCategory} />
          <PrivateRoute path={routes.vehicle.add} component={AddVehicle} />
          <PrivateRoute path={routes.vehicle.base} component={ManageVehicles} />
        </Switch>
      </Layout>
    </div>
  );
}

export default App;
