"use client";
import { TTableData } from "@/type/table";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
} from "@nextui-org/react";

export default function UITable({ field, record }: TTableData) {
  return (
    <Table aria-label="product table" className="w-full">
      <TableHeader>
        {field.map((item) => (
          <TableColumn key={item} className="text-center">
            {item}
          </TableColumn>
        ))}
      </TableHeader>
      <TableBody>
        {record.map((item, index) => {
          return (
            <TableRow key={item[index]}>
              <TableCell className="text-center">{index + 1}</TableCell>
              {item.map((data) => (
                <TableCell key={data} className="text-center">
                  {data}
                </TableCell>
              ))}
              <TableCell className="flex gap-2 justify-center">
                <Button variant="faded" color="secondary">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path d="m18.988 2.012 3 3L19.701 7.3l-3-3zM8 16h3l7.287-7.287-3-3L8 13z"></path>
                    <path d="M19 19H8.158c-.026 0-.053.01-.079.01-.033 0-.066-.009-.1-.01H5V5h6.847l2-2H5c-1.103 0-2 .896-2 2v14c0 1.104.897 2 2 2h14a2 2 0 0 0 2-2v-8.668l-2 2V19z"></path>
                  </svg>
                </Button>
                <Button variant="ghost" color="secondary">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path d="M6 7H5v13a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7H6zm10.618-3L15 2H9L7.382 4H3v2h18V4z"></path>
                  </svg>
                </Button>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
