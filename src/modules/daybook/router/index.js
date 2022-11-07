export default {
    name: "daybook",
    component: () =>
        import(/* webpackChinchName: "daybook" */ "@/modules/daybook/layouts/DayBookLayout.vue"),
    children: [],
};
