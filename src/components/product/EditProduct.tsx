"use client";
import Link from "next/link";
import ProductForm from "./ProductForm";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import fetchProductById from "@/lib/product/client/fetchProductById";

export default function EditProduct() {
  const [productById, setProductById] = useState<{
    category: string;
    productName: string;
    price: string;
    productImg: string;
    stocks: string;
  }>();
  const searchParams = useSearchParams();
  const productId = searchParams.get("productId");
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    formDataToSend.append("category", e.target.category.value);
    formDataToSend.append("productName", e.target.productName.value);
    formDataToSend.append("price", e.target.price.value);
    formDataToSend.append("stocks", e.target.stocks.value);
    formDataToSend.set("productImg", e.target.productImg.files[0]);
    formDataToSend.append("categoryName", e.target.category.value);
    formDataToSend.append("id", productId as string);

    try {
      const sendForm = await fetch("/api/product", {
        method: "PATCH",
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
  console.info(productId);
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (productId !== null) {
          const prod = await fetchProductById(productId);

          const newData = {
            category: prod.categoryName,
            productName: prod.name,
            price: prod.price,
            productImg: prod.image,
            stocks: prod.stocks.toString(),
          };

          setProductById({ ...newData });
          console.log(prod);
        }
      } catch (error) {
        console.error("Error fetching product by ID:", error);
      }
    };

    fetchData();
  }, [productId]);

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
        <strong className="text-2xl text-purple-800">Edit Produk</strong>
      </div>
      {productById && (
        <ProductForm
          handleSubmit={handleSubmit}
          defaultValues={{ ...productById }}
        />
      )}
    </section>
  );
}
