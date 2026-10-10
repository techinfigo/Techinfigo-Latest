import React from 'react';
import { BarChart3, Camera, Check, Clapperboard, Clock, Eye, Heart, MessageCircle, Music, Scissors, Send, Type, UserPlus } from 'lucide-react';
import { PlayInView } from './PlayInView';

/**
 * Social media, explained in one loop (styles: `.sx-*` in globals.css):
 * our work line, Shoot → Edit → Post → Results. A step bar runs along the
 * top; below it, each step plays its own small scene in turn.
 * Everything in it is sample UI. Fills whatever box it is placed in.
 */

const STEPS = [
  { label: 'Shoot', Icon: Camera },
  { label: 'Edit', Icon: Scissors },
  { label: 'Post', Icon: Send },
  { label: 'Results', Icon: BarChart3 },
];

const frame = 'absolute inset-0 rounded-2xl shadow-[0_15px_40px_-20px_rgba(0,29,33,0.35)] p-3';
const panel = `${frame} bg-white border border-brandDark/5`;

export function SocialScene() {
  return (
    <PlayInView>
      <div className="w-full h-full p-3 sm:p-4 flex flex-col gap-2.5 text-left font-sans">
        {/* Step bar */}
        <div className="relative shrink-0">
          <div className="grid grid-cols-4 gap-1.5">
            {STEPS.map((s, i) => (
              <div key={s.label} className={`sx-step sx-step-${i} flex items-center justify-center gap-1 rounded-full py-1.5 text-[9.5px] font-black`}>
                <s.Icon className="w-3 h-3" /> {s.label}
              </div>
            ))}
          </div>
          <div className="mt-1.5 h-1 rounded-full bg-brandDark/10 overflow-hidden">
            <div className="sx-progress h-full rounded-full bg-brandYellow" />
          </div>
        </div>

        {/* Stage */}
        <div className="relative flex-1 min-h-0">
          {/* 1. Shoot */}
          <div className={`${frame} sx-stage sx-stage-0 bg-brandDark flex items-center justify-center overflow-hidden`}>
            <div className="absolute inset-3">
              <span className="absolute left-0 top-0 w-4 h-4 border-l-2 border-t-2 border-white/70" />
              <span className="absolute right-0 top-0 w-4 h-4 border-r-2 border-t-2 border-white/70" />
              <span className="absolute left-0 bottom-0 w-4 h-4 border-l-2 border-b-2 border-white/70" />
              <span className="absolute right-0 bottom-0 w-4 h-4 border-r-2 border-b-2 border-white/70" />
            </div>
            <div className="sx-subject flex items-end gap-2">
              <div className="w-10 h-14 rounded-lg bg-brandYellow" />
              <div className="w-14 h-10 rounded-lg bg-[#f6d7a7]" />
              <div className="w-8 h-8 rounded-full bg-[#e1306c]/70" />
            </div>
            <span className="absolute left-5 top-4 flex items-center gap-1 text-[9px] font-black text-white">
              <span className="sx-rec w-2 h-2 rounded-full bg-red-500" /> REC 00:12
            </span>
            <span className="absolute right-5 bottom-4 text-[8.5px] font-bold text-white/60">Shoot at your shop</span>
          </div>

          {/* 2. Edit */}
          <div className={`${panel} sx-stage sx-stage-1 flex gap-2.5`}>
            <div className="relative w-[34%] rounded-lg bg-brandDark overflow-hidden shrink-0">
              <div className="absolute inset-x-2 top-3 h-8 rounded bg-brandYellow/80" />
              <span className="sx-caption absolute inset-x-1.5 bottom-3 rounded bg-white text-[7.5px] font-black text-brandDark text-center py-0.5">Diwali offer 🎉</span>
            </div>
            <div className="flex-1 min-w-0 flex flex-col">
              <p className="text-[9.5px] font-black text-brandDark">Editing your reel</p>
              <div className="mt-1.5 flex flex-wrap gap-1">
                <span className="flex items-center gap-0.5 rounded-md bg-brandBg px-1.5 py-0.5 text-[8px] font-bold text-brandDark"><Type className="w-2.5 h-2.5" /> Text</span>
                <span className="flex items-center gap-0.5 rounded-md bg-brandBg px-1.5 py-0.5 text-[8px] font-bold text-brandDark"><Music className="w-2.5 h-2.5" /> Music</span>
                <span className="flex items-center gap-0.5 rounded-md bg-brandBg px-1.5 py-0.5 text-[8px] font-bold text-brandDark"><Clapperboard className="w-2.5 h-2.5" /> Cuts</span>
              </div>
              {/* Timeline */}
              <div className="relative mt-auto space-y-1">
                <div className="flex gap-0.5 h-4">
                  <div className="w-[30%] rounded-sm bg-brandYellow" />
                  <div className="w-[25%] rounded-sm bg-brandDark/70" />
                  <div className="w-[45%] rounded-sm bg-[#e1306c]/60" />
                </div>
                <div className="flex gap-0.5 h-2">
                  <div className="w-[55%] rounded-sm bg-brandDark/15" />
                  <div className="w-[45%] rounded-sm bg-emerald-300" />
                </div>
                <span className="sx-playhead absolute -top-1 -bottom-1 w-0.5 bg-red-500 rounded-full" />
              </div>
            </div>
          </div>

          {/* 3. Post */}
          <div className={`${panel} sx-stage sx-stage-2 flex gap-2.5`}>
            <div className="relative w-[34%] rounded-lg bg-gradient-to-b from-brandYellow to-[#e1306c]/60 shrink-0 flex items-end p-1.5">
              <Clapperboard className="absolute top-1.5 right-1.5 w-3 h-3 text-white" />
              <span className="rounded bg-white text-[7.5px] font-black text-brandDark px-1 py-0.5">Diwali offer 🎉</span>
            </div>
            <div className="flex-1 min-w-0 flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-full bg-brandDark text-brandYellow text-[6.5px] font-black flex items-center justify-center shrink-0">YS</span>
                <span className="text-[9.5px] font-black text-brandDark truncate">yourshop</span>
              </div>
              <p className="mt-1.5 text-[8.5px] text-brandDark/65 leading-snug">Diwali boxes ready! 🪔 Order on WhatsApp or visit us in Agra.</p>
              <p className="mt-1 text-[8px] font-bold text-[#1a73e8] truncate">#agra #sweets #diwali</p>
              <div className="relative mt-auto h-[22px]">
                <span className="sx-sched absolute inset-0 rounded-lg bg-brandBg text-brandDark text-[8.5px] font-black flex items-center justify-center gap-1">
                  <Clock className="w-3 h-3" /> Scheduled · 7:00 PM
                </span>
                <span className="sx-posted absolute inset-0 rounded-lg bg-emerald-50 text-emerald-800 text-[8.5px] font-black flex items-center justify-center gap-1">
                  <Check className="w-3 h-3" /> Posted on Instagram + Facebook
                </span>
              </div>
            </div>
          </div>

          {/* 4. Results */}
          <div className={`${panel} sx-stage sx-stage-3 flex gap-2.5`}>
            <div className="grid grid-rows-3 gap-1 w-[46%] shrink-0">
              <div className="sx-stat sx-stat-0 rounded-lg bg-brandBg px-2 flex items-center gap-1.5">
                <Eye className="w-3 h-3 text-brandDark/60" />
                <span className="text-[11px] font-black text-brandDark">12.4K</span>
                <span className="text-[8px] text-brandDark/50">views</span>
              </div>
              <div className="sx-stat sx-stat-1 rounded-lg bg-brandBg px-2 flex items-center gap-1.5">
                <Heart className="w-3 h-3 text-[#e1306c] fill-[#e1306c]" />
                <span className="text-[11px] font-black text-brandDark">860</span>
                <span className="text-[8px] text-brandDark/50">likes</span>
              </div>
              <div className="sx-stat sx-stat-2 rounded-lg bg-brandBg px-2 flex items-center gap-1.5">
                <UserPlus className="w-3 h-3 text-emerald-700" />
                <span className="text-[11px] font-black text-emerald-700">+120</span>
                <span className="text-[8px] text-brandDark/50">followers</span>
              </div>
            </div>
            <div className="flex-1 min-w-0 flex flex-col">
              <div className="flex-1 flex items-end gap-1">
                {[22, 30, 26, 44, 58, 76, 96].map((h, i) => (
                  <div key={i} className="flex-1 h-full flex items-end">
                    <div className={`sx-bar sx-bar-${i} w-full rounded-t-sm ${i > 3 ? 'bg-brandYellow' : 'bg-brandDark/15'}`} style={{ height: `${h}%` }} />
                  </div>
                ))}
              </div>
              <span className="sx-dms mt-1.5 rounded-lg bg-brandDark text-white text-[8.5px] font-black py-1 flex items-center justify-center gap-1">
                <MessageCircle className="w-3 h-3 text-brandYellow" /> 6 DMs asking price
              </span>
            </div>
          </div>
        </div>
      </div>
    </PlayInView>
  );
}
