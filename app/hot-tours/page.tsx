import Image from "next/image";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import TourCard, { type Tour } from "../components/TourCard";

export const metadata = {
  title: "More Food Hot Tours — Sherry's Food Tour",
  description:
    "Explore Sherry's hottest Taipei food tours — Ningxia, Ximen and Dadaocheng — packed with hidden gems and local flavour.",
};

// Region icons (dark red #A52C17), exported from the Figma frame.
const ICON_MOON = { src: "/images/icon-moon.svg", alt: "Evening tour", size: 25 };
const ICON_SUN = { src: "/images/icon-sun.svg", alt: "Daytime tour", size: 30 };
const ICON_GATE = { src: "/images/icon-gate.svg", alt: "Cultural landmarks tour", size: 30 };

const tours: Tour[] = [
  {
    slug: "ningxia",
    image: "/images/ningxia.png",
    title: "Neon Nights: Ningxia",
    description:
      "Often called the “stomach of Taipei”, Ningxia is a compact, food-focused gem of Taipei’s Datong district.",
    icons: [ICON_MOON],
  },
  {
    slug: "ximen",
    image: "/images/ximen.png",
    title: "Ximen Urban Indulgence",
    description:
      "Also known as the “Harajuku of Taipei”, Ximen offers Taiwanese street food, comfort classics and trendy treats. The area comes alive especially at night so it’s the perfect place for grazing and people watching.",
    icons: [ICON_MOON],
  },
  {
    slug: "dadaocheng",
    image: "/images/dadaocheng.png",
    title: "Flavors of Dadaocheng",
    description:
      "Discover Taipei’s oldest district centered around historic Dihua street as it is the perfect blend of 19th century architecture and a very vibrant food scene.",
    icons: [ICON_GATE, ICON_SUN, ICON_MOON],
  },
];

export default function HotToursPage() {
  return (
    <>
      <Navbar />

      <main className="flex-1">
        {/* ── Hero ───────────────────────────────────────────── */}
        <section className="relative w-full overflow-hidden">
          <div className="relative h-[480px] w-full sm:h-[600px] lg:h-[750px]">
            <Image
              src="/images/hero-HotTourPage.png"
              alt=""
              fill
              priority
              className="object-cover"
            />
            {/* Dark overlay (two stacked gradients), exact values from Figma */}
            <div
              aria-hidden
              className="absolute inset-0"
              style={{
                backgroundImage:
                  "linear-gradient(90deg, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.2) 100%), linear-gradient(89.5416deg, rgba(0, 0, 0, 0.57) 37.537%, rgba(171, 171, 171, 0.57) 61.956%)",
              }}
            />

            {/* Title block — left-of-center */}
            <div className="absolute left-6 top-[58%] max-w-[635px] -translate-y-1/2 sm:left-10 lg:left-[148px]">
              <h1 className="font-script text-[40px] leading-none text-white sm:text-[46px] lg:text-[52px]">
                More Food Hot Tours
              </h1>
              <Image
                src="/images/foodtour-squiggle.svg"
                alt=""
                width={393}
                height={16}
                className="mt-3 w-[260px] sm:w-[320px] lg:w-[393px]"
              />
            </div>
          </div>
        </section>

        {/* ── Tour cards + Day Tour banner (light gray) ─────────── */}
        <section className="w-full bg-[#f5f5f5] text-black">
          <div className="mx-auto w-full max-w-[1440px] px-6 py-16 sm:px-10 lg:px-[71px] lg:py-[80px]">
            <div className="grid grid-cols-1 gap-x-[25px] gap-y-14 md:grid-cols-3">
              {tours.map((tour) => (
                <TourCard key={tour.slug} tour={tour} />
              ))}
            </div>
          </div>

          {/* Day Tour banner */}
          <div className="mx-auto w-full max-w-[1440px] px-6 pb-16 sm:px-10 lg:px-[70px] lg:pb-[80px]">
            <div className="flex items-center gap-6">
              {/* Circular back button → home */}
              <Link
                href="/"
                aria-label="Back to home"
                className="flex h-[45px] w-[45px] shrink-0 items-center justify-center rounded-full border border-gold bg-white text-black transition-colors hover:bg-cream"
              >
                <svg width="9" height="14" viewBox="0 0 9 14" fill="none" aria-hidden>
                  <path
                    d="M8 1l-6 6 6 6"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>

              <div className="flex flex-1 flex-wrap items-center justify-center gap-x-4 gap-y-2 text-center">
                <span className="font-sans text-[20px] font-semibold leading-[40px] text-black md:text-[24px]">
                  We also offer Day Tours and Customized Tours
                </span>
                <Link href="/" className="flex items-center gap-2 transition-opacity hover:opacity-80">
                  <Image
                    src="/images/icon-menu-red.svg"
                    alt=""
                    width={35}
                    height={35}
                    className="h-[35px] w-[35px]"
                  />
                  <span className="font-ui text-[22px] font-semibold text-[#a52c17] md:text-[28px]">
                    Go to Day Tour
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
