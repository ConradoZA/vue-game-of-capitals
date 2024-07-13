import { describe, it, expect } from 'vitest';

import { mount } from '@vue/test-utils';
import GeoMap from '../GeoMap.vue';

describe('GeoMap', () => {
  it('renders properly', () => {
    // const wrapper = mount(GeoMap, { props: { msg: 'Hello Vitest' } });
    const wrapper = mount(GeoMap);
    expect(wrapper).toBeDefined();
  });
});
