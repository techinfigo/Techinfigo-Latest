import { SidebarNav } from './SidebarNav';
import { SignOutButton } from './SignOutButton';

/**
 * The sidebar's contents, shared by the fixed desktop column and the mobile
 * drawer so there is one nav to maintain rather than two that drift.
 *
 * A server component on purpose. It composes two client leaves — the section
 * list, which needs usePathname, and the sign-out button, which posts to the
 * logout route — and reads nothing itself, so no database module comes near a
 * client boundary. Staying on the server is also what lets MobileNav accept it
 * as `children`: the drawer wraps already-rendered markup instead of importing
 * the panel's contents and becoming a client component's problem.
 */
export function AdminSidebar() {
  return (
    <div className="flex h-full flex-col">
      {/* h-16 matches the header the panel used to have, so the content column
          starts on the same line it always did. */}
      <div className="flex h-16 shrink-0 items-center gap-3 border-b border-white/10 px-4">
        <span
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brandYellow"
          aria-hidden
        >
          <span className="text-sm font-black text-brandDark">TF</span>
        </span>
        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/55">
          Admin
        </span>
      </div>

      <SidebarNav />

      {/* A way out of the panel, not a section: no active state, no accent rail,
          dimmer than the nav above it, and it opens in a new tab so whatever you
          were looking at in here survives the trip. */}
      <div className="shrink-0 border-t border-white/10 p-3">
        <a
          href="/"
          target="_blank"
          rel="noreferrer"
          className="flex items-center justify-between rounded-r-lg border-l-2 border-transparent px-3 py-2 text-[10px] font-black uppercase tracking-[0.2em] text-white/50 transition-colors hover:text-white/70"
        >
          View site
          <span aria-hidden>↗</span>
          <span className="sr-only">(opens in a new tab)</span>
        </a>
      </div>

      {/* Sign out is the only destructive control in the shell, so it sits in
          its own zone below a rule and keeps a button's affordance instead of
          reading as one more place to navigate to. */}
      <div className="shrink-0 border-t border-white/10 p-3">
        <SignOutButton className="w-full" />
      </div>
    </div>
  );
}
