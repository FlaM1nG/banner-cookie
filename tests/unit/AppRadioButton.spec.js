import { mount } from '@vue/test-utils'
import AppRadioButton from '@/components/AppRadioButton.vue'

describe('AppRadioButton.vue', () => {
  it('renders radio buttons based on options prop', () => {
    const options = [
      { label: 'EU', value: 'EU' },
      { label: 'US', value: 'US' },
    ]
    const wrapper = mount(AppRadioButton, {
      propsData: {
        options,
        selectedCountry: 'EU',
      },
    })

    expect(wrapper.findAll('input[type="radio"]').length).toBe(options.length)
    expect(wrapper.find('input[value="EU"]').element.checked).toBe(true)
    expect(wrapper.find('input[value="US"]').element.checked).toBe(false)
  })

  it('emits an update-country event when a radio button is selected', async () => {
    const options = [
      { label: 'EU', value: 'EU' },
      { label: 'US', value: 'US' },
    ]
    const wrapper = mount(AppRadioButton, {
      propsData: {
        options,
        selectedCountry: 'EU',
      },
    })

    await wrapper.find('input[value="US"]').setChecked()

    expect(wrapper.emitted()['update-country'][0]).toEqual([
      { key: 'targetCountries', value: 'US' },
    ])
  })
})
