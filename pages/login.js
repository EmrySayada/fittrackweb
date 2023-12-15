import React, { useState, useEffect } from "react";
import { signInWithEmailAndPassword, GoogleAuthProvider } from "firebase/auth";
import { auth } from "@/firebase.config";
import { useRouter } from "next/router";

function Login() {
  const [email, setEmail] = useState();
  const [pass, setPass] = useState();
  const router = useRouter();
  <div className="bg-black flex h-screen items-center flex-col">
    <h1 className="text-white font-Poppins text-[24px] font-semibold mt-[30%]">
      Create an account
    </h1>
    <section className="bg-[#141414] h-[450px] w-[350px] flex items-center justify-center mt-[20%] rounded-[30px] flex-col">
      <input
        type="email"
        placeholder="Email"
        className="bg-black font-Poppins placeholder:text-white h-[50px] w-[90%] flex pl-[20px] rounded-[20px] text-white hover:border-[5px] transition-all"
        onChange={(val) => {
          setEmail(val.target.value);
        }}
      />
      <input
        type="password"
        placeholder="Password"
        className="bg-black font-Poppins placeholder:text-white h-[50px] w-[90%] flex pl-[20px] rounded-[20px] mt-[10px] text-white hover:border-[5px] transition-all"
        onChange={(val) => {
          setPass(val.target.value);
        }}
      />
      <button
        type="button"
        className="bg-black text-white font-semibold font-Poppins h-[50px] w-[70%] flex rounded-[20px] mt-[10px] items-center justify-center hover:border-[5px] transition-all  border-[rgba(18,255,113,0.5)]"
        onClick={() => {
          signInWithEmailAndPassword(auth, email, pass)
            .then((usr) => {
              console.log("signed in");
              router.push("/");
            })
            .catch((error) => {
              console.error(error.message);
            });
        }}
      >
        Create account
      </button>
      <p className="text-white font-Poppins text-[20px] my-[10px]">OR</p>
      <button className="text-white font-Poppins font-semibold bg-black h-[50px] w-[50%] rounded-[20px] hover:border-[5px] border-l-[#4285F4] border-t-[#34A853] border-r-[#FBBC05] border-b-[#FA4335] transition-all">
        Google
      </button>
    </section>
  </div>;
}

export default Login;
