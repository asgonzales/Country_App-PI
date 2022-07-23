//Importo el modelo Countries de sequelize
const { Country, Tourist_Activity } = require('./../../db.js');
const axios = require('axios')
const { Op } = require('sequelize')
//Exporto las funciones de cada operación
module.exports = {
    // getAPI: async () => {
    //     var datos = []
    //     var datosFiltrados = []
    //     // https://restcountries.com/v3/alpha?codes=col,pe,at,670,520,316,703,51,144
    //     // https://restcountries.com/v3/all
    //     await axios.get('https://restcountries.com/v3/alpha?codes=col,pe,at,670,520,316,703,51,144').then(response => {
    //         datos = response.data //array con todos los países
    //         datos.map( e => {
    //             let country = { 
    //                 id: e.cca3?e.cca3:'...', //ID
    //                 name: e.name.common?e.name.common:'No disponible', //Nombre
    //                 flag: e.flags[1]?e.flags[0]:'No disponible', //Link a la bandera
    //                 continent: e.continents?e.continents[0]:'No disponible', //Continente
    //                 capital: e.capital?e.capital[0]:'No disponible', //Capital
    //                 subregion: e.subregion?e.subregion:'No disponible', //Subregión
    //                 area: e.area?e.area:'No disponible', //Área
    //                 population: e.population?e.population:'No disponible' //Población
    //             }
    //             datosFiltrados.push(country)
    //             // Country.create(country)
    //         })
    //     })
    //     Country.bulkCreate(datosFiltrados) //Cargar datos a la DB
    //     return datosFiltrados
    // },
    getCountries: async (name, alph, ppl, continent, activityName, activityDiff, activityDur, activitySeason) => {
        const prueba = await Country.findAll() //Hago una consulta para saber si la tabla countries está vacía
        if(prueba.length === 0) { //Tabla vacía, primer llamado de la función, se llena la tabla con los datos de la API
            // console.log(prueba, 'Tabla vacía')
            var datos = []
            var datosFiltrados = []
            // https://restcountries.com/v3/alpha?codes=col,pe,at,670,520,316,703,51,144
            // https://restcountries.com/v3/all
            await axios.get('https://restcountries.com/v3/alpha?codes=col,pe,at,670,520,316,703,51,144').then(response => {
                datos = response.data //array con todos los países
                datos.map( e => {
                    let country = { 
                        id: e.cca3?e.cca3:'...', //ID
                        name: e.name.common?e.name.common:'No disponible', //Nombre
                        flag: e.flags[1]?e.flags[0]:'No disponible', //Link a la bandera
                        continent: e.continents?e.continents[0]:'No disponible', //Continente
                        capital: e.capital?e.capital[0]:'No disponible', //Capital
                        subregion: e.subregion?e.subregion:'No disponible', //Subregión
                        area: e.area?e.area:'No disponible', //Área
                        population: e.population?e.population:'No disponible' //Población
                    }
                    datosFiltrados.push(country)
                    // Country.create(country)
                })
        })
        Country.bulkCreate(datosFiltrados) //Cargar datos a la DB
        return datosFiltrados
        }
        else { //Tabla con datos, llamado por filtrado u ordenamiento, accede directamente a la base de datos
            // (console.log(prueba, 'Tabla llena'))
            //Defino, si existe, el tipo de ordenamiento en alph y ppl (ASC o DESC)
            let orden = []
            if (!!alph) orden.push(['name', alph])
            if (!!ppl) orden.push(['population', ppl])
            let allConditions = {order: orden} //allConditions guarda todas las condiciones de filtrado y ordenamiento, si existen

            //Defino, si existe, la condición de búsqueda por nombre
            let whereCondition = {}
            if (!!name) whereCondition = {name : {[Op.like]: `%${name}%`} }

            //Agrego, si existe, el filtrado por continente
            if (!!continent) whereCondition = {...whereCondition, continent: continent}

            if (!!allConditions) allConditions = {...allConditions, where: whereCondition} //Agrego las condiciones del where a la consulta

            let joinCondition = {}; //Defino, si existen, las condiciones de las actividades
            if (!!activityName) joinCondition = {...joinCondition, name: activityName}
            if (!!activityDiff) joinCondition = {...joinCondition, difficult: activityDiff}
            if (!!activityDur) joinCondition = {...joinCondition, duration: activityDur}
            if (!!activitySeason) joinCondition = {...joinCondition, season: activitySeason}
            // console.log(!!{})
            if(Object.entries(joinCondition).length > 0) {
                allConditions = { //Agrego las condiciones de actividades a la consulta
                    ...allConditions,
                    include: {
                        model: Tourist_Activity,
                        where: joinCondition,
                        through: { attributes: []}
                    }
                }
            } 
            console.log(allConditions)
            const countries = await Country.findAll( allConditions )
        return countries
        }
        
    },
    getCountry: async (idPais) => {
        if (!idPais) throw new Error('Faltan datos')
        const country = await Country.findOne({
            where: {id: idPais},
            include: {
                model: Tourist_Activity,
                through: {
                    attributes: []
                }
            }
        })
        return country;
    }
}