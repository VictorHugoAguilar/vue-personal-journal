// export const myGetters =  ( state ) => {

// };

export const getEntriesByTerm =
    (state) =>
    (term = "") => {
        if (!term || term.length === 0) {
            return state.entries;
        }
        return state.entries.filter((entry) =>
            entry.text.toLowerCase().includes(term.toLocaleLowerCase())
        );
    };

export const getEntriesById = (/* state */) => {};
