<template>
    <header class="sticky top-0 bg-primary shadow-xl">
        <nav class="container flex flex-col sm:flex-row items-center gap-4 text-white py-6">
            <RouterLink :to="{ name: 'home' }">
                <div class="flex items-center gap-3">
                    <i class="fa-solid fa-sun text-2xl"></i>
                    <p class="text-2xl">Clima tempo</p>
                </div>
                <div></div>
            </RouterLink>
            <div class="flex gap-3 flex-1 justify-end">
                <i @click="toggleModal"
                    class="fa-solid fa-circle-info text-xl hover:text-secondary duration-150 cursor-pointer"></i>
                <i v-if="route.query.preview" @click="addCity" class="fa-solid fa-plus text-xl cursor-pointer hover:text-secondary duration-150"></i>
            </div>
            <BaseModal :active="showModal" @close-modal="toggleModal">
                <div class="text-black py-2">
                    <h1 class="text-lg font-bold">Sobre:</h1>
                    <p>O Clima tempo foi construído com o objetivo de praticar a tecnologia Vue JS seguindo os passos do
                        youtuber Net Ninja que poderá ser encontrado clicando
                        <a href="https://www.youtube.com/playlist?list=PL4cUxeGkcC9hfoy8vFQ5tbXO3vY0xhhUZ"
                            class="font-bold text-blue-700">
                        </a>
                    </p>
                    <h2 class="text-lg font-bold">Como utilizar?</h2>
                    <ol class="list-decimal list-inside">
                        <li>Procure por qualquer cidade do mundo</li>
                        <li>Clique na cidade para visualizar os detalhes sobre o clima</li>
                        <li>Clique no ícone "+" para salvar a cidade como favorita</li>
                    </ol>
                </div>
            </BaseModal>
        </nav>
    </header>
</template>

<script setup lang="ts">
import { RouterLink, useRoute } from 'vue-router';
import BaseModal from './BaseModal.vue';
import { ref } from 'vue';
import { uid } from 'uid';
import router from '@/router';
import type IInternalCity from '@/interfaces/IInternalCity'

let showModal = ref(false);

const toggleModal = () => {
    showModal.value = !showModal.value
}

const savedCities = ref<IInternalCity[]>([]) as any;
const route = useRoute();
const addCity = () => {

    if (localStorage.getItem('savedCities')) {
        const savedCitiesJson = localStorage.getItem('savedCities');

        if (savedCitiesJson) {
            savedCities.value = JSON.parse(savedCitiesJson);
        }
    }

    const location = {
        id: uid(),
        state: route.params.state,
        city: route.params.city,
        coords: {
            lat: route.query.lat,
            lng: route.query.lng
        }
    }

    savedCities.value.push(location);

    localStorage.setItem('savedCities', JSON.stringify(savedCities.value));

    let query = Object.assign({}, route.query);
    delete query.preview;
    query.id = location.id;
    router.replace({ query });
}

</script>
