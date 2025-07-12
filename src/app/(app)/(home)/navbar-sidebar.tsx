import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet";

import { ScrollArea } from "@/components/ui/scroll-area";
import Link from "next/link";


interface NavbarItem {
  href: string;
  children: React.ReactNode;
}

interface Props {
  items: NavbarItem[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onItemClick: () => void;
}

export const NavbarSidebar = ({
  items,
  open,
  onOpenChange,
  onItemClick,
}: Props) => {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="left" className="p-0 transition-none">
        <SheetHeader className="p-4 border-b">
            <SheetTitle>Menu</SheetTitle>
        </SheetHeader>

        <ScrollArea className="flex flex-col overflow-y-auto h-full pb-2">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={onItemClick}
              className="w-full flex items-center px-4 py-3 text-left hover:bg-black hover:text-white text-base font-medium transition-colors"
            >
              {item.children}
            </Link>
          ))}
          <div className="border-t">
            <Link href="/sign-in" className="w-full flex items-center px-4 py-3 text-left hover:bg-black hover:text-white text-base font-medium transition-colors">
                Log in
            </Link>

            <Link href="/sign-up" className="w-full flex items-center px-4 py-3 text-left hover:bg-black hover:text-white text-base font-medium transition-colors">
                Start selling
            </Link>
            
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};