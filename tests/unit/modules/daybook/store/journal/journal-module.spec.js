import { createStore } from "vuex";
import journal from "@/modules/daybook/store/journal";
import { journalState } from "../../../../mock-data/test-journal-state";

const createVuexStore = (initialState) =>
    createStore({
        modules: {
            journal: {
                ...journal,
                state: { ...initialState },
            },
        },
    });

describe("Vuex - Pruebas en el Journal Module", () => {
    test("este es el estado inicial, debe de tener este state", () => {
        const store = createVuexStore(journalState);
        const { isLoading, entries } = store.state.journal;
        expect(isLoading).toBeFalsy();
        expect(entries).toEqual(journalState.entries);
    });

    // MUTATIONS

    test("mutation: setEntries", () => {
        const store = createVuexStore({ isLoading: true, entries: [] });
        expect(store.state.journal.entries.length).toBe(0);

        store.commit("journal/setEntries", journalState.entries);
        expect(store.state.journal.entries.length).toBe(2);

        expect(store.state.journal.isLoading).toBeFalsy();
    });

    test("mutation: updateEntry", () => {
        const store = createVuexStore(journalState);
        const updatedEntry = {
            id: "-MfKM3yA5ij3hnmLFfqv",
            date: 1627077227978,
            text: "Hola mundo desde pruebas",
        };

        store.commit("journal/updateEntry", updatedEntry);

        const storeEntries = store.state.journal.entries;

        expect(storeEntries.length).toBe(2);
        expect(storeEntries.find((e) => e.id === updatedEntry.id)).toEqual(updatedEntry);
    });
});
