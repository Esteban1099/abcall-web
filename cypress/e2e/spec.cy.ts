describe('My First Test', () => {
  it('Visits the initial project page', () => {
    cy.visit('http://localhost:4200/auth')
    cy.contains('ABCall')
    cy.contains('Iniciar sesión como:')
    cy.contains('Empresa')
    cy.contains('Asesor')
  })
 })




describe('User Login Tests', () => {
  beforeEach(() => {
    // Crear usuarios antes de cada prueba
    cy.request('POST', 'http://localhost:5001/clients', {
      name: 'Fernando',
      email: 'fernando@example.com',
      password: 'password123',
    }).then((response) => {
      expect(response.status).to.eq(201); // Verifica que el usuario fue creado
    });

    cy.request('POST', 'http://localhost:5001/clients', {
      name: 'Maria',
      email: 'maria@example.com',
      password: 'password456',
    }).then((response) => {
      expect(response.status).to.eq(201); // Verifica que el usuario fue creado
    });
  });

  it('Should login the user Succesfully', () => {

    // Fer se Loggea
    cy.visit('http://localhost:4200/auth');
    cy.contains('button', 'Empresa').click();
    cy.get('input[formcontrolname="email"]').type('fernando@example.com');
    cy.get('input[formcontrolname="password"]').type('password123');
    cy.contains('button', 'Iniciar sesión').click();
    cy.contains('Login succesfull').should('be.visible');

    // Maria se Loggea
    cy.visit('http://localhost:4200/auth');
    cy.contains('button', 'Empresa').click();
    cy.get('input[formcontrolname="email"]').type('maria@example.com');
    cy.get('input[formcontrolname="password"]').type('password456');
    cy.contains('button', 'Iniciar sesión').click();
    cy.contains('Login succesfull').should('be.visible');

  });

});



