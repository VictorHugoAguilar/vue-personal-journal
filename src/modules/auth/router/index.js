export default {
    name: "auth",
    component: () =>
        import(/* webpackChinchName: "daybook" */ "@/modules/auth/layouts/AuthLayout.vue"),
    children: [
        {
            path: "",
            name: "login",
            component: () =>
                import(/* webpackChinchName: "login" */ "@/modules/auth/views/Login.vue"),
        },
        {
            path: "/register",
            name: "register",
            component: () =>
                import(/* webpackChinchName: "login" */ "@/modules/auth/views/Register.vue"),
        },
    ],
};
