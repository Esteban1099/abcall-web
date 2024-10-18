describe('My First Test', () => {
  it('Visits the initial project page', () => {
    cy.visit('/')
    cy.contains('ABCall')
    cy.contains('Iniciar sesión como:')
    cy.contains('Empresa')
    cy.contains('Asesor')
  })
 })


describe('User Login as Clients Tests', () => {

  it('Should login the user Empresa Succesfully', () => {

    // Empresa se Loggea Exitosamente
    cy.visit('/');
    cy.contains('button', 'Empresa').click();
    cy.get('input[formcontrolname="email"]').type('cliente@gmail.com');
    cy.get('input[formcontrolname="password"]').type('123456');
    cy.contains('button', 'Iniciar sesión').click();
    cy.contains('Login succesfull').should('be.visible');

  });

  it('Should show error message', () => {

    // Empresa No se Loggea Exitosamente
    cy.visit('/');
    cy.contains('button', 'Empresa').click();
    cy.get('input[formcontrolname="email"]').type('cliente@gmail.com');
    cy.get('input[formcontrolname="password"]').type('BadPassword');
    cy.contains('button', 'Iniciar sesión').click();
    cy.contains('Error en la autenticación').should('be.visible');

  });

  it('Should show bad email message', () => {
    // Empresa ingresa mal email
    cy.visit('/');
    cy.contains('button', 'Empresa').click();
    cy.get('input[formcontrolname="email"]').type('mal email');
    cy.get('input[formcontrolname="password"]').type('123456');
    cy.contains('Correo electrónico invalido').should('be.visible');
    cy.get('button[type="submit"]').should('be.disabled');
  });

  it('Should show password required', () => {

    // Empresa ingresa mal password

    cy.visit('/');
    cy.contains('button', 'Empresa').click();
    cy.get('input[formcontrolname="email"]').type('unemail@email');
    cy.get('input[formcontrolname="password"]').type('BadPassword');
    cy.get('input[formcontrolname="password"]').clear();
    cy.get('input[formcontrolname="email"]').type('.com');
    cy.contains('Debe ingresar la contraseña').should('be.visible');

  });

  it('Should show error when Empresa logs in as Asesor', () => {

    // Empresa intenta loggearse como Asesor
    cy.visit('/');
    cy.contains('button', 'Empresa').click();
    cy.get('input[formcontrolname="email"]').type('agente@gmail.com');
    cy.get('input[formcontrolname="password"]').type('123456');
    cy.contains('button', 'Iniciar sesión').click();
    cy.contains('Error en la autenticación').should('be.visible');

  });

  });

  describe('User Login as Agent Tests', () => {

    it('Should login the user Asesor Succesfully', () => {

      // Asesor se Loggea Exitosamente
      cy.visit('/');
      cy.contains('button', 'Asesor').click();
      cy.get('input[formcontrolname="email"]').type('agente@gmail.com');
      cy.get('input[formcontrolname="password"]').type('123456');
      cy.contains('button', 'Iniciar sesión').click();
      cy.contains('Login succesfull').should('be.visible');

    });

    it('Should show error message', () => {

      // Asesor No se Loggea Exitosamente
      cy.visit('/');
      cy.contains('button', 'Asesor').click();
      cy.get('input[formcontrolname="email"]').type('agente@gmail.com');
      cy.get('input[formcontrolname="password"]').type('BadPassword');
      cy.contains('button', 'Iniciar sesión').click();
      cy.contains('Error en la autenticación').should('be.visible');

    });

    it('Should show login buitton disabled', () => {



      // Asesor ingresa mal email
      cy.visit('/');
      cy.contains('button', 'Asesor').click();
      cy.get('input[formcontrolname="email"]').type('mal email');
      cy.get('input[formcontrolname="password"]').type('123456');
      cy.contains('Correo electrónico invalido').should('be.visible');
      cy.get('button[type="submit"]').should('be.disabled');

    });

    it('Should show password required', () => {
      // Asesor ingresa mal password
      cy.visit('/');
      cy.contains('button', 'Asesor').click();
      cy.get('input[formcontrolname="email"]').type('unemail@email');
      cy.get('input[formcontrolname="password"]').type('BadPassword');
      cy.get('input[formcontrolname="password"]').clear();
      cy.get('input[formcontrolname="email"]').type('.com');
      cy.contains('Debe ingresar la contraseña').should('be.visible');



    });

    it('Should show error when Asesor logs in as Empresa', () => {

        // Asesor intenta loggearse como Empresa
        cy.visit('/');
        cy.contains('button', 'Empresa').click();
        cy.get('input[formcontrolname="email"]').type('agente@gmail.com')
        cy.get('input[formcontrolname="password"]').type('123456')
        cy.contains('button', 'Iniciar sesión').click();
        cy.contains('Error en la autenticación').should('be.visible');

    });

  });
