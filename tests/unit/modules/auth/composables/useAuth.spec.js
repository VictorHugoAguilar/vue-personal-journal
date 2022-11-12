import useAuth from "@/modules/auth/composable/useAuth";

const mockStore = {
	dispatch: jest.fn(),
	commit: jest.fn(),
	getters: {
		"auth/currentState": "authenticated",
		"auth/username": "victor",
	},
};

jest.mock("vuex", () => ({
	useStore: () => mockStore,
}));

describe("Pruebas de useAuth", () => {
	let newUser;

	beforeEach(() => {
		jest.clearAllMocks();

		newUser = {
			name: "victor",
			email: "victor@correo.com",
			password: "123456",
		};
	});

	test("createUser correctly", async () => {
		const { createUser } = useAuth();

		mockStore.dispatch.mockReturnValue({ ok: true });

		const resp = await createUser(newUser);

		expect(mockStore.dispatch).toHaveBeenCalledWith("auth/createUser", {
			email: "victor@correo.com",
			name: "victor",
			password: "123456",
		});

		expect(resp).toEqual({ ok: true });
	});

	test("createUser fail", async () => {
		const { createUser } = useAuth();

		mockStore.dispatch.mockReturnValue({ ok: false, message: "EMAIL_EXISTS" });

		const resp = await createUser(newUser);

		expect(mockStore.dispatch).toHaveBeenCalledWith("auth/createUser", {
			email: "victor@correo.com",
			name: "victor",
			password: "123456",
		});

		expect(resp).toEqual({ ok: false, message: "EMAIL_EXISTS" });
	});

	test("loginUser correctly", async () => {
		const { loginUser } = useAuth();
		delete newUser.name;

		mockStore.dispatch.mockReturnValue({ ok: true });

		const resp = await loginUser(newUser);

		expect(mockStore.dispatch).toHaveBeenCalledWith("auth/signInUser", {
			email: "victor@correo.com",
			password: "123456",
		});

		expect(resp).toEqual({ ok: true });
	});

	test("loginUser fail", async () => {
		const { loginUser } = useAuth();
		delete newUser.name;

		mockStore.dispatch.mockReturnValue({ ok: false, message: "EMAIL_NOT_FOUND" });

		const resp = await loginUser(newUser);

		expect(mockStore.dispatch).toHaveBeenCalledWith("auth/signInUser", {
			email: "victor@correo.com",
			password: "123456",
		});

		expect(resp).toEqual({ ok: false, message: "EMAIL_NOT_FOUND" });
	});

	test("checkAuthStatus", async () => {
		const { checkAuthStatus } = useAuth();

		mockStore.dispatch.mockReturnValue({ ok: true });

		const resp = await checkAuthStatus();

		expect(mockStore.dispatch).toHaveBeenCalledWith("auth/checkAuthentication");
		expect(resp).toEqual({ ok: true });
	});

	test("logout", () => {
		const { logout } = useAuth();

		logout();

		expect(mockStore.commit).toHaveBeenCalledWith("auth/logout");
		expect(mockStore.commit).toHaveBeenCalledWith("journal/clearEntries");
	});

	test("authState, username", () => {
		const { authStatus, username } = useAuth();

		expect(authStatus.value).toBe("authenticated");
		expect(username.value).toBe("victor");
	});
});
