<script lang="ts">
import Vue from 'vue';
import cloneDeep from 'lodash/cloneDeep';
import FileSelector from '@shell/components/form/FileSelector';
import TextAreaAutoGrow from '@/pkg/rancher-components/src/components/Form/TextArea/TextAreaAutoGrow';
import { Banner } from '@components/Banner';

interface Data {
  originalJson: Object
  transferredContext: Object
  isValid: boolean
  isObject: boolean
  enableSwapBtn: boolean
}

// Data, Methods, Computed, Props
export default Vue.extend<Data, any, any, any>({
  components: {
    FileSelector, TextAreaAutoGrow, Banner
  },

  layout: 'plain',

  data() {
    return {
      originalJson:       {},
      transferredContext: {},
      isValid:            true,
      isObject:           true,
      enableSwapBtn:      false
    };
  },

  computed: {},

  watch: {},

  methods: {
    initStatus() {
      this.isValid = true;
      this.isObject = true;
      this.enableSwapBtn = false;
      this.originalJson = {};
      this.transferredContext = {};
    },
    onFileSelected(value: any) {
      this.initStatus();

      try {
        this.originalJson = JSON.parse(value);
        if (!Array.isArray(this.originalJson) && typeof this.originalJson === 'object') {
          this.enableSwapBtn = true;
        } else {
          this.isObject = false;
        }
      } catch {
        this.isValid = false;
      }
    },
    isPrimitive(value: any) {
      return value !== Object(value);
    },
    swap() {
      const result = cloneDeep(this.originalJson);

      for (const key in result) {
        if (this.isPrimitive(result[key])) {
          const temp = result[key];

          delete result[key];
          result[temp] = key;
        }
      }

      this.transferredContext = result;
    }
  }

});
</script>

<template>
  <div>
    <FileSelector
      class="btn btn-sm role-primary mt-5"
      :label="t('interview.swap-primitive-key.upload-tip')"
      @selected="onFileSelected"
    />
    <Banner
      v-if="!isValid"
      color="error"
      label-key="interview.swap-primitive-key.not-valid"
    />
    <Banner
      v-else-if="!isObject"
      color="error"
      label-key="interview.swap-primitive-key.not-object"
    />

    <hr>

    <p>{{ t('interview.swap-primitive-key.original-context') }}</p>
    <pre>{{ originalJson }}</pre>
    <button
      class="btn role-tertiary"
      type="button"
      :disabled="!enableSwapBtn"
      @click="swap"
    >
      {{ t('interview.swap-primitive-key.swap-btn-text') }}
    </button>
    <hr>
    <p>{{ t('interview.swap-primitive-key.swapped-context') }}</p>
    <pre>{{ transferredContext }}</pre>
  </div>
</template>

<style lang="scss" scoped>
p {
  line-height: 1.25;
  margin-bottom: 10px;
}
</style>
