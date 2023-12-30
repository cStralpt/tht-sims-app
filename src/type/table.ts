export interface Product {
  id: string;
  name: string;
  categoryName: string;
  price: number;
  sellingPrice: number;
  stocks: number;
  image: string;
  createdAt: Date;
  updatedAt: Date;
}
export type TTableData = {
  record: Product[];
};
