"use client";

import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";

const Header = () => {
  return (
    <div className="p-3 px-5 flex justify-between shadow-md">
      <Link href={"/"}>
        <div className="flex items-center gap-2 cursor-pointer">
          <img src="/logo.svg" alt="logo" width={40} height={40} />
          <p className="logo-text text-primary font-bold text-lg">ReUp</p>
        </div>
      </Link>

      <div className="flex gap-4 items-center">
        <Link href={"/dashboard"}>
          <Button
            variant="outline"
            className="text-primary border-primary hover:text-secondary hover:border-secondary"
          >
            Dashboard
          </Button>
        </Link>
        <UserButton />
      </div>
    </div>
  );
};

export default Header;
