import React from 'react';

export const TestimonialsSection: React.FC = () => {
  const reviews = [
    {
      name: "Alex Johnson",
      time: "2 MONTHS AGO",
      text: "Finally found a team that understands profit. They don't just show me ad screenshots; they show me how much money we actually made after all costs. My bank balance is finally moving.",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150"
    },
    {
      name: "Samantha Lee",
      time: "1 MONTH AGO",
      text: "The abandoned cart setup they built for us started paying for the entire monthly retainer within the first 14 days. If you're a Shopify founder, these guys are a no-brainer.",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150"
    },
    {
      name: "Ben Carter",
      time: "3 WEEKS AGO",
      text: "We were stuck at 20L for almost a year. Techinfigo cleaned up our tracking and fixed our landing pages. We hit 45L last month with better margins than we had before.",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150"
    },
    {
      name: "Maria Garcia",
      time: "4 MONTHS AGO",
      text: "What I love most is the Loom walkthroughs every Monday. I don't have to guess what's happening with my budget. It's the most transparent agency experience I've ever had.",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150"
    },
    {
      name: "David Chen",
      time: "1 WEEK AGO",
      text: "They told me my offer was the problem, not my ads. I was annoyed at first, but we changed it based on their advice and our ROAS doubled in two weeks. They know their stuff.",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150"
    },
    {
      name: "Rohan Mehta",
      time: "2 WEEKS AGO",
      text: "Direct access to the strategists makes a huge difference. No junior account managers who don't understand the numbers. Highly professional and result-oriented.",
      avatar: "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?auto=format&fit=crop&q=80&w=150"
    }
  ];

  const StarRating = () => (
    <div className="flex gap-0.5">
      {[...Array(5)].map((_, i) => (
        <svg key={i} className="w-4 h-4 text-brandYellow" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );

  return (
    <section className="w-full py-24 lg:py-40 px-6 bg-[#fcfcfc] font-sans">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Grid */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-20 lg:mb-24">
          <div className="space-y-6">
            <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-brandYellow block">REDUCE YOUR RISK</span>
            <h2 className="text-4xl lg:text-7xl font-black text-brandDark tracking-tighter leading-none">
              Real Feedback From <br />
              D2C Founders Like You.
            </h2>
          </div>

          {/* Rating Summary Card */}
          <div className="bg-white border border-brandDark/5 rounded-3xl p-6 lg:p-8 flex items-center gap-6 shadow-4xl animate-fade-in">
            <div className="space-y-2">
              <StarRating />
              <p className="text-[10px] font-black text-brandDark tracking-widest uppercase">
                4.9 out of 5 based on 132 reviews
              </p>
            </div>
            <div className="w-12 h-12 bg-brandBg rounded-xl flex items-center justify-center border border-brandDark/5">
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {reviews.map((review, idx) => (
            <div key={idx} className="bg-white border border-brandDark/5 rounded-[2.5rem] p-10 lg:p-12 space-y-10 shadow-sm hover:shadow-4xl transition-all duration-500 group">
              
              {/* Card Header: Profile Info */}
              <div className="flex items-center gap-5">
                <div className="w-14 h-14 rounded-2xl overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-500">
                  <img src={review.avatar} alt={review.name} className="w-full h-full object-cover" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-base font-black text-brandDark tracking-tight">{review.name}</h4>
                  <div className="flex items-center gap-3">
                    <StarRating />
                    <span className="text-[9px] font-black text-brandDark/20 uppercase tracking-widest">{review.time}</span>
                  </div>
                </div>
              </div>

              {/* Card Body: Text */}
              <p className="text-brandDark/60 text-lg font-medium leading-relaxed italic">
                “{review.text}”
              </p>

              {/* Card Footer: Verified Badge */}
              <div className="pt-8 border-t border-brandDark/5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <svg className="w-4 h-4 text-red-500" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" />
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                  </svg>
                  <span className="text-[9px] font-black text-brandDark/30 uppercase tracking-[0.2em]">VERIFIED GOOGLE REVIEW</span>
                </div>
                <div className="w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center shadow-lg">
                  <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Link */}
        <div className="text-center">
          <button className="inline-flex items-center gap-4 text-[11px] font-black text-brandDark uppercase tracking-[0.4em] group hover:text-brandYellow transition-colors">
            View all 132 verified reviews on Google Maps
            <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </button>
        </div>

      </div>
    </section>
  );
};