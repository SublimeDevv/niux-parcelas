// modules/plots/schemas/plotSchema.ts
import { z } from "zod";

export const plotSchema = z.object({
  status: z.boolean().default(true),
  temperature:z.number().or(z.string().transform((val) => parseFloat(val))),
  unit: z.string().max(10),
  latitude: z.number().or(z.string().transform((val) => parseFloat(val))),
  longitude: z.number().or(z.string().transform((val) => parseFloat(val))),
  managerId: z
    .string()
    .uuid({ message: "El ID del manager debe ser un UUID válido" })
    .optional()
    .or(z.literal("")), // Permite string vacío
}).transform((data) => ({
  ...data,
  // Convierte string vacío a undefined para evitar errores de UUID
  managerId: data.managerId === "" ? undefined : data.managerId,
}));

export const plotUpdateSchema = plotSchema.optional();

export type PlotFormData = z.infer<typeof plotSchema>;
export type PlotUpdateData = z.infer<typeof plotUpdateSchema>;