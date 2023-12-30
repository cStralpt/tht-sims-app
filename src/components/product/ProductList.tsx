import UITable from "@/components/Table";
import { TTableData } from "@/type/table";
import { Button, Input } from "@nextui-org/react";
import React from "react";

export default function ProductList() {
  const tableData: TTableData = {
    field: [
      "No",
      "Image",
      "Nama Produk",
      "Harga Beli(Rp)",
      "Harga Jual(Rp)",
      "Stok Produk",
      "Aksi",
    ],
    record: [
      ["gambar", "Barang 1", 10000, 90000, 120],
      ["gambar", "Barang 1", 10000, 90000, 120],
    ],
  };
  return (
    <section className="flex grow flex-col gap-2 p-16">
      <h1 className="">Daftar Produk</h1>
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
      <UITable field={tableData.field} record={tableData.record} />
    </section>
  );
}
