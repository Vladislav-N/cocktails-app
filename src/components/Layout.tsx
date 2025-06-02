import { Layout as AntLayout, Menu } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const { Sider, Content } = AntLayout;

const menuItems = [
  { key: 'margarita', label: 'margarita' },
  { key: 'mojito', label: 'mojito' },
  { key: 'a1', label: 'a1' },
  { key: 'kir', label: 'kir' },
] as const;

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const currentPath = location.pathname.split('/')[1] || 'margarita';
  const { t } = useTranslation();

  return (
    <AntLayout>
      <Sider
        theme="light"
        width={200}
        style={{
          overflow: 'auto',
          height: '100vh',
          position: 'fixed',
          left: 0,
          top: 0,
          bottom: 0,
          backgroundColor: '#fff',
          borderRight: '1px solid rgba(0, 0, 0, 0.06)'
        }}
      >
        <Menu
          mode="inline"
          selectedKeys={[currentPath]}
          style={{ height: '100%', borderRight: 'none' }}
          items={menuItems.map((item) => ({
            key: item.key,
            label: <Link to={`/${item.key}`}>{t(`menu.${item.key}`)}</Link>,
          }))}
        />
      </Sider>
      <AntLayout style={{ marginLeft: 200, minHeight: '100vh' }}>
        <Content style={{ padding: '24px', maxWidth: 1024, margin: '0 auto', width: '100%' }}>
          {children}
        </Content>
      </AntLayout>
    </AntLayout>
  );
};

export default Layout; 