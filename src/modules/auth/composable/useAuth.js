import { computed } from "vue";
import { useStore } from "vuex";

const useAuth = () => {
    const store = useStore();

    const createUser = async (user) => {
        return await store.dispatch("auth/createUser", user);
    };

    const loginUser = async (user) => {
        return await store.dispatch("auth/signInUser", user);
    };

    const checkAuthStatus = async () => {
        return await store.dispatch("auth/checkAuthentication");
    };

    const logout = () => {
        store.commit("auth/logout");
        // limpiar las entradas
        store.commit("journal/clearEntries");
    };

    return {
        checkAuthStatus,
        createUser,
        loginUser,
        logout,

        authStatus: computed(() => store.getters["currentState"]),
        username: computed(() => store.getters["username"]),
    };
};

export default useAuth;
