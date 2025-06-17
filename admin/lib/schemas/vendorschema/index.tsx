import { z } from 'zod';

export const vendorSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Invalid email'),
  phone: z.string().min(10, 'Phone is required'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  address: z.string().min(2, 'Address is required'),
  gst: z.string().optional(),
  cuisines: z.string().min(2, 'Cuisines are required'),
  minDeliveryTime: z.string(),
  maxDeliveryTime: z.string(),
  coverPhoto: z.any().nullable(),
  profilePhoto: z.any().nullable(),
});

export type VendorFormValues = z.infer<typeof vendorSchema>;
