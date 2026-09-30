import { HONEYPOT_NAME } from '../lib/submit-lead';

/**
 * A form field real visitors never see or reach. Bots that fill every input
 * fill this one too, and the server then drops their submission.
 */
export function HoneypotField() {
  return (
    <div aria-hidden="true" style={{ position: 'absolute', left: '-10000px', width: 1, height: 1, overflow: 'hidden' }}>
      <label>
        Company website
        <input type="text" name={HONEYPOT_NAME} tabIndex={-1} autoComplete="off" defaultValue="" />
      </label>
    </div>
  );
}
