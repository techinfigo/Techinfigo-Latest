'use client';

import React from 'react';
import { LegalPage, LegalList, type LegalSection } from './LegalPage';
import { CONTACT } from '../config/site';

const UPDATED = '15 October 2026';
const B = ({ children }: { children: React.ReactNode }) => <strong className="text-brandDark font-bold">{children}</strong>;

const sections: LegalSection[] = [
  {
    id: 'basics',
    label: 'The Basics',
    title: 'The basics',
    body: (
      <>
        <p>
          This policy explains when you can get your money back from Techinfigo, and how. It applies to all our services:
          websites, Google Business Profile, SEO, social media, ads management and any other work we do for you.
        </p>
        <p>
          Every project starts with a written quote or proposal that lists the work, price and timeline. If that quote
          says something different from this page, the quote wins.
        </p>
      </>
    ),
  },
  {
    id: 'websites',
    label: 'Websites',
    title: 'Website projects',
    body: (
      <>
        <p>
          <B>Payment:</B> 50% advance to start, 50% before the website goes live. Before you pay anything, we can show you
          a free homepage design so you know what you will get.
        </p>
        <LegalList
          items={[
            <><B>Full refund</B> of the advance if you cancel within 48 hours of paying and we have not started the work.</>,
            <><B>Once work has started</B> (design, content or development), the advance is not refundable, because time and work have already gone into your project.</>,
            <><B>If we miss the agreed timeline</B> because of our own delay (not waiting on your content, photos or approvals) and you choose to cancel, we will refund the part of the payment for work not yet delivered.</>,
            <><B>After the website is live</B> and the final payment is made, payments are not refundable. We will still fix any bugs in the work we delivered, free, for 30 days.</>,
          ]}
        />
      </>
    ),
  },
  {
    id: 'monthly',
    label: 'Monthly Plans',
    title: 'Monthly plans (SEO, social media, ads, Google profile)',
    body: (
      <LegalList
        items={[
          <>Monthly plans are paid <B>in advance</B>, at the start of each month.</>,
          <>Minimum term: <B>3 months</B> for social media and ads, <B>6 months</B> for SEO and bundles (unless your proposal says otherwise), because marketing needs time to show results.</>,
          <>After the minimum term, you can stop any time with <B>30 days&apos; notice</B> by email or WhatsApp.</>,
          <>A month that has already started is <B>not refundable</B>. If you paid for a month and we have not started any work in it, we refund that month in full.</>,
          <>If you stop before the minimum term ends, the remaining months of the minimum are payable, unless we agree otherwise in writing.</>,
        ]}
      />
    ),
  },
  {
    id: 'third-party',
    label: 'Third-Party Costs',
    title: 'Ad spend and third-party costs',
    body: (
      <>
        <p>Some money you pay goes to other companies, not to Techinfigo. We cannot refund these:</p>
        <LegalList
          items={[
            <><B>Ad spend</B> paid to Google, Meta (Facebook / Instagram) or other platforms. Any unused balance stays in your ad account, which you own.</>,
            <><B>Domain names and hosting</B> once they are registered or bought in your name.</>,
            <><B>Paid tools, themes, plugins, stock photos or printing</B> bought for your project.</>,
          ]}
        />
      </>
    ),
  },
  {
    id: 'results',
    label: 'Results',
    title: 'Results and guarantees',
    body: (
      <>
        <p>
          We work hard to get you more enquiries, better Google rankings and more sales, and we report honestly every
          month. But results also depend on Google, Meta, your market, your prices and how quickly enquiries are followed
          up, which we do not control.
        </p>
        <p>
          So we <B>do not give refunds based on results</B> (number of leads, rankings, followers or sales), unless a
          specific guarantee is written in your quote. If you are unhappy with results, tell us. We will review the
          work with you and change the plan.
        </p>
      </>
    ),
  },
  {
    id: 'one-time',
    label: 'One-Time Work',
    title: 'Audits, setups and other one-time work',
    body: (
      <LegalList
        items={[
          <>Full refund if you cancel <B>before we start</B>.</>,
          <>Once the work has started or been delivered (for example an audit report or a profile setup), it is not refundable.</>,
          <>Free services, like our free website health check, cost nothing, so there is nothing to refund.</>,
        ]}
      />
    ),
  },
  {
    id: 'how',
    label: 'How To Ask',
    title: 'How to ask for a refund',
    body: (
      <>
        <LegalList
          items={[
            <>Email <B>{CONTACT.email}</B> or WhatsApp <B>{CONTACT.phone}</B> with your name, invoice number and the reason.</>,
            <>We will reply within <B>2 working days</B>.</>,
            <>Approved refunds are paid within <B>7–10 working days</B>, to the same bank account or UPI you paid from.</>,
            <>Any GST charged on the refunded amount is refunded along with it, and we issue a credit note.</>,
          ]}
        />
      </>
    ),
  },
  {
    id: 'disputes',
    label: 'Disputes',
    title: 'Disagreements',
    body: (
      <p>
        If we disagree about a refund, let&apos;s talk first. Most problems are solved with one honest conversation. If we
        still cannot agree, the matter will be handled under Indian law, by the courts in Agra, Uttar Pradesh.
      </p>
    ),
  },
  {
    id: 'changes',
    label: 'Changes',
    title: 'Changes to this policy',
    body: (
      <p>
        We may update this policy from time to time. The version on this page on the date you paid applies to your
        payment.
      </p>
    ),
  },
];

export const RefundPage: React.FC = () => (
  <LegalPage
    eyebrow="Refund Policy"
    title={<>Refund <br />Policy.</>}
    intro="When you can get your money back, and how to ask for it."
    updated={UPDATED}
    summary={[
      'Cancel within 48 hours of paying, before we start, and you get a full refund.',
      'Once work has started, payments for that work are not refundable.',
      'Ad spend, domains and hosting go to other companies and cannot be refunded by us.',
      'Approved refunds reach you within 7–10 working days.',
    ]}
    sections={sections}
  />
);
