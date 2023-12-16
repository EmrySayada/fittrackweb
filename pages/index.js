import React, { useState, useEffect } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/firebase.config";
import { useRouter } from "next/router";
import { getData, updateUserData, newUserData } from "@/firebaseHelper";

export default function Home() {
  const [w, setW] = useState(0);
  const [val, setVal] = useState(0);
  const [tempVal, setTempVal] = useState(0);
  const [proteinMax, setProteinMax] = useState();
  const [user, setUser] = useState();
  const router = useRouter();
  useEffect((e) => {
    var date = new Date();
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        var result = await newUserData(user);
        if (result) {
          const res = await getData(user);
          setProteinMax(res.proteinMax);
          setW(res.weight);
          setVal(res.proteinCurr);
          setUser(user);
          if (res.lastSignedIn < date.getDay()) {
            updateUserData(user, {
              proteinCurr: 0,
              lastSignedIn: date.getDay(),
            });
          }
        }
      } else {
        router.push("/register");
      }
    });
  }, []);
  return (
    <div className="bg-black flex h-screen w-screen items-center justify-center flex-col">
      <h1 className="text-white text-[24px] font-Poppins font-thin">Hello</h1>
      <section className="bg-[#141414] h-[350px] w-[350px] rounded-[30px] flex items-center justify-around flex-col">
        <h1 className="text-white font-Poppins text-[20px] font-semibold">
          Protein intake
        </h1>
        <section className="h-[50%] w-[50%] flex items-center justify-center flex-col">
          <CircularProgressbar
            value={parseInt((val / proteinMax) * 100)}
            className="rotate-[-90deg]"
            styles={buildStyles({
              rotation: 0.25,
              strokeLinecap: "round",
              pathTransitionDuration: 0.5,
              pathColor:
                val >= proteinMax ? "rgb(18,255,113)" : "rgb(72,72,72)",
              trailColor: "#d6d6d6",
              backgroundColor: "#3e98c7",
              maxValue: proteinMax,
            })}
          />
          <p className="font-Poppins text-white text-[24px] absolute font-bold">
            {parseInt((val / proteinMax) * 100)}%
          </p>
        </section>
        <input
          type="number"
          placeholder="Enter amount of protein"
          className="bg-black font-Poppins placeholder:text-white h-[50px] w-[90%] flex pl-[20px] rounded-[20px] text-white hover:border-[5px] transition-all"
          onChange={(v) => {
            if (v.target.value.length != 0) {
              setTempVal(val + parseInt(v.target.value));
            } else {
              setTempVal(val);
            }
          }}
        />
      </section>
      <button
        onClick={async () => {
          const data = { proteinCurr: parseInt(tempVal) };
          await updateUserData(user, data);
          router.reload();
        }}
        className="text-white font-Poppins font-semibold bg-[#141414] h-[50px] w-[50%] rounded-[20px] hover:border-[5px] transition-all mt-[40px]"
      >
        Continue
      </button>
    </div>
  );
}
