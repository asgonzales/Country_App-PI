//Importo el modelo de Tourist_Activities de sequelize
const { Tourist_Activity, Country } = require('./../../db.js')

//Exporto el modulo con las funciones de cada operación
module.exports = {
    createActivity: async (name, difficult, duration, season, countries) => {
        //Manejo de errores
        console.log(name)
        if (!name || !difficult || !duration || !season || !countries) throw new Error('Faltan pasar datos');

        //Creación de nueva actividad
        const newActivity =  await Tourist_Activity.create({
            name,
            difficult,
            duration,
            season,
        })

        const activity = await Tourist_Activity.findByPk(newActivity.id); //Busco la actividad recién creada
        await activity.setCountries(countries) //Seteo los países designados a dicha actividad

        //Busco la actividad recién relacionada con sus respectivos países 
        const relation = await Tourist_Activity.findAll({ 
            where: {
                id: newActivity.id
            },
            include: {
                model: Country,
                through: {
                    attributes: []
                }
            }
        })
        
        return relation
    },

    selectNames: async (select) => {
        const groups = await Tourist_Activity.findAll({
            attributes: [select],
            group: [select]
        })
        return groups
    },
    bulkCreate: async (arr) => { //DE PRUEBA
        arr.map( async e => {
            const newActivity =  await Tourist_Activity.create({
                name: e.name,
                difficult: e.difficult,
                duration: e.duration,
                season: e.season,
            })
    
            const activity = await Tourist_Activity.findByPk(newActivity.id); //Busco la actividad recién creada
            await activity.setCountries(e.countries) //Seteo los países designados a dicha actividad
    
            //Busco la actividad recién relacionada con sus respectivos países 
            const relation = await Tourist_Activity.findAll({ 
                where: {
                    id: newActivity.id
                },
                include: {
                    model: Country,
                    through: {
                        attributes: []
                    }
                }
            })
            
        })
        return 'CREADOS'
    }

}
