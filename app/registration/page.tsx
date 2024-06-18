import RegisterForm from "./RegisterForm";

export default async function Registration() {
  return (
    <div className="flex flex-col justify-center items-center gap-8 mt-10">
      <h1>Создайте новую учетную запись</h1>
      <RegisterForm />
    </div>
  );
}
