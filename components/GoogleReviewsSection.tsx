import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { getGoogleReviews, GOOGLE_REVIEWS_URL, GOOGLE_WRITE_REVIEW_URL } from '../lib/google-reviews';
import { GoogleWordmark, Stars } from './ReviewBits';
import { ReviewsMarquee } from './ReviewsMarquee';

/**
 * Real Google reviews of the Techinfigo Business Profile (server component).
 * Data comes live from Google (lib/google-reviews.ts), refreshed daily. Each
 * review links back to the reviewer on Google, as Google requires.
 */

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
          <ReviewsMarquee reviews={data.reviews} />
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
