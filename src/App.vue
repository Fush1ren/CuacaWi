<script setup lang="ts">
import axios from "axios";
import { computed, ref } from "vue";
import config from "./config";
import type { WeatherType } from "./types";

const townModel = ref<string>();
const weatherData = ref<WeatherType>();

// onMounted(() => {
//   navigator.geolocation.getCurrentPosition(success, error);
// });

const flagSource = computed((): string => {
  if (!weatherData?.value?.sys?.country) return "";
  return `${config?.FLAG_URL}/${weatherData?.value?.sys?.country}/flat/64.png`;
});

// function error() {
//   alert("Sorry, no position available.");
// }

// function success(position) {
//   const x = document.getElementById("demo");
//   if (!x) return;
//   console.log(position);
//   x.innerHTML =
//     "Latitude: " +
//     position.coords.latitude +
//     "<br>Longitude: " +
//     position.coords.longitude;
// }

const getWeather = async (): Promise<void> => {
  try {
    if (!townModel?.value) return;
    // const { data } = await axios.get(`${config?.BMKG_URL}?adm4=31.74.05.1003`);
    const { data } = await axios.get(
      `${config?.API_URL}?q=${townModel?.value}&appid=${config?.API_KEY}`
    );
    weatherData.value = data;
  } catch (e) {
    console.error(e);
    weatherData.value = undefined;
  }
};

const formatDay = (num: number): String => {
  switch (num) {
    case 1:
      return "Monday";
    case 2:
      return "Tuesday";
    case 3:
      return "Wednesday";
    case 4:
      return "Thursday";
    case 5:
      return "Friday";
    case 6:
      return "Saturday";
    default:
      return "Sunday";
  }
};

const formatDate = (data: number | Date | string) => {
  const temp = new Date(data);
  const day = formatDay(temp?.getDay());
  const date = temp?.getDate();
  const month = temp?.toLocaleString("default", { month: "long" });
  const year = temp?.getFullYear();
  return `${day}, ${date} ${month} ${year}`;
};

const getIcon = (icon: string): string => {
  const ic = `${config.ICON_URL}/${icon}@2x.png`;
  return ic;
};

const kelvinToCelcius = (degrees: number): string => {
  const celcius = degrees - 273.15;
  const celciusStr = celcius?.toString();
  return celciusStr?.split(".")[0];
};

const meterToKM = (num: number): string => {
  if (num >= 1000) {
    return `${num / 1000} km`;
  }
  return `${num} m`;
};

const getTime = (num: number): string => {
  const temp = new Date(num);
  const hour = temp?.getHours();
  const minute = temp?.getMinutes();
  return `${hour}:${minute}`;
};
</script>

