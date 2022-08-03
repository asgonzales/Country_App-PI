import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';
import { Provider } from 'react-redux';
import store from './redux/store/index.js';
import Cat from './components/CAT/CAT.jsx';

describe('TEST DE FORMULARIO', () => {
  
  it('Debe tener un input con name name y type text', () => {
    const { container } = render((
      <Provider store={store}>
        <Cat/>
      </Provider>
    ))
    const element = container.querySelectorAll('input')[0]
    expect(element.name).toBe('name')
    expect(element.type).toBe('text')
  });
  it('Debe tener un select con name difficult y 5 opciones', () => {
    const { container } = render((
      <Provider store={store}>
        <Cat/>
      </Provider>
    ))
    const element = container.querySelectorAll('select')[0]
    expect(element.name).toBe('difficult')
    expect(element.options.length).toBe(6)
  });
  it('Debe tener un input con name duration y type number', () => {
    const { container } = render((
      <Provider store={store}>
        <Cat/>
      </Provider>
    ))
    const element = container.querySelectorAll('input')[1]
    expect(element.name).toBe('duration')
    expect(element.type).toBe('number')
  });
  it('Debe tener un select con name season y 5 opciones', () => {
    const { container } = render((
      <Provider store={store}>
        <Cat/>
      </Provider>
    ))
    const element = container.querySelectorAll('select')[1]
    expect(element.name).toBe('season')
    expect(element.options.length).toBe(5)
  });
  it('Debe tener un input con name countries', () => {
    const { container } = render((
      <Provider store={store}>
        <Cat/>
      </Provider>
    ))
    const element = container.querySelectorAll('input')[2]
    expect(element.name).toBe('countries')
  });
  it('la clase del input de nombre debe ser inputBox', () => {
    const { container } = render((
      <Provider store={store}>
        <Cat/>
      </Provider>
    ))
    const element = container.querySelectorAll('input')[0]
    expect(element.className).toBe('inputBox')
  })
  it('la clase del input de nombre debe ser error si se introduce un dato incorrecto', () => {
    const { container } = render((
      <Provider store={store}>
        <Cat/>
      </Provider>
    ))
    const element = container.querySelectorAll('input')[0]
    fireEvent.change(element, {target: {value: 'nom123'}})
    expect(element.className).toBe('error')
  })
  it('el boton de crear actividad debe estar deshabilitado si los campos estàn vacíos', () => {
    const { container } = render((
      <Provider store={store}>
        <Cat/>
      </Provider>
    ))
    const element = container.querySelector('#boton')
    expect(element.disabled).toBe(true)
  })
});