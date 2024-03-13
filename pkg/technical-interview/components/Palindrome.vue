<script lang="ts">
import Vue from 'vue';
import TextAreaAutoGrow from '@/pkg/rancher-components/src/components/Form/TextArea/TextAreaAutoGrow.vue';
import { Banner } from '@components/Banner';

interface Data {
  inputText: string
  resultText: string
  isValidJson: boolean
  isArray: boolean
}

// Data, Methods, Computed, Props
export default Vue.extend<Data, any, any, any>({
  components: { TextAreaAutoGrow, Banner },

  layout: 'plain',

  data() {
    return {
      inputText:     '',
      resultText:    '',
      isValidJson:   true,
      isArray:       true,
      examplePhrase: '["Deed", "nope", "rarar", "le vel", "Short!"]'
    };
  },

  computed: {},

  methods: {
    initStatus() {
      this.isValidJson = true;
      this.isArray = true;
    },
    isPalindrome(phrase: string) {
      const cleanedPhrase = phrase.replace(/\s/g, '').toLowerCase();
      const length = cleanedPhrase.length;

      for (let i = 0; i < Math.floor(length / 2); i++) {
        if (cleanedPhrase[i] !== cleanedPhrase[length - 1 - i]) {
          return false;
        }
      }

      return true;
    },
    onInput() {
      this.resultText = '';
    },
    check() {
      let arr = [];

      this.initStatus();

      try {
        arr = JSON.parse(this.inputText);
      } catch (e) {
        this.isValidJson = false;
      }

      if (Array.isArray(arr)) {
        const result = arr.map(phrase => this.isPalindrome(phrase));

        this.resultText = `${ result.toString() }`;
      } else {
        this.isArray = false;
      }
    }
  }

});
</script>

<template>
  <div>
    <p>{{ t('interview.palindrome.input-tip') }}</p>
    <TextAreaAutoGrow
      v-model="inputText"
      class="mb-10"
      :placeholder="examplePhrase"
      :min-height="120"
      @input="onInput"
    />
    <Banner
      v-if="!isValidJson"
      color="error"
      label-key="interview.palindrome.not-valid"
      class="mt-0"
    />
    <Banner
      v-else-if="!isArray"
      color="error"
      label-key="interview.palindrome.not-array"
      class="mt-0"
    />
    <button
      class="btn role-tertiary"
      type="button"
      @click="check"
    >
      Check
    </button>
    <hr>
    <p>{{ t('interview.palindrome.result') }}</p>
    <pre
      v-text="resultText"
    />
  </div>
</template>

<style lang="scss" scoped>
p {
  line-height: 1.25;
  margin-bottom: 10px;
}

pre {
  min-height: 40px;
}
</style>
