"use client";

import Image from "next/image";
import Clock from "react-live-clock";
import windIcon from "../images/wind-svgrepo-com.svg";
import rainIcon from "../images/rain-svgrepo-com (1).svg";
import humidityIcon from "../images/humidity-svgrepo-com.svg";
import sunIcon from "../images/sun-svgrepo-com.svg";
import snowIcon from "../images/snow-svgrepo-com.svg";
import cloudIcon from "../images/clouds-cloud-svgrepo-com.svg";

import { useState } from "react";
import axios from "axios";
import Loading from "@/components/loading";
import { API_KEY } from "@/utils";

export default function Home() {
  const [name, setName] = useState("");
  const [data, setData] = useState(null);
  const [isLoad, setIsLoad] = useState(false);

  const handleClick = async () => {
    try {
      if (name === "") {
        return;
      }
      setIsLoad(true);
      const { data } = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=${API_KEY}`
      );
      setIsLoad(false);
      setData(data);
    } catch (error) {
      setIsLoad(false);
      setData(null);
      alert("not found!");
    }
  };

  const handleWeatherType = (main) => {
    switch (main) {
      case "Snow":
        return snowIcon;
      case "Rain":
        return rainIcon;
      case "Clouds":
        return cloudIcon;
      default:
        return sunIcon;
    }
  };

  return (
    <div className="select-none h-full flex justify-center items-center px-2">
      <div className="bg-gray-400 h-[60vh] w-[60vh] rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-gray-100">
        <div className="py-2">
          <h1 className="text-3xl text-center text-white">Weather app</h1>
        </div>
        <div className="mt-1 flex justify-center relative">
          <input
            className=" w-[90%] py-3 px-3 rounded-2xl focus:outline-none"
            type="text"
            placeholder="search..."
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <svg
            onClick={handleClick}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-8 h-8 absolute right-6 top-2 p-1 hover:bg-gray-100 rounded-full cursor-pointer "
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            />
          </svg>
        </div>
        {isLoad ? (
          <div className="h-auto flex justify-center mt-3">
            <Loading />
          </div>
        ) : (
          <div>
            <div className="mt-2 p-2">
              <h1 className="text-4xl text-white text-center">
                {data ? Math.floor(data?.main?.temp) - 273 : 0} <sup>0</sup>C
              </h1>
              <h2 className="text-2xl text-white text-center mt-2">
                {data ? data?.name : "New York"}
              </h2>
            </div>
            <div className="min-h-[20vh] mt-2">
              <div className="flex flex-col py-2 px-5">
                <div className="flex gap-3 items-center  ">
                  <Image
                    width={30}
                    height={30}
                    src={handleWeatherType(data?.weather[0]?.main)}
                    alt="rain"
                  />
                  <span className="text-white text-lg">
                    {data ? data?.weather[0]?.main : "sun"}
                  </span>
                </div>
                <div className="flex gap-3 items-center mt-3">
                  <Image width={30} height={30} src={windIcon} alt="wind" />
                  <span className="text-white text-lg">
                    {data ? data?.wind?.speed : 0} m/s
                  </span>
                </div>
                <div className="flex gap-3 items-center mt-3">
                  <Image
                    width={30}
                    height={30}
                    src={humidityIcon}
                    alt="humidity"
                  />
                  <span className="text-white text-lg">
                    {data ? data?.main?.humidity : 0} %
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
