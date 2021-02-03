import { StyledCardHeader } from '../components/card';
const ProductCard = ({ productName, productDescription, price }) => {
  return (
    <>
      <StyledCardHeader>{productName}</StyledCardHeader>
      <p>{productDescription}</p>
      <p>CA${price}</p>
    </>
  );
};

export default ProductCard;
