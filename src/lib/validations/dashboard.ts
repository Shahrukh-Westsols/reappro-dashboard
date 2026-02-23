import { z } from "zod";

export const propertySchema = z.object({
  id: z.string(),
  name: z.string(),
  netWorth: z.number(),
  irr: z.number(),
  totalValue: z.number(),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
  imageUrl: z.string().optional(),
});

export type Property = z.infer<typeof propertySchema>;
