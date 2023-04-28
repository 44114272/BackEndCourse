import {Router} from 'express'
import ProductManager from '../../manager/ProductManager.js'

const router = Router()
const manager = new ProductManager();

router.post('/', async (req, res) => {
    await manager.save(req.body);

    const io = req.app.get('socketio');
    io.emit("showProducts", await manager.listAll());

    res.send({
        status: 'success'
    })
})

router.delete('/:pid', async (req, res) => {
    await manager.delete(req.params.pid);

    const io = req.app.get('socketio');
    io.emit("showProducts", await manager.listarAll());
    
    res.send({
        status: 'success'
    })
})

export default router
