import type { CocktailCode } from '@/features/cocktails/types';

interface MenuItem {
  code: CocktailCode;
  label: string;
  path: string;
}

export const MENU_ITEMS: MenuItem[] = [
  { code: 'margarita', label: 'Margarita', path: '/margarita' },
  { code: 'mojito', label: 'Mojito', path: '/mojito' },
  { code: 'a1', label: 'A1', path: '/a1' },
  { code: 'kir', label: 'Kir', path: '/kir' },
];

export const DEFAULT_ROUTE = MENU_ITEMS[0].path; 