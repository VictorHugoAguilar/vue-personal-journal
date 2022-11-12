import { shallowMount } from "@vue/test-utils";

import Navbar from "@/modules/daybook/components/Navbar.vue";
import createVuexStore from "../../../mock-data/mock-store";

const mockRouter = {
  push: jest.fn(),
}

jest.mock('vue-router', () => ({
  useRouter: () => mockRouter, 
}))

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

  test("click en logout, debe de cerrar la sesión y redireccionar", async () => {
    const wrapper = shallowMount(Navbar, {
      global: {
        plugins: [store],
      },
    });
    await wrapper.find('button').trigger('click')

    expect(mockRouter.push).toHaveBeenCalledTimes(1)
    expect(mockRouter.push).toHaveBeenCalledWith({"name": "login"})

    expect(store.state.auth).toEqual({
      user: null,
      idToken: null,
      refreshToken: null,
      status: 'not-authenticated'
    })

  });

});
