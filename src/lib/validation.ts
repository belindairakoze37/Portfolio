import { z } from 'zod';

export const contactSchema = z.object({
  name: z.string().trim().min(2, 'Please enter at least 2 characters.').max(100, 'Please keep your name under 100 characters.'),
  email: z.email('Enter a valid email address.'),
  subject: z.string().trim().max(120, 'Please keep the subject under 120 characters.').optional(),
  message: z.string().trim().min(10, 'Please enter at least 10 characters.').max(3000, 'Please keep your message under 3000 characters.'),
  _honey: z.string().optional(),
});

export type ContactValues = z.infer<typeof contactSchema>;
