//Importo Router de express y las funciones del controller de Activities
const { Router } =  require('express');
const { createActivity } = require('./../controllers/activities.js');

//Invoco el router
const router = Router();

//Creo las rutas
router.post('/', async (req, res) => {
    const { name, difficult, duration, season, countries } = req.body;
    try {
        res.status(201).json(await createActivity(name, difficult, duration, season, countries));
    } catch (err) {
        res.status(400).json({error: err.message});
    }
})


//Exporto las rutas
module.exports = router;