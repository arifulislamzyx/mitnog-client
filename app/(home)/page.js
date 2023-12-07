"use client";
import Header from "./Header";
import Products from "../all-products/Products";
import { Category } from "@/Components/HomeComponants/Category";
import { NewProducts } from "@/Components/HomeComponants/Newproducts";
import HotDeals from "@/Components/HomeComponants/HotDeals";
// import Partner from "@/Components/HomeComponants/Partner";


export default function Home() {
  return (
    <div>
      <Header></Header>
      <NewProducts></NewProducts>
      <Category></Category>
      <HotDeals></HotDeals>
      <Products></Products>
      {/* <Partner></Partner> */}
    </div>
  );
}
