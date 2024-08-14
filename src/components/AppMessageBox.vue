<template>
  <div v-if="isVisible" :class="['message-box', `message-box--${type}`]">
    <p class="message-box__text">{{ message }}</p>
  </div>
</template>

<script>
  export default {
    name: 'AppMessageBox',
    props: {
      type: {
        type: String,
        default: 'warning',
      },
      message: {
        type: String,
        default: '',
      },
      isVisible: {
        type: Boolean,
        default: false,
      },
    },
  }
</script>

<style lang="scss" scoped>
  .message-box {
    padding: 15px;
    margin: 10px 0;
    border-radius: 5px;
    font-size: 14px;
    display: flex;
    align-items: center;

    &__text {
      margin: 0;
    }

    &--warning {
      background-color: #fff3cd;
      color: #856404;
      border: 1px solid #ffeeba;
    }

    &--error {
      background-color: #f8d7da;
      color: #721c24;
      border: 1px solid #f5c6cb;
    }

    &--success {
      background-color: #d4edda;
      color: #155724;
      border: 1px solid #c3e6cb;
    }
  }
</style>
