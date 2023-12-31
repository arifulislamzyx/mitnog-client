"use client"
import { default as useProducts } from '@/Hooks/useProducts'; 
import React, { useEffect, useState } from 'react';
import SingleProductShow from '../SingleProductShow';

const DisplayCategoryBaseItem = () => {
  const { products } = useProducts() || [];
  const [filteredProducts, setFilteredProducts] = useState([]);

   useEffect(() => {
    const FashionFiltered = products.filter(product => product.category === "Mens Sneaker");
    setFilteredProducts(FashionFiltered);
   }, [products]);

  return (
    <div>
      <h1>Mens Sneaker Products</h1>
      <div className="grid grid-cols-4 gap-2 p-4">
        {filteredProducts.map(product => (
          <SingleProductShow key={product._id} product={product}></SingleProductShow>
      ))}
      </div>
    </div>
  );
};

export default DisplayCategoryBaseItem;
