import { useParams, Navigate } from 'react-router-dom';
import { CocktailList } from '@/widgets/CocktailList';
import type { CocktailCode } from '@/features/cocktails/types';

const VALID_CODES = ['margarita', 'mojito', 'a1', 'kir'];

export const CocktailListPage = () => {
  const { code } = useParams<{ code: string }>();

  if (!code || !VALID_CODES.includes(code)) {
    return <Navigate to="/404" replace />;
  }

  return <CocktailList code={code as CocktailCode} />;
}; 