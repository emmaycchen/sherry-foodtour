import Image from "next/image";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import FaqAccordion from "../components/FaqAccordion";

export const metadata = {
  title: "FAQs — Sherry's Food Tour",
  description:
    "Frequently asked questions about Sherry's Food Tour — pricing, languages, meeting points, booking changes, and more.",
};

export default function FaqsPage() {
  return (
    <>
      <Navbar />

      <main className="flex-1">
        {/* ── Hero ───────────────────────────────────────────── */}
        <section className="relative w-full overflow-hidden">
          <div className="relative h-[480px] w-full sm:h-[600px] lg:h-[750px]">
            <Image
              src="/images/hero-FAQ.png"
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

            {/* Title block — mirrors the detail-page hero geometry (586×272 block).
                FAQs uses only the top arrow curving down toward the heading. */}
            <div className="@container absolute left-[8%] top-[44.5%] aspect-[586/272] w-[min(586px,80vw)]">
              {/* Yellow hand-drawn arrow above/left of the heading */}
              <Image
                src="/images/arrow-hero-top.svg"
                alt=""
                aria-hidden
                width={212}
                height={67}
                className="pointer-events-none absolute left-[7%] top-[16.3%] h-auto w-[36.2%]"
              />

              <h1 className="absolute left-[7%] top-[42.9%] whitespace-nowrap font-script leading-normal text-white text-[10.92cqw]">
                FAQs
              </h1>
            </div>
          </div>
        </section>

        {/* ── FAQ accordion ──────────────────────────────────── */}
        <section className="w-full bg-[#e8e8e8] text-black">
          <div className="mx-auto w-full max-w-[1440px] px-6 py-14 sm:px-10 lg:px-[54px] lg:py-[73px]">
            <FaqAccordion />

            {/* Action row: back button (left) + centered Back to Home */}
            <div className="mt-16 flex items-center">
              <Link
                href="/"
                aria-label="Back to Home"
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

              <div className="flex flex-1 justify-center">
                <Link
                  href="/"
                  className="flex h-[50px] w-[200px] items-center justify-center rounded-[10px] border-[3px] border-gold bg-white font-ui text-[16px] font-semibold text-black transition-colors hover:bg-cream"
                >
                  Back to Home
                </Link>
              </div>

              {/* Spacer to keep Back to Home optically centered against the back button */}
              <div aria-hidden className="w-[45px] shrink-0" />
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
