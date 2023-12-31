"use client";
import { Product } from "@/type/table";
import { Button, Input } from "@nextui-org/react";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import ProductTable from "./ProductTable";
import DropDown from "./DropDown";
import { useProductState } from "@/hook/product/useProduct";
import fetchAllProducts from "@/lib/product/client/fetchAllProducts";
import searchProductByNameOrCategoryName from "@/lib/product/client/searchProductByNameOrCategoryName";
export default function ProductList() {
  const { setProduct, getProduct } = useProductState();
  let debounceTimer: any;
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.target?.value;

    clearTimeout(debounceTimer);

    debounceTimer = setTimeout(() => {
      searchProductByNameOrCategoryName(searchValue, searchValue).then(
        (searchedProduct) => {
          setProduct(searchedProduct);
        },
      );
    }, 300);
  };
  useEffect(() => {
    fetchAllProducts()
      .then((product) => setProduct(product))
      .catch((err) => console.log(err));
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
            name="search"
            placeholder="Cari barang"
            onChange={handleInputChange}
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
