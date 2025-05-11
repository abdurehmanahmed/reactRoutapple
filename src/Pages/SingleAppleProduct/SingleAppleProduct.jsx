import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './SingleAppleProduct.css';

function SingleAppleProduct() {
  const { pid } = useParams();
  const [product, setProduct] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/iphone`)
      .then((res) => res.json())
      .then((data) => {
        
          const singleProduct = data.products.find(
            (p) => p.Product_id === parseInt(pid)
          );
          
            setProduct(singleProduct);
          
        
      })
      .catch((err) => {
        console.error('Error fetching products:', err);
        setError('Failed to load product');
      });
  }, [pid]);

  if (error) return <div className="error">{error}</div>;
  if (!product) return <div className="loading">Loading...</div>;

  return (
    <section className="single-product-container">
      <h1 className="product-title">{product.Product_name}</h1>
      <div className="product-content">
        <img
          src={product.Product_img}
          alt={product.Product_name}
          className="product-image"
        />
        <div className="product-details">
          <p className="brief-description">{product.Product_brief_description}</p>
          <p className="price">{`Starting at ${product.Starting_price}`}</p>
          <p className="price-range">{product.Price_range}</p>
          <p className="description">{product.Product_description}</p>
          <a href={product.Product_link} className="product-link">
            Buy Now
          </a>
        </div>
      </div>
    </section>
  );
}                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            

export default SingleAppleProduct;