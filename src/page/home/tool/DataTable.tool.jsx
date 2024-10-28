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
import { useDeleteMutation } from "../../../store/service/endpoints/contact.endpoint";
import { useEffect } from "react";
import { SheetTrigger } from "../../../components/ui/sheet";

const DataTableTool = ({ apiData, handleEdit }) => {
  const [swalProps, setSwalProps] = useState({});
  const [deleteFun, { isLoading, isError, data }] = useDeleteMutation();
  // console.log(data)
  // useEffect(() => {
  //   console.log("Testing Delete",data,isError,isLoading)
  // },[data,isError,isLoading])

  const handleDelete = (id) => {
    console.log(id);
    setSwalProps({
      show: true,
      title: "Are you sure want to delete this?",
      text: "This action won't be revert!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes,delete it!",
      confirmButtonColor: "red",
      cancelButtonColor: "blue",
      onResolve: () => {
        setSwalProps({
          show: false,
        });
      },
      onConfirm: async () => {
        console.log(id);
        await deleteFun(id);
        setSwalProps({
          show: false,
        });
        console.log("Hello World");
      },
    });
  };

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
          {apiData.map((i) => (
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
              <TableCell className="text-gray-400 text-wrap w-[250px]">
                {i.address}
              </TableCell>
              <TableCell className="flex gap-3">
                <SheetTrigger>
                  <button
                    className="text-2xl"
                    onClick={handleEdit.bind(null, i.id)}
                  >
                    <MdOutlineModeEdit />
                  </button>
                </SheetTrigger>
                <button
                  className="text-2xl text-red-500"
                  onClick={handleDelete.bind(null, i.id)}
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
