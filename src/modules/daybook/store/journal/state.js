export default () => ({
    isLoading: true,
    entries: [
        {
            id: new Date().getTime(),
            date: new Date().toDateString(),
            text: "Lorem Casa ipsum, dolor sit amet consectetur adipisicing elit. Neque deserunt consectetur explicabo molestiae. Incidunt atque in amet laboriosam provident natus. Eaque optio itaque earum voluptatum sunt rerum provident dolores at!",
            picture: null,
        },
        {
            id: new Date().getTime() + 1,
            date: new Date().toDateString(),
            text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis architecto quam esse nemo! Dolores, qui? Alias, vitae. Aspernatur quis aperiam voluptates ipsum cumque ex consequatur, recusandae, doloribus dicta, cupiditate alias?",
            picture: null,
        },
        {
            id: new Date().getTime() + 2,
            date: new Date().toDateString(),
            text: "Lorem consectetur architecto sit amet consectetur adipisicing elit. Veritatis architecto quam esse nemo! Dolores, qui? Alias, vitae. Aspernatur quis aperiam voluptates ipsum cumque ex consequatur, recusandae, doloribus dicta, cupiditate alias?",
            picture: null,
        },
    ],
});
