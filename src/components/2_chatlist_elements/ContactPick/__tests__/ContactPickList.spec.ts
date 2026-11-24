import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import ContactPickList from '../ContactPickList.vue';

describe('ContactPickList', () => {
  const items = [
    { id: 1, name: 'Анна' },
    { id: 2, name: 'Борис' },
  ];

  it('без поиска показывает «Новый контакт» сверху и группы по буквам', () => {
    const wrapper = mount(ContactPickList, {
      props: { items },
    });
    const letters = wrapper.findAll('.contact-pick-letter');
    expect(wrapper.find('[data-testid="contact-pick-new-row"]').exists()).toBe(true);
    expect(letters.length).toBeGreaterThanOrEqual(2);
    wrapper.unmount();
  });

  it('при пустом результате поиска показывает empty и строку нового контакта', () => {
    const wrapper = mount(ContactPickList, {
      props: {
        items: [],
        searchQuery: 'zzz',
      },
    });
    expect(wrapper.find('[data-testid="contact-pick-empty"]').exists()).toBe(true);
    expect(wrapper.text()).toContain('zzz');
    expect(wrapper.findAll('[data-testid="contact-pick-new-row"]')).toHaveLength(1);
    wrapper.unmount();
  });

  it('при найденных результатах без строки «Новый контакт»', () => {
    const wrapper = mount(ContactPickList, {
      props: {
        items,
        searchQuery: 'ан',
      },
    });
    expect(wrapper.find('[data-testid="contact-pick-new-row"]').exists()).toBe(false);
    expect(wrapper.text()).toContain('Контакты');
    wrapper.unmount();
  });
});