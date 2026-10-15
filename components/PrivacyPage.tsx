'use client';

import React from 'react';
import { LegalPage, LegalList, type LegalSection } from './LegalPage';
import { CONTACT } from '../config/site';

interface PrivacyPageProps {
  onNavigate: (page: string) => void;
}

const UPDATED = '15 October 2026';
const ADDRESS = 'Office no. 03, Second Floor, Block no. 25, Cloth Market, Sanjay Place, Civil Lines, Agra, Uttar Pradesh 282002';
const B = ({ children }: { children: React.ReactNode }) => <strong className="text-brandDark font-bold">{children}</strong>;

const sections: LegalSection[] = [
  {
    id: 'who',
    label: 'Who We Are',
    title: 'Who we are',
    body: (
      <>
        <p>
          Techinfigo (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;) is a digital marketing agency based in Agra, India. We build
          websites, manage Google Business Profiles, run ads, do SEO and handle social media for businesses.
        </p>
        <p>
          This policy explains what personal information we collect through our website (techinfigo.com), WhatsApp, calls
          and our work with clients, why we collect it, and the choices you have. It is written to follow India&apos;s Digital
          Personal Data Protection Act, 2023 and the Information Technology Act, 2000.
        </p>
        <p>Office: {ADDRESS}.</p>
      </>
    ),
  },
  {
    id: 'collect',
    label: 'What We Collect',
    title: 'Information we collect',
    body: (
      <>
        <p><B>Information you give us</B> when you fill a form, message us on WhatsApp, call us or become a client:</p>
        <LegalList
          items={[
            'Your name, phone number, email address and city',
            'Your business name, type of business, website and social media links',
            'What you need help with, your budget and any message you write to us',
            'For clients: billing details (business name, address, GSTIN if any) and the files, photos and content you send us for your project',
            'For clients: login details for your website, Google, Facebook or other accounts, only when you choose to share them so we can do the work',
          ]}
        />
        <p><B>Information collected automatically</B> when you visit our website:</p>
        <LegalList
          items={[
            'Pages you visit, buttons you click and how you reached our site (for example from Google or an ad)',
            'Device and browser type, and approximate location (city level) from your internet address',
            'Cookies and similar technology (see section 6)',
          ]}
        />
        <p>
          We do <B>not</B> collect card numbers, UPI PINs or bank passwords. Payments are made by bank transfer, UPI or a
          payment provider, and we only see that a payment was received.
        </p>
      </>
    ),
  },
  {
    id: 'use',
    label: 'How We Use It',
    title: 'How we use your information',
    body: (
      <LegalList
        items={[
          'To reply to your enquiry, call or WhatsApp you back, and send you a quote or proposal',
          'To do the work you hired us for: build your website, run your ads, manage your profiles and report results',
          'To send invoices, receipts and payment reminders, and keep accounts as the law requires',
          'To send you follow-ups and useful updates about our services (you can ask us to stop at any time)',
          'To understand how people use our website, improve it and measure whether our own ads work',
          'To stop spam and fake form submissions, and to keep our systems secure',
          'To follow the law, for example tax rules or a lawful request from a government authority',
        ]}
      />
    ),
  },
  {
    id: 'share',
    label: 'Sharing',
    title: 'Who we share it with',
    body: (
      <>
        <p>
          <B>We never sell your personal information.</B> We share it only with trusted service providers who help us run
          our business, and only as much as they need:
        </p>
        <LegalList
          items={[
            <>
              <B>Google</B> (Firebase for our database and CRM, Gmail, Google Analytics, Google Ads) and <B>Vercel</B>{' '}
              (website hosting)
            </>,
            <><B>Meta</B> (WhatsApp, Facebook and Instagram, including the Meta Pixel to measure our ads)</>,
            <><B>Microsoft Clarity</B> (to see how visitors use our pages) and <B>Cloudflare</B> (to block spam on our forms)</>,
            'Domain and hosting companies, when we register a domain or set up hosting for you',
            'Freelancers or partners working on your project, under a confidentiality promise',
            'Government or legal authorities, only when the law requires it',
          ]}
        />
        <p>
          Some of these providers store data on servers outside India. They follow strong security standards, and we only
          use well-known providers.
        </p>
      </>
    ),
  },
  {
    id: 'security',
    label: 'Security',
    title: 'How we keep it safe',
    body: (
      <LegalList
        items={[
          'Our website and CRM use secure (HTTPS) connections',
          'Only the Techinfigo owner and authorised team members can see your information, using password-protected accounts',
          'Login details you share for your project are kept in our private CRM, used only for your work, and you can ask us to delete them when the work ends. We recommend changing those passwords after handover',
          'No system is 100% secure. If a data breach ever affects you, we will tell you and the authorities as the law requires',
        ]}
      />
    ),
  },
  {
    id: 'cookies',
    label: 'Cookies',
    title: 'Cookies',
    body: (
      <>
        <p>
          Cookies are small files saved by your browser. We use them to remember your visit, count visitors, measure
          our ads and stop spam. We do not use cookies to collect your name or phone number.
        </p>
        <p>
          You can block or delete cookies in your browser settings. The website will still work, but some features (like
          spam protection on forms) may ask you to verify again.
        </p>
      </>
    ),
  },
  {
    id: 'retention',
    label: 'How Long',
    title: 'How long we keep it',
    body: (
      <LegalList
        items={[
          <><B>Enquiries</B> (people who contacted us but did not become clients): up to 2 years after our last conversation, then deleted.</>,
          <><B>Clients:</B> for as long as we work together, and project files for 1 year after the work ends.</>,
          <><B>Invoices and payment records:</B> up to 8 years, because Indian tax and GST laws require us to keep them.</>,
          <><B>Account logins you shared:</B> deleted when the project ends, or earlier if you ask.</>,
        ]}
      />
    ),
  },
  {
    id: 'rights',
    label: 'Your Rights',
    title: 'Your rights and choices',
    body: (
      <>
        <p>You can ask us at any time to:</p>
        <LegalList
          items={[
            'Tell you what personal information we have about you',
            'Correct or update anything that is wrong',
            'Delete your information (except records the law requires us to keep, like invoices)',
            'Stop sending you marketing messages: just reply STOP on WhatsApp or tell us on a call',
            'Withdraw consent you gave earlier',
          ]}
        />
        <p>
          Send your request to <B>{CONTACT.email}</B> or WhatsApp <B>{CONTACT.phone}</B>. We will reply within 7 days and
          complete it within 30 days.
        </p>
      </>
    ),
  },
  {
    id: 'children',
    label: 'Children',
    title: 'Children',
    body: (
      <p>
        Our services are for businesses and adults. We do not knowingly collect information from anyone under 18. If you
        think a child has sent us their details, contact us and we will delete them.
      </p>
    ),
  },
  {
    id: 'changes',
    label: 'Changes',
    title: 'Changes to this policy',
    body: (
      <p>
        We may update this policy when our services or the law change. The new version will be posted on this page with a
        new &quot;Last updated&quot; date. For important changes, we will also tell our clients directly.
      </p>
    ),
  },
  {
    id: 'contact',
    label: 'Contact',
    title: 'Contact and grievance officer',
    body: (
      <>
        <p>For any question or complaint about your personal information, contact our Grievance Officer:</p>
        <LegalList
          items={[
            <><B>Name:</B> Sachin Bauddh, Founder, Techinfigo</>,
            <><B>Email:</B> {CONTACT.email}</>,
            <><B>Phone / WhatsApp:</B> {CONTACT.phone}</>,
            <><B>Address:</B> {ADDRESS}</>,
          ]}
        />
        <p>
          If you are not happy with our reply, you can complain to the Data Protection Board of India once it is
          available to the public.
        </p>
      </>
    ),
  },
];

export const PrivacyPage: React.FC<PrivacyPageProps> = () => (
  <LegalPage
    eyebrow="Privacy Policy"
    title={<>Privacy <br />Policy.</>}
    intro="What information we collect, why we collect it, and how we keep it safe."
    updated={UPDATED}
    summary={[
      'We collect only what we need to reply to you and do your work.',
      'We never sell your personal information to anyone.',
      'You can ask us to show, correct or delete your information at any time.',
      <>Questions? Email <strong className="text-brandDark font-bold">{CONTACT.email}</strong> or WhatsApp {CONTACT.phone}.</>,
    ]}
    sections={sections}
  />
);
