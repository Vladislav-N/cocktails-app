import { Layout as AntLayout, Menu } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';
import { MENU_ITEMS } from '@/features/navigation/config';
import styles from './styles.module.less';

const { Content, Sider } = AntLayout;

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();
  const navigate = useNavigate();

  const selectedKeys = [location.pathname];

  return (
    <AntLayout className={styles.layout}>
      <Sider theme="light" className={styles.sider}>
        <Menu
          mode="vertical"
          selectedKeys={selectedKeys}
          items={MENU_ITEMS.map(item => ({
            key: item.path,
            label: item.label,
            onClick: () => navigate(item.path),
          }))}
        />
      </Sider>
      <Content className={styles.content}>
        <div className={styles.container}>
          {children}
        </div>
      </Content>
    </AntLayout>
  );
}; 