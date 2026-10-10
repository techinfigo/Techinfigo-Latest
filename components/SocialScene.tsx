import React from 'react';
import { Check, Clapperboard, Heart, MessageCircle, Send } from 'lucide-react';
import { PlayInView } from './PlayInView';

/**
 * Social media, explained in one loop (styles: `.soc-*` in globals.css).
 * Left: we post regularly; posts and reels fill the grid, likes come in and
 * followers go up. Right: a DM arrives ("Price kya hai?"), gets a quick reply
 * and is added to the CRM as an enquiry.
 * Everything in it is sample UI. Fills whatever box it is placed in.
 */

const TILES = [
  { cls: 'bg-brandYellow', reel: true },
  { cls: 'bg-brandDark', reel: false },
  { cls: 'bg-[#f6d7a7]', reel: false },
  { cls: 'bg-brandDark/80', reel: true },
  { cls: 'bg-brandYellow/60', reel: false },
  { cls: 'bg-[#e1306c]/70', reel: true },
];

export function SocialScene() {
  return (
    <PlayInView>
      <div className="w-full h-full p-3 sm:p-4 grid grid-cols-[48%_1fr] gap-2.5 sm:gap-3 text-left font-sans">
        {/* Left: your Instagram */}
        <div className="relative rounded-2xl bg-white shadow-[0_15px_40px_-20px_rgba(0,29,33,0.35)] border border-brandDark/5 p-2.5 flex flex-col min-w-0">
          <div className="flex items-center gap-1.5">
            <span className="w-7 h-7 rounded-full p-[2px] bg-gradient-to-tr from-brandYellow to-[#e1306c] shrink-0">
              <span className="w-full h-full rounded-full bg-brandDark text-brandYellow text-[7px] font-black flex items-center justify-center">YS</span>
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-[9.5px] font-black text-brandDark leading-tight truncate">yourshop</p>
              <p className="relative h-[11px] text-[8px] text-brandDark/55 leading-tight">
                <span className="soc-f soc-f-0 absolute inset-0 whitespace-nowrap"><b className="text-brandDark">1,240</b> followers</span>
                <span className="soc-f soc-f-1 absolute inset-0 whitespace-nowrap"><b className="text-brandDark">1,312</b> followers</span>
                <span className="soc-f soc-f-2 absolute inset-0 whitespace-nowrap"><b className="text-emerald-700">1,420</b> followers ↑</span>
              </p>
            </div>
          </div>
          <div className="mt-2 grid grid-cols-3 gap-1">
            {TILES.map((t, i) => (
              <div key={i} className={`soc-tile soc-tile-${i} relative aspect-square rounded-[4px] ${t.cls}`}>
                {t.reel ? <Clapperboard className="absolute top-0.5 right-0.5 w-2.5 h-2.5 text-white/90" /> : null}
              </div>
            ))}
          </div>
          <div className="mt-auto pt-1.5 flex items-center gap-1.5 text-brandDark/60">
            <Heart className="soc-heart w-3.5 h-3.5" />
            <MessageCircle className="w-3.5 h-3.5" />
            <Send className="w-3.5 h-3.5" />
            <span className="ml-auto text-[8px] font-black text-brandDark whitespace-nowrap">12 posts this month</span>
          </div>
          {/* Likes floating up */}
          <span className="soc-like soc-like-0 absolute left-3 bottom-7 px-1.5 py-0.5 rounded-full bg-[#e1306c] text-white text-[8px] font-black">♥ 86</span>
          <span className="soc-like soc-like-1 absolute left-12 bottom-7 px-1.5 py-0.5 rounded-full bg-[#e1306c] text-white text-[8px] font-black">♥ 124</span>
        </div>

        {/* Right: messages */}
        <div className="relative rounded-2xl bg-white shadow-[0_15px_40px_-20px_rgba(0,29,33,0.35)] border border-brandDark/5 p-2.5 flex flex-col min-w-0">
          <div className="flex items-center justify-between">
            <p className="text-[10px] font-black text-brandDark uppercase tracking-wider">Messages</p>
            <span className="soc-ping w-2 h-2 rounded-full bg-[#e1306c]" />
          </div>
          <div className="mt-2 flex flex-col gap-1.5">
            {/* An older chat, so the inbox never looks empty. */}
            <div className="flex items-center gap-1.5 rounded-lg border border-brandDark/5 px-1.5 py-1 opacity-70">
              <span className="w-4 h-4 rounded-full bg-brandYellow/50 text-[7px] font-black text-brandDark flex items-center justify-center shrink-0">A</span>
              <span className="text-[8.5px] text-brandDark/60 truncate">Aman: Order mil gaya, thanks! 👍</span>
            </div>
            <div className="soc-msg soc-msg-in self-start max-w-[92%]">
              <p className="text-[7.5px] font-bold text-brandDark/45 mb-0.5">Riya · Kamla Nagar</p>
              <p className="rounded-xl rounded-tl-sm bg-brandBg px-2 py-1.5 text-[9.5px] font-semibold text-brandDark leading-tight">
                Price kya hai? Kal aa sakte hain? 🙏
              </p>
            </div>
            <span className="soc-typing self-end rounded-xl bg-brandDark/5 px-2 py-1 text-[9px] font-black text-brandDark/40 tracking-widest">•••</span>
            <p className="soc-msg soc-msg-out self-end max-w-[92%] rounded-xl rounded-tr-sm bg-brandDark px-2 py-1.5 text-[9.5px] font-semibold text-white leading-tight">
              Starts at ₹499. Open 10–8, aaiye! 🙂
            </p>
          </div>
          <p className="soc-crm mt-auto rounded-lg bg-emerald-50 text-emerald-800 text-[8.5px] font-black px-2 py-1.5 flex items-center justify-center gap-1">
            <Check className="w-3 h-3" /> Enquiry added to CRM
          </p>
        </div>
      </div>
    </PlayInView>
  );
}
