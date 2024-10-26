import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Nav = () => {
  return (
    <div className="w-full  px-52 border-b-2 bg-white">
      <div className="h-16 flex items-center justify-between">
        <h1 className="font-semibold text-lg">MMS</h1>
        <div>
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
