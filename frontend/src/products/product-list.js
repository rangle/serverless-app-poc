import { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import ProductCard from './product-card';
import { Button } from '../components/button';
import { StyledCard } from '../components/card';
import { StyledListContainer } from '../components/common';
import { ContentContext } from '../content/content-context';
import { getProductDetails } from '../content/content.service';

const ProductList = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { contentState, dispatch } = useContext(ContentContext);
  const { products } = contentState;
  const history = useHistory();

  useEffect(() => {
    const updateProducts = async () => {
      setIsLoading(true);
      try {
        const productDetails = await getProductDetails();
        return dispatch({
          type: 'FETCH_PRODUCTS',
          payload: productDetails,
        });
      } catch (err) {
        throw err;
      } finally {
        setIsLoading(false);
      }
    };

    updateProducts();
  }, []);

  const handleSelectedProduct = async (selectedProduct) => {
    console.log('hello', selectedProduct);
    dispatch({
      type: 'SELECT_PRODUCT',
      payload: selectedProduct,
    });
    history.push('/checkout');
  };

  return (
    <StyledListContainer>
      {isLoading && <div>Loading...</div>}
      {products &&
        products.map((product) => (
          <StyledCard key={product.productName}>
            <ProductCard {...product} />
            <Button onClick={() => handleSelectedProduct(product)}>
              Add to Cart
            </Button>
          </StyledCard>
        ))}
    </StyledListContainer>
  );
};

export default ProductList;
