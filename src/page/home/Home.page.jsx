import React from "react";
import Nav from "../../components/nav/Nav";
import { Button } from "../../components/ui/button";
import { FaPlus } from "react-icons/fa";
import EmptyLottie from "../../components/lottieComponents/Empty.lottie";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetOverlay,
  SheetPortal,
  SheetTitle,
  SheetTrigger,
} from "../../components/ui/sheet";
import { Label } from "../../components/ui/label";
import { Input } from "../../components/ui/input";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import FormTool from "./tool/Form.tool";
import { useGetQuery } from "../../store/service/endpoints/contact.endpoint";
import DataTableTool from "./tool/DataTable.tool";
import { useState } from "react";
import AuthGuard from "../../components/guard/Auth.Guard";

const HomePage = () => {
  const { data, isError, isLoading, isSuccess } = useGetQuery();
  // console.log(data);

  const [editData, setEditData] = useState({ edit: false, data: null });

  const handleClose = () => {
    setEditData({ edit: false, data: null });
  };

  const handleEdit = (id) => {
    const finder = data.find((i) => i.id === id);
    // console.log(finder);
    setEditData({ edit: true, data: finder });
  };

  // const obj = JSON.stringify(data);
  // const model = JSON.parse(obj);

  // useEffect(() => {
  //   data?.map((i) => {
  //     console.log(i);
  //   });
  // }, [data]);

  const nav = useNavigate();
  const location = useLocation();
  // console.log(location.pathname)
  useEffect(() => {
    if (location.pathname === "/") {
      const item = localStorage.getItem("token_email");
      // console.log(item);
      if (item) {
        nav("/home");
      } else {
        nav("/");
      }
    }
  }, [location, nav]);
  return (
    <>
      {/* <AuthGuard /> */}
      <Sheet>
        <div className="w-screen h-screen bg-[#FCFCFD]">
          <Nav />
          <div className=" mt-5 px-52 mx-auto">
            <div className="flex justify-end mb-5">
              <SheetTrigger>
                <Button className="bg-blue-600 hover:bg-blue-700 gap-2 ">
                  <FaPlus />
                  Create Content
                </Button>
              </SheetTrigger>
            </div>

            {data?.length > 0 ? (
              <DataTableTool handleEdit={handleEdit} apiData={data} />
            ) : (
              <div className="border bg-white w-full h-[500px] mt-5 rounded-lg flex flex-col justify-center items-center">
                <EmptyLottie />
                <p className="text-xl font-semibold text-gray-400">
                  There is no lists...
                </p>
              </div>
            )}
          </div>

          <SheetContent onClose={handleClose} onOverlayClick={handleClose}>
            <SheetHeader>
              <SheetTitle>Contact Information</SheetTitle>
            </SheetHeader>
            <FormTool editData={editData} handleClose={handleClose} />
            {/* <SheetFooter>
            <SheetClose asChild>
              <Button type="submit">Save changes</Button>
            </SheetClose>
          </SheetFooter> */}
          </SheetContent>
        </div>
      </Sheet>
    </>
  );
};

export default HomePage;
