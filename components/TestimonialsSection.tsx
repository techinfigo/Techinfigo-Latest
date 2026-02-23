import React from 'react';

export const TestimonialsSection: React.FC = () => {
  const reviews = [
    {
      name: "Arjun Kapoor",
      role: "Founder, The Man Company",
      time: "2 MONTHS AGO",
      text: "Finally found a team that understands profit. They don't just show me ad screenshots; they show me how much money we actually made after all costs. My bank balance is finally moving.",
      avatar: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?auto=format&fit=crop&q=80&w=150"
    },
    {
      name: "Priya Sharma",
      role: "Co-Founder, Suta",
      time: "1 MONTH AGO",
      text: "The abandoned cart setup they built for us started paying for the entire monthly retainer within the first 14 days. If you're a Shopify founder, these guys are a no-brainer.",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=150"
    },
    {
      name: "Rahul Verma",
      role: "CEO, Beardo",
      time: "3 WEEKS AGO",
      text: "We were stuck at 20L for almost a year. Techinfigo cleaned up our tracking and fixed our landing pages. We hit 45L last month with better margins than we had before.",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=150"
    },
    {
      name: "Anjali Desai",
      role: "Founder, Ayurvedic Essentials",
      time: "4 MONTHS AGO",
      text: "What I love most is the Loom walkthroughs every Monday. I don't have to guess what's happening with my budget. It's the most transparent agency experience I've ever had.",
      avatar: "https://images.unsplash.com/photo-1589156280159-27698a70f29e?auto=format&fit=crop&q=80&w=150"
    },
    {
      name: "Vikram Singh",
      role: "Director, Urban Monkey",
      time: "1 WEEK AGO",
      text: "They told me my offer was the problem, not my ads. I was annoyed at first, but we changed it based on their advice and our ROAS doubled in two weeks. They know their stuff.",
      avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=150"
    },
    {
      name: "Rohan Mehta",
      role: "Founder, Epigamia",
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
    <section className="w-full py-24 lg:py-40 px-6 bg-[#f9f9f9] font-sans relative overflow-hidden">
      {/* Subtle Grid Background */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: `radial-gradient(#001d21 1px, transparent 1px)`, backgroundSize: '32px 32px' }}>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header - Centered for better organization */}
        <div className="text-center max-w-3xl mx-auto mb-20">
            <span className="text-[11px] font-bold tracking-[0.4em] uppercase text-brandYellow bg-brandDark/5 px-4 py-2 rounded-full inline-block mb-6">
              Reduce Your Risk
            </span>
            <h2 className="text-4xl lg:text-6xl font-black text-brandDark tracking-tighter leading-tight mb-8">
              Real Feedback From <br className="hidden md:block" />
              D2C Founders Like You.
            </h2>
            
            {/* Rating Badge Centered */}
            <div className="inline-flex items-center gap-4 bg-white border border-brandDark/10 rounded-full px-6 py-3 shadow-sm hover:shadow-md transition-shadow">
               <div className="flex gap-1">
                 {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 text-brandYellow" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                 ))}
               </div>
               <span className="text-xs font-bold text-brandDark uppercase tracking-wider">4.9/5 from 132 Reviews</span>
               <div className="w-5 h-5 flex items-center justify-center">
                  <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M23.49 12.275C23.49 11.485 23.415 10.73 23.3 10H12V14.51H18.47C18.18 15.99 17.25 17.21 15.81 18.11V21.09H19.62C21.85 19.09 23.49 16.04 23.49 12.275Z" fill="#4285F4"/>
                    <path d="M12 23.4999C15.24 23.4999 17.965 22.4699 19.95 20.6899L16.14 17.7099C15.04 18.4599 13.62 18.8999 11.99 18.8999C8.85 18.8999 6.18 16.8299 5.23 14.0199H1.29V16.9799C3.28 20.8599 7.36 23.4999 12 23.4999Z" fill="#34A853"/>
                    <path d="M5.23 14.02C4.98 13.29 4.85 12.51 4.85 11.71C4.85 10.91 4.71 10.13 4.96 9.40001V6.44001H1.02C0.21 8.04001 0 9.79 0 11.71C0 13.63 0.43 15.38 1.23 16.98L5.23 14.02Z" fill="#FBBC05"/>
                    <path d="M12 4.52C13.75 4.52 15.33 5.12 16.58 6.28L19.99 2.95C17.95 1.11 15.23 0 11.99 0C7.36 0 3.28 2.64 1.29 6.52L5.23 9.48C6.18 6.67 8.85 4.52 12 4.52Z" fill="#EA4335"/>
                  </svg>
               </div>
            </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-16">
          {reviews.map((review, idx) => (
            <div key={idx} className="bg-white rounded-[2rem] p-8 lg:p-10 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] transition-all duration-300 border border-brandDark/5 flex flex-col h-full group relative overflow-hidden">
              
              {/* Decorative Quote */}
              <div className="absolute top-6 right-8 text-brandDark/[0.03] group-hover:text-brandYellow/10 transition-colors duration-500 scale-150 pointer-events-none">
                 <svg width="60" height="60" viewBox="0 0 24 24" fill="currentColor"><path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H15.017C14.4647 8 14.017 7.55228 14.017 7V3H19.017C20.6739 3 22.017 4.34315 22.017 6V15C22.017 16.6569 20.6739 18 19.017 18H17.017V21H14.017ZM5.0166 21L5.0166 18C5.0166 16.8954 5.91203 16 7.0166 16H10.0166C10.5689 16 11.0166 15.5523 11.0166 15V9C11.0166 8.44772 10.5689 8 10.0166 8H6.0166C5.46432 8 5.0166 7.55228 5.0166 7V3H10.0166C11.6735 3 13.0166 4.34315 13.0166 6V15C13.0166 16.6569 11.6735 18 10.0166 18H8.0166V21H5.0166Z" /></svg>
              </div>

              {/* Content */}
              <div className="relative z-10 flex-grow">
                 <div className="flex gap-1 mb-6">
                    {[...Array(5)].map((_, i) => (
                        <svg key={i} className="w-4 h-4 text-brandYellow" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                    ))}
                 </div>
                 <p className="text-brandDark/80 text-lg font-medium leading-relaxed mb-8">
                    "{review.text}"
                 </p>
              </div>

              {/* Footer: User Info */}
              <div className="flex items-center gap-4 pt-6 border-t border-brandDark/5 relative z-10">
                 <img src={review.avatar} alt={review.name} className="w-12 h-12 rounded-full object-cover border border-brandDark/10" />
                 <div>
                    <h4 className="text-sm font-black text-brandDark uppercase tracking-wide">{review.name}</h4>
                    <p className="text-[10px] font-bold text-brandDark/40 uppercase tracking-wider">{review.role}</p>
                 </div>
                 <div className="ml-auto opacity-50 grayscale group-hover:grayscale-0 group-hover:opacity-100 transition-all">
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M23.49 12.275C23.49 11.485 23.415 10.73 23.3 10H12V14.51H18.47C18.18 15.99 17.25 17.21 15.81 18.11V21.09H19.62C21.85 19.09 23.49 16.04 23.49 12.275Z" fill="#4285F4"/>
                      <path d="M12 23.4999C15.24 23.4999 17.965 22.4699 19.95 20.6899L16.14 17.7099C15.04 18.4599 13.62 18.8999 11.99 18.8999C8.85 18.8999 6.18 16.8299 5.23 14.0199H1.29V16.9799C3.28 20.8599 7.36 23.4999 12 23.4999Z" fill="#34A853"/>
                      <path d="M5.23 14.02C4.98 13.29 4.85 12.51 4.85 11.71C4.85 10.91 4.71 10.13 4.96 9.40001V6.44001H1.02C0.21 8.04001 0 9.79 0 11.71C0 13.63 0.43 15.38 1.23 16.98L5.23 14.02Z" fill="#FBBC05"/>
                      <path d="M12 4.52C13.75 4.52 15.33 5.12 16.58 6.28L19.99 2.95C17.95 1.11 15.23 0 11.99 0C7.36 0 3.28 2.64 1.29 6.52L5.23 9.48C6.18 6.67 8.85 4.52 12 4.52Z" fill="#EA4335"/>
                    </svg>
                 </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Bottom CTA */}
        <div className="text-center">
             <button className="inline-flex items-center gap-3 px-8 py-4 bg-white border border-brandDark/10 rounded-full shadow-sm hover:shadow-md transition-all group">
                <span className="text-xs font-black text-brandDark uppercase tracking-[0.2em]">Read All Reviews on Google</span>
                <svg className="w-4 h-4 text-brandDark group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
             </button>
        </div>

      </div>
    </section>
  );
};
