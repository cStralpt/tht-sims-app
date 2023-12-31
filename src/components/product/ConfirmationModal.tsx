import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import deleteProductById from "@/lib/product/client/deleteProductById";
import fetchAllProducts from "@/lib/product/client/fetchAllProducts";
import { useProductState } from "@/hook/product/useProduct";

export default function ConfirmationModal({
  productId,
}: {
  productId: string;
}) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { setProduct } = useProductState();

  return (
    <>
      <Button variant="ghost" color="secondary" onPress={onOpen}>
        <svg
          height="24"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          viewBox="0 0 24 24"
        >
          <path d="M6 7H5v13a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7H6zm10.618-3L15 2H9L7.382 4H3v2h18V4z"></path>
        </svg>
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        backdrop="blur"
        classNames={{ backdrop: ["bg-purple-500/50"] }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Konfirmasi Penghapusan
              </ModalHeader>
              <ModalBody>
                Apakah Anda yakin ingin menghapus produk ini?
              </ModalBody>
              <ModalFooter>
                <Button onClick={onClose}>Batalkan</Button>
                <Button
                  color="danger"
                  onPress={onClose}
                  onClick={() => {
                    deleteProductById(productId).then((deletedProduct) => {
                      console.log(deletedProduct);
                      fetchAllProducts()
                        .then((data) => {
                          setProduct(data);
                        })
                        .catch((err) => console.log(err));
                    });
                  }}
                >
                  Ya, aku yakin
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
