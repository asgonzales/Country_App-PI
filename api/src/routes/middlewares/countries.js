//Importo el router desde express
const { Router } = require('express');

//Invoco el router
const router = Router();

//Importo el controller de countries
const { getCountries, getCountry, getContinents } = require('./../controllers/countries.js');


//Creo las rutas de countries

//Obtener los datos de la API
router.get('/', async (req, res) => {
    const { name, alph, ppl, continent, activityName, activityDiff, activityDur, activitySeason } = req.query;
    try {
        res.status(201).json( await getCountries(name, alph, ppl, continent, activityName, activityDiff, activityDur, activitySeason))
    } catch (err) {
        res.status(400).json({error: err.message})
    }
})

//Obtener los continentes para el filtrado
router.get('/continents', async (req, res) => {
    try {
        res.status(201).json( await getContinents())
    } catch (err) {
        res.status(400).json({error: err.message})
    }
})

//Obtener los detalles de un país
router.get('/:idPais', async (req, res) => {
    const { idPais } = req.params;
    try {
        res.status(201).json( await getCountry(idPais))
    } catch (err) {
        res.status(400).json({error: err.message})
    }
})


//Exporto el router
module.exports = router;