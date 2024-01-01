"use client";
import { Button, Input, Pagination, Spinner } from "@nextui-org/react";
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
  const [productPageSize, setProductPageSize] = useState<number>(1);

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
    fetchAllProducts(7, 0).then((product) => {
      setProduct(product.data);
      let totalPage = (product.length - (product.length % 7)) / 7;
      if (product.length % 7 !== 0) {
        totalPage = totalPage + 1;
      }
      setProductPageSize(totalPage);
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
      {getProduct !== null ? (
        <ProductTable record={getProduct} />
      ) : (
        <div>
          <Spinner size="md" label="Loading table....." />
        </div>
      )}
      <div className="w-full flex p-4">
        <Pagination
          total={productPageSize}
          initialPage={1}
          onChange={(page) => {
            fetchAllProducts(7, (page - 1) * 7).then((product) => {
              setProduct(product.data);
            });
          }}
          color="secondary"
          className="ml-auto"
          showControls
          variant="bordered"
        />
      </div>
    </section>
  );
}
