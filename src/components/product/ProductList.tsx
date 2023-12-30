"use client";
import { Product } from "@/type/table";
import { Button, Input } from "@nextui-org/react";
import { useEffect, useState } from "react";
import ProductTable from "./ProductTable";
import DropDown from "./DropDown";
import { useProductState } from "@/hook/product/useProduct";
export default function ProductList() {
  const { setProduct, getProduct } = useProductState();

  const fetchAllProducts = async () => {
    try {
      const fetchProduct = await fetch("/api/product");

      if (!fetchProduct.ok) {
        throw new Error(`HTTP error! Status: ${fetchProduct.status}`);
      }
      const products: Product[] = await fetchProduct.json();
      setProduct(products);
      console.log(getProduct.productList);
    } catch (error) {
      console.error("Error fetching products:", error);
      throw error;
    }
  };
  useEffect(() => {
    fetchAllProducts();
  }, []);
  return (
    <section className="flex grow flex-col gap-2 p-16">
      <strong className="text-2xl text-purple-800">Daftar Produk</strong>
      <div className="w-full flex justify-between">
        <div className="flex gap-2 items-center">
          <Input
            type="text"
            variant="faded"
            color="secondary"
            placeholder="Cari barang"
          />
          <DropDown />
        </div>
        <div className="flex gap-2 items-center">
          <Button color="secondary">Export Excel</Button>
          <Button color="secondary" variant="faded">
            Tambah Produk
          </Button>
        </div>
      </div>
      {getProduct !== null && <ProductTable record={getProduct} />}
    </section>
  );
}
