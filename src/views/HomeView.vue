<template>
  <div id="app">
    <div class="container">
      <div class="container__column container__column--left">
        <div class="container__section">
          <h1>Target countries</h1>
          <AppRadioButton
            :options="countryOptions"
            :selectedCountry="configServer.targetCountries"
            @update-country="handleUpdateConfig"
          />
        </div>
        <div class="container__section">
          <h1>Legislation & Consent</h1>
          <AppCheckbox
            :checkboxOptions="checkboxOptions"
            :selectedValues="selectedCheckboxes"
            @update-selectedValues="handleCheckboxUpdate"
          />
        </div>
        <div class="container__section">
          <h1>Banner</h1>
          <AppCheckbox
            :checkboxOptions="bannerCheckboxOptions"
            :selectedValues="selectedBannerCheckboxes"
            @update-selectedValues="handleBannerCheckboxUpdate"
          />
        </div>
      </div>

      <div class="container__column container__column--right">
        <transition name="fade">
          <div v-if="!showBanner" class="container__section">
            <AppButton @click="showCookieBanner"> Show Banner </AppButton>
          </div>
        </transition>

        <transition name="fade">
          <div v-if="showBanner" class="container__section">
            <CookieBanner
              :isVisible="showBanner"
              :bannerConfig="configServer.banner"
              @consent-accepted="handleConsentAccepted"
              @consent-rejected="handleConsentRejected"
              @banner-closed="handleBannerClosed"
            />
          </div>
        </transition>

        <transition name="fade">
          <div v-if="showMessage" class="container__section">
            <AppMessageBox
              :type="messageType"
              :message="message"
              :isVisible="showMessage"
            />
          </div>
        </transition>

        <transition name="fade">
          <div class="container__section container__section--buttons">
            <AppButton
              :disabled="!hasConfigChanges() || disabledButton"
              @click="handleSave"
            >
              Save
            </AppButton>
            <AppButton :disabled="!hasConfigChanges()" @click="handleReset">
              Reset
            </AppButton>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
  import AppButton from '@/components/AppButton.vue'
  import AppRadioButton from '@/components/AppRadioButton.vue'
  import AppCheckbox from '@/components/AppCheckbox.vue'
  import CookieBanner from '@/components/CookieBanner.vue'
  import AppMessageBox from '@/components/AppMessageBox.vue'
  import { mapGetters, mapActions } from 'vuex'

  const COUNTRY_OPTIONS = [
    { label: 'EU', value: 'EU' },
    { label: 'US', value: 'US' },
    { label: 'World', value: 'world' },
  ]

  const CHECKBOX_OPTIONS = [
    { label: 'GDPR', value: 'gdpr' },
    { label: 'CCPA', value: 'ccpa' },
    { label: 'Consent by Scroll', value: 'consentByScroll' },
    { label: 'Per Purpose Consent', value: 'perPurposeConsent' },
  ]

  const BANNER_CHECKBOX_OPTIONS = [
    { label: 'Accept Button Display', value: 'acceptButtonDisplay' },
    { label: 'Reject Button Display', value: 'rejectButtonDisplay' },
    { label: 'Close Button Display', value: 'closeButtonDisplay' },
    { label: 'Close Button Rejects', value: 'closeButtonRejects' },
  ]

  export default {
    components: {
      AppButton,
      AppRadioButton,
      AppCheckbox,
      CookieBanner,
      AppMessageBox,
    },
    data() {
      return {
        showBanner: true,
        showMessage: false,
        messageType: 'warning',
        message: '',
        disabledButton: false,
      }
    },
    computed: {
      ...mapGetters(['configServer', 'configDefault']),
      selectedCheckboxes() {
        const checkboxMap = {
          gdpr: 'gdpr',
          ccpa: 'ccpa',
          consentByScroll: 'consentByScroll',
          perPurposeConsent: 'perPurposeConsent',
        }

        return Object.keys(checkboxMap)
          .filter(key => this.configServer[key])
          .map(key => checkboxMap[key])
      },
      selectedBannerCheckboxes() {
        const bannerMap = {
          acceptButtonDisplay: 'acceptButtonDisplay',
          rejectButtonDisplay: 'rejectButtonDisplay',
          closeButtonDisplay: 'closeButtonDisplay',
          closeButtonRejects: 'closeButtonRejects',
        }

        return Object.keys(bannerMap)
          .filter(key => this.configServer.banner[key])
          .map(key => bannerMap[key])
      },
      countryOptions() {
        return COUNTRY_OPTIONS
      },
      checkboxOptions() {
        return CHECKBOX_OPTIONS
      },
      bannerCheckboxOptions() {
        return BANNER_CHECKBOX_OPTIONS
      },
    },
    methods: {
      ...mapActions(['fetchConfigDefault', 'updateConfig', 'resetConfig']),
      hasConfigChanges() {
        return (
          JSON.stringify(this.configServer) !==
          JSON.stringify(this.configDefault)
        )
      },
      async handleSave() {
        this.disabledButton = true
        try {
          await this.updateConfig(this.configServer)
          console.log('Configuration saved')
        } catch (error) {
          console.error('Error during saving configuration:', error)
        } finally {
          this.disabledButton = false
        }
      },
      handleReset() {
        this.resetConfig()
      },
      handleUpdateConfig({ key, value }) {
        const updatedConfig = { [key]: value }
        this.updateConfig(updatedConfig)
        this.checkLawValidation()
      },
      handleCheckboxUpdate(selectedValues) {
        const updatedConfig = {
          gdpr: selectedValues.includes('gdpr'),
          ccpa: selectedValues.includes('ccpa'),
          consentByScroll: selectedValues.includes('consentByScroll'),
          perPurposeConsent: selectedValues.includes('perPurposeConsent'),
        }
        this.updateConfig(updatedConfig)
        this.checkLawValidation()
      },
      handleBannerCheckboxUpdate(selectedValues) {
        const updatedConfig = {
          banner: {
            acceptButtonDisplay: selectedValues.includes('acceptButtonDisplay'),
            rejectButtonDisplay: selectedValues.includes('rejectButtonDisplay'),
            closeButtonDisplay: selectedValues.includes('closeButtonDisplay'),
            closeButtonRejects: selectedValues.includes('closeButtonRejects'),
            title: this.configServer.banner.title || 'Notice',
          },
        }
        this.updateConfig(updatedConfig)
        this.checkLawValidation()
      },
      handleConsentAccepted() {
        // Only console log message and close banner
        console.log('Consent Accepted')
        this.showBanner = false
      },
      handleConsentRejected() {
        // Only console log message and close banner
        console.log('Consent Rejected')
        this.showBanner = false
      },
      handleBannerClosed() {
        const { closeButtonRejects } = this.configServer.banner
        const updatedConfig = {
          consentByScroll: closeButtonRejects,
          perPurposeConsent: closeButtonRejects,
        }
        this.updateConfig(updatedConfig)
        this.showBanner = false
        this.checkLawValidation()
      },
      showCookieBanner() {
        this.showBanner = true
      },
      checkLawValidation() {
        const isEUOrWorld =
          this.configServer.targetCountries === 'EU' ||
          this.configServer.targetCountries === 'world'

        if (isEUOrWorld && this.isItalianFranceNotCompliant()) {
          this.setWarningMessage(
            'Your selected settings are not compliant with laws in France and Italy'
          )
          return
        }

        if (isEUOrWorld && this.isFranceNotCompliant()) {
          this.setWarningMessage(
            'Your selected settings are not compliant with laws in France'
          )
          return
        }

        if (isEUOrWorld && this.isItalianLawNotCompliant()) {
          this.setWarningMessage(
            'Your selected settings are not compliant with laws in Italy'
          )
          return
        }

        this.showMessage = false
      },
      isItalianFranceNotCompliant() {
        return this.configServer.consentByScroll
      },

      isFranceNotCompliant() {
        return !this.configServer.perPurposeConsent
      },

      isItalianLawNotCompliant() {
        const { banner } = this.configServer
        return (
          (banner.closeButtonDisplay && !banner.closeButtonRejects) ||
          (!banner.rejectButtonDisplay && !banner.closeButtonDisplay) ||
          (banner.rejectButtonDisplay &&
            banner.closeButtonDisplay &&
            !banner.closeButtonRejects)
        )
      },
      setWarningMessage(message) {
        this.messageType = 'warning'
        this.message = message
        this.showMessage = true
      },
    },

    async mounted() {
      try {
        await this.fetchConfigDefault()
        this.checkLawValidation()
      } catch (error) {
        console.error('Error during initial data fetch:', error)
      }
    },
  }
</script>

<style lang="scss" scoped>
  .container {
    display: flex;
    justify-content: space-between;
    padding: 20px;

    &__column {
      flex: 1;
      padding: 10px;

      &--left {
        max-width: 45%;
      }

      &--right {
        max-width: 45%;
      }
    }

    &__section {
      margin-bottom: 20px;

      &--buttons {
        display: flex;
        gap: 10px;
        justify-content: flex-start;
      }
    }
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.5s;
  }
  .fade-enter,
  .fade-leave-to {
    opacity: 0;
  }
</style>
