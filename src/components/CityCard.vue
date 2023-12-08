<template>
    <div class="flex bg-secondary py-3 px-3 text-white rounded-md shadow-md cursor-pointer">
        <div class="flex flex-col flex-1">
            <h2 class="text-lg">{{ city.city }}</h2>
            <h3 class="text-sm">{{ city.state }}</h3>
        </div>

        <div class="flex flex-col items-center">
            <p class="text-2xl">
                {{ Math.round(city.weather.main.temp) }}°C
            </p>
            <p class="text-sm">
                Sensação: {{ Math.round(city.weather.main.feels_like) }}°C 
            </p>
        </div>
    </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
import type IInternalCity from '@/interfaces/IInternalCity'

defineProps({
    city: {
        type: Object as () => IInternalCity,
        required: true
    }
}
)
</script>    