import auth from "@component/firebase.inig";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";

const login = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const router = useRouter();

  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);

  let singInError;

  if (error) {
    singInError = <p className="text-red-600 text-center">{error?.message}</p>;
  }

  useEffect(() => {
    if (user) {
      router.push("/");
      console.log("logged in successfully");
    }
  }, [user]);

  const onSubmit = (data) => {
    signInWithEmailAndPassword(data.email, data.password);
  };
  return (
    <div>
      <div className="py-6 px-4">
        <Link
          href="/"
          className="uppercase font-bold px-6 py-1 rounded dark:bg-white dark:text-black bg-black text-white"
        >
          Home
        </Link>
      </div>
      <div className="flex min-h-[90vh] flex-col items-center justify-center">
        <div className="border lg:p-6 p-3 rounded-2xl border-black dark:border-white">
          <h1 className="font-bold text-3xl uppercase text-center">Login</h1>
          <form onSubmit={handleSubmit(onSubmit)} className="my-6">
            <div className="my-4">
              <p className="uppercase font-medium">Email</p>
              <input
                type="email"
                className="py-1.5 px-2 rounded-lg w-80 mt-1 dark:bg-black border border-black dark:border-white"
                {...register("email", {
                  required: {
                    value: true,
                    message: "Email is require",
                  },
                  pattern: {
                    value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                    message: "Provide a valid Email",
                  },
                })}
              />
              <p>
                {errors.email?.type === "required" && (
                  <span className="label-text-alt text-red-600">
                    {errors.email.message}
                  </span>
                )}
                {errors.email?.type === "pattern" && (
                  <span className="label-text-alt text-red-600">
                    {errors.email.message}
                  </span>
                )}
              </p>
            </div>
            <div className="my-4">
              <p className="uppercase font-medium">Password</p>
              <input
                type="password"
                className="py-1.5 px-2 rounded-lg w-80 mt-1 dark:bg-black border border-black dark:border-white"
                {...register("password", {
                  required: {
                    value: true,
                    message: "Password is require",
                  },
                  minLength: {
                    value: 6,
                    message: "Must be 6 characters or longer",
                  },
                })}
              />
              <p>
                {errors.password?.type === "required" && (
                  <span className="label-text-alt text-red-600">
                    {errors.password.message}
                  </span>
                )}
                {errors.password?.type === "minLength" && (
                  <span className="label-text-alt text-red-600">
                    {errors.password.message}
                  </span>
                )}
              </p>
            </div>
            {singInError}
            <div className="flex justify-center">
              <button
                type="submit"
                disabled={loading}
                className="dark:bg-white dark:text-black bg-black text-white my-5 rounded-lg w-80 px-4 py-2 font-bold uppercase"
              >
                {loading ? "Loading..." : "Login"}
              </button>
            </div>
            <p className="text-center">
              Don't have an account yet?{" "}
              <Link
                href="/register"
                className="underline font-medium text-blue-300"
              >
                Register
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default login;
