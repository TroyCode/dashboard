<script lang="ts">
import Vue from 'vue';

interface Data {
}

// Data, Methods, Computed, Props
export default Vue.extend<Data, any, any, any>({
  components: {},

  layout: 'plain',

  data() {
    return { counter: 0 };
  },

  computed: {},

  methods: {
    incrementCounter() {
      this.counter++;
    }
  }

});
</script>

<template>
  <div>
    <p>Counter: {{ counter }}</p>
    <button
      class="btn role-tertiary"
      type="button"
      @click="incrementCounter"
    >
      Increment
    </button>
  </div>
</template>

<style lang="scss" scoped>
p {
  line-height: 1.25;
  margin-bottom: 10px;
}
</style>
