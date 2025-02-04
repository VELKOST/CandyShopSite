import React, { useEffect } from 'react';
import styles from './ProductsPage.module.scss';
import Input from '../../components/Input';
import MultiDropdown from '../../components/MultiDropdown';
import { Option } from '../../components/MultiDropdown';
import Card from '../../components/Card';
import Button from '../../components/Button';
import { Product } from '../../utils/types';
import Loader from '../../components/Loader';

const ProductsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [selectedOptions, setSelectedOptions] = React.useState<Option[]>([]);
  const [products, setProducts] = React.useState<Product[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [error, setError] = React.useState<string | null>(null);

  const categoryOptions = React.useMemo(
    () => [
      { key: 'Clothes', value: 'Clothes' },
      { key: 'Electronics', value: 'Electronics' },
    ],
    []
  );

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('https://api.escuelajs.co/api/v1/products');
        if (!res.ok) {
          setError('Не удалось загрузить данные');
          return;
        }
        const data: Product[] = await res.json();
        setProducts(data);
      } catch (err: unknown) {
        if (err instanceof Error) {
          console.error('Ошибка: ', err);
          setError(err.message);
        } else {
          console.error('Неизвестная ошибка: ', err);
          setError('Неизвестная ошибка');
        }
      } finally {
        setLoading(false);
      }
    };

    void fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className={styles.loaderWrapper}>
        <Loader size="l" className={styles.loader} />
      </div>
    );
  }

  if (error) {
    return <div>Ошибка: {error}</div>;
  }

  return (
    <section className={styles.mainContainer}>
      <div className={styles.highText}>
        <h1>Products</h1>
        <span>
          We display products based on the latest products we have, if you want
          to see our old products please enter the name of the item
        </span>
      </div>

      {/* Блок поиска и фильтра */}
      <div className={styles.filters}>
        <Input
          value={searchTerm}
          onChange={(val) => setSearchTerm(val)}
          placeholder="Search product..."
        />
        <MultiDropdown
          options={categoryOptions}
          value={selectedOptions}
          onChange={(newVal) => setSelectedOptions(newVal)}
          getTitle={(values: Option[]) =>
            values.length === 0
              ? 'Select categories'
              : values.map(({ value }) => value).join(', ')
          }
        />
        <Button onClick={() => console.log('Нажали поиск!')}>Find now</Button>
      </div>

      <section className={styles.productCatalog}>
        <div className={styles.catalogWrapper}>
          <div className={styles.countProducts}>
            <h2 className={styles.catalogTitle}>Product Catalog</h2>
            <span>{products.length}</span>
          </div>
          <div className={styles.gridCards}>
            {products.map((product) => (
              <Card
                key={product.id}
                image={product.images[0]}
                imageAlt={product.title}
                captionSlot={product.category.name}
                title={product.title}
                subtitle={product.description}
                contentSlot={<span>${product.price}</span>}
                actionSlot={<Button>Add to Cart</Button>}
              />
            ))}
          </div>
        </div>
      </section>
    </section>
  );
};

export default ProductsPage;
