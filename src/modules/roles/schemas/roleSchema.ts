import { z } from "zod";

export const roleSchema = z.object({
  name: z
    .string()
    .min(1, { message: "El nombre del rol es requerido" })
    .max(50, { message: "El nombre del rol no puede exceder 50 caracteres" })
    .regex(/^[a-zA-ZÀ-ÿ\u00f1\u00d1\s]+$/, {
      message: "El nombre del rol solo puede contener letras y espacios",
    }),
});

export const roleUpdateSchema = roleSchema.partial();

export type RoleFormData = z.infer<typeof roleSchema>;
export type RoleUpdateData = z.infer<typeof roleUpdateSchema>;
