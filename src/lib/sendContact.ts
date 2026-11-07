export type SendResult = 'success' | 'error' | 'unconfigured';

const ENDPOINT = import.meta.env.VITE_FORMSPREE_ENDPOINT as string | undefined;

export async function sendContact(values: {
  name: string;
  email: string;
  subject: string;
  message: string;
}): Promise<SendResult> {
  if (!ENDPOINT) return 'unconfigured';
  try {
    const res = await fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(values),
    });
    return res.ok ? 'success' : 'error';
  } catch {
    return 'error';
  }
}