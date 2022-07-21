const { Router } = require('express');
// Importar todos los routers;
const activities = require('./middlewares/activities.js')
const countries = require('./middlewares/countries.js')
// const img = require('/sisoy.jpg')

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/activities', activities);
router.use('/countries', countries);

//BORRAR
// router.get('/', (req, res) => {
//     res.sendFile(__dirname +'/sisoy.jpg')
// })

module.exports = router;
