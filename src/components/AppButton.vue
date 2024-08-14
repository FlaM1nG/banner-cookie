<template>
  <button
    :class="[
      'app-button',
      `app-button--${type}`,
      { 'app-button--disabled': disabled },
    ]"
    :disabled="disabled"
    @click="handleClick"
  >
    <slot></slot>
  </button>
</template>

<script>
  export default {
    name: 'AppButton',
    props: {
      type: {
        type: String,
        default: 'primary',
      },
      disabled: {
        type: Boolean,
        default: false,
      },
    },
    methods: {
      handleClick(event) {
        if (!this.disabled) {
          this.$emit('click', event)
        }
      },
    },
  }
</script>

<style lang="scss" scoped>
  .app-button {
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s, color 0.3s;

    &--primary {
      background-color: #007bff;
      color: #fff;

      &:hover {
        background-color: #0056b3;
      }
    }

    &--secondary {
      background-color: #6c757d;
      color: #fff;

      &:hover {
        background-color: #5a6268;
      }
    }

    &--disabled {
      background-color: #e0e0e0;
      color: #a0a0a0;
      cursor: not-allowed;
    }
  }
</style>
