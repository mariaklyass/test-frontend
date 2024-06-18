"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { ErrorResponse, User } from "../types";

const loginSchema = z.object({
  login: z.string().min(1, { message: "Логин не может быть пустым" }),
  password: z
    .string()
    .min(6, { message: "Пароль должен быть минимум 6 символов" }),
});

export default function Login() {
  const router = useRouter();
  const [loginData, setLoginData] = useState({
    login: "",
    password: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [loginError, setLoginError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
    clearErrors();
  };
  const clearErrors = () => {
    setLoginError(null);
    setPasswordError(null);
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    clearErrors();

    try {
      loginSchema.parse(loginData);

      const response = await fetch(
        "https://aton-internship-api.onrender.com/users/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(loginData),
        }
      );

      const responseData: User | ErrorResponse = await response.json();

      if (!response.ok) {
        const errorResponse = responseData as ErrorResponse;
        if (response.status === 401) {
          if (errorResponse.message === "Invalid login") {
            setLoginError("Неверный логин");
          } else if (errorResponse.message === "Invalid password") {
            setPasswordError("Неверный пароль");
          } else {
            throw new Error("Неверный логин или пароль");
          }
        } else {
          throw new Error(errorResponse.message || "Неверный логин или пароль");
        }
        return;
      } else {
        const user = responseData as User;
        router.push(`/clients/${user.login}`);
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors = error.errors.map((err) => err.message);
        if (fieldErrors.some((msg) => msg.includes("Логин"))) {
          setLoginError("Неверный логин");
        } else if (fieldErrors.some((msg) => msg.includes("Пароль"))) {
          setPasswordError("Пароль содержит минимум 6 символов");
        }
      } else {
        setError("Что-то сломалось.. попробуйте еще раз?");
        console.log(error);
      }
    }
  };

  return (
    <div className="flex flex-col justify-center items-center gap-8 mt-10">
      <h1>Войдите как существующий пользователь</h1>
      <form onSubmit={handleSubmit} className="flex flex-col">
        <label htmlFor="login">Логин:</label>
        <input
          type="text"
          id="login"
          name="login"
          value={loginData.login}
          onChange={handleInputChange}
          required
          className="text-black p-2 rounded-lg border border-transparent"
        />
        {loginError && <p className="text-red-500">{loginError}</p>}
        <br />
        <label htmlFor="password">Пароль:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={loginData.password}
          onChange={handleInputChange}
          required
          className="text-black p-2 rounded-lg border border-transparent"
        />
        {passwordError && <p className="text-red-500">{passwordError}</p>}
        <br />
        <button
          type="submit"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
        >
          Войти
          <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
            -&gt;
          </span>
        </button>
      </form>
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
}
