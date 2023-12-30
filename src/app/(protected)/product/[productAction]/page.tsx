import AddProduct from "@/components/product/AddProduct";
import ProductList from "@/components/product/ProductList";

export default function Product({
  params,
}: {
  params: { productAction: string };
}) {
  const productViewList = {
    productList: <ProductList />,
    addProduct: <AddProduct />,
  };
  return (
    <main className="grow">
      {productViewList[params.productAction as keyof typeof productViewList]}
    </main>
  );
}
