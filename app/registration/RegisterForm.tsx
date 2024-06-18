"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "react-query";
import { useRouter } from "next/navigation";
import { schema, createUser } from "./registerUser";
import { z } from "zod";
import "react-toastify/dist/ReactToastify.css";

type FormData = z.infer<typeof schema>;

export default function RegisterForm() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });
  const clearErrorOnTouch = (fieldName: keyof FormData) => {
    clearErrors(fieldName);
  };

  const mutation = useMutation(createUser, {
    onSuccess: (_, variables) => {
      setTimeout(() => {
        router.push(`/clients/${variables.login}`);
      }, 2000);
      clearErrors();
    },
    onError: (error: Error) => {
      console.error("Error creating user:", error.message);
      clearErrors();
    },
  });

  const onSubmit = (data: FormData) => {
    mutation.mutate(data);
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col justify-center items-center gap-2"
      >
        <label htmlFor="full_name">Фамилия Имя Отчество</label>
        <input
          type="text"
          id="full_name"
          {...register("full_name")}
          onFocus={() => clearErrorOnTouch("full_name")}
          required
          className="text-black p-2 rounded-lg border border-transparent"
        />
        {errors.full_name && (
          <span className="text-red-500">{errors.full_name.message}</span>
        )}

        <label htmlFor="login">Логин</label>
        <input
          type="text"
          id="login"
          {...register("login")}
          required
          onFocus={() => clearErrorOnTouch("login")}
          className="text-black p-2 rounded-lg border border-transparent"
        />
        {errors.login && (
          <span className="text-red-500">{errors.login.message}</span>
        )}

        <label htmlFor="password">Пароль</label>
        <input
          type="password"
          id="password"
          {...register("password")}
          required
          onFocus={() => clearErrorOnTouch("password")}
          className="text-black p-2 rounded-lg border border-transparent"
        />
        {errors.password && (
          <span className="text-red-500">{errors.password.message}</span>
        )}

        <button
          type="submit"
          disabled={mutation.isLoading}
          className="mt-2 group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
        >
          Зарегистрироваться{" "}
          <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
            -&gt;
          </span>
        </button>

        {mutation.isLoading && <p aria-live="polite">Submitting...</p>}
        {mutation.isError && (
          <p aria-live="polite" className="text-red-500">
            {mutation.error?.message}
          </p>
        )}
        {mutation.isSuccess && (
          <p aria-live="polite">User created successfully!</p>
        )}
      </form>
    </div>
  );
}
