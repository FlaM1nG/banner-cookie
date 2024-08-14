<template>
  <div v-if="isVisible" class="cookie-banner">
    <div class="cookie-banner__content">
      <h1 class="cookie-banner__title">{{ title }}</h1>
      <p class="cookie-banner__message">
        We and selected third parties use cookies or similar technologies for
        technical purposes and, with your consent, for other purposes as
        specified in the cookie policy. You can freely give, deny, or withdraw
        your consent at any time by accessing the preferences panel. Denying
        consent may make related features unavailable. Use the “Accept” button
        to consent.
      </p>
      <div class="cookie-banner__buttons">
        <AppButton
          v-if="showAcceptButton"
          @click="acceptConsent"
          class="cookie-banner__button cookie-banner__button--accept"
        >
          Accept
        </AppButton>
        <AppButton
          v-if="showRejectButton"
          @click="rejectConsent"
          class="cookie-banner__button cookie-banner__button--reject"
        >
          Reject
        </AppButton>
        <AppButton
          v-if="showCloseButton"
          @click="handleClose"
          class="cookie-banner__button cookie-banner__button--close"
        >
          Close
        </AppButton>
      </div>
    </div>
  </div>
</template>

<script>
  import AppButton from '@/components/AppButton.vue'

  export default {
    name: 'CookieBanner',
    components: {
      AppButton,
    },
    props: {
      isVisible: {
        type: Boolean,
        required: true,
      },
      bannerConfig: {
        type: Object,
        required: true,
      },
    },
    computed: {
      showAcceptButton() {
        return this.bannerConfig.acceptButtonDisplay
      },
      showRejectButton() {
        return this.bannerConfig.rejectButtonDisplay
      },
      showCloseButton() {
        return this.bannerConfig.closeButtonDisplay
      },
      title() {
        return this.bannerConfig.title
      },
    },
    methods: {
      acceptConsent() {
        this.$emit('consent-accepted')
      },
      rejectConsent() {
        this.$emit('consent-rejected')
      },
      handleClose() {
        const updatedConsentData = {
          consentByScroll: this.bannerConfig.closeButtonRejects,
          perPurposeConsent: this.bannerConfig.closeButtonRejects,
        }
        this.$emit('banner-closed', updatedConsentData)
      },
    },
  }
</script>

<style lang="scss" scoped>
  .cookie-banner {
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #fff;
    border: 1px solid #ddd;
    padding: 20px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 600px;
    border-radius: 8px;

    &__content {
      display: flex;
      flex-direction: column;
      width: 100%;
    }

    &__title {
      margin: 0 0 10px;
      font-size: 1.5rem;
      font-weight: bold;
    }

    &__message {
      margin: 0 0 20px;
      font-size: 1rem;
    }

    &__buttons {
      display: flex;
      justify-content: end;
      gap: 10px;
    }
  }
</style>
