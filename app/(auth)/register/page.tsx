"use client";
import Link from "next/link";
import Image from "next/image";
import { Poppins } from "next/font/google";
import { FormEvent, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { motion, AnimatePresence } from "framer-motion";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import LoginSwiper from "@/components/LandingPage/MiniComponent/LoginSwiper";

// Icons
import { TiTick } from "react-icons/ti";
import { GrLock } from "react-icons/gr";
import { CiWarning } from "react-icons/ci";
import { TfiReload } from "react-icons/tfi";
import { IoMailOutline } from "react-icons/io5";
import { auth } from "@/lib/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

const poppins = Poppins({ subsets: ["latin"], weight: "400" });

const Register = () => {
  const [error, setError] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isAlertFields, setIsAlertFields] = useState<boolean>(false);
  const [isAlertPasswords, setIsAlertPasswords] = useState<boolean>(false);
  const [isShowSuccess, setIsShowSuccess] = useState<boolean>(false);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setIsLoading(true);

    if (!email || !password) {
      setIsAlertFields(true);
      setIsLoading(false);
      return;
    }

    if (password.length < 8) {
      setIsAlertPasswords(true);
      setIsLoading(false);
      return;
    }

    try {
      const signUpUser = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      if (signUpUser.user) {
        setIsShowSuccess(true);
      }
      setIsLoading(false);
    } catch (error) {
      const errorCode = (error as any).code;
      if (errorCode == "auth/email-already-in-use") {
        setError("The email address is already in use");
      }
      setIsLoading(false);
    }
  };

  return (
    <main
      className={`${poppins.className}relative bg-white flex justify-center items-center h-screen`}
    >
      <div className="flex justify-between items-center h-[80vh] w-[80vw] shadow-lg rounded-lg">
        <div className="w-1/2 h-full p-16">
          <div>
            <Image
              src={"https://www.digisailor.com/images/logo.png"}
              alt="logo"
              height={500}
              width={500}
              className="w-24"
            />
          </div>

          <div className="mt-4">
            <h1 className="text-3xl font-bold">Create your new account</h1>
            <p className="text-sm font-light">
              Welcome! Provide credentials to start registering.
            </p>
          </div>

          {/* Register Form */}
          <div className="mt-8">
            <form onSubmit={handleSubmit}>
              <div className="relative">
                <IoMailOutline className="absolute top-2 left-2 text-2xl text-gray-400" />
                <Input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className="px-10 w-96"
                />
              </div>

              <div className="relative mt-4">
                <GrLock className="absolute top-2 left-2 text-2xl text-gray-400" />
                <Input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  className="px-10 w-96"
                />
              </div>

              <div className="mt-4 w-96 flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="terms"
                    className="bg-[#63EC33]"
                    defaultChecked
                    disabled
                  />
                  <label
                    htmlFor="terms"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    remember me
                  </label>
                </div>

                <div className="text-[12px]">
                  <Link
                    href={"/sign-in"}
                    className="underline text-[#63EC33] font-bold"
                  >
                    Already have an account?
                  </Link>
                </div>
              </div>

              <div className="mt-4">
                {!isLoading ? (
                  <Button className="bg-[#63EC33] hover:bg-[#2da50d] w-96">
                    Register
                  </Button>
                ) : (
                  <Button disabled className="bg-[#2da50d] w-96">
                    <TfiReload className="mr-2 h-4 w-4 animate-spin" />
                    Please wait...
                  </Button>
                )}
              </div>
            </form>

            <div className="text-[12px] flex justify-center items-center mt-6">
              Already have an account?{" "}
              <Link href={"/sign-in"} className="font-bold text-[#63EC33] ml-4">
                click to Sign In.
              </Link>
            </div>
          </div>
        </div>

        <div className="w-1/2 h-full">
          <LoginSwiper />
        </div>
      </div>

      {/* Alert Messages */}
      <AnimatePresence>
        {isAlertFields && (
          <motion.div
            initial={{ x: "-100%" }}
            exit={{ x: "-100%" }}
            animate={{ x: 0 }}
            transition={{ type: "spring", damping: 10, stiffness: 100 }}
            className="fixed bottom-10 left-0"
          >
            <Alert
              variant="destructive"
              className="bg-white bg-opacity-5 backdrop-blur-sm"
            >
              <CiWarning className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>
                Ensure all fields are filled before proceeding.
                <div
                  onClick={() => setIsAlertFields(false)}
                  className="text-red-500 underline font-bold"
                >
                  click to close.
                </div>
              </AlertDescription>
            </Alert>
          </motion.div>
        )}

        {isAlertPasswords && (
          <motion.div
            initial={{ x: "-100%" }}
            exit={{ x: "-100%" }}
            animate={{ x: 0 }}
            transition={{ type: "spring", damping: 10, stiffness: 100 }}
            className="fixed bottom-10 left-0"
          >
            <Alert
              variant="destructive"
              className="bg-white bg-opacity-5 backdrop-blur-sm"
            >
              <CiWarning className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>
                Passwords must be a minimum of 8 characters.
                <div
                  onClick={() => setIsAlertPasswords(false)}
                  className="text-red-500 underline font-bold"
                >
                  click to close.
                </div>
              </AlertDescription>
            </Alert>
          </motion.div>
        )}

        {isShowSuccess && (
          <motion.div
            initial={{ x: "-100%" }}
            exit={{ x: "-100%" }}
            animate={{ x: 0 }}
            transition={{ type: "spring", damping: 10, stiffness: 100 }}
            className="fixed bottom-10 left-0"
          >
            <Alert className="bg-white bg-opacity-5 backdrop-blur-sm text-[#63EC33] border-[#63EC33]">
              <TiTick className="h-4 w-4 text-[#63EC33]" />
              <AlertTitle>Success</AlertTitle>
              <AlertDescription>
                Registered successfully now you can
                <Link
                  href={"/sign-in"}
                  className="text-[#63EC33] underline font-bold"
                >
                  SIGNIN.
                </Link>
              </AlertDescription>
            </Alert>
          </motion.div>
        )}

        {error && (
          <motion.div
            initial={{ x: "-100%" }}
            exit={{ x: "-100%" }}
            animate={{ x: 0 }}
            transition={{ type: "spring", damping: 10, stiffness: 100 }}
            className="fixed bottom-10 left-0"
          >
            <Alert
              variant="destructive"
              className="bg-white bg-opacity-5 backdrop-blur-sm"
            >
              <CiWarning className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>
                {error}
                <div
                  onClick={() => setError("")}
                  className="text-red-500 underline font-bold"
                >
                  click to close.
                </div>
              </AlertDescription>
            </Alert>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
};

export default Register;
