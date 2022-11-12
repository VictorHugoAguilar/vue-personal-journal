import createVuexStore from "../../../mock-data/mock-store";

import authApi from "@/api/authApi";
import { AxiosError } from "axios";

jest.mock("@/api/authApi");

describe("Vuex: pruebas en el auth-module", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test("estado inicial", () => {
    const store = createVuexStore({
      status: "authenticating",
      user: null,
      idToken: null,
      refreshToken: null,
    });

    const { status, user, idToken, refreshToken } = store.state.auth;

    expect(status).toBe("authenticating");
    expect(user).toBeNull();
    expect(idToken).toBeNull();
    expect(refreshToken).toBeNull();
  });

  // Mutations

  test("mutations: loginUser ", () => {
    const store = createVuexStore({
      status: "authenticating",
      user: null,
      idToken: null,
      refreshToken: null,
    });

    const payload = {
      user: {
        name: "victor",
        email: "victor@correo.com",
      },
      idToken: "abc123",
      refreshToken: "def456",
    };
    store.commit("auth/loginUser", payload);

    const { status, user, idToken, refreshToken } = store.state.auth;

    expect(status).toBe("authenticated");
    expect(user).toEqual({ name: "victor", email: "victor@correo.com" });
    expect(idToken).toBe("abc123");
    expect(refreshToken).toBe("def456");
  });

  test("mutation: logout", () => {
    const store = createVuexStore({
      status: "authenticated",
      user: {
        name: "victor",
        email: "victor@correo.com",
      },
      idToken: "abc123",
      refreshToken: "def456",
    });

    localStorage.setItem("idToken", "abc123");
    localStorage.setItem("refreshToken", "def456");

    expect(store.state.auth.status).toBe("authenticated");
    expect(store.state.auth.user).toEqual({ name: "victor", email: "victor@correo.com" });
    expect(store.state.auth.idToken).toBe("abc123");
    expect(store.state.auth.refreshToken).toBe("def456");

    store.commit("auth/logout");

    expect(store.state.auth.status).toBe("not-authenticated");
    expect(store.state.auth.user).toBeNull();
    expect(store.state.auth.idToken).toBeNull();
    expect(store.state.auth.refreshToken).toBeNull();

    expect(localStorage.getItem("idToken")).toBeFalsy();
    expect(localStorage.getItem("refreshToken")).toBeFalsy();
  });

  // getters

  test("getters: username currenState", () => {
    const store = createVuexStore({
      status: "authenticated",
      user: {
        name: "victor",
        email: "victor@correo.com",
      },
      idToken: "abc123",
      refreshToken: "def456",
    });

    expect(store.getters["auth/currentState"]).toBe("authenticated");
    expect(store.getters["auth/username"]).toBe("victor");
  });

  // actions
  //
  test("actions: createUser - error usuario existente", async () => {
    const store = createVuexStore({
      status: "not-authenticated",
      user: null,
      idToken: null,
      refreshToken: null,
    });

    const newUser = { name: "victor", email: "victor@correo.com", password: "123456" };

    authApi.post.mockImplementation(() => {
      throw new AxiosError("EMAIL_EXISTS", 400, null, null, {
        data: { error: { message: "EMAIL_EXISTS" } },
      });
    });

    const resp = await store.dispatch("auth/createUser", newUser);
    expect(resp).toEqual({ ok: false, message: "EMAIL_EXISTS" });

    const { status, user, idToken, refreshToken } = store.state.auth;

    expect(status).toBe("not-authenticated");
    expect(user).toBeNull();
    expect(idToken).toBeNull();
    expect(refreshToken).toBeNull();
  });

  test("actions: createUser - user create correctly", async () => {
    const store = createVuexStore({
      status: "not-authenticated",
      user: null,
      idToken: null,
      refreshToken: null,
    });

    const newUser = { name: "victor", email: "victor@correo.com", password: "123456" };

    authApi.post
      .mockReturnValueOnce({
        data: {
          idToken: "abc123",
          refreshToken: "def456",
        },
      })
      .mockReturnValueOnce({
        data: {
          displayName: "victor",
        },
      });

    const resp = await store.dispatch("auth/createUser", newUser);
    expect(resp).toEqual({ ok: true });

    const { status, user, idToken, refreshToken } = store.state.auth;

    expect(status).toBe("authenticated");
    expect(user).toEqual({ name: "victor", email: "victor@correo.com" });
    expect(idToken).toBe("abc123");
    expect(refreshToken).toBe("def456");
  });

  test("actions: signInUser - login user fail, not exists", async () => {
    const store = createVuexStore({
      status: "not-authenticated",
      user: null,
      idToken: null,
      refreshToken: null,
    });

    const user = { email: "victor@correo.com", password: "123456" };

    authApi.post.mockImplementation(() => {
      throw new AxiosError("Request failed with status code 400", 400, null, null, {
        data: { error: { message: "EMAIL_NOT_FOUND" } },
      });
    });

    const resp = await store.dispatch("auth/signInUser", user);
    expect(resp).toEqual({ ok: false, message: "EMAIL_NOT_FOUND" });

    expect(store.state.auth.status).toBe("not-authenticated");
    expect(store.state.auth.user).toBeNull();
    expect(store.state.auth.idToken).toBeNull();
    expect(store.state.auth.refreshToken).toBeNull();

    expect(localStorage.getItem("idToken")).toBeFalsy();
    expect(localStorage.getItem("refreshToken")).toBeFalsy();
  });

  test("actions: signInUser - login user ok", async () => {
    const store = createVuexStore({
      status: "not-authenticated",
      user: null,
      idToken: null,
      refreshToken: null,
    });

    const userLogin = { email: "victor@correo.com", password: "123456" };

    authApi.post.mockReturnValueOnce({
      data: {
        displayName: "victor",
        idToken: "abc123",
        refreshToken: "def456",
      },
    });

    const resp = await store.dispatch("auth/signInUser", userLogin);
    expect(resp).toEqual({ ok: true });

    const { status, user, idToken, refreshToken } = store.state.auth;

    expect(status).toBe("authenticated");
    expect(user).toEqual({ name: "victor", email: "victor@correo.com" });
    expect(idToken).toBe("abc123");
    expect(refreshToken).toBe("def456");
  });

  test("actions: checkAuthentication - fail auth", async () => {
    const store = createVuexStore({
      status: "not-authenticated",
      user: null,
      idToken: null,
      refreshToken: null,
    });

    const resp = await store.dispatch("auth/checkAuthentication");
    expect(resp).toEqual({ ok: false, message: "No hay token" });
  });

  test("actions: checkAuthentication - auth ok", async () => {
    const store = createVuexStore({
      status: "authenticated",
      user: {
        name: "victor",
        email: "victor@correo.com",
      },
      idToken: "abc123",
      refreshToken: "def456",
    });

    localStorage.setItem("idToken", "abc123");
    localStorage.setItem("refreshToken", "def456");

    authApi.post.mockReturnValueOnce({
      data: {
        users: [
          {
            displayName: "victor",
            email: "victor@correo.com",
          },
        ],
      },
    });

    const resp = await store.dispatch("auth/checkAuthentication");
    expect(resp).toEqual({ ok: true });

    const { status, user, idToken, refreshToken } = store.state.auth;

    expect(status).toBe("authenticated");
    expect(user).toEqual({ name: "victor", email: "victor@correo.com" });
    expect(idToken).toBe("abc123");
    expect(refreshToken).toBe("def456");
  });

  test("actions: checkAuthentication - auth ko", async () => {
    const store = createVuexStore({
      status: "authenticated",
      user: {
        name: "victor",
        email: "victor@correo.com",
      },
      idToken: "abc123",
      refreshToken: "def456",
    });

    localStorage.setItem("idToken", "abc123");
    localStorage.setItem("refreshToken", "def456");

    authApi.post.mockImplementation(() => {
      throw new AxiosError("Error invalid id token", 400, null, null, {
        data: { error: { message: "INVALID_ID_TOKEN" } },
      });
    });

    const resp = await store.dispatch("auth/checkAuthentication");
    expect(resp).toEqual({ ok: false, message: "INVALID_ID_TOKEN" });

    const { status, user, idToken, refreshToken } = store.state.auth;

    expect(status).toBe("not-authenticated");
    expect(user).toBeNull();
    expect(idToken).toBeNull();
    expect(refreshToken).toBeNull();

    expect(localStorage.getItem("idToken")).toBeFalsy();
    expect(localStorage.getItem("refreshToken")).toBeFalsy();
  });
});
