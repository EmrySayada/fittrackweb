import React, { useState, useEffect } from "react";
import { updateUserData } from "@/firebaseHelper";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/firebase.config";
import { useRouter } from "next/router";

function Account() {
  const [w, setW] = useState(0);
  const [user, setUser] = useState();
  const router = useRouter();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
  }, []);
  return (
    <div className="bg-black flex items-center justify-center h-screen w-screen flex-col">
      <h1 className="text-white font-Poppins text-[24px] font-semibold">
        Account
      </h1>
      <section className="bg-[#141414] h-[350px] w-[350px] rounded-[20px] mt-[20px] items-center justify-center flex flex-col ">
        <input
          type="number"
          placeholder="Weight (in kg)"
          className="bg-black font-Poppins placeholder:text-white h-[50px] w-[50%] flex pl-[20px] rounded-[20px] text-white hover:border-[5px] transition-all"
          onChange={(v) => {
            setW(parseInt(v.target.value));
          }}
        />
        <button
          onClick={async () => {
            const data = { weight: w, proteinMax: w * 1.5, proteinCurr: 0 };
            updateUserData(user, data);
            router.push("/");
          }}
          className="text-white font-Poppins font-semibold bg-black h-[50px] w-[50%] rounded-[20px] hover:border-[5px] border-l-[#4285F4] border-t-[#34A853] border-r-[#FBBC05] border-b-[#FA4335] transition-all mt-[40px]"
        >
          Continue
        </button>
      </section>
    </div>
  );
}

export default Account;
