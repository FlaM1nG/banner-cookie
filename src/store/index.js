import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    configServer: {
      targetCountries: 'EU',
      gdpr: true,
      ccpa: false,
      consentByScroll: false,
      perPurposeConsent: false,
      banner: {
        acceptButtonDisplay: false,
        rejectButtonDisplay: false,
        closeButtonDisplay: true,
        closeButtonRejects: false,
        title: 'Notice',
      },
    },
    configDefault: {},
  },
  getters: {
    configServer: state => state.configServer,
    configDefault: state => state.configDefault,
  },
  mutations: {
    // Update data config server
    SET_CONFIG_SERVER(state, config) {
      state.configServer = { ...state.configServer, ...config }
    },
    // Set the initial configDefault state
    SET_CONFIG_DEFAULT(state, config) {
      state.configDefault = { ...config }
    },
  },
  actions: {
    async fetchConfigDefault({ commit }) {
      try {
        // Simulate an HTTP request with 1 sec delay
        await new Promise(resolve => setTimeout(resolve, 1000))

        // Simulated data as if coming from an endpoint
        const simulatedResponse = {
          targetCountries: 'EU',
          gdpr: true,
          ccpa: false,
          consentByScroll: false,
          perPurposeConsent: false,
          banner: {
            acceptButtonDisplay: false,
            rejectButtonDisplay: false,
            closeButtonDisplay: true,
            closeButtonRejects: false,
            title: 'Notice',
          },
        }

        commit('SET_CONFIG_DEFAULT', simulatedResponse)
      } catch (error) {
        console.error('Error fetching config:', error)
      }
    },
    updateConfig({ commit }, config) {
      try {
        commit('SET_CONFIG_SERVER', config)
      } catch (error) {
        console.error('Error updating config:', error)
      }
    },
    resetConfig({ commit, state }) {
      commit('SET_CONFIG_SERVER', state.configDefault)
    },
  },
})
