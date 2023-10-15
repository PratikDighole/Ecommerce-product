import React from "react";
import { Link } from "react-router-dom";

const ProductCard = ({ product, onDelete }) => {
  return (
    <div className="border p-4 m-2">
      <img
        style={{ height: "300px", width: "300px" }}
        src={product.image}
        alt={product.title}
      />
      <h2>{product.title}</h2>
      <p>${product.price}</p>
      <button onClick={() => onDelete(product)}>Delete</button>
      <br />
      <Link to="/product/:id" state={{products:product}}>More Info..</Link>
    </div>
  );
};
export default ProductCard;
