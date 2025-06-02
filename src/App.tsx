import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ConfigProvider } from 'antd';
import { store } from './store';
import Layout from './components/Layout';
import CocktailList from './components/CocktailList';
import NotFound from './pages/not-found';
import ruRU from 'antd/locale/ru_RU';
import './App.less';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <ConfigProvider locale={ruRU}>
        <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<Navigate to="/margarita" replace />} />
              <Route path="/:code" element={<CocktailList />} />
              <Route path="/404" element={<NotFound />} />
              <Route path="*" element={<Navigate to="/404" replace />} />
            </Routes>
          </Layout>
        </Router>
      </ConfigProvider>
    </Provider>
  );
};

export default App;
