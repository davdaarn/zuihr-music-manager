import { shallowMount } from '@vue/test-utils'
import Display from '@/components/Display.vue'

describe('Display.vue', () => {
  it('renders props.msg when passed', () => {
    const msg = 'new message'
    const wrapper = shallowMount(Display, {
      propsData: { msg }
    })
    expect(wrapper.text()).toMatch(msg)
  })
})
