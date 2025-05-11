import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./iphone.css";

const Iphone = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/iphone")
      .then((res) => res.json())
      .then((data) => setProducts(data.products))
      .catch((err) => console.error("Fetch error:", err));
  }, []);

  return (
    <section className="internal-page-wrapper top-100">
      <div className="container">
        {products.map((product, index) => {
          const {
            Product_id,
            Product_name,
            Product_brief_description,
            Product_img,
            Starting_price,
            Price_range,
          } = product;

          const order1 = index % 2 === 0 ? 2 : 1;
          const order2 = index % 2 === 0 ? 1 : 2;

          return (
            <div
              className="row justify-content-center text-center bottom-50"
              key={Product_id}
            >
              <div className={`col-12 col-md-6 p5-5 order-${order1}`}>
                <div className="title-wraper bold">{Product_name}</div>
                <div className="brief-description">
                  {Product_brief_description}
                </div>
                <div className="starting-price">{`Starting at ${Starting_price}`}</div>
                <div className="monthly-price">{Price_range}</div>
                <div className="links-wrapper">
                  <ul>
                    <li>
                      <Link to={`/iphone/${Product_id}`}>Learn more</Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div className={`col-12 col-md-6 pt-5 order-${order2}`}>
                <div className="prodict-image pt-5">
                  <img src={Product_img} alt={Product_name} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Iphone;