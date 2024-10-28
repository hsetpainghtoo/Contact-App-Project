import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "../ui/button";
import { useLogoutMutation } from "../../store/service/endpoints/auth.endpoint";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Nav = () => {
  const [logoutFun] = useLogoutMutation();
  const nav = useNavigate();
  const handleLogout = async () => {
    await logoutFun();
    localStorage.removeItem("token_email");
    nav("/");
    toast.success("Logout successfully!")
  }
  return (
    <div className="w-full  px-52 border-b-2 bg-white">
      <div className="h-16 flex items-center justify-between">
        <h1 className="font-semibold text-lg">MMS</h1>
        <div className="flex justify-center items-center gap-5">
          <Button onClick={handleLogout} className="bg-red-500 hover:bg-red-600">Logout</Button>
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>HP</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </div>
  );
};

export default Nav;
