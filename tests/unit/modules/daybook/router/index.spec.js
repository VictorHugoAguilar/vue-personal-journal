import dayBookRouter from "@/modules/daybook/router";

describe("Pruebas en el router module de daybook", () => {
    test("el router debe de tener esta configuracion", async () => {
        expect(dayBookRouter).toMatchObject({
            name: "daybook",
            component: expect.any(Function),
            children: [
                {
                    path: "",
                    name: "no-entry",
                    component: expect.any(Function),
                },
                {
                    path: ":id",
                    name: "entry",
                    component: expect.any(Function),
                    props: expect.any(Function),
                },
            ],
        });

        // modo muy statico
        // expect((await dayBookRouter.children[0].component()).default.name).toBe(
        //     "no-entry-selected"
        // );
        // expect((await dayBookRouter.children[1].component()).default.name).toBe("entry-view");

        const promiseRoutes = [];
        dayBookRouter.children.forEach((child) => promiseRoutes.push(child.component()));

        const routes = (await Promise.all(promiseRoutes)).map((r) => r.default.name);
        // console.log(routes);
        expect(routes).toContain("no-entry-selected");
        expect(routes).toContain("entry-view");
    });

    test("debe de retornar el id de la ruta", () => {
        const route = {
            params: {
                id: "ABC-123",
            },
        };
        // Modo estático
        //console.log(dayBookRouter.children[1].props(route))
        //expect(dayBookRouter.children[1].props(route)).toEqual({ id: 'ABC-123' });
        const entryRoute = dayBookRouter.children.find((route) => route.name === "entry");
        // console.log(entryRoute);
        expect(entryRoute.props(route)).toEqual({ id: "ABC-123" });
    });
});
