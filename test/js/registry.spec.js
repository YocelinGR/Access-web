import registry from '../../src/js/testingTDD';

describe('testingTDD', () => {
  it('Deberia retornar un div con un botón anidado', () => {
    const el = registry();
    expect(el.tagName).toBe('DIV');
    expect(el.className).toBe('registry');
    expect(el.children.length).toBe(1);
    expect(el.children[0].tagName).toBe('BUTTON');
    expect(el.children[0].innerText).toBe('Registrate');
  });
});
