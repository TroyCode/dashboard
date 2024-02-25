<script lang="ts">
import Vue from 'vue';
import TextAreaAutoGrow from '@/pkg/rancher-components/src/components/Form/TextArea/TextAreaAutoGrow';
interface Data {
}

// Data, Methods, Computed, Props
export default Vue.extend<Data, any, any, any>({
  components: { TextAreaAutoGrow },

  layout: 'plain',

  data() {
    return { inputText: '', result: [] };
  },

  computed: {},

  methods: {
    isPalindrome(phrase) {
      const cleanedPhrase = phrase.replace(/\s/g, '').toLowerCase();
      const length = cleanedPhrase.length;

      for (let i = 0; i < Math.floor(length / 2); i++) {
        if (cleanedPhrase[i] !== cleanedPhrase[length - 1 - i]) {
          return false;
        }
      }

      return true;
    },
    onInput(e) {
      this.inputText = e;
      this.$refs['transferred-text-area'].$refs.ta.value = '';
    },
    check() {
      const arr = JSON.parse(this.inputText);

      if (Array.isArray(arr)) {
        this.result = arr.map(phrase => this.isPalindrome(phrase));
        this.$refs['transferred-text-area'].$refs.ta.value = this.result;
      }
    }
  }

});
</script>

<template>
  <div>
    <p>Please input phrase list</p>
    <TextAreaAutoGrow
      class="mb-10"
      placeholder="['Deed', 'nope', 'rarar', 'le vel', 'Short!']"
      :min-height="120"
      @input="onInput"
    />
    <button
      class="btn role-tertiary"
      type="button"
      @click="check"
    >
      Check
    </button>
    <hr>
    <p>Result</p>
    <TextAreaAutoGrow
      ref="transferred-text-area"
      :disabled="true"
      :min-height="60"
    />
  </div>
</template>

<style lang="scss" scoped>
p {
  line-height: 1.25;
  margin-bottom: 10px;
}
</style>
