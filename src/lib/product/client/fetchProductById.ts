export default async function fetchProductById(id: string) {
  const fetchReq = await fetch("/api/product/search/byId", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id }),
  });
  const productByID = await fetchReq.json();
  return productByID;
}
