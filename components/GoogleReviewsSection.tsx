import React from 'react';
import { Star, ArrowUpRight } from 'lucide-react';
import { getGoogleReviews, GOOGLE_REVIEWS_URL, GOOGLE_WRITE_REVIEW_URL } from '../lib/google-reviews';

/**
 * Real Google reviews of the Techinfigo Business Profile (server component).
 * Data comes live from Google (lib/google-reviews.ts), refreshed daily. Each
 * review links back to the reviewer on Google, as Google requires.
 */

const GoogleWordmark = () => (
  <span className="font-bold tracking-tight" aria-label="Google">
    <span className="text-[#4285F4]">G</span>
    <span className="text-[#EA4335]">o</span>
    <span className="text-[#FBBC05]">o</span>
    <span className="text-[#4285F4]">g</span>
    <span className="text-[#34A853]">l</span>
    <span className="text-[#EA4335]">e</span>
  </span>
);

const Stars = ({ value, size = 'w-4 h-4' }: { value: number; size?: string }) => (
  <span className="inline-flex gap-0.5" aria-label={`${value} out of 5 stars`}>
    {[1, 2, 3, 4, 5].map((i) => (
      <Star
        key={i}
        className={`${size} ${i <= Math.round(value) ? 'fill-brandYellow text-brandYellow' : 'fill-brandDark/10 text-brandDark/10'}`}
        aria-hidden="true"
      />
    ))}
  </span>
);

const linkButton =
  'inline-flex items-center justify-center gap-2 px-6 py-4 rounded-2xl text-xs font-black uppercase tracking-[0.2em] transition-all duration-300';

export async function GoogleReviewsSection() {
  const data = await getGoogleReviews();

  return (
    <section className="py-24 px-6 lg:px-12 bg-white" aria-labelledby="google-reviews-heading">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
          <div className="space-y-4">
            <span className="text-brandYellow text-[11px] font-bold uppercase tracking-[0.4em]">Google Reviews</span>
            <h2 id="google-reviews-heading" className="text-4xl md:text-5xl font-black text-brandDark tracking-tighter uppercase leading-none">
              Agra Businesses <br />
              <span className="text-brandDark/30">Trust Us.</span>
            </h2>
          </div>

          {data ? (
            <a
              href={GOOGLE_REVIEWS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-5 bg-brandBg rounded-3xl px-6 py-5 border border-brandDark/5 hover:shadow-lg transition-shadow self-start lg:self-auto"
            >
              <span className="text-5xl font-black text-brandDark leading-none">{data.rating.toFixed(1)}</span>
              <span className="space-y-1.5">
                <Stars value={data.rating} size="w-5 h-5" />
                <span className="block text-xs font-semibold text-brandDark/60">
                  {data.count} reviews on <GoogleWordmark />
                </span>
              </span>
            </a>
          ) : null}
        </div>

        {data && data.reviews.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.reviews.map((r, i) => (
              <figure
                key={`${r.author}-${i}`}
                className="flex flex-col bg-brandBg rounded-[2rem] p-7 border border-brandDark/5 shadow-[0_4px_20px_rgba(0,0,0,0.02)]"
              >
                <div className="flex items-center justify-between gap-3">
                  <Stars value={r.rating} />
                  <span className="text-[11px] font-semibold text-brandDark/40">{r.when}</span>
                </div>
                <blockquote className="mt-4 flex-1 text-sm text-brandDark/75 font-medium leading-relaxed line-clamp-[8]">
                  “{r.text}”
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3">
                  {r.photo ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={r.photo}
                      alt=""
                      width={36}
                      height={36}
                      loading="lazy"
                      referrerPolicy="no-referrer"
                      className="w-9 h-9 rounded-full object-cover bg-brandDark/10"
                    />
                  ) : (
                    <span className="w-9 h-9 rounded-full bg-brandDark text-white text-sm font-bold flex items-center justify-center">
                      {r.author.charAt(0).toUpperCase()}
                    </span>
                  )}
                  <span className="min-w-0">
                    {r.authorUrl ? (
                      <a
                        href={r.authorUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block text-sm font-bold text-brandDark truncate hover:underline"
                      >
                        {r.author}
                      </a>
                    ) : (
                      <span className="block text-sm font-bold text-brandDark truncate">{r.author}</span>
                    )}
                    <span className="block text-[11px] text-brandDark/50">
                      Review on <GoogleWordmark />
                    </span>
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
        ) : (
          <p className="text-lg text-brandDark/70 font-medium max-w-2xl">
            Read what Agra business owners say about working with us, in their own words on Google.
          </p>
        )}

        <div className="flex flex-col sm:flex-row gap-4">
          <a
            href={GOOGLE_REVIEWS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={`${linkButton} bg-brandDark text-white hover:bg-brandDark/90`}
          >
            See all reviews on Google <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
          </a>
          <a
            href={GOOGLE_WRITE_REVIEW_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={`${linkButton} border-2 border-brandDark/10 text-brandDark hover:border-brandDark/30`}
          >
            Worked with us? Write a review
          </a>
        </div>
      </div>
    </section>
  );
}
