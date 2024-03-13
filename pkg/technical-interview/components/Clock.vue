<script lang="ts">
import Vue from 'vue';
import day from 'dayjs';
import UnitInput from '@/shell/components/form/UnitInput.vue';

interface Input {
  value: number;
  unit: string;
}

interface Data {
  currentDay: day.Dayjs
  modifiedDay: day.Dayjs
  inputs: Input[]
  timeFormat: string
  updatedTimeInterval: ReturnType<typeof setInterval> | null
}

// Data, Methods, Computed, Props
export default Vue.extend<Data, any, any, any>({
  components: { UnitInput },

  layout: 'plain',

  data() {
    return {
      currentDay:  day(),
      modifiedDay: day(),
      inputs:      [
        { value: day().hour(), unit: 'hour' },
        { value: day().minute(), unit: 'minute' },
        { value: day().second(), unit: 'second' }
      ],
      timeFormat:          'YYYY MMM D ddd, HH:mm',
      updatedTimeInterval: null,
    };
  },

  mounted() {
    this.updatedTimeInterval = setInterval(() => {
      this.currentDay = day();
    }, 60 * 1000);
  },

  computed: {
    formattedTime() {
      return this.currentDay.format(this.timeFormat);
    },
    timeDiffText() {
      if (this.modifiedDay.isAfter(this.currentDay)) {
        return this.t('interview.clock.time-compare-after');
      } else if (this.modifiedDay.isBefore(this.currentDay)) {
        return this.t('interview.clock.time-compare-before');
      }

      return this.t('interview.clock.time-compare-equal');
    }
  },

  watch: {},

  beforeDestroy() {
    clearInterval(this.updatedTimeInterval);
  },

  methods: {
    validateInput(inputEvent: Input) {
      const maxValues: { [key: string]: number } = {
        hour: 23, minute: 59, second: 59
      };

      if (inputEvent.value >= maxValues[inputEvent.unit]) {
        this.modifiedDay = this.modifiedDay.set(inputEvent.unit, maxValues[inputEvent.unit]);
        this.inputs.find((input: Input) => input.unit === inputEvent.unit)!.value = maxValues[inputEvent.unit];
      } else {
        this.modifiedDay = this.modifiedDay.set(inputEvent.unit, inputEvent.value);
      }
    },
    updateCurrentTime() {
      this.currentDay = this.modifiedDay;
    }
  }

});
</script>

<template>
  <div>
    <p>
      Current time: {{ formattedTime }}
    </p>

    <hr>

    <div
      class="row setting"
    >
      <div
        v-for="(input, index) in inputs"
        :key="index"
        class="col span-4"
      >
        <UnitInput
          v-model="input.value"
          :base-unit="input.unit"
          @input="validateInput({ unit: input.unit, value: $event })"
        />
      </div>
    </div>

    <p>
      {{ timeDiffText }}
    </p>

    <button
      class="btn role-tertiary"
      type="button"
      @click="updateCurrentTime"
    >
      Save
    </button>
  </div>
</template>

<style lang="scss" scoped>
p {
  line-height: 1.25;
  margin-bottom: 10px;
}

.setting {
  margin: 0 0 10px;
}
</style>
