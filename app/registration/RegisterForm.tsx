"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "react-query";
import { useRouter } from "next/navigation";
import { schema, createUser } from "./registerUser";
import { z } from "zod";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type FormData = z.infer<typeof schema>;

export default function RegisterForm() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const mutation = useMutation(createUser, {
    onSuccess: (_, variables) => {
      toast.success("User created successfully!");
      setTimeout(() => {
        router.push(`/clients/${variables.login}`);
      }, 2000);
      reset();
    },
    onError: (error: Error) => {
      toast.error(`Error creating user: ${error.message}`);
      reset();
    },
  });

  const onSubmit = (data: FormData) => {
    mutation.mutate(data);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="full_name">Фамилия Имя Отчество</label>
        <input
          type="text"
          id="full_name"
          {...register("full_name")}
          required
          className="text-black"
        />
        {errors.full_name && <span>{errors.full_name.message}</span>}

        <label htmlFor="login">Логин</label>
        <input
          type="text"
          id="login"
          {...register("login")}
          required
          className="text-black"
        />
        {errors.login && <span>{errors.login.message}</span>}

        <label htmlFor="password">Пароль</label>
        <input
          type="password"
          id="password"
          {...register("password")}
          required
          className="text-black"
        />
        {errors.password && <span>{errors.password.message}</span>}

        <button type="submit" disabled={mutation.isLoading}>
          Зарегистрироваться
        </button>

        {mutation.isLoading && <p aria-live="polite">Submitting...</p>}
        {mutation.isError && (
          <p aria-live="polite">Error: {mutation.error?.message}</p>
        )}
        {mutation.isSuccess && (
          <p aria-live="polite">User created successfully!</p>
        )}
      </form>
      <ToastContainer />
    </div>
  );
}
