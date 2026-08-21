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
 * SURFACES. Two tones, both already in the palette: the rail sits on
 * brandDark, the deepest one, and the page on brandSurface a step above it, so
 * the boundary is a change of surface and not just a hairline. A single shared
 * tone with a 10%-white rule between them read as one slab. The pages' cards
 * and table borders were lifted to match the lighter ground they now sit on.
 */
export default function PanelLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-brandSurface">
      {/* Sticky, not a fixed-height flex box.

          This used to be `h-dvh overflow-hidden` on the row with the content
          column scrolling inside it, and that is what produced the endless
          scroll ending in white: a fixed-height box cannot grow, so anything
          taller escaped it, and the page underneath is cream. Normal document
          flow removes the trap — the row grows with its content, so there is
          nothing to escape from — while `sticky` keeps the rail visually
          parked exactly as the fixed-height version did. */}
      <aside className="hidden w-[220px] shrink-0 border-r border-white/20 bg-brandDark lg:block">
        {/* dvh here, not vh: a sticky rail should track the *visible*
            viewport. Its height cannot leave a gap — the <aside> around it
            carries bg-brandDark and stretches to the row. */}
        <div className="sticky top-0 h-dvh overflow-y-auto">
          <AdminSidebar />
        </div>
      </aside>

      {/* min-w-0 so the pipeline's wide table scrolls inside its own container
          instead of stretching this column past the viewport. */}
      <div className="flex min-w-0 flex-1 flex-col bg-brandSurface">
        {/* The sidebar's stand-in below lg, on the same 16px rhythm. Sticky for
            the same reason the rail is: it must stay reachable now that the
            document scrolls rather than an inner box. */}
        <div className="sticky top-0 z-30 flex h-16 shrink-0 items-center justify-between border-b border-white/15 bg-brandSurface px-5 lg:hidden">
          <span className="flex items-center gap-3">
            <span
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brandYellow"
              aria-hidden
            >
              <span className="text-sm font-black text-brandDark">TF</span>
            </span>
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/55">
              Admin
            </span>
          </span>
          <MobileNav>
            <AdminSidebar />
          </MobileNav>
        </div>

        {/* No overflow-y-auto: the document scrolls, so this column simply
            grows. An inner scroller here would re-create the fixed-height
            trap one level down. */}
        <div className="flex-1">{children}</div>
      </div>
    </div>
  );
}
