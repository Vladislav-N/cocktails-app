import { Card, Typography, List, Row, Col } from 'antd';
import { useTranslation } from 'react-i18next';
import type { Cocktail } from '../types/cocktail';

const { Title, Text } = Typography;

interface CocktailCardProps {
  cocktail: Cocktail;
}

const CocktailCard: React.FC<CocktailCardProps> = ({ cocktail }) => {
  const { t } = useTranslation();

  const ingredients = Object.entries(cocktail)
    .filter(([key, value]) => key.startsWith('strIngredient') && value)
    .map(([key, value]) => {
      const measureKey = `strMeasure${key.slice(13)}`;
      const measure = cocktail[measureKey];
      return `${measure ? measure + ' ' : ''}${value}`;
    });

  return (
    <Card style={{ width: '100%' }}>
      <Row gutter={[24, 0]}>
        <Col xs={24} md={16}>
          <div>
            <Title level={4}>{cocktail.strDrink}</Title>
            <div style={{ marginBottom: 16 }}>
              <Text type="secondary">{t('cocktail.category')}: </Text>
              <Text>{cocktail.strCategory}</Text>
            </div>
            <div style={{ marginBottom: 16 }}>
              <Text type="secondary">{t('cocktail.type')}: </Text>
              <Text>{cocktail.strAlcoholic}</Text>
            </div>
            <div style={{ marginBottom: 16 }}>
              <Text type="secondary">{t('cocktail.glass')}: </Text>
              <Text>{cocktail.strGlass}</Text>
            </div>

            <Title level={5}>{t('cocktail.instructions')}:</Title>
            <Text style={{ display: 'block', marginBottom: 16 }}>{cocktail.strInstructions}</Text>

            <Title level={5}>{t('cocktail.ingredients')}:</Title>
            <List
              size="small"
              dataSource={ingredients}
              renderItem={(item) => (
                <List.Item style={{ padding: '4px 0', border: 'none' }}>
                  <Text>{item}</Text>
                </List.Item>
              )}
            />
          </div>
        </Col>
        <Col xs={24} md={8}>
          <img
            alt={cocktail.strDrink}
            src={cocktail.strDrinkThumb}
            style={{
              width: '100%',
              height: 'auto',
              objectFit: 'cover',
              borderRadius: '4px'
            }}
            loading="lazy"
          />
        </Col>
      </Row>
    </Card>
  );
};

export default CocktailCard; 