import { z } from 'zod';

export const contactSchema = z.object({
  name: z.string().trim().min(2, 'Please enter your name'),
  email: z.string().trim().email('Enter a valid email address'),
  subject: z.string().trim().max(120, 'Keep the subject under 120 characters').optional(),
  message: z.string().trim().min(10, 'Message must be at least 10 characters').max(2000, 'Message is too long'),
  contact_ref: z.string().optional(),
});

export type ContactValues = z.infer<typeof contactSchema>;