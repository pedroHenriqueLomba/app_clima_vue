<template>
    <Teleport to="body">
        <Transition name="modal-outer">
            <div class="absolute w-full h-screen bg-black bg-opacity-30 top-0 left-0 flex justify-center px-8"
                v-show="active">
                <div class="p-4 bg-white self-start mt-32 max-w-screen-md">
                    <slot></slot>
                    <button @click="$emit('close-modal')" class="bg-primary text-white py-2 px-6 rounded">
                        Fechar
                    </button>
                </div>
            </div>
        </Transition>
    </Teleport>
</template>

<script setup lang="ts">
defineProps({
    active: {
        type: Boolean,
        default: false
    }
})

defineEmits(['close-modal'])
</script>

<style scoped>
.modal-outer-enter-active,
.modal-outer-leave-active {
    transition: opacity 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02);
}

.modal-outer-enter-from,
.modal-outer-leave-to {
    opacity: 0;
}
</style>