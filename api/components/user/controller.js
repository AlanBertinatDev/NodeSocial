import bodyParser from 'body-parser';
import store from '../../../store/dummy.js';
import { nanoid } from 'nanoid';

const TABLA = 'user';

export default function (injectedStore) {
    let store = injectedStore;

    if (!store) {
        store = require('../../../store/dummy').default; 
    }

    function list() {
        return store.list(TABLA);
    }

    function get(id) {
        return store.get(TABLA, id);
    }

    async function upsert(body) {
        if (!body.name) {
            throw new Error("El campo 'name' es obligatorio");
        }
    
        const user = {
            name: body.name,
        };
    
        let message;
    
        if (body.id) {
            user.id = body.id;
            const existingUser = await store.get(TABLA, body.id);
            if (existingUser) {
                message = "Usuario modificado correctamente";
            } else {
                message = "No se encontró un usuario con el ID proporcionado, se ha creado uno nuevo";
            }
        } else {
            user.id = nanoid();
            message = "Usuario creado correctamente";
        }
    
        const success = await store.upsert(TABLA, user);
        if (success) {
            return { message, user };
        } else {
            throw new Error("El usuario no pudo ser agregado");
        }
    }
    

    async function removeById(id) {
        const success = await store.removeById(TABLA, id);
        if (success) {
            return { message: "Usuario eliminado correctamente" };
        } else {
            throw new Error("El usuario no pudo ser eliminado");
        }
    }

    return {
        list,
        get,
        removeById,
        upsert,
    };
}
