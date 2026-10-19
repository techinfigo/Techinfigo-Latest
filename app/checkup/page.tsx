import type { Metadata } from 'next';
import CheckupFlow from '../../components/CheckupFlow';

export const metadata: Metadata = {
  title: 'Free Business Check-up | 60 second mein apna Growth Plan',
  description: 'Sirf tap karke 60 second mein jaaniye aapke business ke customers kahan chhoot rahe hain, unka ilaaj, aur kitni extra kamaai ho sakti hai. 100% free.',
  alternates: { canonical: '/checkup' },
  openGraph: {
    images: ['/og-image.jpg?v=2'],
    title: 'Free Business Check-up 🩺 | Techinfigo',
    description: 'Sirf 60 second. Sirf tap karna hai. Har jawaab pe turant milega aapke business ka ilaaj.',
    url: '/checkup',
  },
};

export default function Page() {
  return (
    <main>
      <CheckupFlow />
    </main>
  );
}
