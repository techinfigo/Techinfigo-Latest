import { AdminSidebar } from '../AdminSidebar';
import { MobileNav } from '../MobileNav';

/**
 * Chrome shared by every signed-in page: a fixed sidebar on the left, the page
 * on the right.
 *
 * The route group exists so /admin/login — which is under /admin and so hits
 * the same middleware matcher, but is the one page you reach *without* a
 * session — stays outside this layout and does not get a nav and a sign-out
 * button. Anything added inside (panel) inherits both the shell and the gate.
 *
 * A server component, and it stays one. The only client code in the shell is
 * the section list (usePathname) and the mobile drawer; both are leaves, and
 * <AdminSidebar /> is handed to <MobileNav /> as children so its markup is
 * rendered here on the server rather than inside the drawer's client bundle.
 * Nothing in this file touches lib/firestore.ts or lib/settings.ts.
 *
 * SCROLLING. The shell is exactly one viewport tall and clips, so the sidebar
 * cannot scroll away with the page — only the right-hand column scrolls. That
 * is also why the sidebar needs no position: fixed and the content no offset.
 *
 * BACKGROUND. The content column stays on brandDark, inherited from
 * app/admin/layout.tsx. Every page in here renders text-white on white/10
 * borders, so a light column would need all four pages restyled first; the
 * columns are separated by the same border-white/10 rule the panel already
 * uses everywhere else.
 */
export default function PanelLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-dvh overflow-hidden">
      <aside className="hidden w-[220px] shrink-0 border-r border-white/10 lg:block">
        <AdminSidebar />
      </aside>

      {/* min-w-0 so the pipeline's wide table scrolls inside its own container
          instead of stretching this column past the viewport. */}
      <div className="flex min-w-0 flex-1 flex-col">
        {/* The sidebar's stand-in below lg, on the same 16px rhythm. */}
        <div className="flex h-16 shrink-0 items-center justify-between border-b border-white/10 px-5 lg:hidden">
          <span className="flex items-center gap-3">
            <span
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brandYellow"
              aria-hidden
            >
              <span className="text-sm font-black text-brandDark">TF</span>
            </span>
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40">
              Admin
            </span>
          </span>
          <MobileNav>
            <AdminSidebar />
          </MobileNav>
        </div>

        <div className="flex-1 overflow-y-auto">{children}</div>
      </div>
    </div>
  );
}
