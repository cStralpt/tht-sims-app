import React from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";
import { useProductState } from "@/hook/product/useProduct";
import { fetchProductByCategory } from "@/lib/product/client/fetchProductByCategory";

export default function DropDown() {
  const [selectedKeys, setSelectedKeys] = React.useState(new Set(["Categori"]));
  const { setProduct } = useProductState();

  const selectedValue = React.useMemo(
    () => Array.from(selectedKeys).join(", ").replaceAll("_", " "),
    [selectedKeys],
  );

  return (
    <Dropdown className="w-fit relative border-4 top-0 left-0">
      <DropdownTrigger>
        <Button variant="bordered" className="capitalize">
          {selectedValue}
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        aria-label="categori"
        variant="flat"
        disallowEmptySelection
        selectionMode="single"
        selectedKeys={selectedKeys}
        onSelectionChange={(keys) =>
          setSelectedKeys(new Set(keys as unknown as string[]))
        }
      >
        <DropdownItem
          key="Alat Olahraga"
          onClick={() => {
            fetchProductByCategory("Alat Olahraga")
              .then((data) => setProduct(data))
              .catch((err) => console.log(err));
          }}
        >
          Alat Olahraga
        </DropdownItem>
        <DropdownItem
          key="Alat Musik"
          onClick={() => {
            fetchProductByCategory("Alat Musik")
              .then((data) => setProduct(data))
              .catch((err) => console.log(err));
          }}
        >
          Alat Musik
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
