"use client";
import { Product, TTableData } from "@/type/table";
import { Button, Input } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import ProductTable from "./ProductTable";

export default function ProductList() {
  const [getProduct, setProduct] = useState<Product[]>();

  useEffect(() => {
    const getAllProducts = async () => {
      try {
        const fetchProduct = await fetch("http://localhost:3000/api/product");

        if (!fetchProduct.ok) {
          throw new Error(`HTTP error! Status: ${fetchProduct.status}`);
        }
        const products: Product[] = await fetchProduct.json();
        setProduct(products);
      } catch (error) {
        console.error("Error fetching products:", error);
        throw error;
      }
    };
    getAllProducts();
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
          <Button>Drop DOwn</Button>
        </div>
        <div className="flex gap-2 items-center">
          <Button color="secondary">Export Excel</Button>
          <Button color="secondary" variant="faded">
            Tambah Produk
          </Button>
        </div>
      </div>
      {getProduct !== undefined && <ProductTable record={getProduct} />}
    </section>
  );
}
