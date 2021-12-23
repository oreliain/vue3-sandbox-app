<template>
  <div class="container">
    <h1 class="title">Vue 3 Sandbox App</h1>
    <div class="is-flex is-flex-direction-column is-align-items-center">
      <span class="is-text mb-2">Counter: {{ counter }}</span>
      <button class="button is-primary mb-2" @click="increment">Increment</button>
      <button class="button is-primary mb-2" @click="decrement">Decrement</button>
      <button class="button is-primary mb-2" @click="resetCounter">Reset</button>
      <span v-if="isNegative">Is negative</span>
      <span v-else-if="isEven">Is even</span>
      <span v-else>Is odd</span>
    </div>
  </div>
</template>

<script lang="ts">
import {computed, defineComponent } from "vue";
import {useCounter} from "../composables/Counter";

export default defineComponent({
  setup() {
    const {counter, increment, decrement, resetCounter} = useCounter();
    const isEven = computed(() => counter.value % 2 === 0);
    const isNegative = computed(() => counter.value < 0);
    return {
      counter,
      increment,
      decrement,
      resetCounter,
      isNegative,
      isEven
    }
  }
})
</script>

<style scoped lang="scss">
.container {
  height: 100%;
}
</style>