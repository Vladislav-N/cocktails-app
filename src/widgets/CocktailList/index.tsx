import { Row, Col, Spin, Alert } from 'antd';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/shared/lib/redux';
import { fetchCocktails } from '@/features/cocktails/model/slice';
import { CocktailCard } from '@/entities/cocktail/ui/CocktailCard';
import type { CocktailCode } from '@/features/cocktails/types';

interface CocktailListProps {
  code: CocktailCode;
}

export const CocktailList = ({ code }: CocktailListProps) => {
  const dispatch = useAppDispatch();
  const { items, loading, error } = useAppSelector((state) => state.cocktails);

  useEffect(() => {
    dispatch(fetchCocktails(code));
  }, [code, dispatch]);

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

  const cocktails = items[code] || [];

  return (
    <Row gutter={[0, 24]}>
      {cocktails.map((cocktail) => (
        <Col span={24} key={cocktail.idDrink}>
          <CocktailCard cocktail={cocktail} />
        </Col>
      ))}
    </Row>
  );
}; 