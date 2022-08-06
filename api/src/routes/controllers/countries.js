//Importo el modelo Countries de sequelize
const { Country, Tourist_Activity } = require('./../../db.js');
const axios = require('axios')
const { Op } = require('sequelize')
//Exporto las funciones de cada operación
module.exports = {
    getCountries: async (name, alph, ppl, continent, activityName, activityDiff, activityDur, activitySeason) => {

        const prueba = await Country.findAll() //Hago una consulta para saber si la tabla countries está vacía

        if(prueba.length === 0) { //Tabla vacía, primer llamado de la función, se llena la tabla con los datos de la API
            // console.log('API')
            var datos = []
            var datosFiltrados = []
            // https://restcountries.com/v3/alpha?codes=col,pe,at,670,520,316,703,51,144,CCK,DNK,BLM,GUM,ZAF,BEL,MTQ,BFA,USA,SVK,NLD,MOZ,BOL,TJK,BEN,IOT,SLE,MLI,LBN,HKG,UGA,NZL,MWI
            // https://restcountries.com/v3/all
            await axios.get('https://restcountries.com/v3/all')
            .then(response => {
                datos = response.data //array con todos los países
                datos.map( e => {
                    // console.log(e.cca3)
                    let country = { 
                        id: e.cca3?e.cca3:'...', //ID
                        name: e.name.common?e.name.common:'No disponible', //Nombre
                        flag: e.flags[1]?e.flags[0]:'No disponible', //Link a la bandera
                        continent: e.continents?e.continents[0]:'No disponible', //Continente
                        capital: e.capital?e.capital[0]:'No disponible', //Capital
                        subregion: e.subregion?e.subregion:'No disponible', //Subregión
                        area: e.area?Number(e.area):0, //Área
                        population: e.population?Number(e.population):0 //Población
                    }
                    // console.log(country)
                    datosFiltrados.push(country)
                })
            })
            await Country.bulkCreate(datosFiltrados) //Cargar datos a la DB
            return datosFiltrados
        }
        else { //Tabla con datos, llamado por filtrado u ordenamiento, accede directamente a la base de datos
            // console.log('BD')
            //Defino, si existe, el tipo de ordenamiento en alph y ppl (ASC o DESC)
            let orden = []
            if (!!alph) orden.push(['name', alph])
            if (!!ppl) orden.push(['population', ppl])
            // orden.push(['population', desc])
            let allConditions = {order: orden} //allConditions guarda todas las condiciones de filtrado y ordenamiento, si existen

            //Defino, si existe, la condición de búsqueda por nombre
            let whereCondition = {}
            if (!!name) whereCondition = {
                name : {[Op.iLike]: `%${name}%`}
                // population : {[Op.lt]: 50000}
            }

            //Agrego, si existe, el filtrado por continente
            if (!!continent) whereCondition = {...whereCondition, continent: continent.split(',')}
            if (!!allConditions) allConditions = {...allConditions, where: whereCondition} //Agrego las condiciones del where a la consulta

            let joinCondition = {}; //Defino, si existen, las condiciones de las actividades
            if (!!activityName) joinCondition = {...joinCondition, name: activityName.split(',')}
            if (!!activityDiff) joinCondition = {...joinCondition, difficult: activityDiff.split(',')}
            if (!!activityDur) joinCondition = {...joinCondition, duration: activityDur.split(',')}
            if (!!activitySeason) joinCondition = {...joinCondition, season: activitySeason.split(',')}

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
            const countries = await Country.findAll( allConditions )
            // console.log(countries[0])
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
    },
}