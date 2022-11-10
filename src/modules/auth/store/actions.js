// export const myActions = async ({ commit }) => { };

import authApi from "@/api/authApi";

export const createUser = async ({ commit }, user) => {
    const { name, email, password } = user;
    commit;
    try {
        const { data } = await authApi.post(":signUp", {
            email,
            password,
            returnSecureToken: true,
        });

        const { idToken, refreshToken } = data;

        await authApi.post(":update", {
            displayName: name,
            idToken: idToken,
        });

        delete user.password;
        // Mutation Auth loginUser
        commit("loginUser", {
            user,
            idToken,
            refreshToken,
        });

        return { ok: true };
    } catch (error) {
        console.error("error", error);
        return { ok: false, message: error.response.data.error.message };
    }
};

export const signInUser = async ({ commit }, user) => {
    const { email, password } = user;
    commit;
    try {
        const { data } = await authApi.post(":signInWithPassword", {
            email,
            password,
            returnSecureToken: true,
        });

        const { displayName, idToken, refreshToken } = data;
        user.name = displayName;

        // Mutation Auth loginUser
        commit("loginUser", {
            user,
            idToken,
            refreshToken,
        });

        return { ok: true };
    } catch (error) {
        console.error("error", error);
        return { ok: false, message: error.response.data.error.message };
    }
};

export const checkAuthentication = async ({ commit }) => {
    const idToken = localStorage.getItem("idToken");
    const refreshToken = localStorage.getItem("refreshToken");

    if (!idToken) {
        commit("logout");
        return { ok: false, message: "No hay token" };
    }

    try {
        const { data } = await authApi.post(":lookup", {
            idToken,
        });

        const { displayName, email } = data.users[0];

        const user = {
            name: displayName,
            email,
        };

        // Mutation Auth loginUser
        commit("loginUser", {
            user,
            idToken,
            refreshToken,
        });

        return { ok: true };
    } catch (error) {
        console.error("error", error);
        commit("logout");
        return { ok: false, message: error.response.data.error.message };
    }
};
