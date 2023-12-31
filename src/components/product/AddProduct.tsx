import { Button, Input, Spacer } from "@nextui-org/react";
import Link from "next/link";

export default function AddProduct() {
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
      <form action="" className="flex flex-col gap-4">
        <div className="flex gap-4">
          <div className="w-full">
            <Spacer x={9} />
            <Input
              type="text"
              variant="bordered"
              color="secondary"
              label="Kategori"
              labelPlacement="outside"
            />
          </div>
          <div className="w-full">
            <Spacer x={9} />
            <Input
              type="text"
              variant="bordered"
              color="secondary"
              label="Nama Barang"
              labelPlacement="outside"
            />
          </div>
        </div>
        <div className="flex gap-4 grow">
          <div className="w-full">
            <Spacer x={9} />
            <Input
              type="number"
              variant="bordered"
              color="secondary"
              label="Harga Beli"
              labelPlacement="outside"
            />
          </div>
          <div className="w-full">
            <Spacer x={9} />
            <Input
              type="number"
              variant="bordered"
              color="secondary"
              label="Harga Jual"
              labelPlacement="outside"
            />
          </div>
          <div className="w-full">
            <Spacer x={9} />
            <Input
              type="number"
              variant="bordered"
              color="secondary"
              label="Stok Barang"
              labelPlacement="outside"
            />
          </div>
        </div>
        <div className="">
          <div className="">
            <label
              htmlFor="product-img"
              className="w-full h-full p-16 border-2 border-dashed rounded-xl flex flex-col justify-center items-center cursor-pointer text-purple-950 text-2xl text-bold"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="300"
                height="300"
                viewBox="0 0 24 24"
                fill="purple"
              >
                <path d="m9 13 3-4 3 4.5V12h4V5c0-1.103-.897-2-2-2H4c-1.103 0-2 .897-2 2v12c0 1.103.897 2 2 2h8v-4H5l3-4 1 2z"></path>
                <path d="M19 14h-2v3h-3v2h3v3h2v-3h3v-2h-3z"></path>
              </svg>
              Upload Gambar Disini
            </label>
            <input type="file" className="hidden" id="product-img" />
          </div>
        </div>
        <div className="flex gap-2 items-center ml-auto">
          <Button color="secondary" variant="faded">
            Batalkan
          </Button>
          <Button color="secondary">Simpan</Button>
        </div>
      </form>
    </section>
  );
}
