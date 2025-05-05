import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Four04 from "../Four04/Four04";

const ProductPage = () => {
  const { pid } = useParams();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/products/iphone")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch products");
        }
        return res.json();
      })
      .then((data) => {
        const found = data.products.find((x) => {
          const slug = x.Product_url.split("/").filter(Boolean).pop();
          return slug === pid;
        });
        if (found) {
          setProduct(found);
        } else {
          setError("Product not found");
        }
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setError("Error fetching product data");
      });
  }, [pid]);

  if (error || !product) {
    return <Four04 />;
  }

  const {
    Product_name,
    Product_brief_description,
    Product_description,
    Product_img,
    Starting_price,
    Price_range,
  } = product;

  return (
    <section className="internal-page-wrapper top-100">
      <div className="container">
        <div className="row justify-content-center text-center bottom-50">
          <div className="col-12 pt-4">
            <div className="title-wraper bold">{Product_name}</div>
            <div className="brief-description">{Product_brief_description}</div>
          </div>
        </div>

        <div className="row justify-content-center text-center product-holder h-100">
          <div className="col-sm-12 col-md-6 my-auto">
            <div className="product-title">{Product_name}</div>
            <div className="product-description">{Product_description}</div>
            <div className="starting-price">{`Starting at ${Starting_price}`}</div>
            <div className="monthly-price">{Price_range}</div>
          </div>
          <div className="col-sm-12 col-md-6">
            <div className="product-image pt-5">
              <img src={Product_img} alt={Product_name} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductPage;