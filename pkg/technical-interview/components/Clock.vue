<script lang="ts">
import Vue from 'vue';
import day from 'dayjs';
import UnitInput from '@/shell/components/form/UnitInput.vue';

interface Data {
}

// Data, Methods, Computed, Props
export default Vue.extend<Data, any, any, any>({
  components: { UnitInput },

  layout: 'plain',

  data() {
    return {
      time:         day(),
      modifiedTime: day(),
      timeFormat:   'YYYY MMM D ddd, HH:mm',
    };
  },

  mounted() {
  },

  computed: {
    formattedTime() {
      return this.time.format(this.timeFormat);
    },
    timeDiffText() {
      const diff = this.modifiedTime.diff(this.time);

      if (diff > 60 * 1000) {
        return 'New time is after to current time.';
      } else if (diff < -60 * 1000) {
        return 'New time is before to current time.';
      }

      return 'New time is equivalent to current time.';
    }
  },

  beforeDestroy() {
  },

  methods: {
    updateModifiedTime(unit, e) {
      if (unit === 'h') {
        if (e < 24) {
          this.modifiedTime = this.modifiedTime.hour(e);
        } else {
          this.modifiedTime = this.modifiedTime.hour(23);
        }
      }

      if (unit === 'm') {
        if (e < 60) {
          this.modifiedTime = this.modifiedTime.minute(e);
        } else {
          this.modifiedTime = this.modifiedTime.minute(59);
        }
      }

      if (unit === 's') {
        if (e < 60) {
          this.modifiedTime = this.modifiedTime.second(e);
        } else {
          this.modifiedTime = this.modifiedTime.second(59);
        }
      }
    },
    updateCurrentTime() {
      this.time = this.modifiedTime;
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
      <div class="col span-4">
        <UnitInput
          base-unit="hour"
          :value="modifiedTime.hour()"
          @input="updateModifiedTime('h', $event)"
        />
      </div>
      <div class="col span-4">
        <UnitInput
          base-unit="minute"
          :value="modifiedTime.minute()"
          @input="updateModifiedTime('m', $event)"
        />
      </div>
      <div class="col span-4">
        <UnitInput
          base-unit="second"
          :value="modifiedTime.second()"
          @input="updateModifiedTime('s', $event)"
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
