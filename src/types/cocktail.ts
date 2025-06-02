export interface Cocktail {
  idDrink: string;
  strDrink: string;
  strCategory: string;
  strAlcoholic: string;
  strGlass: string;
  strInstructions: string;
  strDrinkThumb: string;
  [key: string]: string | undefined;
}

export interface CocktailsResponse {
  drinks: Cocktail[] | null;
}

export type CocktailCode = 'margarita' | 'mojito' | 'a1' | 'kir'; 