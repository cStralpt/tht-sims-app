export default async function deleteProductById(id: string) {
  const deleteReq = await fetch("/api/product", {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id }),
  });
  const deletedProduct = await deleteReq.json();
  return deletedProduct;
}
