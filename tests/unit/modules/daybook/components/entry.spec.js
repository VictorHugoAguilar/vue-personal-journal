import { shallowMount } from "@vue/test-utils";

import Entry from "@/modules/daybook/components/Entry";
import { journalState } from "../../../mock-data/test-journal-state";

describe("Pruebas en Entry Component", () => {
	// mockRouter
	const mockRouter = {
		push: jest.fn(),
	};

	const wrapper = shallowMount(Entry, {
		props: {
			entry: journalState.entries[1],
		},
		global: {
			mocks: {
				$router: mockRouter,
			},
		},
	});

	test("debe de hacer match con el snapshot", () => {
		expect(wrapper.html()).toMatchSnapshot();
	});

	test("debe de redireccionar al hacer click en el entry-container", () => {
		const entryContainer = wrapper.find(".entry-container");
		entryContainer.trigger("click");

		expect(mockRouter.push).toHaveBeenCalledWith({
			name: "entry",
			params: {
				id: journalState.entries[1].id,
			},
		});
	});

	test("pruebas en las propiedades computadas", () => {
		expect(wrapper.vm.getDay).toBe(23);
		expect(wrapper.vm.getMonth).toBe("Julio");
		expect(wrapper.vm.getYearDay).toBe("2021, Viernes");
	});
});
