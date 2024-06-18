"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { User } from "../types";

export default function Login() {
  const router = useRouter();
  const [loginData, setLoginData] = useState({
    login: "",
    password: "",
  });
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3500/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });

      if (!response.ok) {
        throw new Error("Login failed");
      }

      const user: User = await response.json();

      router.push(`/clients/${user.login}`);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unknown error occurred");
      }
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="login">Login:</label>
        <input
          type="text"
          id="login"
          name="login"
          value={loginData.login}
          onChange={handleInputChange}
          required
          className="text-black"
        />
        <br />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={loginData.password}
          onChange={handleInputChange}
          required
          className="text-black"
        />
        <br />
        <button type="submit">Login</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
}
