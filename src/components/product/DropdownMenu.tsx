import React, { useState, useEffect } from "react";
import { Category } from "@prisma/client";
import { fetchProductByCategory } from "@/lib/product/client/fetchProductByCategory";
import { useProductState } from "@/hook/product/useProduct";

export default function DropdownCategory({
  isOnProductList = false,
}: {
  isOnProductList?: boolean;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("Pilih Kategori");
  const [categoryList, setCategoryList] = React.useState<Category[]>();
  const { setProduct, getProduct } = useProductState();

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    (async () => {
      const fetchCategoryList = await fetch("/api/product/category");
      const productCategoryList = await fetchCategoryList.json();
      setCategoryList(productCategoryList.category);
      console.log(productCategoryList);
    })();
  }, []);
  return (
    <div className="relative overflow-hidden- h-full flex items-center">
      <div>
        <button
          type="button"
          className="inline-flex h-full justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
          onClick={toggleDropdown}
        >
          {selectedCategory}
          <svg
            className="-mr-1 ml-2 h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M10 12l-8-8 1.5-1.5L10 9.5 16.5 2 18 3.5z"
              clipRule="evenodd"
            />
          </svg>
        </button>
        <input
          type="text"
          value={selectedCategory}
          name="category"
          className="hidden"
        />
      </div>

      {isOpen && (
        <div className="origin-top-right absolute order-4 right-0 -top-8 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div
            className="py-1"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            {categoryList &&
              categoryList.map((item: Category) => (
                <a
                  key={item.id}
                  className="block px-4 py-2 text-sm bg-purple-100 text-purple-700 cursor-pointer"
                  onClick={() => {
                    toggleDropdown();
                    setSelectedCategory(item.name);
                    if (isOnProductList) {
                      fetchProductByCategory(item.name)
                        .then((product) => {
                          setProduct(product);
                        })
                        .catch((err) => console.error(err));
                    }
                  }}
                  role="menuitem"
                >
                  {item.name}
                </a>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}
