import { useEffect, useMemo } from 'react';
import { Card, Spin, Typography, List, Space } from 'antd';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchCocktails } from '../store/cocktailsSlice';
import type { CocktailCode } from '../types/cocktail';

const { Title, Text } = Typography;

interface CocktailDetailsProps {
  cocktailId: string;
  code: CocktailCode;
}

const CocktailDetails: React.FC<CocktailDetailsProps> = ({ cocktailId, code }) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { items, loading, error } = useAppSelector((state) => state.cocktails);

  useEffect(() => {
    dispatch(fetchCocktails(code));
  }, [code, dispatch]);

  const currentCocktail = useMemo(() => {
    const cocktails = items[code] || [];
    return cocktails.find(cocktail => cocktail.idDrink === cocktailId);
  }, [items, code, cocktailId]);

  if (loading) {
    return <Spin data-testid="loading" />;
  }

  if (error) {
    return <Text type="danger">{t('error.loading')}</Text>;
  }

  if (!currentCocktail) {
    return <Text type="warning">{t('error.notFound')}</Text>;
  }

  const ingredients = Object.entries(currentCocktail)
    .filter(([key, value]) => key.startsWith('strIngredient') && value)
    .map(([key, value]) => ({
      ingredient: value as string,
      measure: currentCocktail[`strMeasure${key.slice(13)}`] as string,
    }));

  return (
    <Card>
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <Title level={2}>{currentCocktail.strDrink}</Title>
        
        <div>
          <Title level={3}>{t('cocktail.ingredients')}</Title>
          <List
            dataSource={ingredients}
            renderItem={(item) => (
              <List.Item>
                <Text>{item.ingredient}</Text>
                {item.measure && <Text> - {item.measure}</Text>}
              </List.Item>
            )}
          />
        </div>

        <div>
          <Title level={3}>{t('cocktail.instructions')}</Title>
          <Text>{currentCocktail.strInstructions}</Text>
        </div>
      </Space>
    </Card>
  );
};

export default CocktailDetails; 