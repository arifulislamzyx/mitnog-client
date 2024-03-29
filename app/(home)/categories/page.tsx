"use client";
import Image from "next/image";
import React from "react";
import { useEffect, useState } from "react";

interface category{
  _id:number;
  name:string;
  imageUrl: string
}

const Categories:React.FC = () => {
  const [categoriesData, setCategoriesData] = useState<category[]>([]);

  console.log("all categories", categoriesData);

  useEffect(() => {
    fetch("https://mitnog-server.vercel.app/categories")
      .then((res) => res.json())
      .then((data) => setCategoriesData(data))
      .catch((err) => {
        console.error("Error fetching categories:", err);
        setCategoriesData([]);
      });
  }, []);

  return (
    <div className="bg-white">
      <p className="text-2xl pt-5 ml-32">Popular Categories</p>
      <div className="grid grid-cols-3 gap-4 w-3/4 m-auto bg-white rounded-xl">
        {categoriesData.map((category) => (
          <div key={category._id} className="p-5 rounded-xl items-center">
            <Image
              src={category.imageUrl}
              alt="categories"
              className="rounded"
            />
            <p className="mt-5">{category.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
