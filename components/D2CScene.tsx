import React from 'react';
import { Check, Megaphone, Pointer, Repeat, ShoppingBag, ShoppingCart, Star } from 'lucide-react';
import { PlayInView } from './PlayInView';

/**
 * Online brands (D2C), explained in one loop (styles: `.dc-*` in globals.css).
 * Left, on a phone: Instagram ad → product page → order placed → WhatsApp
 * reminder → repeat order. Right: each order lands in "Your store", then the
 * real profit (after ad cost) is shown.
 * Everything in it is sample UI. Fills whatever box it is placed in.
 */

const screen = 'dc-screen absolute inset-0 flex flex-col';

export function D2CScene() {
  return (
    <PlayInView>
      <div className="w-full h-full p-3 sm:p-4 grid grid-cols-[40%_1fr] gap-2.5 sm:gap-3 text-left font-sans">
        {/* Left: the customer's phone */}
        <div className="flex items-center justify-center min-w-0">
          <div className="relative w-[108px] h-[190px] rounded-[1.4rem] bg-brandDark p-1 shadow-[0_20px_40px_-18px_rgba(0,29,33,0.6)] shrink-0">
            <div className="relative w-full h-full rounded-[1.1rem] bg-white overflow-hidden">
              {/* 1. Instagram ad */}
              <div className={`${screen} dc-screen-0`}>
                <div className="flex items-center gap-1 px-1.5 py-1">
                  <span className="w-3.5 h-3.5 rounded-full bg-gradient-to-tr from-brandYellow to-[#e1306c]" />
                  <span className="text-[7px] font-black text-brandDark">yourbrand</span>
                  <span className="ml-auto flex items-center gap-0.5 text-[6px] text-brandDark/45"><Megaphone className="w-2 h-2" />Ad</span>
                </div>
                <div className="flex-1 bg-gradient-to-br from-brandYellow to-[#f6d7a7] flex items-center justify-center">
                  <div className="w-12 h-9 rounded-md bg-brandDark/85 flex items-center justify-center">
                    <span className="text-[6.5px] font-black text-brandYellow text-center leading-tight">Kaju Katli<br />Box</span>
                  </div>
                </div>
                <span className="dc-tap dc-tap-0 m-1.5 rounded-md bg-[#1a73e8] text-white text-[7.5px] font-black py-1 text-center">Shop now · ₹899</span>
              </div>
              {/* 2. Product page */}
              <div className={`${screen} dc-screen-1 p-1.5`}>
                <div className="h-[70px] rounded-md bg-gradient-to-br from-brandYellow/70 to-[#f6d7a7] flex items-center justify-center">
                  <div className="w-12 h-9 rounded-md bg-brandDark/85" />
                </div>
                <p className="mt-1.5 text-[8px] font-black text-brandDark leading-tight">Kaju Katli Box (500g)</p>
                <div className="flex items-center gap-0.5 mt-0.5">
                  {[0, 1, 2, 3, 4].map((i) => <Star key={i} className="w-2 h-2 fill-brandYellow text-brandYellow" />)}
                  <span className="text-[6.5px] text-brandDark/50 ml-0.5">(214)</span>
                </div>
                <p className="mt-0.5 text-[9px] font-black text-brandDark">₹899</p>
                <span className="dc-tap dc-tap-1 mt-auto rounded-md bg-brandYellow text-brandDark text-[7.5px] font-black py-1 flex items-center justify-center gap-0.5">
                  <ShoppingCart className="w-2.5 h-2.5" /> Add to cart
                </span>
              </div>
              {/* 3. Order placed */}
              <div className={`${screen} dc-screen-2 items-center justify-center p-2 text-center`}>
                <span className="dc-pop w-9 h-9 rounded-full bg-emerald-500 text-white flex items-center justify-center">
                  <Check className="w-5 h-5" strokeWidth={3} />
                </span>
                <p className="mt-2 text-[9px] font-black text-brandDark">Order placed!</p>
                <p className="text-[7px] text-brandDark/55">#1041 · Paid by UPI</p>
                <p className="mt-1 text-[7px] text-brandDark/55">Delivery in 2 days</p>
              </div>
              {/* 4. WhatsApp reminder → repeat order */}
              <div className={`${screen} dc-screen-3 bg-[#efe7dd]`}>
                <div className="bg-[#075e54] px-1.5 py-1 text-[7px] font-black text-white">yourbrand</div>
                <div className="flex-1 p-1.5 flex flex-col gap-1">
                  <p className="self-start max-w-[90%] rounded-md bg-white px-1.5 py-1 text-[7px] text-brandDark leading-tight shadow-sm">
                    Hi Riya! 🪔 Time for another box? 10% off for you.
                  </p>
                  <p className="dc-reply self-end max-w-[90%] rounded-md bg-[#dcf8c6] px-1.5 py-1 text-[7px] text-brandDark leading-tight shadow-sm">
                    Yes! Same box please 😊
                  </p>
                  <span className="dc-reorder mt-auto rounded-md bg-emerald-500 text-white text-[7px] font-black py-1 text-center">✓ Reordered</span>
                </div>
              </div>
              <span className="dc-finger absolute left-1/2 text-brandDark drop-shadow pointer-events-none">
                <Pointer className="w-4 h-4 fill-white" />
              </span>
            </div>
          </div>
        </div>

        {/* Right: your store */}
        <div className="relative rounded-2xl bg-white shadow-[0_15px_40px_-20px_rgba(0,29,33,0.35)] border border-brandDark/5 p-3 flex flex-col min-w-0">
          <div className="flex items-center justify-between">
            <p className="text-[10px] font-black text-brandDark uppercase tracking-wider">Your store</p>
            <span className="text-[8.5px] font-bold text-brandDark/40">Today</span>
          </div>
          <ul className="mt-2 space-y-1.5">
            {/* An earlier order, so the store never looks empty. */}
            <li className="flex items-center gap-1.5 rounded-lg border border-brandDark/5 px-1.5 py-1 min-w-0 opacity-70">
              <span className="w-5 h-5 rounded-md bg-brandDark/10 text-brandDark flex items-center justify-center shrink-0"><ShoppingBag className="w-2.5 h-2.5" /></span>
              <span className="text-[8px] text-brandDark/60 truncate">Order #1039 · ₹1,299 · Google</span>
            </li>
            <li className="dc-row dc-row-0 flex items-center gap-1.5 rounded-lg bg-brandBg px-1.5 py-1.5 min-w-0">
              <span className="w-5 h-5 rounded-md bg-brandDark text-brandYellow flex items-center justify-center shrink-0"><ShoppingBag className="w-2.5 h-2.5" /></span>
              <span className="min-w-0 flex-1">
                <span className="block text-[9px] font-black text-brandDark leading-tight truncate">New order · ₹899</span>
                <span className="block text-[7.5px] text-brandDark/50 leading-tight truncate">from Instagram ad</span>
              </span>
            </li>
            <li className="dc-row dc-row-1 flex items-center gap-1.5 rounded-lg bg-brandBg px-1.5 py-1.5 min-w-0">
              <span className="w-5 h-5 rounded-md bg-emerald-500 text-white flex items-center justify-center shrink-0"><Repeat className="w-2.5 h-2.5" /></span>
              <span className="min-w-0 flex-1">
                <span className="block text-[9px] font-black text-brandDark leading-tight truncate">Repeat order · ₹809</span>
                <span className="block text-[7.5px] text-brandDark/50 leading-tight truncate">via WhatsApp · ₹0 ad cost</span>
              </span>
            </li>
          </ul>
          <div className="dc-profit mt-auto rounded-xl bg-brandDark px-2 py-1.5">
            <div className="flex justify-between text-[9.5px] font-black text-brandYellow"><span>Profit tracked</span><span>₹610 ✓</span></div>
            <p className="text-[7.5px] font-bold text-white/60 truncate">₹1,708 sales − ₹420 ad cost − product</p>
          </div>
        </div>
      </div>
    </PlayInView>
  );
}
