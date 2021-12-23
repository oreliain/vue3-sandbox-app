import {ref} from "vue";

export function useCounter() {
    const counter = ref(0);

    const increment = () => {
        counter.value++;
    }

    const decrement = () => {
        counter.value--;
    }

    const setCounterTo = (val: number) => {
        counter.value = val;
    }

    const resetCounter = () => {
        counter.value = 0;
    }

    return {
        counter,
        increment,
        decrement,
        setCounterTo,
        resetCounter
    }
}