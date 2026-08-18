import { index, integer, pgEnum, pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';

/**
 * Pipeline stages, in order. Exported so the admin UI can render the funnel
 * without redeclaring the list and drifting out of sync with the database.
 */
export const LEAD_STATUSES = ['new', 'contacted', 'qualified', 'proposal', 'won', 'lost'] as const;

export type LeadStatus = (typeof LEAD_STATUSES)[number];

export const leadStatusEnum = pgEnum('lead_status', LEAD_STATUSES);

/**
 * One row per form submission.
 *
 * The attribution columns (landingPage, utm*, referrer) are the entire point:
 * formsubmit.co delivered a name and a message to an inbox and threw away
 * which page or campaign produced the lead.
 */
export const leads = pgTable(
  'leads',
  {
    id: serial('id').primaryKey(),

    // Identity — the two fields every form requires.
    name: text('name').notNull(),
    email: text('email').notNull(),
    phone: text('phone'),

    // Qualification detail. Free text, not numeric: the forms collect bands
    // ("₹20L–₹2Cr"), not figures, and coercing them would lose information.
    brandName: text('brand_name'),
    website: text('website'),
    monthlyRevenue: text('monthly_revenue'),
    adSpend: text('ad_spend'),
    message: text('message'),

    // Attribution.
    sourceForm: text('source_form').notNull(),
    landingPage: text('landing_page'),
    submittedFrom: text('submitted_from'),
    utmSource: text('utm_source'),
    utmMedium: text('utm_medium'),
    utmCampaign: text('utm_campaign'),
    utmContent: text('utm_content'),
    utmTerm: text('utm_term'),
    referrer: text('referrer'),

    // Pipeline state.
    status: leadStatusEnum('status').notNull().default('new'),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [
    index('leads_status_idx').on(table.status),
    index('leads_created_at_idx').on(table.createdAt),
    index('leads_source_form_idx').on(table.sourceForm),
  ],
);

/**
 * Follow-up history. Append-only by design — notes are never edited or
 * deleted, because "what did we tell them in March" is a more useful question
 * than "what is the current summary".
 */
export const leadNotes = pgTable(
  'lead_notes',
  {
    id: serial('id').primaryKey(),
    leadId: integer('lead_id')
      .notNull()
      .references(() => leads.id, { onDelete: 'cascade' }),
    body: text('body').notNull(),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [index('lead_notes_lead_id_idx').on(table.leadId)],
);

export type Lead = typeof leads.$inferSelect;
export type NewLead = typeof leads.$inferInsert;
export type LeadNote = typeof leadNotes.$inferSelect;
export type NewLeadNote = typeof leadNotes.$inferInsert;
