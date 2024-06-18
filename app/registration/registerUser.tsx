// registerUser.ts
import { z } from "zod";

export const schema = z.object({
  full_name: z
    .string()
    .min(1, { message: "ФИО должно содержать хотя бы один символ" }),
  login: z
    .string()
    .min(4, { message: "Логин должен содержать как минимум 4 символа" }),
  password: z
    .string()
    .min(6, { message: "Пароль должен содержать как минимум 6 символов" }),
});

export const createUser = async (data: Record<string, string>) => {
  const response = await fetch("http://localhost:3500/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error("Error creating user");
  }
  const result = await response.json();
  return result;
};
