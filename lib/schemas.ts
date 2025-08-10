import { z } from 'zod/v4'

export const vehicleSchema = z.object({
  name: z
    .string()
    .min(2, 'Vehicle name is required')
    .transform((val) => val.trim()),
  make: z
    .string()
    .min(1, 'Make is required')
    .transform((val) => val.trim()),
  model: z
    .string()
    .min(1, 'Model is required')
    .transform((val) => val.trim()),
  year: z.coerce.number<number>(),
  vatPrice: z.coerce.number<number>(),
  pricenoVat: z.coerce.number<number>(),
  mileage: z.coerce.number<number>(),
  fuelType: z.string().min(1, 'Fuel type is required'),
  condition: z.string().min(1, 'Condition is required'),
  transmission: z.string().min(1, 'Transmission type is required'),
  description: z
    .string()
    .min(10, 'Description must be at least 10 characters long')
    .transform((val) => val.trim()),
  images: z.array(
    z.object({
      url: z.url(),
      fileId: z.string().min(1, 'File ID is required'),
    })
  ),
})
