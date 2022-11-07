export default {
    name: "daybook",
    component: () =>
        import(/* webpackChinchName: "daybook" */ "@/modules/daybook/layouts/DayBookLayout.vue"),
    children: [
        {
            path: "",
            name: "no-entry-selected",
            component: () =>
                import(
                    /* webpackChunkName: "daybook-NoEntrySelected" */ "@/modules/daybook/views/NoEntrySelected.vue"
                ),
        },
        {
            path: ":id",
            name: "entry",
            component: () =>
                import(
                    /* webpackChunkName: "daybook-NoEntrySelected" */ "@/modules/daybook/views/EntryView.vue"
                ),
        },
    ],
};
