/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const { response } = require('../../src/app.js');
const app = require('../../src/app.js');
const { Country, conn, Tourist_Activity } = require('../../src/db.js');

const agent = session(app);
const country = {
  name: 'Argentina',
};

// xdescribe('Country routes', () => {
//   before(() => conn.authenticate()
//   .catch((err) => {
//     console.error('Unable to connect to the database:', err);
//   }));
//   beforeEach(() => Country.sync({ force: true }));
//   describe('GET /countries', () => {
//     it('should get 200', () =>
//       agent.get('/countries').expect(200)
//     );
//   });
// });

//TESTS PROPIOS
describe('ACTIVITIES ROUTES', () => {
  let busqueda='name';
  describe('GET /activities', () => {
    it('should get 200', () => 
    agent.get(`/activities/${busqueda}`).expect(200));
  })
  describe('POST /activities', () => {
    it('crear actividad', () =>
      agent.post('/activities').send({
        'name':'Esqui',
        'difficult': 2,
        'duration': 3,
        'season': 'Invierno',
        'countries': ['COL', 'BOL']
      }).expect(201)
    );
  })
  describe('POST /activities', () => {
    it('Debería mostrar un error al ingresar datos incorrectos', () => {
      agent.post('/activities').send({
        'name':'Esqui',
        'difficult': 10,
        'duration': 3,
        'season': 'Invierno',
        'countries': ['COL', 'BOL']
      }).expect(400).expect('Content-Type', /json/)
      .end(function (err, res) {
        if (err) done(err);
        // console.log(res.body)
        expect(res.body).to.have.property('error')
        // done()
      })
    })
  })
  
})
