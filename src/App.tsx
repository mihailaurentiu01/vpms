import Layout from './components/Layout';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from './lang/en';
import es from './lang/es';
import Main from './pages/Main';

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
        <Main />
      </Layout>
    </div>
  );
}

export default App;
