import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <p className="fixed left-0 top-0 w-full text-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          Начните пользоваться приложением, пройдя на страницу
          <br />
          <span className="font-mono font-bold">Регистрации&nbsp;</span>{" "}
          или&nbsp; <span className="font-mono font-bold">Логина</span>
        </p>
        <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:size-auto lg:bg-none">
          <a
            href="https://github.com/mariaklyass/test-api"
            className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div>
              <h2 className="mb-3 text-2xl font-semibold">
                <Image
                  className="inline relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
                  src="/github.svg"
                  alt="GitHub Logo"
                  width={24}
                  height={24}
                  priority
                />{" "}
                @mariaklyass{" "}
                <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                  -&gt;
                </span>
              </h2>
            </div>

            <p className="m-0 max-w-[30ch] text-sm opacity-50">
              Сделано в рамках отбора в АТОН на позицию стажера
              Fullstack-разработчика.
            </p>
          </a>
        </div>
      </div>

      <div className="relative z-[-1] flex flex-wrap justify-center items-center gap-8 place-items-center before:absolute before:h-[300px] before:w-full before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-full after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 sm:before:w-[480px] sm:after:w-[240px] before:lg:h-[360px]">
        <Image
          className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
          src="/next.svg"
          alt="Next.js Logo"
          width={180}
          height={37}
          priority
        />

        <Image
          className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
          src="/node.svg"
          alt="Node.js Logo"
          width={180}
          height={37}
          priority
        />
        <Image
          className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
          src="/database.svg"
          alt="Database Logo"
          width={100}
          height={37}
          priority
        />
      </div>

      <div className="text-center mt-8">
        Frontend-часть написана на Next.JS, TailwindCSS.
        <br />
        Backend-часть написана на Node.JS.
        <br />
        Данные хранятся в MongoDB.
        <br />
        <div className="mt-2 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:size-auto lg:bg-none">
          <a
            href="https://github.com/mariaklyass/test-api"
            className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
            target="_blank"
            rel="noopener noreferrer"
          >
            {" "}
            <p className="m-0 max-w-[30ch] text-sm opacity-50">
              Смотреть весь стек и код в github репозитории:
            </p>
            <div>
              <h3 className="mb-3 text-xl font-semibold">
                Код{" "}
                <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                  -&gt;
                </span>
              </h3>
            </div>
          </a>
        </div>
      </div>

      <div className="mb-32 grid text-center justify-items-center lg:mb-0 lg:w-full lg:max-w-5xl lg:grid-cols-2 lg:text-left">
        <Link
          href="/login"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
        >
          <h2 className="mb-3 text-2xl font-semibold">
            Логин{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className="m-0 max-w-[30ch] text-balance text-sm opacity-50">
            Войдите в систему, используя логин и пароль, если у Вас есть учетная
            запись.
          </p>
        </Link>
        <Link
          href="/registration"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
        >
          <h2 className="mb-3 text-2xl font-semibold">
            Регистрация{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className="m-0 max-w-[30ch] text-balance text-sm opacity-50">
            Создайте новую учетную запись, зарегистрировавшись с помощью логина,
            пароля и ФИО.
          </p>
        </Link>
      </div>
    </main>
  );
}
