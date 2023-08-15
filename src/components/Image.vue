<script setup>

const props = defineProps({
    src: String
})


</script>

<template>
    <div class="image-wrapper">
        <img :src=src alt=""/>
    </div>
</template>

<style scoped>
.image-wrapper {
  width: 100px;
  height: 100px;
}
.image-wrapper img{
    width: 100px;
  height: 100px;
}
</style>