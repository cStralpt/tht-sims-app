import prisma from "@/lib/prisma";
import { promises as fs } from "fs";
import { getAllProducts } from "@/lib/product/getAllProduct";
import getProductByategoryName from "@/lib/product/getProductByCategoryName";
import convertBufferIntoFile from "@/lib/system/convertBufferIntoFile";

export async function GET(request: Request) {
  const products = await getAllProducts();
  return Response.json(products);
}
export async function POST(request: Request) {
  const body = await request.json();
  console.log({ body: body });
  const products = await getProductByategoryName(body.categoryName);
  return Response.json(products);
}

export async function DELETE(request: Request) {
  const body = await request.json();
  const isProductExist = await prisma.product.findUnique({
    where: { id: body.id },
  });
  if (!isProductExist) {
    return Response.json(
      {
        message: "Product not found, deletion cancelled",
      },
      {
        status: 404,
        statusText: "Product not found",
      },
    );
  }
  const deletedProduct = await prisma.product.delete({
    where: { id: body.id },
  });
  return Response.json({
    message: "Product deleted",
    data: deletedProduct,
  });
}

export async function PUT(request: Request) {
  const body = await request.formData();
  const imgFile: File | null = body.get("productImg") as unknown as File;
  const imageName = imgFile.name.split(".").shift() + "_tht";
  let newProduct;
  console.log(imageName);
  const fileType = imgFile.type.split("/")[1];
  try {
    newProduct = await prisma.product.create({
      data: {
        name: body.get("productName") as string,
        price: parseInt(body.get("price") as string),
        sellingPrice: parseInt(body.get("price") as string) * 1.3,
        stocks: parseInt(body.get("stocks") as string),
        image: imageName,
        category: {
          connect: {
            name: body.get("categoryName") as string,
          },
        },
      },
    });
    if (imgFile !== null) {
      convertBufferIntoFile(imgFile, imageName, fileType);
    }
    console.log({ newProduct });
  } catch (error) {
    console.log(error);
    return Response.json(
      { message: "cannot add product" },
      {
        status: 500,
      },
    );
  }

  console.log(imgFile.type.split("/")[1]);
  return Response.json(
    { message: "Product added", product: newProduct },
    { status: 201, statusText: "product added succesfuly" },
  );
}
