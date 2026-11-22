/*
 * "Request Free Sample" buttons all lead to the enquiry form (section 8). They announce it here so the
 * form can tick "I'd like a free sample first" — no shared state or prop drilling needed.
 */
const EVENT = "tobla:request-sample";

export const requestSample = () => window.dispatchEvent(new Event(EVENT));

export function onRequestSample(cb: () => void) {
  window.addEventListener(EVENT, cb);
  return () => window.removeEventListener(EVENT, cb);
}
