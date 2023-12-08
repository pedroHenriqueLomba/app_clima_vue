<template>
    <main class="container">
        <div class="pt-8 mb-8 relative">
            <input type="text" placeholder="Busque a cidade desejada"
                class="py-2 px-1 w-full bg-transparent border-b-2 border-secondary focus:outline-none focus:shadow-md text-white"
                v-model="searchedPlace" @input="searchPlaces">
            <ul class="absolute bg-secondary text-white w-full shadow-md mt-1">
                <li v-for="place in searchResults" :key="place.id" class="py-2 px-1 cursor-pointer"
                    @click="goToPlace(place)">{{
                        place.place_name }} </li>
                <li v-if="searchResults.length == 0 && typeof searchResults === 'object'" class="py-2 px-1">Sem resultados
                </li>
                <li v-if="searchError" class="py-2 px-1">Algo deu errado, desculpe</li>
            </ul>
        </div>
        <div class="flex flex-col gap-4">
            <Suspense>
                <CityList></CityList>
                <template #fallback><LoadingComponent/></template>
            </Suspense>
        </div>
    </main>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import axios from 'axios'
import router from '@/router';
import CityList from '@/components/CityList.vue'
import LoadingComponent from '@/components/LoadingComponent.vue';

const mapboxApiKey = "***"
const searchedPlace = ref("");
const searchPlacesTimeout = ref(0);
const searchResults: any = ref("");
const searchError = ref(false);

const searchPlaces = () => {
    clearTimeout(searchPlacesTimeout.value);
    searchPlacesTimeout.value = setTimeout(async () => {
        if (searchedPlace.value != "") {
            try {
                const result = await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${searchedPlace.value}.json?access_token=${mapboxApiKey}&types=place`);
                searchResults.value = result.data.features;
            } catch (error) {
                searchError.value = true;
            }
        } else {
            searchResults.value = '';
        }
    }, 500);
}

const goToPlace = (place: any) => {
    const [city, state] = place.place_name.split(',');
    router.push({
        name: 'cityView',
        params: {
            state: state,
            city: city
        },
        query: {
            lat: place.geometry.coordinates[1],
            lng: place.geometry.coordinates[0],
            preview: ['true']
        }
    })
}

</script>

<style scoped></style>