import AddProduct from "@/components/product/AddProduct";
import EditProduct from "@/components/product/EditProduct";
import ProductList from "@/components/product/ProductList";

export default function Product({
  params,
}: {
  params: { productAction: string };
}) {
  const productViewList = {
    productList: <ProductList />,
    addProduct: <AddProduct />,
    editProduct: <EditProduct />,
  };
  return (
    <main className="grow overflow-hidden overflow-y-auto">
      {productViewList[params.productAction as keyof typeof productViewList]}
    </main>
  );
}
