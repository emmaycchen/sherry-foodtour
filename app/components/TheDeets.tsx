"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const deetsImages = [
  "/images/deets_1.jpg",
  "/images/deets_2.jpg",
  "/images/deets_3.jpg",
];

type Item = { title: string; lines: string[] };

const column1: Item[] = [
  { title: "Price", lines: ["US$ 80 / NT$ 2,500 per person"] },
  { title: "Child policy", lines: ["Children welcome. > 5 years old: free"] },
  { title: "Payment methods", lines: ["Cash, PayPal or Wise accepted"] },
  {
    title: "Small group tour",
    lines: ["Max. of 8 guests & Min. of 2 guests", "Private tours available"],
  },
  {
    title: "Duration",
    lines: ["Average 2 to 3 hours, depending on the pace of the group"],
  },
];

const column2: Item[] = [
  { title: "Food & Drinks", lines: ["6-7 tasting stops, drinks included"] },
  { title: "Transport format", lines: ["Walking tour"] },
  { title: "Itinerary", lines: ["Custom itinerary & add-ons available"] },
  { title: "Meeting points", lines: ["Easy to find for all guests"] },
  {
    title: "Special dietary",
    lines: [
      "Any specific dietary needs, such as vegetarian/ vegan/ Gluten-free are welcome",
    ],
  },
];

function DeetItem({ item }: { item: Item }) {
  return (
    <li className="flex gap-3">
      <Image
        src="/images/icon-check-circle.svg"
        alt=""
        width={20}
        height={20}
        className="mt-1 h-5 w-5 shrink-0"
      />
      <div>
        <h3 className="text-[20px] font-bold italic leading-tight">
          {item.title}
        </h3>
        {item.lines.map((line) => (
          <p key={line} className="mt-1 text-[16px] leading-[22px]">
            {line}
          </p>
        ))}
      </div>
    </li>
  );
}

function DeetsCarousel() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(
      () => setActive((i) => (i + 1) % deetsImages.length),
      4000
    );
    return () => clearInterval(id);
  }, []);

  return (
    <div className="flex flex-col">
      <div className="relative min-h-[420px] flex-1 overflow-hidden rounded-[10px]">
        {deetsImages.map((src, i) => (
          <Image
            key={src}
            src={src}
            alt="Sherry's food tour highlights"
            fill
            sizes="(max-width: 1024px) 100vw, 40vw"
            className={`object-cover transition-opacity duration-700 ${
              i === active ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
      </div>

      {/* Dots */}
      <div className="mt-4 flex justify-center gap-2.5">
        {deetsImages.map((src, i) => (
          <button
            key={src}
            type="button"
            aria-label={`Show photo ${i + 1}`}
            onClick={() => setActive(i)}
            className={`h-2.5 w-2.5 rounded-full transition-colors ${
              i === active ? "bg-white" : "border border-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export default function TheDeets() {
  return (
    <section className="w-full bg-black text-white">
      <div className="mx-auto w-full max-w-[1440px] px-6 py-14 sm:px-10 md:py-16 lg:px-[73px] lg:py-20">
        {/* Heading */}
        <div>
          {/* Top row: arrow + dashed line + Food Tours */}
          <div className="flex items-center gap-4 text-cream">
            <svg
              width="9"
              height="14"
              viewBox="0 0 9 14"
              fill="none"
              aria-hidden
              className="shrink-0"
            >
              <path
                d="M8 1L2 7l6 6"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="h-0 flex-1 border-t border-dashed border-current" />
            <span className="shrink-0 font-script text-3xl text-cream sm:text-4xl lg:text-[48px]">
              Food Tours
            </span>
          </div>

          {/* The Deets + red squiggle accent */}
          <div className="relative mt-5 inline-block">
            <Image
              src="/images/hero-squiggle.svg"
              alt=""
              width={237}
              height={24}
              className="absolute -top-3 left-0 h-auto w-[90px]"
            />
            <h2 className="relative text-2xl font-bold lg:text-[24px]">
              The Deets
            </h2>
          </div>
        </div>

        {/* Body */}
        <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:mt-12 lg:grid-cols-[1fr_1fr_1.35fr] lg:gap-x-12">
          {/* Column 1 */}
          <ul className="space-y-6 lg:space-y-7">
            {column1.map((item) => (
              <DeetItem key={item.title} item={item} />
            ))}
          </ul>

          {/* Column 2 + bottom squiggle */}
          <div>
            <ul className="space-y-6 lg:space-y-7">
              {column2.map((item) => (
                <DeetItem key={item.title} item={item} />
              ))}
            </ul>
            <Image
              src="/images/hero-squiggle.svg"
              alt=""
              width={237}
              height={24}
              className="ml-8 mt-6 hidden h-auto w-[200px] lg:block"
            />
          </div>

          {/* Image carousel */}
          <div className="sm:col-span-2 lg:col-span-1">
            <DeetsCarousel />
          </div>
        </div>
      </div>
    </section>
  );
}
