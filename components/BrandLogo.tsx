import Image from "next/image";
import type { ResolvedBrand } from "@/lib/brands";

/** A brand's logo in its original colors, or its name as a text placeholder when the file is missing. */
export function BrandLogo({ brand, sizes = "12rem", className = "" }: { brand: ResolvedBrand; sizes?: string; className?: string }) {
  if (!brand.logo) {
    return (
      <span className={`grid place-items-center text-center text-sm font-semibold uppercase leading-tight tracking-[0.12em] text-fg/70 ${className}`}>
        {brand.name}
      </span>
    );
  }
  return (
    <span className={`relative block ${className}`}>
      <Image
        src={brand.logo}
        alt={brand.name}
        fill
        sizes={sizes}
        unoptimized={brand.logo.endsWith(".svg")}
        className="object-contain"
      />
    </span>
  );
}
