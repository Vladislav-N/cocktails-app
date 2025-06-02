/// <reference types="@testing-library/jest-dom" />
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { BrowserRouter } from 'react-router-dom';
import CocktailDetails from '../CocktailDetails';
import cocktailsReducer from '../../store/cocktailsSlice';
import type { Cocktail } from '../../types/cocktail';

const mockCocktail: Cocktail = {
  idDrink: "11007",
  strDrink: "Margarita",
  strCategory: "Cocktail",
  strAlcoholic: "Alcoholic",
  strGlass: "Cocktail glass",
  strInstructions: "Mix all ingredients",
  strDrinkThumb: "https://example.com/margarita.jpg",
  strIngredient1: "Tequila",
  strMeasure1: "1 1/2 oz"
};

const renderWithProviders = (component: React.ReactNode) => {
  const store = configureStore({
    reducer: {
      cocktails: cocktailsReducer
    },
    preloadedState: {
      cocktails: {
        items: {
          margarita: [mockCocktail],
          mojito: [],
          a1: [],
          kir: []
        },
        loading: false,
        error: null
      }
    }
  });

  return render(
    <Provider store={store}>
      <BrowserRouter>
        {component}
      </BrowserRouter>
    </Provider>
  );
};

describe('CocktailDetails Component', () => {
  it('отображает название и ингредиенты коктейля', () => {
    renderWithProviders(<CocktailDetails cocktailId="11007" code="margarita" />);

    expect(screen.getByText('Margarita')).toBeInTheDocument();
    expect(screen.getByText('Tequila')).toBeInTheDocument();
  });
}); 