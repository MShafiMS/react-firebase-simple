import auth from "@component/firebase.inig";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import {
    useCreateUserWithEmailAndPassword,
    useUpdateProfile,
} from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";

const register = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const router = useRouter();

  const [createUserWithEmailAndPassword, user, error] =
    useCreateUserWithEmailAndPassword(auth);

  const [updateProfile, updating, upError] = useUpdateProfile(auth);

  let singInError;
  if (error || upError) {
    singInError = (
      <p className="text-red-600 text-center">
        {error?.message || upError?.message}
      </p>
    );
  }

  useEffect(() => {
    if (user) {
      router.push("/");
      console.log("registered successfully");
    }
  }, [user]);

  const onSubmit = async (data) => {
    const name = data?.firstname + " " + data?.lastname;
    await createUserWithEmailAndPassword(data.email, data.password);
    await updateProfile({ displayName: name });
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
          <h1 className="font-bold text-3xl uppercase text-center">Register</h1>
          <form onSubmit={handleSubmit(onSubmit)} className="my-6">
            <div className="my-4">
              <p className="uppercase font-medium">First Name</p>
              <input
                type="text"
                className="py-1.5 px-2 rounded-lg w-80 mt-1 dark:bg-black border border-black dark:border-white"
                {...register("firstname", {
                  required: {
                    value: true,
                    message: "First Name is require",
                  },
                })}
              />
              <p>
                {errors.firstname?.type === "required" && (
                  <span className="text-red-600">
                    {errors.firstname.message}
                  </span>
                )}
              </p>
            </div>
            <div className="my-4">
              <p className="uppercase font-medium">Last Name</p>
              <input
                type="text"
                className="py-1.5 px-2 rounded-lg w-80 mt-1 dark:bg-black border border-black dark:border-white"
                {...register("lastname", {
                  required: {
                    value: true,
                    message: "Last Name is require",
                  },
                })}
              />
              <p>
                {errors.lastname?.type === "required" && (
                  <span className="label-text-alt text-red-600">
                    {errors.lastname.message}
                  </span>
                )}
              </p>
            </div>
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
                disabled={updating}
                className="dark:bg-white dark:text-black bg-black text-white my-5 rounded-lg w-80 px-4 py-2 font-bold uppercase"
              >
                {updating ? "Loading..." : "Register"}
              </button>
            </div>
            <p className="text-center">
              Already have an account?{" "}
              <Link
                href="/login"
                className="underline font-medium text-blue-300"
              >
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default register;
