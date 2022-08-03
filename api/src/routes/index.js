const { Router } = require('express');
// Importar todos los routers;
const activities = require('./middlewares/activities.js')
const countries = require('./middlewares/countries.js')

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/activities', activities);
router.use('/countries', countries);


module.exports = router;
