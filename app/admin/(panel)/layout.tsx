import { AdminNav } from '../AdminNav';

/**
 * Chrome shared by every signed-in page.
 *
 * The route group exists so /admin/login — which is under /admin and so hits
 * the same middleware matcher, but is the one page you reach *without* a
 * session — stays outside this layout and does not get a nav bar and a sign-out
 * button. Anything added inside (panel) inherits both the header and the gate.
 */
export default function PanelLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AdminNav />
      {children}
    </>
  );
}
