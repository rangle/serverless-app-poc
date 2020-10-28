import { useState, useEffect } from 'react';
import './App.css';
import { client } from './Contentful';

const createSubscription = () => {
  fetch('http://localhost:3000/dev/subscription', {
    method: 'POST',
  })
    .then((res) => res.json())
    .then((result) => {
      console.log(result);
    });
};

const ListProducts = ({ items }) => {
  return (
    <div>
      {items.map((item) => (
        <div key={item.productName}>
          <h1>{item.productName}</h1>
          <p>{item.productDescription}</p>
          <p>Price: ${item.price}</p>
          <button onClick={createSubscription}>Purchase this course</button>
        </div>
      ))}
    </div>
  );
};

const App = () => {
  const [products, setProducts] = useState([]);

  // Fetch all the product from Contentful
  useEffect(() => {
    client
      .getEntries({
        content_type: 'product',
      })
      .then((products) => products.items)
      .then((items) => items.map((item) => item.fields))
      .then((productDetails) => setProducts(productDetails));
  }, []);

  return (
    <div>
      <ListProducts items={products}></ListProducts>
    </div>
  );
};

export default App;
