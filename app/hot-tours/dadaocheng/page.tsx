import Image from "next/image";
import Link from "next/link";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import HotTours from "../../components/HotTours";

export const metadata = {
  title: "Flavors of Dadaocheng — Sherry's Food Tour",
  description:
    "Flavors of Dadaocheng: step back into Old Taipei's culinary soul along historic Dihua Street — slow-cooked comfort food, heritage tea houses, and Sherry's must-eat highlights.",
};

const highlights = [
  `Cisheng Temple Food Street (大稻埕慈聖宮): The ultimate local experience. Pull up a plastic stool under the massive banyan trees in front of the temple courtyard. Order a bowl of Yejia Meat Congee (葉家肉粥)—a delicately flavored rice broth—and pair it with crispy red-braised pork belly (紅燒肉) or golden-fried oysters.`,
  `Yongle Market (永樂市場): Head inside this historic textile hub to track down incredibly comforting, old-school savory oil rice (油飯), packed with fragrant shiitake mushrooms and pork, or grab a box of plump, handmade herbal mochi.`,
  `Lin Ji Sheng Hao (林記生號): Sample deeply soothing bowls of traditional Four Gods Soup (四神湯), a clear, medicinal broth slow-simmered with pork intestines, barley, and traditional herbs.`,
];

export default function DadaochengPage() {
  return (
    <>
      <Navbar />

      <main className="flex-1">
        {/* ── Hero ───────────────────────────────────────────── */}
        <section className="relative w-full overflow-hidden">
          <div className="relative h-[480px] w-full sm:h-[600px] lg:h-[750px]">
            <Image
              src="/images/street-stall.jpg"
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

            {/* Title block — mirrors Figma's 586×272 block at (116,334) in the
                1440×750 hero. Container queries scale the text (cqw) and the
                arrows (% of block) together, so everything stays proportional.
                Dadaocheng's title is set at 64px per Figma (vs 48px elsewhere). */}
            <div className="@container absolute left-[8%] top-[44.5%] aspect-[586/272] w-[min(586px,80vw)]">
              {/* Top arrow — above/left of the title, pointing down toward it */}
              <Image
                src="/images/arrow-hero-top.svg"
                alt=""
                aria-hidden
                width={212}
                height={67}
                className="pointer-events-none absolute left-[7%] top-[16.3%] h-auto w-[36.2%]"
              />

              <h1 className="absolute left-[7%] top-[42.9%] whitespace-nowrap font-script leading-normal text-white text-[10.92cqw]">
                Flavors of Dadaocheng
              </h1>
              <p className="absolute left-[7%] top-[71.9%] whitespace-nowrap font-script leading-normal text-gold text-[6.83cqw]">
                Hot Tours
              </p>

              {/* Bottom arrow — right of "Hot Tours", pointing left toward it */}
              <Image
                src="/images/arrow-hero-bottom.svg"
                alt=""
                aria-hidden
                width={171}
                height={39}
                className="pointer-events-none absolute left-[64.2%] top-[73.7%] h-auto w-[29.2%]"
              />
            </div>
          </div>
        </section>

        {/* ── Content ────────────────────────────────────────── */}
        <section className="w-full bg-[#f5f5f5] text-black">
          <div className="mx-auto w-full max-w-[1440px] px-6 py-14 sm:px-10 lg:px-[74px] lg:py-[73px]">
            {/* Script heading + dark-red brush stroke */}
            <div className="relative w-fit">
              <h2 className="font-script text-[26px] text-black sm:text-[30px] lg:text-[32px]">
                {`Step Back in Time: Old Taipei’s Culinary Soul “Dadaocheng”`}
              </h2>
              <Image
                src="/images/ningxia-brushstroke.svg"
                alt=""
                aria-hidden
                width={413}
                height={22}
                className="mt-2 ml-[38%] w-[220px] sm:w-[300px] lg:w-[413px]"
              />
            </div>

            {/* Two-column: text left, food photo right */}
            <div className="mt-9 grid grid-cols-1 gap-10 lg:grid-cols-[850px_418px] lg:gap-9">
              <div className="font-sans text-[18px] leading-[normal] text-black">
                <p>
                  {`If Ximen is Taipei’s neon-drenched future, Dadaocheng is its beautifully preserved heart. Nestled along the Tamsui River, this historic merchant district perfectly fuses century-old heritage with a thriving modern creative scene. Walking down Dihua Street, the air is thick with the nostalgic aromas of roasted tea leaves, Chinese medicinal herbs, and dried seafood. For a food tour, Dadaocheng offers a completely unique experience: the chance to taste authentic, slow-cooked Taiwanese comfort food exactly as it tasted generations ago.`}
                </p>
                <p className="mt-6">
                  {`While the historic shophouses now host trendy espresso bars, the area’s legendary culinary anchors remain untouched, drawing local foodies every morning and afternoon.`}
                </p>
                <p className="mt-6">The Ultimate Dadaocheng Checklist:</p>
                <ul className="mt-6 list-disc space-y-6 pl-6">
                  {highlights.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>

              {/* Food photo — 418×464, 8px radius per Figma */}
              <div className="relative aspect-[418/464] w-full overflow-hidden rounded-[8px] lg:w-[418px]">
                <Image
                  src="/images/dadao-street.png"
                  alt="Historic Dihua Street in Dadaocheng, Old Taipei"
                  fill
                  sizes="(max-width: 1024px) 100vw, 418px"
                  className="object-cover"
                />
              </div>
            </div>

            {/* Pro tips — full-width block below the two-column area (per Figma) */}
            <div className="mt-10 font-sans text-[18px] leading-[normal] text-black">
              <p>
                {`Pro tips: Where Century-Old Tea Traditions Meet Modern Cafés`}
              </p>
              <p className="mt-6">
                {`Beyond its savory street food, Dadaocheng is the historic cradle of Taiwan’s global tea trade. In the late 19th century, this bustling port district sent premium oolong and jasmine teas down the Tamsui River to the rest of the world. Today, that rich history is fueling a breathtaking renaissance. Walking down Dihua Street, you’ll find third-generation heritage tea merchants operating right next door to sleek, third-wave espresso bars.`}
              </p>
              <p className="mt-6">
                {`What makes exploring Dadaocheng’s beverage scene so special is the architecture. Many cafes and tea houses are hidden inside beautifully restored minnan shophouses—characterized by narrow storefronts that open up into stunning, sun-drenched central courtyards hidden far from the street.`}
              </p>
            </div>

            {/* Action row: back button (left) + centered Book Now */}
            <div className="mt-14 flex items-center">
              <Link
                href="/hot-tours"
                aria-label="Back to Hot Tours"
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
                  href="/booking"
                  className="flex h-[40px] w-[150px] items-center justify-center rounded-[50px] bg-gold font-ui text-[16px] font-semibold text-black transition-colors hover:bg-[#ffcd00]"
                >
                  Book Now
                </Link>
              </div>

              {/* Spacer to keep Book Now optically centered against the back button */}
              <div aria-hidden className="w-[45px] shrink-0" />
            </div>
          </div>
        </section>

        {/* ── Hot Tours carousel (reused, detail variant) ──────── */}
        <HotTours variant="detail" />
      </main>

      <Footer />
    </>
  );
}
