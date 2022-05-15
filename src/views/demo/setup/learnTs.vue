<template>
  <h1>hello world</h1>
  <p>{{ num }}</p>
  <p>{{ dblNum }}</p>
  <a-button @click="increase">+</a-button>
  <a-input v-model:value="num" ref="domRef" />
</template>

<script setup lang="ts">
  import { ref, computed } from 'vue';
  const num = ref(2);
  const domRef = ref<ElRef>(null);
  console.log(num.value);
  let dblNum = computed(() => num.value ** 2);
  const increase = () => {
    num.value++;
    console.log(domRef.value);
  };
  console.log(domRef.value);
</script>
<style scoped></style>
