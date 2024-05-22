const db = {
    'user': [
        {id: 1, name: 'Juan'},
        {id: 2, name: 'Romi'},
        {id: 3, name: 'Pedrito'},
        {id: 4, name: 'Oscar'},
    ]
};

async function list(tabla){
    return db[tabla];
}
async function get(tabla, id){
    let col = await list(tabla);
    return col.find(item => item.id == id) || null; 
}
async function upsert(tabla, data){
    let col = await list(tabla);
    const index = col.findIndex(item => item.id == data.id);
    console.log(index);
    if (index !== -1) {
        col[index] = data;
        return true;
    } else {
        col.push(data);
        return true;
    };
}

async function removeById(tabla, id){
    let col = await list(tabla);
    const index = col.findIndex(item => item.id == id);
    if (index !== -1) {
        col.splice(index, 1);
        return true;
    } else return false;
}


export default {
    list,
    get,
    upsert,
    removeById,
};