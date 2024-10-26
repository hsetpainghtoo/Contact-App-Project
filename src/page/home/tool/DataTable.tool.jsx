import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../components/ui/table";
import { MdDeleteForever } from "react-icons/md";
import { MdOutlineModeEdit } from "react-icons/md";
import SweetAlert2 from "react-sweetalert2";
import { useState } from "react";

const DataTableTool = ({ data }) => {
  console.log(data);
  const [swalProps, setSwalProps] = useState({});

  return (
    <div>
      <Table className="my-5 ">
        <TableHeader>
          <TableRow className="bg-blue-600 rounded-lg text-[16px]">
            <TableHead className="rounded-l-lg">No</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead className="text-end">Phone</TableHead>
            <TableHead>Address</TableHead>
            <TableHead className="rounded-r-lg">Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {data.map((i) => (
            <TableRow
              key={i.id}
              className="bg-[#FCFCFD] hover:bg-slate-100 font-semibold"
            >
              <TableCell>{i.id}</TableCell>
              <TableCell>{i.name}</TableCell>
              <TableCell className="text-gray-400">{i.email}</TableCell>
              <TableCell className="text-end text-gray-400">
                {i.phone}
              </TableCell>
              <TableCell className="text-gray-400">{i.address}</TableCell>
              <TableCell className="flex gap-3">
                <button className="text-2xl">
                  <MdOutlineModeEdit />
                </button>
                <button
                  className="text-2xl text-red-500"
                  onClick={() => {
                    setSwalProps({
                      show: true,
                      title: "Basic Usage",
                      text: "Hello World",
                    });
                  }}
                >
                  <MdDeleteForever />
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <SweetAlert2 {...swalProps} />
    </div>
  );
};

export default DataTableTool;
