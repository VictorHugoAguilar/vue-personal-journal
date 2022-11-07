// export const myActions = async ({ commit }) => {};
import journalApi from "@/api/journalApi";

export const loadEntries = async ({ commit }) => {
    const { data } = await journalApi.get("/entries.json");
    if (!data) {
        commit("setEntries", []);
        return;
    }
    const entries = [];
    for (let id of Object.keys(data)) {
        entries.push({
            id,
            ...data[id],
        });
    }
    commit("setEntries", entries);
};

export const updateEntries = async ({ commit }, entry) => {
    const { date, picture, text } = entry;
    const dataToSave = { date, picture, text };
    // console.log(dataToSave);
    const rest = await journalApi.put(`/entries/${entry.id}.json`, dataToSave);
    console.log(rest);
    commit("updateEntry", { ...entry });
};

export const createEntries = async ({ commit }, entry) => {
    const { date, picture, text } = entry;
    const dataToSave = { date, picture, text };
    // console.log(dataToSave);
    const { data } = await journalApi.post(`/entries.json`, dataToSave);
    dataToSave.id = data.name;
    commit("createEntry", dataToSave);
    return dataToSave.id;
};

export const deleteEntry = async ({ commit }, id) => {
    // console.log(id);
    await journalApi.delete(`/entries/${id}.json`);
    commit("deleteEntry", id);
};
