"use client";
import { Button, Input, Radio, RadioGroup, Spacer } from "@nextui-org/react";
import Link from "next/link";
import DropDown from "./DropDown";
import ProductForm from "./ProductForm";

export default function AddProduct() {
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    formDataToSend.append("category", e.target.category.value);
    formDataToSend.append("productName", e.target.productName.value);
    formDataToSend.append("price", e.target.price.value);
    formDataToSend.append("stocks", e.target.stocks.value);
    formDataToSend.set("productImg", e.target.productImg.files[0]);
    formDataToSend.append("categoryName", e.target.category.value);

    try {
      const sendForm = await fetch("/api/product", {
        method: "PUT",
        body: formDataToSend,
      });

      if (sendForm.ok) {
        console.log("form req success yayy..");
      } else {
        console.error("form req is fail :(");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <section className="p-16">
      <div className="flex items-center gap-4">
        <Link href="/product/productList">
          <strong className="text-2xl text-purple-800/50">Daftar Produk</strong>
        </Link>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="40"
          height="40"
          viewBox="0 0 24 24"
        >
          <path d="M10.707 17.707 16.414 12l-5.707-5.707-1.414 1.414L13.586 12l-4.293 4.293z"></path>
        </svg>
        <strong className="text-2xl text-purple-800">Tambah Produk</strong>
      </div>
      <ProductForm
        handleSubmit={handleSubmit}
        defaultValues={{
          category: "",
          productName: "",
          price: "",
          productImg: "",
          stocks: "",
        }}
      />
    </section>
  );
}
