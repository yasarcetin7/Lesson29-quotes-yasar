import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

// 1. Varyantları tanımlıyoruz (Tıpkı Button.tsx'teki gibi)
const navVariants = cva(
  // Ortak özellikler: Bütün nav'larda geçerli olacak temel yapı
  "w-full flex items-center justify-between p-4 px-6 md:px-10 z-50",
  {
    variants: {
      variant: {
        // İŞTE SENİN İSTEDİĞİN PRIMARY ÖZELLİĞİ:
        primary: "absolute top-0 left-0 bg-transparent",
        
        // İleride kullanmak istersen diye örnek bir secondary (farklı arka plan/pozisyon)
        secondary: "relative bg-slate-800 text-white shadow-md",
      },
    },
    defaultVariants: {
      variant: "primary",
    },
  }
);

export interface NavProps 
  extends React.HTMLAttributes<HTMLElement>, 
  VariantProps<typeof navVariants> {}

function Nav({ className, variant, ...props }: NavProps) {
  return (
    <nav
      className={cn(navVariants({ variant, className }))}
      {...props} // İçine koyacağın her şeyi (children) burada render eder
    />
  );
}

export { Nav, navVariants };