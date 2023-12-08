<template>
    <main>
        <Suspense>
            <AsyncCityView />
            <template #fallback>
                <LoadingComponent />
            </template>
        </Suspense>
    </main>
</template>

<script lang="ts" setup>
import AsyncCityView from '@/components/AsyncCityView.vue';
import LoadingComponent from '@/components/LoadingComponent.vue';

</script>
