<template>
    <div class="flex flex-col flex-1 items-center">
        <!-- Banner -->
        <div v-if="route.query.preview" class="text-white p-4 bg-secondary w-full text-center">
            <p>Você está vendo essa cidade, clique no ícone + para adicioná-la à sua lista</p>
        </div>

        <!-- Visão geral -->
        <div class=" flex flex-col text-white py-4">
            <h1 class="text-4xl mb-2 text-center">{{ route.params.city }} | {{ route.params.state }}</h1>
            <p>
                {{
                    new Date(weatherData.currentTime).toLocaleDateString(
                        "pt-BR",
                        {
                            weekday: "long",
                            day: "2-digit",
                            month: "long"
                        }
                    )
                }}
                {{
                    new Date(weatherData.currentTime).toLocaleString("pt-BR", {
                        dateStyle: "short",
                        timeStyle: "short"
                    })
                }}
            </p>
            <p class="text-8xl text-center">
                {{ Math.round(weatherData.current.temp) }}°C
            </p>
            <div class="text-center text-lg">
                <p class="">
                    Sensação térmica:
                    {{ Math.round(weatherData.current.feels_like) }}°C
                </p>
                <p class="capitalize">
                    {{ (weatherData.current.weather[0].description) }}
                </p>
                <img class="w-28 h-auto mx-auto"
                    :src="`http://openweathermap.org/img/wn/${weatherData.current.weather[0].icon}@2x.png`" alt="">
            </div>
        </div>

        <hr class="border-white border-opacity-10 border w-full" />

        <!-- Clima por hora -->
        <div class="max-w-screen-md w-full py-5">
            <div class="mx-8 text-white">
                <h2 class="text-center text-lg">Previsão para agora</h2>
                <div class="flex gap-10 weather-overflow">
                    <div v-for="hourWeather in weatherData.hourly" :key="hourWeather.dt" class="flex flex-col items-center">
                        <img class="w-auto h-auto mx-auto"
                            :src="`http://openweathermap.org/img/wn/${hourWeather.weather[0].icon}@2x.png`" alt="">
                        <p>
                            {{ Math.round(hourWeather.temp) }}°C
                        </p>
                        <p class="whitespace-nowrap text-md">
                            {{
                                new Date(hourWeather.currentTime).toLocaleTimeString(
                                    "pt-BR",
                                    {
                                        hour: "numeric",
                                        minute: "numeric"
                                    }
                                )
                            }}
                        </p>
                    </div>
                </div>
            </div>
        </div>

        <hr class="border-white border-opacity-10 border w-full" />

        <!-- Clima durante a semana -->
        <div class="w-full max-w-screen-md">
            <div class="text-white">
                <h2 class="text-center text-lg">Previsão para semana</h2>
                <div v-for="day in weatherData.daily" :key="day.dt" class="flex items-center">
                    <p class="flex-1 capitalize">
                        {{
                            new Date(day.dt * 1000).toLocaleDateString(
                                "pt-BR",
                                {
                                    weekday: "long"
                                }
                            )
                        }}
                    </p>
                    <img class="h-16" :src="`http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`" alt="">
                    <div class="flex flex-1 justify-end gap-2 text-sm">
                        <p>Max: {{ Math.round(day.temp.max) }}°C</p>
                        |
                        <p>Min: {{ Math.round(day.temp.min) }}°C</p>
                    </div>
                </div>
            </div>
        </div>

        <!-- Remover cidade -->
        <div v-if="!route.query.preview" class="text-white flex gap-2 items-center py-2 cursor-pointer duration-150 hover:text-red-500"
            @click="removeCity">
            <i class="fa-solid fa-trash"></i>
            <p>Remover cidade</p>
        </div>
    </div>
</template>

<script setup lang="ts">
import axios from 'axios'
import { useRoute, useRouter } from 'vue-router';
import type IInternalCity from '@/interfaces/IInternalCity'

const route = useRoute();
const apiKey = "***";

const getWheaterData = async () => {
    try {
        const weatherData = await axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${route.query.lat}&lon=${route.query.lng}&appid=${apiKey}&units=metric`)

        const localOffset = new Date().getTimezoneOffset() * 60000;
        const utc = weatherData.data.current.dt * 1000 + localOffset;
        weatherData.data.currentTime = utc + 1000 * weatherData.data.timezone_offset

        weatherData.data.hourly.forEach((hour: any) => {
            const utc = hour.dt * 1000 + localOffset;
            hour.currentTime = utc + 1000 * weatherData.data.timezone_offset;
        });

        return weatherData.data;
    } catch (error) {
        console.log(error)
    }
}

const weatherData = await getWheaterData();

const router = useRouter()

const removeCity = () => {
    const citiesJSON = localStorage.getItem('savedCities')
    if (citiesJSON) {
        const cities = JSON.parse(citiesJSON);
        const updatedCities = cities.filter((city: IInternalCity) => route.query.id != city.id)
        localStorage.setItem('savedCities', JSON.stringify(updatedCities));
    }

    router.push({
        name: "home"
    })
}
</script>

<style scoped>
.weather-overflow {
    overflow-x: scroll;
}

.weather-overflow::-webkit-scrollbar {
    width: 10px;
}

.weather-overflow::-webkit-scrollbar-track {
    background: transparent;
    border-radius: 20px;
}

.weather-overflow::-webkit-scrollbar-thumb {
    background: #004E71;
    border-radius: 30px;
}
</style>