export default {
    name: "auth",
    component: () =>
        import(/* webpackChinchName: "daybook" */ "@/modules/auth/layouts/AuthLayout.vue"),
    children: [],
};
