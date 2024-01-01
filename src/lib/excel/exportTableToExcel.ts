import { Product } from "@prisma/client";
import * as XLSX from "xlsx";
import formatNumberIntoIdr from "../product/formatNumberIntoIdr";

export const exportTableToExcel = (products: any) => {
  const headerRow = [
    "No",
    "Nama Produk",
    "Kategori Produk",
    "Harga Beli(Rp)",
    "Harga Jual(Rp)",
    "Stok",
  ];
  const tableData = products.map((item: Product, index: number) => [
    index + 1,
    item.name,
    item.categoryName,
    formatNumberIntoIdr(item.price),
    formatNumberIntoIdr(item.sellingPrice),
    item.stocks,
  ]);
  const finalData = [headerRow, ...tableData];

  const ws = XLSX.utils.aoa_to_sheet(finalData);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

  XLSX.writeFile(wb, "exported_data.xlsx");
};
