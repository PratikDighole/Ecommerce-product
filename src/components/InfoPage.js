import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import "../App.css"; // Import your CSS file with styles

const InfoPage = (props) => {
  const location = useLocation();
  const { products } = location.state;
  console.log(location);
  // Check if products exists before rendering
  if (!products) {
    return <p>Loading products details...</p>;
  }
  console.log(props.products);

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        {" "}
        {/* Center items vertically */}
        <h1 className="text-2xl font-semibold">products List</h1>{" "}
        <div className="flex space-x-2">
          {" "}
          {/* Add a flex container for buttons */}
          <div style={{ paddingLeft: "10px" }}>
            <button className="btn btn-primary" style={{backgroundColor:"black"}}>
              <a href="/">Back</a>
            </button>
          </div>
        </div>
      </div>
      {/*end*/}
      <div className="max-w-2xl mx-auto products-info-container">
        <img
          src={products.image}
          alt={products.title}
          className="products-image"
        />
        <div className="products-details">
          <h1>{products.title}</h1>
          <p className="text-gray-600">Category: {products.category}</p>
          <p className="text-xl">${products.price}</p>
          <p>{products.description}</p>
          <p>
            Rating: {products.rating.rate} (Based on {products.rating.count}{" "}
            reviews)
          </p>
        </div>
      </div>
    </div>
  );
};

export default InfoPage;
