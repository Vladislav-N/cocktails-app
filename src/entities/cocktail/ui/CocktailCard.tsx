import { Card } from 'antd';
import type { Cocktail } from '@/features/cocktails/types';
import styles from './styles.module.less';

interface CocktailCardProps {
  cocktail: Cocktail;
}

export const CocktailCard = ({ cocktail }: CocktailCardProps) => {
  return (
    <Card
      hoverable
      className={styles.card}
      cover={
        <div className={styles.imageWrapper}>
          <img
            loading="lazy"
            alt={cocktail.strDrink}
            src={cocktail.strDrinkThumb}
            className={styles.image}
          />
        </div>
      }
    >
      <Card.Meta
        title={cocktail.strDrink}
        description={`${cocktail.strCategory} - ${cocktail.strAlcoholic}`}
      />
    </Card>
  );
}; 