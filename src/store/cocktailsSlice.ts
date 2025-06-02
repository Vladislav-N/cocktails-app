import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import type { Cocktail, CocktailCode } from '../types/cocktail';

export interface CocktailsState {
  items: Record<CocktailCode, Cocktail[]>;
  loading: boolean;
  error: string | null;
}

const initialState: CocktailsState = {
  items: {
    margarita: [],
    mojito: [],
    a1: [],
    kir: [],
  },
  loading: false,
  error: null,
};

export const fetchCocktails = createAsyncThunk(
  'cocktails/fetchCocktails',
  async (code: CocktailCode) => {
    const response = await axios.get(
      `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${code}`
    );
    if (!response.data.drinks) {
      throw new Error('No cocktails found');
    }
    return { code, drinks: response.data.drinks };
  }
);

const cocktailsSlice = createSlice({
  name: 'cocktails',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCocktails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCocktails.fulfilled, (state, action) => {
        state.loading = false;
        state.items[action.payload.code] = action.payload.drinks;
        state.error = null;
      })
      .addCase(fetchCocktails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch cocktails';
      });
  },
});

export default cocktailsSlice.reducer; 