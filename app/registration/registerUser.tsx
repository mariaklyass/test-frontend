import { z } from "zod";

export const schema = z.object({
  full_name: z.string().regex(/^[\p{L}]+\s[\p{L}]+\s[\p{L}]+$/u, {
    message: "Формат: Фамилия Имя Отчество",
  }),
  login: z.string().regex(/^[a-zA-Z]{5,}$/, {
    message:
      "Логин должен состоять только из латинских букв и быть длиной не менее 5 символов",
  }),
  password: z.string().min(6, {
    message: "Пароль должен быть не менее 6 символов",
  }),
});

export const createUser = async (data: Record<string, string>) => {
  const response = await fetch(
    "https://aton-internship-api.onrender.com/users/register",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );
  if (!response.ok) {
    throw new Error("Данный логин уже занят, попробуйте придумать другой.");
  }
  const result = await response.json();
  return result;
};
