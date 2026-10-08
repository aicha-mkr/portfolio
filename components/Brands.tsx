import type { ResolvedBrand } from "@/lib/brands";
import { BrandLogo } from "./BrandLogo";

function Row({ brands, reverse }: { brands: ResolvedBrand[]; reverse?: boolean }) {
  const copy = (clone?: boolean) => (
    <ul className="flex shrink-0 items-center" aria-hidden={clone || undefined} data-marquee-clone={clone || undefined}>
      {brands.map((brand) => (
        <li key={brand.id} className="flex items-center gap-8 pr-8 md:gap-12 md:pr-12">
          <span className="grid h-20 w-40 place-items-center md:h-24 md:w-52">
            <BrandLogo brand={brand} className="h-12 w-full md:h-16" />
          </span>
          <span aria-hidden="true" className="size-1.5 shrink-0 rounded-full bg-fg/30" />
        </li>
      ))}
    </ul>
  );

  return (
    <div data-marquee data-pausable data-duration="55" data-reverse={reverse || undefined} className="overflow-hidden py-3">
      <div data-marquee-track style={{ "--marquee-duration": "55s" } as React.CSSProperties}>
        {copy()}
        {copy(true)}
      </div>
    </div>
  );
}

/** Logo strip of every brand in data/portfolio.ts. */
export function Brands({ brands }: { brands: ResolvedBrand[] }) {
  const half = Math.ceil(brands.length / 2);
  return (
    <section id="brands" data-theme="light" aria-labelledby="brands-title" className="overflow-hidden py-28 md:py-36">
      <div className="container-x flex flex-wrap items-end justify-between gap-6">
        <h2 id="brands-title" data-split className="headline-alt text-display font-medium uppercase">
          Brands I&apos;ve <span className="serif">worked</span> with
        </h2>
        <p className="text-label text-fg-muted">{brands.length} brands</p>
      </div>
      <div className="mt-14 space-y-2 md:mt-20">
        <Row brands={brands.slice(0, half)} />
        <Row brands={brands.slice(half)} reverse />
      </div>
    </section>
  );
}
