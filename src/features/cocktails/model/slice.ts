import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { cocktailsApi } from '../api';
import type { Cocktail, CocktailCode } from '../types';

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
    const drinks = await cocktailsApi.searchByName(code);
    return { code, drinks };
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

export const { reducer: cocktailsReducer } = cocktailsSlice; 