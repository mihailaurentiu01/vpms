import Layout from './components/Layout';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { Route, Switch } from 'react-router-dom';

import en from './lang/en';
import es from './lang/es';

import Main from './pages/Main';
import LoginPage from './pages/LoginPage';

import routes from './helpers/routes';

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
        </Switch>
      </Layout>
    </div>
  );
}

export default App;