<template>
  <div
    class="relative h-screen w-full text-white bg-cover bg-center"
    style="background-image: url('/src/assets/images/background-web.jpg')"
  >
    <div class="flex flex-col h-full justify-between">
      <div class="w-full">
        <div class="flex justify-center w-full h-fit py-8 lg:py-4">
          <form
            class="flex flex-col w-[300px] md:w-[400px] lg:w-[500px] h-fit"
            @submit.prevent="getWeather"
          >
            <div class="pb-2">
              <span>Country/Town</span>
            </div>
            <input
              v-model="townModel"
              type="text"
              class="border rounded px-2 py-1 border-gray-700 text-black placeholder:!font-light focus:!outline-none focus:!border-black"
              placeholder="Search country/town"
            />
          </form>
          <a id="demo" />
        </div>
        <div v-if="weatherData">
          <div class="flex flex-row w-full justify-center">
            <div class="flex flex-col items-center">
              <img :src="flagSource" />
              <span class="font-semibold text-xl lg:text-2xl">
                {{ weatherData?.name }}, {{ weatherData?.sys?.country }}
              </span>
              <span class="font-semivold text-lg lg:text-xl">
                {{ formatDate(new Date()) }}
                <!-- {{ formatDate(weatherData?.sys?.sunrise * 1000) }} -->
              </span>
            </div>
          </div>
          <div class="w-full py-4 flex justify-center">
            <div
              class="flex justify-center gap-2 lg:gap-8 bg-[#e0dce3]/50 w-fit p-4 rounded-lg text-gray-700"
            >
              <div
                :key="index"
                v-for="(weather, index) in weatherData?.weather"
                class="flex flex-col px-4"
              >
                <div class="w-[80px] h-[80px]">
                  <img :src="getIcon(weather?.icon)" />
                </div>
                <span>
                  {{ weather?.main }}
                  {{ kelvinToCelcius(weatherData?.main?.temp) }}°C
                </span>
              </div>
              <div class="w-[150px] lg:w-[200px] flex flex-col justify-center">
                <div
                  class="flex flex-row border-b border-b-black py-1 whitespace-nowrap"
                >
                  <div class="w-full">
                    <span>Humidity</span>
                  </div>
                  <div>
                    <span>{{ weatherData?.main?.humidity }}%</span>
                  </div>
                </div>
                <div
                  class="flex flex-row border-b border-b-black py-1 whitespace-nowrap"
                >
                  <div class="w-full">
                    <span>Feels Like</span>
                  </div>
                  <div>
                    <span>
                      {{ kelvinToCelcius(weatherData?.main?.feels_like) }}°C
                    </span>
                  </div>
                </div>
                <div
                  class="flex flex-row border-b border-b-black py-1 whitespace-nowrap"
                >
                  <div class="w-full">
                    <span>Visibility</span>
                  </div>
                  <div>
                    <span>
                      {{ meterToKM(weatherData?.visibility) }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="w-full flex justify-center gap-2 lg:gap-4">
            <div
              class="flex flex-col bg-[#e0dce3]/50 w-fit p-4 rounded-lg text-gray-700"
            >
              <div class="text-center">
                <span class="font-semibold text-lg">Wind</span>
              </div>
              <div class="w-[115px] lg:w-[150px] pt-1">
                <div class="flex gap-4 whitespace-nowrap">
                  <div class="w-full">
                    <span>Speed</span>
                  </div>
                  <div>
                    <span>{{ `${weatherData?.wind?.speed} m/s` }}</span>
                  </div>
                </div>
                <div class="flex gap-2 whitespace-nowrap">
                  <div class="w-full">
                    <span>Degrees</span>
                  </div>
                  <div>
                    <span>{{ `${weatherData?.wind?.deg}°` }}</span>
                  </div>
                </div>
              </div>
            </div>
            <div
              class="flex flex-col bg-[#e0dce3]/50 w-fit p-4 rounded-lg text-gray-700"
            >
              <div class="text-center">
                <span class="font-semibold text-lg">&#8203;</span>
              </div>
              <div class="w-[115px] lg:w-[150px] pt-1">
                <div class="flex gap-4 whitespace-nowrap">
                  <div class="w-full">
                    <span>Sunrise</span>
                  </div>
                  <div>
                    <span>{{ getTime(weatherData?.sys?.sunrise * 1000) }}</span>
                  </div>
                </div>
                <div class="flex gap-2 whitespace-nowrap">
                  <div class="w-full">
                    <span>Sunset</span>
                  </div>
                  <div>
                    <span>{{ getTime(weatherData?.sys?.sunset * 1000) }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="w-full h-[40px] text-sm lg:text-lg">
        <div class="flex justify-center gap-2">
          <div class="flex gap-1 justify-center">
            <a
              href="https://openweathermap.org/"
              class="hover:underline hover:cursor-pointer hover:text-blue-500"
              >API from OpenWeather</a
            >
          </div>
          <div class="flex gap-1 justify-center">
            <a
              href="https://www.freepik.com"
              class="hover:underline hover:cursor-pointer hover:text-blue-500"
              >Designed by Freepik</a
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
