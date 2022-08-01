//Importo Router de express y las funciones del controller de Activities
const { Router } =  require('express');
const { createActivity, selectNames, bulkCreate } = require('./../controllers/activities.js');

//Invoco el router
const router = Router();

//Creo las rutas
router.post('/', async (req, res) => {
    const { name, difficult, duration, season, countries } = req.body;
    try {
        res.status(201).json(await createActivity(name, difficult, duration, season, countries));
        // res.status(201).json({msg: 'ola'})
    } catch (err) {
        console.log(err.message)
        res.status(400).json({error: err.message});
    }
})

router.get('/:select', async (req, res) => {
    const { select } = req.params
    try {
        res.status(200).json(await selectNames(select))
    } catch (err) {
        res.status(400).json({error: err.message})
    }
})

//PRUEBA
router.post('/prueba', async (req, res) => {
    const { arr } = req.body;
    try {
        res.status(200).json(await bulkCreate(arr));
    } catch (err) {
        res.status(400).json({error: err.message});
    }
})
//Exporto las rutas
module.exports = router;