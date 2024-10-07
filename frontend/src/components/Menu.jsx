import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import React from "react";

const Menu = ({ menuItems }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className='bg-blue-600 text-white rounded-md px-1 text-xs'>Select</DropdownMenuTrigger>
      <DropdownMenuContent>
        {menuItems.map((menuItem) => {
          return <DropdownMenuItem key={menuItem?.id}>{menuItem?.text}</DropdownMenuItem>;
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Menu;
