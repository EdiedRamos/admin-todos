import { ProductCard } from "./ProductCard";
import React from "react";
import { products } from "../data";

export const ProductCards = () => {
  return (
    <div className="flex flex-wrap gap-5 justify-center">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};
