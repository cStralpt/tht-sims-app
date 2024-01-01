import {
  UPLOADED_PRODUCT_IMAGE_SIZE,
  UPLOADED_PRODUCT_IMAGE_TYPES,
} from "@/constants";
import useUserFromJwt from "@/hook/user/useUserFromJwt";
import prisma from "@/lib/prisma";
import { getAllProducts } from "@/lib/product/getAllProduct";
import getProductByategoryName from "@/lib/product/getProductByCategoryName";
import convertBufferIntoFile from "@/lib/system/convertBufferIntoFile";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const pagination = request.nextUrl.searchParams;

  const { isUserAuthenticated } = useUserFromJwt();
  if (isUserAuthenticated === undefined) {
    return Response.json(
      { message: "unauthorized" },
      {
        status: 401,
      },
    );
  }

  const totalRecord = await prisma.product.count();
  const take = parseInt(pagination.get("take") as string);
  const skip = parseInt(pagination.get("skip") as string);
  if (take !== null && skip !== null) {
    console.log({ pagination: { take, skip } });
    const products = await getAllProducts(take, skip);
    return Response.json({
      message: "success",
      data: products,
      length: totalRecord,
    });
  }
}
export async function POST(request: Request) {
  const body = await request.json();

  const { isUserAuthenticated } = useUserFromJwt();
  if (isUserAuthenticated === undefined) {
    return Response.json(
      { message: "unauthorized" },
      {
        status: 401,
      },
    );
  }

  console.log({ body: body });
  const products = await getProductByategoryName(body.categoryName);
  return Response.json(products);
}

export async function DELETE(request: Request) {
  const body = await request.json();
  const { isUserAuthenticated } = useUserFromJwt();
  if (isUserAuthenticated === undefined) {
    return Response.json(
      { message: "unauthorized" },
      {
        status: 401,
      },
    );
  }
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
const checkAcceptedFileType = (imgFile: File) => {
  if (
    UPLOADED_PRODUCT_IMAGE_TYPES[0] === imgFile.type ||
    UPLOADED_PRODUCT_IMAGE_TYPES[1] === imgFile.type
  ) {
    return true;
  } else {
    return false;
  }
};
export async function PUT(request: Request) {
  const body = await request.formData();
  const { isUserAuthenticated } = useUserFromJwt();
  if (isUserAuthenticated === undefined) {
    return Response.json(
      { message: "unauthorized" },
      {
        status: 401,
      },
    );
  }
  const imgFile: File | null = body.get("productImg") as unknown as File;
  let newProduct;
  let imageName =
    imgFile.name.split(".").shift() +
    "_tht" +
    "." +
    imgFile.name.split(".").pop();
  const fileType = imgFile.type.split("/")[1];
  console.log({ imgFile });
  if (imgFile.size > UPLOADED_PRODUCT_IMAGE_SIZE) {
    return Response.json(
      {
        message: "maximum file size is 100KB",
      },
      {
        status: 413,
      },
    );
  }
  if (checkAcceptedFileType(imgFile) === false) {
    return Response.json(
      {
        message: "wrong file type",
      },
      {
        status: 415,
      },
    );
  }
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

export async function PATCH(request: Request) {
  const body = await request.formData();

  const { isUserAuthenticated } = useUserFromJwt();
  if (isUserAuthenticated === undefined) {
    return Response.json(
      { message: "unauthorized" },
      {
        status: 401,
      },
    );
  }

  const imgFile: File | null = body.get("productImg") as unknown as File;
  if (imgFile.size > UPLOADED_PRODUCT_IMAGE_SIZE) {
    return Response.json(
      {
        message: "maximum file size is 100KB",
      },
      {
        status: 413,
      },
    );
  }
  if (checkAcceptedFileType(imgFile) === false) {
    return Response.json(
      {
        message: "wrong file type",
      },
      {
        status: 415,
      },
    );
  }
  let imageName =
    imgFile.name.split(".").shift() +
    "_tht" +
    "." +
    imgFile.name.split(".").pop();
  let newProduct;
  console.log(imageName);
  const fileType = imgFile.type.split("/")[1];
  try {
    newProduct = await prisma.product.update({
      where: {
        id: body.get("id") as string,
      },
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
