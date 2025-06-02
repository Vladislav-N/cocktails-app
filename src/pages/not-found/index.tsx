import { Result, Button } from 'antd';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const NotFound: React.FC = () => {
  const { t } = useTranslation();

  return (
    <Result
      status="404"
      title={t('notFound.title')}
      subTitle={t('notFound.subTitle')}
      extra={
        <Button type="primary">
          <Link to="/">{t('notFound.backHome')}</Link>
        </Button>
      }
    />
  );
};

export default NotFound; 