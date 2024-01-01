import { Spacer, Input, Button } from "@nextui-org/react";
import Image from "next/image";
import { FormEventHandler } from "react";
import DropdownCategory from "@/components/product/DropdownMenu";

export default function ProductForm({
  handleSubmit,
  defaultValues = {
    category: "",
    productName: "",
    price: "",
    productImg: "",
    stocks: "",
  },
}: {
  handleSubmit: FormEventHandler<HTMLFormElement>;
  defaultValues?: {
    category: string;
    productName: string;
    price: string;
    stocks: string;
    productImg: string;
  };
}) {
  return (
    <form
      action=""
      className="flex flex-col gap-4"
      encType="multipart/form-data"
      onSubmit={handleSubmit}
    >
      <div className="flex gap-4">
        <div className="w-1/4">
          <Spacer x={9} />
          <DropdownCategory />
        </div>
        <div className="w-full">
          <Spacer x={9} />
          <Input
            type="text"
            variant="bordered"
            name="productName"
            color="secondary"
            label="Nama Barang"
            isRequired
            labelPlacement="outside"
            defaultValue={defaultValues.productName}
          />
        </div>
      </div>
      <div className="flex gap-4 grow">
        <div className="w-full">
          <Spacer x={9} />
          <Input
            type="number"
            variant="bordered"
            defaultValue={defaultValues?.price}
            color="secondary"
            name="price"
            isRequired
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
            name="stocks"
            defaultValue={defaultValues.stocks}
            isRequired
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
            {defaultValues.productImg === "" ? (
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
            ) : (
              <Image
                src={`/product/${defaultValues?.productImg}`}
                width={300}
                className="aspect-auto"
                height={300}
                alt="Product Image"
              />
            )}
            Upload Gambar Disini
          </label>
          <input
            type="file"
            name="productImg"
            className="hidden"
            id="product-img"
          />
        </div>
      </div>
      <div className="flex gap-2 items-center ml-auto">
        <Button color="secondary" variant="faded">
          Batalkan
        </Button>
        <Button color="secondary" type="submit">
          Simpan
        </Button>
      </div>
    </form>
  );
}
