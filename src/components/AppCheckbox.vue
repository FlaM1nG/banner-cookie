<template>
  <div>
    <label v-for="option in checkboxOptions" :key="option.value">
      <input
        type="checkbox"
        :value="option.value"
        :checked="isChecked(option.value)"
        @change="handleChange(option.value)"
      />
      {{ option.label }}
    </label>
  </div>
</template>

<script>
  export default {
    name: 'AppCheckbox',
    props: {
      checkboxOptions: {
        type: Array,
        default: () => [],
      },
      selectedValues: {
        type: Array,
        default: () => [],
      },
    },
    methods: {
      isChecked(value) {
        return this.selectedValues.includes(value)
      },
      handleChange(value) {
        let newSelectedValues = [...this.selectedValues]
        const valueIndex = newSelectedValues.indexOf(value)
        if (valueIndex === -1) {
          newSelectedValues.push(value)
        } else {
          newSelectedValues.splice(valueIndex, 1)
        }
        this.$emit('update-selectedValues', newSelectedValues)
      },
    },
  }
</script>
