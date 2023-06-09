import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import useAuth from "../hooks/useAuth";
import { FaGoogle, FaFacebook } from "react-icons/fa";

interface Inputs {
  email: string;
  password: string;
}

const Login = () => {
  const [login, setLogin] = useState(false);
  const { signIn, signUp, signInWithGoogle, signInWithFacebook } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = async ({ email, password }) => {
    if (login) {
      await signIn(email, password);
    } else {
      await signUp(email, password);
    }
  };
  return (
    <div className="relative flex h-screen w-screen flex-col bg-black md:items-center md:justify-center md:bg-transparent">
      <Head>
        <title>FilmZone</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Image
        src="https://images.unsplash.com/photo-1617914309185-9e63b3badfca?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
        layout="fill"
        className="-z-10 !hidden opacity-60 sm:!inline"
        objectFit="cover"
        alt="background"
      />

      <img
        src="https://i.postimg.cc/B61gRfvH/logo-removebg-preview.png"
        width={110}
        height={110}
        className="absolute left-2 top-1 h-33 w-33 cursor-pointer md:left-8 md:top-4"
      />

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="relative mt-32 space-y-8 rounded bg-black/75 py-10 px-6 md:mt-0 md:max-w-md md:px-14"
      >
        <h1 className="text-4xl font-semibold">Sign In</h1>
        <div className="space-y-4">
          <label className="inline-block w-full">
            <input
              type="email"
              placeholder="Email"
              className="input"
              {...register("email", { required: true })}
            />
            {errors.email && (
              <p className="text-sm  text-[#e50914]">
                Please enter a valid email.
              </p>
            )}
          </label>
          <label className="inline-block w-full">
            <input
              type="password"
              placeholder="Password"
              className="input"
              {...register("password", { required: true })}
            />
            {errors.password && (
              <p className="text-sm  text-[#e50914]">
                Your password must contain between 4 and 60 characters.
              </p>
            )}
          </label>
        </div>
        <button
          className="w-full rounded py-3 font-semibold transition duration-300 bg-gradient-to-r from-blue-600 to-red-600 hover:from-blue-700 hover:to-red-700"
          onClick={() => setLogin(true)}
        >
          Sign In
        </button>
        <button
          onClick={signInWithGoogle}
          className="w-full rounded bg-[#dd4b39] py-3 font-semibold hover:bg-[#c23321] active:bg-[#e74b37] transition duration-300"
        >
          <FaGoogle className="mr-2 inline-block" />
          <span className="content-center">Sign In with Google</span>
        </button>
        <button
          onClick={signInWithFacebook}
          className="w-full rounded bg-[#4361ee] py-3 font-semibold hover:bg-[#1e43e8] active:bg-[#1e43e8] transition duration-300"
        >
          <FaFacebook className="mr-2 inline-block" />
          <span className="content-center">Sign In with Facebook</span>
        </button>

        <div className="text-[gray]">
          New to FilmZone?{" "}
          <button
            type="submit"
            className="text-white hover:text-[#4361ee]"
            onClick={() => setLogin(false)}
          >
            Sign up now
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
