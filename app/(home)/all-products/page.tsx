"use client";
import useProducts from "@/Hooks/useProducts";
import React from "react";
import ProductDisplay from "./ProductDisplay";
import { Product } from "@/types/product";

const metadata = {
  title: "Mitnog- Explore Products",
  description:
    "Discover a vast online marketplace with a wide array of products. Enjoy secure transactions and swift delivery for a seamless shopping experience. Join our satisfied customers and explore convenience at its finest",
};

const Products: React.FC = () => {
  const { products } = useProducts();

  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-3 px-4 w-full max-w-[1050px] mx-auto my-5">
      <p className="text-2xl p-2">All Products</p>

      {products.map((product: Product) => (
        <ProductDisplay key={product._id} product={product}></ProductDisplay>
      ))}
    </div>
  );
};

export default Products;
