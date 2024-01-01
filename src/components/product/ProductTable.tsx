"use client";
import { useProductState } from "@/hook/product/useProduct";
import deleteProductById from "@/lib/product/client/deleteProductById";
import fetchAllProducts from "@/lib/product/client/fetchAllProducts";
import { TTableData } from "@/type/table";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
} from "@nextui-org/react";
import { useState } from "react";
import ConfirmationModal from "./ConfirmationModal";
import Link from "next/link";

export default function ProductTable({ record }: TTableData) {
  const field = [
    "No",
    "Image",
    "Nama Produk",
    "Kategori Produk",
    "Harga Beli(Rp)",
    "Harga Jual(Rp)",
    "Stok",
    "Aksi",
  ];
  console.log({ record });
  const { setProduct } = useProductState();
  const [isModalShow, setIsModalShow] = useState(false);
  const [willDeletedProduct, setWillDeletedProduct] = useState<string>("");
  const DeleteionConfirmationModal = () => {
    return (
      <div className="fixed top-1/4 right-1/3 p-8 bg-default-200 rounded-2xl order-10">
        <strong>kamu yakin ingin menghapus product ini?</strong>
        <div className="flex gap-4 w-full mt-8">
          <Button onClick={() => setIsModalShow(false)}>Batalkan</Button>
          <Button
            color="danger"
            onClick={() => {
              deleteProductById(willDeletedProduct).then((deletedProduct) => {
                console.log(deletedProduct);
                fetchAllProducts(7, 0)
                  .then((product) => {
                    setProduct(product.data);
                  })
                  .catch((err) => console.log(err));
              });
            }}
          >
            Ya, aku yakin
          </Button>
        </div>
      </div>
    );
  };
  return (
    <>
      {isModalShow && <DeleteionConfirmationModal />}
      <Table aria-label="product table" className="w-full">
        <TableHeader>
          {field.map((item) => (
            <TableColumn key={item} className="text-center">
              {item}
            </TableColumn>
          ))}
        </TableHeader>
        <TableBody className="-order-4">
          {record.map((cell, index) => (
            <TableRow key={cell.id}>
              <TableCell className="text-center">{index + 1}</TableCell>
              <TableCell className="text-center">{cell.image}</TableCell>
              <TableCell className="text-center">{cell.name}</TableCell>
              <TableCell className="text-center">{cell.categoryName}</TableCell>
              <TableCell className="text-center">{cell.price}</TableCell>
              <TableCell className="text-center">{cell.sellingPrice}</TableCell>
              <TableCell className="text-center">{cell.stocks}</TableCell>
              <TableCell className="flex gap-2 justify-center">
                <Link href={`/product/editProduct?productId=${cell.id}`}>
                  <Button variant="faded" color="secondary">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                    >
                      <path d="m18.988 2.012 3 3L19.701 7.3l-3-3zM8 16h3l7.287-7.287-3-3L8 13z"></path>
                      <path d="M19 19H8.158c-.026 0-.053.01-.079.01-.033 0-.066-.009-.1-.01H5V5h6.847l2-2H5c-1.103 0-2 .896-2 2v14c0 1.104.897 2 2 2h14a2 2 0 0 0 2-2v-8.668l-2 2V19z"></path>
                    </svg>
                  </Button>
                </Link>
                <ConfirmationModal productId={cell.id} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
