/**
 * Live Google reviews for the Techinfigo Business Profile. SERVER ONLY.
 *
 * Uses the Places API (New) "Place Details" call with GOOGLE_PLACES_API_KEY.
 * The answer is cached for a day (ISR), so the site makes about 30 calls a
 * month, well inside Google's free monthly allowance. Google returns at most
 * five reviews, the ones it ranks most relevant.
 *
 * Without a key, or if Google fails, this returns null and the page shows a
 * plain "See our reviews on Google" link instead. Never fake numbers.
 */

export const GBP_PLACE_ID = 'ChIJd-bZWwl3dDkRj4H5YdWtwPM';

/** Opens the reviews panel of the listing on Google. */
export const GOOGLE_REVIEWS_URL = `https://search.google.com/local/reviews?placeid=${GBP_PLACE_ID}`;
/** Opens the "write a review" box on Google. */
export const GOOGLE_WRITE_REVIEW_URL = `https://search.google.com/local/writereview?placeid=${GBP_PLACE_ID}`;

export type GoogleReview = {
  author: string;
  authorUrl: string | null;
  photo: string | null;
  rating: number;
  when: string;
  text: string;
};

export type GoogleReviews = {
  rating: number;
  count: number;
  mapsUrl: string;
  reviews: GoogleReview[];
};

type PlacesReview = {
  rating?: number;
  relativePublishTimeDescription?: string;
  text?: { text?: string };
  originalText?: { text?: string };
  authorAttribution?: { displayName?: string; uri?: string; photoUri?: string };
};

type PlacesDetails = {
  rating?: number;
  userRatingCount?: number;
  googleMapsUri?: string;
  reviews?: PlacesReview[];
};

export async function getGoogleReviews(): Promise<GoogleReviews | null> {
  const key = process.env.GOOGLE_PLACES_API_KEY;
  if (!key) return null;

  try {
    const response = await fetch(`https://places.googleapis.com/v1/places/${GBP_PLACE_ID}?languageCode=en`, {
      headers: {
        'X-Goog-Api-Key': key,
        'X-Goog-FieldMask': 'rating,userRatingCount,googleMapsUri,reviews',
      },
      next: { revalidate: 60 * 60 * 24, tags: ['google-reviews'] },
      signal: AbortSignal.timeout(8000),
    });
    if (!response.ok) {
      console.error('[google-reviews] Places API', response.status, await response.text().catch(() => ''));
      return null;
    }
    const data = (await response.json()) as PlacesDetails;
    if (typeof data.rating !== 'number' || typeof data.userRatingCount !== 'number') return null;

    const reviews = (data.reviews ?? [])
      .map((r): GoogleReview => ({
        author: r.authorAttribution?.displayName?.trim() || 'Google user',
        authorUrl: r.authorAttribution?.uri ?? null,
        photo: r.authorAttribution?.photoUri ?? null,
        rating: typeof r.rating === 'number' ? r.rating : 0,
        when: r.relativePublishTimeDescription ?? '',
        text: (r.originalText?.text ?? r.text?.text ?? '').trim(),
      }))
      // Show what people wrote, best first; Google decides which five we get.
      .filter((r) => r.text && r.rating >= 4)
      .sort((a, b) => b.rating - a.rating);

    return {
      rating: data.rating,
      count: data.userRatingCount,
      mapsUrl: data.googleMapsUri ?? GOOGLE_REVIEWS_URL,
      reviews,
    };
  } catch (error) {
    console.error('[google-reviews] failed:', error);
    return null;
  }
}
