import Image from "next/image";
import Link from "next/link";

const stats = [
  { value: "250+", label: "Visitors" },
  { value: "100+", label: "Food Vendors" },
  { value: "50+", label: "Tours" },
];

export default function Hero() {
  return (
    <section className="relative isolate w-full overflow-hidden text-white">
      <Image
        src="/images/hero.png"
        alt="Crowded Taipei food market at night"
        fill
        priority
        sizes="100vw"
        className="-z-10 object-cover object-center"
      />
      <div className="absolute inset-0 -z-10 bg-black/30" />

      {/* Go to Day Tour — top-left overlay */}
      <div className="absolute left-6 top-7 z-10 sm:left-10 lg:left-[72px] lg:top-9">
        <a href="#tours" className="flex min-w-0 items-center gap-2 lg:gap-[11px]">
          <Image
            src="/images/icon-menu.svg"
            alt="Menu"
            width={26}
            height={26}
            className="h-[26px] w-[26px] shrink-0"
          />
          <span className="truncate font-quicksand text-[16px] font-bold leading-none text-white md:text-[20px]">
            Go to Day Tour
          </span>
        </a>
        <Image
          src="/images/hero-squiggle.svg"
          alt=""
          width={157}
          height={14}
          className="mt-1 ml-9 lg:ml-[37px]"
        />
      </div>

      <div
        className="
          mx-auto flex w-full max-w-[1440px] flex-col items-center
          px-6 pb-16 pt-28
          sm:px-10 sm:pt-32
          md:px-16
          lg:min-h-[1030px] lg:px-20 lg:pb-[110px] lg:pt-[188px]
        "
      >
        <h1
          className="
            font-script text-center font-normal leading-tight tracking-tight
            text-4xl
            sm:text-5xl
            md:text-6xl
            lg:text-[64px]
          "
        >
          Taste The Heart of Taipei
        </h1>

        <Link
          href="/hot-tours"
          className="
            inline-flex items-center justify-center
            cursor-pointer truncate rounded-[10px] border-[3px] border-[#FFD700] bg-[#FFD700]
            font-quicksand font-semibold text-black transition-colors hover:bg-[#ffcd00]
            mt-24 h-12 w-[180px] text-[14px]
            sm:mt-32
            md:text-[16px]
            lg:mt-[400px] lg:h-[50px] lg:w-[200px]
          "
        >
          My Food Tours
        </Link>

        <ul
          className="
            mt-16 flex gap-8 text-left
            sm:mt-20 sm:gap-12
            lg:mt-[90px] lg:gap-[120px]
          "
        >
          {stats.map((stat) => (
            <li
              key={stat.label}
              className="flex flex-col items-start border-l border-white/70 pl-4 lg:pl-[18px]"
            >
              <span
                className="
                  font-bold leading-none
                  text-2xl
                  sm:text-3xl
                  lg:text-[32px]
                "
              >
                {stat.value}
              </span>
              <span
                className="
                  mt-2 font-bold
                  text-sm
                  sm:text-lg
                  lg:text-[24px]
                "
              >
                {stat.label}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
