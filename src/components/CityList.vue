<template>
    <div v-for="city in savedCities" :key="city.id">
        <CityCard :city="city" @click="goToCityView(city)" />
    </div>
    <div v-if="savedCities.length === 0" class="text-white">
        Ainda não existem cidades salvas.
    </div>
</template>

<script setup lang="ts">
import axios from 'axios';
import { ref } from 'vue';
import type IInternalCity from '@/interfaces/IInternalCity'
import CityCard from './CityCard.vue';
import { useRouter } from 'vue-router';

const savedCities = ref<IInternalCity[]>([]);
const apiKey = "****"

const getCities = async () => {
    if (localStorage.getItem('savedCities')) {
        const savedCitiesJson = localStorage.getItem('savedCities');
        if (savedCitiesJson) {
            savedCities.value = JSON.parse(savedCitiesJson);
        };


        const requests: any = [];

        savedCities.value.forEach((city) => {
            requests.push(axios.get(
                `https://api.openweathermap.org/data/2.5/weather?lat=${city.coords.lat}&lon=${city.coords.lng}&units=metric&appid=${apiKey}`
            ));
        });

        const weatherData = await Promise.all(requests);

        weatherData.forEach((value, index) => {
            savedCities.value[index].weather = value.data
        })
    }
}

await getCities();

const router = useRouter()
const goToCityView = (city: IInternalCity) => {
    router.push({
        name: "cityView",
        params: {state: city.state, city: city.city},
        query: {id: city.id, lat: city.coords.lat, lng: city.coords.lng}
    })
}
</script>

<style scoped></style>