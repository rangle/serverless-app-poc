const ProductCard = ({ productName, productDescription, price }) => {
  return (
    <div>
      <h1>{productName}</h1>
      <p>{productDescription}</p>
      <p>Price: ${price}</p>
    </div>
  );
};

export default ProductCard;
