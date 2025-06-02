import { Row, Col, Spin, Alert } from 'antd';
import { useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchCocktails } from '../store/cocktailsSlice';
import type { CocktailCode, Cocktail } from '../types/cocktail';
import CocktailCard from './CocktailCard';

const validCodes = ['margarita', 'mojito', 'a1', 'kir'] as const;

const CocktailList: React.FC = () => {
  const { code = 'margarita' } = useParams<{ code: string }>();
  const dispatch = useAppDispatch();
  const { items, loading, error } = useAppSelector((state) => state.cocktails);

  useEffect(() => {
    if (!validCodes.includes(code as CocktailCode)) {
      return;
    }
    dispatch(fetchCocktails(code as CocktailCode));
  }, [code, dispatch]);

  if (!validCodes.includes(code as CocktailCode)) {
    return <Navigate to="/404" replace />;
  }

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '50px' }}>
        <Spin size="large" />
      </div>
    );
  }

  if (error) {
    return <Alert message={error} type="error" />;
  }

  const cocktails = items[code as CocktailCode] || [];

  return (
    <Row gutter={[0, 24]}>
      {cocktails.map((cocktail: Cocktail) => (
        <Col span={24} key={cocktail.idDrink}>
          <CocktailCard cocktail={cocktail} />
        </Col>
      ))}
    </Row>
  );
};

export default CocktailList; 