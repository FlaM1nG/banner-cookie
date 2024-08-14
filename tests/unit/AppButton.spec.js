import { mount } from '@vue/test-utils'
import AppButton from '@/components/AppButton.vue'

describe('AppButton.vue', () => {
  it('renders correctly with default props', () => {
    const wrapper = mount(AppButton)
    expect(wrapper.classes()).toContain('app-button')
    expect(wrapper.classes()).toContain('app-button--primary')
    expect(wrapper.attributes('disabled')).toBeUndefined()
  })

  it('applies the correct class based on the "type" prop', async () => {
    const wrapper = mount(AppButton, {
      propsData: { type: 'secondary' }
    })
    expect(wrapper.classes()).toContain('app-button--secondary')
    
    await wrapper.setProps({ type: 'primary' })
    expect(wrapper.classes()).toContain('app-button--primary')
  })

  it('adds the "app-button--disabled" class when "disabled" prop is true', async () => {
    const wrapper = mount(AppButton, {
      propsData: { disabled: true }
    })
    expect(wrapper.classes()).toContain('app-button--disabled')
    expect(wrapper.attributes('disabled')).toBe('disabled')
  })

  it('emits a "click" event when clicked and not disabled', async () => {
    const wrapper = mount(AppButton)
    await wrapper.trigger('click')
    expect(wrapper.emitted('click')).toBeTruthy()
  })

  it('does not emit a "click" event when button is disabled', async () => {
    const wrapper = mount(AppButton, {
      propsData: { disabled: true }
    })
    await wrapper.trigger('click')
    expect(wrapper.emitted('click')).toBeFalsy()
  })
})