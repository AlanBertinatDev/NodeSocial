import express from 'express';
import response from '../../../network/response.js';
import Controller from './index.js';

const router = express.Router();

router.get('/', list);
router.get('/:id', get);
router.post('/', upsert);
router.put('/:id/remove', remove);

async function list(req, res) {
    try {
        const lista = await Controller.list();
        response.success(req, res, lista, 200);
    } catch (err) {
        response.error(req, res, err.message, 500);
    }
}

async function get(req, res) {
    try {
        const user = await Controller.get(req.params.id);
        response.success(req, res, user, 200);
    } catch (err) {
        response.error(req, res, err.message, 500);
    }
}

async function upsert(req, res) {
    try {
        const user = await Controller.upsert(req.body);
        response.success(req, res, user, 201);
    } catch (err) {
        response.error(req, res, err.message, 500);
    }
}

async function remove(req, res) {
    try {
        const result = await Controller.removeById(req.params.id);
        response.success(req, res, result, 200);
    } catch (err) {
        response.error(req, res, err.message, 500);
    }
}

export default router;
