"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import ObfuscatedEmail from "./ObfuscatedEmail";

const fieldClass =
  "h-[50px] w-full rounded-[10px] bg-white px-4 text-base text-black placeholder:text-[#ababab] outline-none focus:ring-2 focus:ring-gold";

const labelClass = "text-lg text-white";

export default function BookingForm() {
  const router = useRouter();

  return (
    <section id="contact" className="w-full bg-black text-white">
      <div className="mx-auto w-full max-w-[1440px] px-6 py-14 sm:px-10 md:py-16 lg:px-[75px] lg:py-20">
        {/* Heading with decorative arrows + dashed lines */}
        <div className="flex items-center gap-4 text-white">
          <div className="flex flex-1 items-center gap-2">
            <svg width="9" height="14" viewBox="0 0 9 14" fill="none" aria-hidden className="shrink-0">
              <path d="M8 1l-6 6 6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="h-0 flex-1 border-t border-dashed border-current" />
          </div>
          <h2 className="shrink-0 font-script text-3xl text-cream sm:text-4xl lg:text-[40px]">
            Book a Tour
          </h2>
          <div className="flex flex-1 items-center gap-2">
            <span className="h-0 flex-1 border-t border-dashed border-current" />
            <svg width="9" height="14" viewBox="0 0 9 14" fill="none" aria-hidden className="shrink-0">
              <path d="M1 1l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-12 lg:mt-14 lg:grid-cols-2 lg:gap-16">
          {/* Left: intro + contact */}
          <div className="lg:self-center">
            <h3 className="font-script text-3xl sm:text-4xl lg:text-[38px]">
              Let&rsquo;s Get in Touch
            </h3>
            <p className="mt-6 max-w-[486px] text-base leading-normal text-white">
              Whether you&rsquo;ve got questions about our tours, need to organise
              a private experience or just want to say hello, we&rsquo;d love to
              hear from you.
            </p>

            <div className="mt-8 max-w-[499px] border-t border-gold pt-6">
              <div className="flex items-center gap-4 text-lg">
                <Image src="/images/icon-email.svg" alt="" width={30} height={24} className="shrink-0" />
                <ObfuscatedEmail
                  reversedLocal="813gnahcyrrehs"
                  domain="gmail"
                  tld="com"
                  className="text-white transition-opacity hover:opacity-80"
                />
              </div>
              <a
                href="https://wa.me/886975724127"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 flex items-center gap-4 text-lg transition-opacity hover:opacity-80"
              >
                <Image src="/images/icon-whatsapp.svg" alt="" width={30} height={30} className="shrink-0" />
                +886 975 724 127
              </a>
            </div>
          </div>

          {/* Right: form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              router.push("/booking/confirmation");
            }}
            className="flex flex-col gap-6"
          >
            {/* Row 1: Name | Phone */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-[383fr_291fr]">
              <label className="flex flex-col gap-2">
                <span className={labelClass}>Name</span>
                <input type="text" placeholder="Jane Smith" className={fieldClass} />
              </label>
              <label className="flex flex-col gap-2">
                <span className={labelClass}>Phone</span>
                <input type="tel" placeholder="+886 912345678" className={fieldClass} />
              </label>
            </div>

            {/* Row 2: Email | Number of People */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-[492fr_184fr]">
              <label className="flex flex-col gap-2">
                <span className={labelClass}>Email</span>
                <input type="email" placeholder="example@company.com" className={fieldClass} />
              </label>
              <label className="flex flex-col gap-2">
                <span className={labelClass}>No. of People</span>
                <div className="relative">
                  <select
                    defaultValue={5}
                    aria-label="No. of People"
                    className={`${fieldClass} appearance-none pr-10`}
                  >
                    {Array.from({ length: 19 }, (_, i) => i + 2).map((n) => (
                      <option key={n} value={n} className="text-black">
                        {n}
                      </option>
                    ))}
                  </select>
                  <svg
                    aria-hidden
                    className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-black"
                    width="18"
                    height="11"
                    viewBox="0 0 18 11"
                    fill="none"
                  >
                    <path d="M1 1l8 8 8-8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </label>
            </div>

            <label className="flex flex-col gap-2">
              <span className={labelClass}>Dates</span>
              <input type="text" placeholder="Wednesday, 2 April 2025" className={fieldClass} />
            </label>

            <label className="flex flex-col gap-2">
              <span className={labelClass}>Message</span>
              <textarea
                rows={5}
                placeholder="*Please include dietary requirements and numbers of children if any"
                className="h-[156px] w-full resize-none rounded-[10px] bg-white px-4 py-3 text-base text-black placeholder:text-[#ababab] outline-none focus:ring-2 focus:ring-gold"
              />
            </label>

            <button
              type="submit"
              className="mx-auto mt-2 h-[56px] w-[204px] rounded-[30px] bg-gold font-ui text-base font-semibold text-black transition-colors hover:bg-[#ffcd00]"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
