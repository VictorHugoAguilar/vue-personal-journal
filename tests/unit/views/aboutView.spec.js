import {shallowMount} from "@vue/test-utils";
import AboutView from '@/views/AboutView';

describe("about view component", () => {
    test("debe renderizar el componente correctamente", () => {
        const wrapper = shallowMount(AboutView);
        expect(wrapper.html()).toMatchSnapshot();
    });
});
