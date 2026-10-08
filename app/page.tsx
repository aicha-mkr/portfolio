import { portfolio } from "@/data/portfolio";
import { getBrands } from "@/lib/brands";
import { About } from "@/components/About";
import { Brands } from "@/components/Brands";
import { Contact } from "@/components/Contact";
import { Featured } from "@/components/Featured";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Marquee } from "@/components/Marquee";
import { PillNav } from "@/components/PillNav";
import { Skills } from "@/components/Skills";
import { Animations } from "@/components/motion/Animations";
import { Curtain } from "@/components/motion/Curtain";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { ThemeObserver } from "@/components/motion/ThemeObserver";

export default function Home() {
  const { profile, contact } = portfolio;
  const initials = profile.name
    .split(" ")
    .map((part) => part[0])
    .join("");

  return (
    <>
      <SmoothScroll />
      <ThemeObserver />
      <Curtain />
      <Header name={profile.name} />
      <main id="main">
        <Hero profile={profile} />
        <Marquee words={portfolio.marquee} />
        <About about={portfolio.about} />
        <Featured projects={portfolio.featured} />
        <Brands brands={getBrands()} />
        <Skills groups={portfolio.skills} certifications={portfolio.certifications} />
        <Contact contact={contact} />
      </main>
      <Footer name={profile.name} contact={contact} />
      <PillNav initials={initials} photo={profile.photo || undefined} />
      <Animations />
    </>
  );
}
