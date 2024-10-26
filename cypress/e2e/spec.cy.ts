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

  describe('Asesor Ve vista 360 de un usuario', () => {
    it('Should login the user Asesor Succesfully', () => {

      // Asesor se Loggea Exitosamente
      cy.visit('/');
      cy.contains('button', 'Asesor').click();
      cy.get('input[formcontrolname="email"]').type('agente@gmail.com');
      cy.get('input[formcontrolname="password"]').type('123456');
      cy.contains('button', 'Iniciar sesión').click();
      cy.contains('Login succesfull').should('be.visible');
      cy.contains('button', 'Consultar').should('be.visible');
      cy.contains('button', 'Regresar').should('be.visible');

      cy.get('button.btn-primary.rounded-pill').should('exist');
      cy.get('button[data-bs-toggle="dropdown"]').should('exist');
      cy.get('button[type="button"].btn-primary.rounded-pill').should('exist');
      cy.get('button.btn-primary.rounded-pill i.fa-solid.fa-bars').should('exist');
      cy.get('button.btn-primary.rounded-pill').first().click();
      cy.get('.dropdown-menu').should('be.visible'); // Verifica que el menú desplegable es visible

      // Verifica que cada opción existe en el menú
      cy.contains('.dropdown-item', 'Listar PQR').should('be.visible');
      cy.contains('.dropdown-item', 'Crear PQR').should('be.visible');
      cy.contains('.dropdown-item', 'Consultar consumidor').should('be.visible');

      // Haz clic en la opción "Consultar consumidor"
      cy.contains('.dropdown-item', 'Consultar consumidor').click();
      cy.wait(500); // Espera 500 milisegundos

      cy.contains('button', 'Consultar').should('be.visible');
      cy.contains('button', 'Regresar').should('be.visible');

      // Verifica que el selector de "Tipo identificación" es visible
      cy.get('select#identification_type').should('be.visible');

      // Verifica que las opciones dentro del selector sean visibles
      cy.get('select#identification_type option').should('have.length', 4);
      cy.get('select#identification_type').contains('Cédula de ciudadanía').should('be.visible');
      cy.get('select#identification_type').contains('Cédula de extranjería').should('be.visible');
      cy.get('select#identification_type').contains('Tarjeta de identidad').should('be.visible');
      cy.get('select#identification_type').contains('Pasaporte').should('be.visible');

      // Verifica que el campo de texto "Numero identificación" es visible
      cy.get('input#identification_number').should('be.visible');

      // Verifica que el selector de "Tipo identificación" es visible y selecciona "Pasaporte"
      cy.get('select#identification_type').should('be.visible').select('Pasaporte');

      // Verifica que se ha seleccionado "Pasaporte"
      cy.get('select#identification_type').should('have.value', 'Pasaporte');

      // Ingresa el número "1234556" en el campo "Numero identificación"
      cy.get('input#identification_number').should('be.visible').type('1234556');

      // Verifica que el número fue ingresado correctamente
      cy.get('input#identification_number').should('have.value', '1234556');

      // Verifica que el botón "Consultar" esté habilitado
      cy.get('button').contains('Consultar').should('be.enabled');

      // Hace clic en el botón "Consultar"
      cy.get('button').contains('Consultar').click();


    });

    // Asesor se dirige a Consultar consumidor




  });

