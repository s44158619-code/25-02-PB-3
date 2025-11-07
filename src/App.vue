<script lang="ts" setup>
import BuilderPattern from './components/BuilderPattern/BuilderPattern.vue';
import FacadePattern from './components/FacadePattern/FacadePattern.vue';
import StrategyPattern from './components/StrategyPattern/StrategyPattern.vue';
</script>

<template>
  <main>
    <BuilderPattern />

    <hr>

    <FacadePattern />

    <hr>

    <StrategyPattern />
  </main>
</template>

<style scoped>
main {
  max-width: 800px;
  margin: 20px auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
}

hr {
  margin: 2.5rem 0;
  border-color: #eee;
}
</style>