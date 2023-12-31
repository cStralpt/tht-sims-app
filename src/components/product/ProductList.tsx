"use client";
import { Button, Input } from "@nextui-org/react";
import { ChangeEvent, useEffect, useState } from "react";
import ProductTable from "./ProductTable";
import DropDown from "./DropDown";
import { useProductState } from "@/hook/product/useProduct";
import fetchAllProducts from "@/lib/product/client/fetchAllProducts";
import searchProductByNameOrCategoryName from "@/lib/product/client/searchProductByNameOrCategoryName";
import { exportTableToExcel } from "@/lib/excel/exportTableToExcel";
import Link from "next/link";

export default function ProductList() {
  const { setProduct, getProduct } = useProductState();
  const [exportFunction, setExportFunction] = useState<Function>(() => {});

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
    fetchAllProducts().then((product) => {
      setProduct(product);
    });
  }, []);
  useEffect(() => {
    setExportFunction(() => () => exportTableToExcel(getProduct));
  }, [getProduct !== null, getProduct]);
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
          <Button
            color="secondary"
            onClick={() => {
              exportFunction();
            }}
          >
            Export Excel
          </Button>
          <Link href="addProduct">
            <Button color="secondary" variant="faded">
              Tambah Produk
            </Button>
          </Link>
        </div>
      </div>
      {getProduct !== null && <ProductTable record={getProduct} />}
    </section>
  );
}
