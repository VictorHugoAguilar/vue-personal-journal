// Función que me transforma el array en un objeto con la
// misma estructura que me devolvería journalAPI si llama
// realmente a Firebase (cosa que queremos evitar):
const transformEntries = (array) => {
    // array tiene una propiedad id que hará de clave
    const result = array.reduce((map, obj) => {
        // Copia profunda del objeto
        const copy = JSON.parse(JSON.stringify(obj));
        // Retiramos la clave
        delete copy.id;
        return (map[obj.id] = copy), map;
    }, {});

    return result;
};

export default transformEntries;
