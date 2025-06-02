import { Provider } from 'react-redux';
import { ConfigProvider } from 'antd';
import ruRU from 'antd/locale/ru_RU';
import { store } from '@/app/store';
import { Router } from '@/app/router';
import '@/app/styles/index.less';

const App = () => {
  return (
    <Provider store={store}>
      <ConfigProvider locale={ruRU}>
        <Router />
      </ConfigProvider>
    </Provider>
  );
};

export default App; 