/**
 * Shown when the Firebase service-account variables are unset. The panel is
 * reachable without a database on purpose — the build must not require one — so
 * this explains the state rather than crashing or showing a misleading empty
 * pipeline.
 */
export function SetupNotice() {
  return (
    <div className="border border-brandYellow/20 bg-brandYellow/5 rounded-2xl p-6 space-y-3">
      <p className="text-brandYellow text-[10px] font-black uppercase tracking-[0.3em]">
        Database not configured
      </p>
      <p className="text-white/60 text-sm font-medium leading-relaxed">
        Leads are still being captured — every submission is mirrored to the inbox regardless of
        database state. They are just not queryable here yet.
      </p>
      <ol className="text-white/55 text-sm font-medium space-y-1 list-decimal list-inside">
        <li>
          Set <code className="text-white/70">FIREBASE_PROJECT_ID</code>,{' '}
          <code className="text-white/70">FIREBASE_CLIENT_EMAIL</code> and{' '}
          <code className="text-white/70">FIREBASE_PRIVATE_KEY</code> in{' '}
          <code className="text-white/70">.env.local</code>
        </li>
        <li>
          Create the Firestore database in the Firebase console (collections are created on first
          write — there is no migration step)
        </li>
        <li>Restart the server</li>
      </ol>
    </div>
  );
}
