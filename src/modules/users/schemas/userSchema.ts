import { z } from "zod";

export const userSchema = z.object({
  firstName: z
    .string()
    .min(1, { message: "El nombre es requerido" })
    .max(50, { message: "El nombre no puede exceder 50 caracteres" })
    .regex(/^[a-zA-ZÀ-ÿ\u00f1\u00d1\s]+$/, {
      message: "El nombre solo puede contener letras y espacios",
    }),
  lastName: z
    .string()
    .min(1, { message: "El apellido es requerido" })
    .max(50, { message: "El apellido no puede exceder 50 caracteres" })
    .regex(/^[a-zA-ZÀ-ÿ\u00f1\u00d1\s]+$/, {
      message: "El apellido solo puede contener letras y espacios",
    }),
  email: z
    .string()
    .min(1, { message: "El email es requerido" })
    .email({ message: "Formato de email inválido" }),
  password: z
    .string()
    .min(6, { message: "La contraseña debe tener al menos 6 caracteres" })
    .max(100, { message: "La contraseña no puede exceder 100 caracteres" }),
  roleId: z
    .string()
    .min(1, { message: "El rol es requerido" }),
});

export const userUpdateSchema = z.object({
  firstName: z
    .string()
    .min(1, { message: "El nombre es requerido" })
    .max(50, { message: "El nombre no puede exceder 50 caracteres" })
    .regex(/^[a-zA-ZÀ-ÿ\u00f1\u00d1\s]+$/, {
      message: "El nombre solo puede contener letras y espacios",
    })
    .optional(),
  lastName: z
    .string()
    .min(1, { message: "El apellido es requerido" })
    .max(50, { message: "El apellido no puede exceder 50 caracteres" })
    .regex(/^[a-zA-ZÀ-ÿ\u00f1\u00d1\s]+$/, {
      message: "El apellido solo puede contener letras y espacios",
    })
    .optional(),
  email: z
    .string()
    .min(1, { message: "El email es requerido" })
    .email({ message: "Formato de email inválido" })
    .optional(),
  password: z
    .union([
      z.string().min(6, { message: "La contraseña debe tener al menos 6 caracteres" }).max(100),
      z.literal(""),
      z.undefined()
    ])
    .optional(), 
  roleId: z
    .string()
    .min(1, { message: "El rol es requerido" })
    .optional(),
});

export type UserFormData = z.infer<typeof userSchema>;
export type UserUpdateData = z.infer<typeof userUpdateSchema>;
