<script lang="ts">
import Vue from 'vue';
import FileSelector from '@shell/components/form/FileSelector';
import TextAreaAutoGrow from '@/pkg/rancher-components/src/components/Form/TextArea/TextAreaAutoGrow';
interface Data {
}

// Data, Methods, Computed, Props
export default Vue.extend<Data, any, any, any>({
  components: { FileSelector, TextAreaAutoGrow },

  layout: 'plain',

  data() {
    return { originalJsonText: '', transferredContext: {} };
  },

  computed: {},

  watch: {
    transferredContext(newVal, prevVal) {
      const text = JSON.stringify(this.transferredContext);

      this.$refs['transferred-text-area'].$refs.ta.value = text;
    }
  },

  methods: {
    onFileSelected(value) {
      this.originalJsonText = value;
      this.$refs['original-text-area'].$refs.ta.value = value;
      this.transferedContext = {};
      this.$refs['transferred-text-area'].$refs.ta.value = '';
    },
    isPrimitive(value) {
      return value !== Object(value);
    },
    swap() {
      const json = JSON.parse(this.originalJsonText);

      if (typeof json === 'object' && json !== null) {
        for (const key in json) {
          if (Object.hasOwn(json, key) && this.isPrimitive(json[key])) {
            const temp = json[key];

            delete json[key];
            json[temp] = key;
          }
        }
      }

      this.transferredContext = json;
    }
  }

});
</script>

<template>
  <div>
    <FileSelector
      class="btn btn-sm role-primary mt-5"
      label="Please Upload the JSON file"
      @selected="onFileSelected"
    />

    <hr>
    <p>Original context</p>
    <TextAreaAutoGrow
      ref="original-text-area"
      class="mb-10"
      :disabled="true"
      :min-height="120"
    />
    <button
      class="btn role-tertiary"
      type="button"
      @click="swap"
    >
      Swap Primitive Key
    </button>
    <hr>
    <p>Swapped context</p>
    <TextAreaAutoGrow
      ref="transferred-text-area"
      :disabled="true"
      :min-height="120"
    />
  </div>
</template>

<style lang="scss" scoped>
p {
  line-height: 1.25;
  margin-bottom: 10px;
}
</style>
