import { Layout as AntLayout, Menu } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';

const { Sider, Content, Header } = AntLayout;

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
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const contentStyles = {
    padding: '24px',
    maxWidth: '1024px',
    minWidth: '360px',
    width: '100%',
    margin: '0 auto',
    boxSizing: 'border-box' as const
  };

  const menuComponent = (
    <Menu
      mode={isMobile ? "horizontal" : "inline"}
      selectedKeys={[currentPath]}
      style={isMobile ? { 
        width: '100%',
        minWidth: '360px'
      } : { 
        height: '100%', 
        borderRight: 'none',
        minWidth: '200px'
      }}
      items={menuItems.map((item) => ({
        key: item.key,
        label: <Link to={`/${item.key}`}>{t(`menu.${item.key}`)}</Link>,
      }))}
    />
  );

  if (isMobile) {
    return (
      <AntLayout style={{ minWidth: '360px' }}>
        <Header style={{ 
          padding: 0, 
          background: '#fff',
          position: 'fixed',
          width: '100%',
          minWidth: '360px',
          top: 0,
          zIndex: 999,
          boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
        }}>
          {menuComponent}
        </Header>
        <Content style={{ 
          ...contentStyles,
          margin: '64px auto 0'
        }}>
          {children}
        </Content>
      </AntLayout>
    );
  }

  return (
    <AntLayout style={{ minWidth: '360px' }}>
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
          borderRight: '1px solid rgba(0, 0, 0, 0.06)',
          minWidth: '200px'
        }}
      >
        {menuComponent}
      </Sider>
      <AntLayout style={{ marginLeft: 200, minHeight: '100vh', minWidth: '360px' }}>
        <Content style={contentStyles}>
          {children}
        </Content>
      </AntLayout>
    </AntLayout>
  );
};

export default Layout; 