import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from '@/widgets/Layout';
import { CocktailListPage } from '@/pages/cocktail-list';
import NotFound from '@/pages/not-found';

export const Router = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Navigate to="/margarita" replace />} />
          <Route path="/:code" element={<CocktailListPage />} />
          <Route path="/404" element={<NotFound />} />
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}; 