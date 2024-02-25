<script lang="ts">
import Vue from 'vue';
import Tab from '@shell/components/Tabbed/Tab';
import Tabbed from '@shell/components/Tabbed/index.vue';
import Counter from '../components/Counter.vue';
import Clock from '../components/Clock.vue';
import SwapPrimitiveKey from '../components/SwapPrimitiveKey.vue';
import Palindrome from '../components/Palindrome.vue';

interface Data {
}

// Data, Methods, Computed, Props
export default Vue.extend<Data, any, any, any>({
  components: {
    Tabbed,
    Tab,
    Counter,
    Clock,
    SwapPrimitiveKey,
    Palindrome
  },

  layout: 'plain',

  data() {
    return { };
  },

  computed: {},

  methods: {}

});
</script>

<template>
  <div>
    <h1>{{ t('interview.tabPage.title') }}</h1>
    <Tabbed :side-tabs="true">
      <Tab
        name="tab-1-counter"
        label="Tab 1 - Counter"
      >
        <Counter />
      </Tab>
      <Tab
        name="tab-2-clock"
        label="Tab 2 - Clock"
      >
        <Clock />
      </tab>
      <Tab
        name="tab-3-swap-primitive-key"
        label="Tab 3 - Swap Primitive Key"
      >
        <SwapPrimitiveKey />
      </Tab>
      <Tab
        name="tab-4-palindrome"
        label="Tab 4 - Palindrome"
      >
        <Palindrome />
      </Tab>
    </Tabbed>
  </div>
</template>
