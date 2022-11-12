import { shallowMount } from "@vue/test-utils";

import Navbar from "@/modules/daybook/components/Navbar.vue";
import createVuexStore from "../../../mock-data/mock-store";

describe("Pruebas en el Navbar components", () => {
  const store = createVuexStore({
    user: {
      name: "victor",
      email: "victor@correo.com",
    },
    status: "authenticated",
    idToken: "abc123",
    refreshToken: "def456",
  });

  test("debe de mostrar el componente correctamente", () => {
    const wrapper = shallowMount(Navbar, {
      global: {
        plugins: [store],
      },
    });

    expect(wrapper.html()).toMatchSnapshot();
  });
});
