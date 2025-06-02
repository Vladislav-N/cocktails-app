import axios from 'axios';
import type { CocktailCode, Cocktail } from '../types';

const BASE_URL = 'https://www.thecocktaildb.com/api/json/v1/1';

export const cocktailsApi = {
  async searchByName(code: CocktailCode): Promise<Cocktail[]> {
    const response = await axios.get(`${BASE_URL}/search.php?s=${code}`);
    if (!response.data.drinks) {
      throw new Error('No cocktails found');
    }
    return response.data.drinks;
  }
}; 