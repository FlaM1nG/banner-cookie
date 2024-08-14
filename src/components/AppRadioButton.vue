<template>
  <div>
    <label v-for="option in options" :key="option.value">
      <input
        type="radio"
        :value="option.value"
        :checked="selectedCountry === option.value"
        @change="handleChange(option.value)"
      />
      {{ option.label }}
    </label>
  </div>
</template>

<script>
  export default {
    name: 'AppRadioButton',
    props: {
      options: {
        type: Array,
        required: true,
      },
      selectedCountry: {
        type: String,
        required: true,
      },
    },
    methods: {
      handleChange(value) {
        this.$emit('update-country', { key: 'targetCountries', value })
      },
    },
  }
</script>
