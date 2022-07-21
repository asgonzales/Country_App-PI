//Importo el router desde express
const { Router } = require('express');

//Invoco el router
const router = Router();

//Importo el controller de countries
const { getAPI, getCountries, getCountry } = require('./../controllers/countries.js');


//Creo las rutas de countries

//Obtener los datos de la API
router.get('/', async (req, res) => {

    const { start, alph, ppl, continent, activities } = req.body;
    const { name } = req.query;

    if (start) { //llamdo por primera vez, carga la bd con la api y devuelve los datos listados y filtrados
        try {
            res.status(201).json( await getAPI());
        } catch (err) {
            res.status(400).json({error: err.message});
        }
    }
    else { //Si entra acá es porque los datos ya fueron cargados y solo entra para ordenarlos
        try {
            res.status(201).json( await getCountries(name, alph, ppl, continent, activities))
        } catch (err) {
            res.status(400).json({error: err.message})
        }
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