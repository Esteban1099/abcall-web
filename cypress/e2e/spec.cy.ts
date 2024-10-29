describe('My First Test', () => {
  it('Visits the initial project page', () => {
    cy.visit('/')
    cy.contains('ABCall')
    cy.contains('Iniciar sesión como:')
    cy.contains('Empresa')
    cy.contains('Asesor')
  })
})


describe('Auth Login as Clients Tests', () => {

  it('Should login the user Empresa Succesfully', () => {

    // Empresa se Loggea Exitosamente
    cy.visit('/');
    cy.contains('button', 'Empresa').click();
    cy.get('input[formcontrolname="email"]').type('cliente@gmail.com');
    cy.get('input[formcontrolname="password"]').type('123456');
    cy.contains('button', 'Iniciar sesión').click();
    cy.contains('Bienvenido').should('be.visible');

  });

  it('Should show error message', () => {

    // Empresa No se Loggea Exitosamente
    cy.visit('/');
    cy.contains('button', 'Empresa').click();
    cy.get('input[formcontrolname="email"]').type('cliente@gmail.com');
    cy.get('input[formcontrolname="password"]').type('BadPassword');
    cy.contains('button', 'Iniciar sesión').click();
    cy.contains('Credenciales inválidas').should('be.visible');

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
    cy.contains('Credenciales inválidas').should('be.visible');

  });

});

describe('Auth Login as Agent Tests', () => {

  it('Should login the user Asesor Succesfully', () => {

    // Asesor se Loggea Exitosamente
    cy.visit('/');
    cy.contains('button', 'Asesor').click();
    cy.get('input[formcontrolname="email"]').type('agente@gmail.com');
    cy.get('input[formcontrolname="password"]').type('123456');
    cy.contains('button', 'Iniciar sesión').click();
    cy.contains('Bienvenido').should('be.visible');

  });

  it('Should show error message', () => {

    // Asesor No se Loggea Exitosamente
    cy.visit('/');
    cy.contains('button', 'Asesor').click();
    cy.get('input[formcontrolname="email"]').type('agente@gmail.com');
    cy.get('input[formcontrolname="password"]').type('BadPassword');
    cy.contains('button', 'Iniciar sesión').click();
    cy.contains('Credenciales inválidas').should('be.visible');

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
    cy.contains('Credenciales inválidas').should('be.visible');

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
    cy.contains('Bienvenido').should('be.visible');

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

    // Verifica que el mensaje de error se muestra
    cy.contains('Consumidor no encontrado').should('be.visible');

    // Verifica que el número fue ingresado correctamente
    cy.get('input#identification_number').should('be.visible').clear().type('9601063007');
    cy.get('input#identification_number').should('have.value', '9601063007');

    // Hace clic en el botón "Consultar"
    cy.get('button').contains('Consultar').click();

    // Verifica que la información del consumidor se muestra

    cy.contains('Vista 360 de').should('be.visible');
    cy.contains('Número de contacto').should('be.visible');
    cy.contains('Dirección').should('be.visible');
    cy.contains('Correo electrónico').should('be.visible');
    cy.contains('Número de identificación').should('be.visible');
    cy.contains('istado de PQRs reportados por el consumidor').should('be.visible');
    cy.contains('Empresa').should('be.visible');

    cy.contains('button', 'Regresar').should('be.visible');
    cy.contains('button', 'Regresar').click()


  });
});


describe('Asesor crea una PQR a un usuario', () => {
  it('should create a PQR Succesfully', () => {

    //Desde el menu principal
    // Asesor se Loggea Exitosamente
    cy.visit('/');
    cy.contains('button', 'Asesor').click();
    cy.get('input[formcontrolname="email"]').type('agente@gmail.com');
    cy.get('input[formcontrolname="password"]').type('123456');
    cy.contains('button', 'Iniciar sesión').click();
    cy.contains('Bienvenido').should('be.visible');
    cy.wait(200);
    cy.get('button.btn-primary.rounded-pill').should('exist');
    cy.get('button.btn-primary.rounded-pill').first().click();


    // Haz clic en la opción "Consultar consumidor"
    cy.contains('.dropdown-item', 'Crear PQR').click();
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

    // Hace clic en el botón "Consultar"
    cy.get('button').contains('Consultar').click();

    // Verifica que el mensaje de error se muestra
    cy.contains('Consumidor no encontrado').should('be.visible');

    // Verifica que el número fue ingresado correctamente
    cy.get('input#identification_number').should('be.visible').clear().type('9601063007');
    cy.get('input#identification_number').should('have.value', '9601063007');

    // Hace clic en el botón "Consultar"
    cy.get('button').contains('Consultar').click();

    // se verifican elementos graficos propios de creacion de pqr

    cy.contains('Crear PQR para').should('be.visible');
    cy.contains('Número de contacto').should('be.visible');
    cy.contains('Dirección').should('be.visible');
    cy.contains('Correo electrónico').should('be.visible');
    cy.contains('Número de identificación').should('be.visible');
    cy.contains('Empresa').should('be.visible');

    cy.contains('Asunto').should('be.visible');
    cy.contains('Descripción').should('be.visible');
    cy.contains('button', 'Regresar').should('be.visible');

    // Verifica que el dropdown de compañías está visible
    cy.get('select.form-select').should('be.visible');

    // Verifica que el dropdown contiene opciones (compañías)
    cy.get('select.form-select option').should('have.length.greaterThan', 0);

    // Opcional: Verifica que el contenido de las opciones no esté vacío
    cy.get('select.form-select option').each(($el) => {
      cy.wrap($el).invoke('text').should('not.be.empty');
    });

    // Selecciona una compañía cualquiera (en este caso, selecciona la primera opción)
    //cy.get('select#identification_type').should('be.visible').select('Pasaporte');

    // Ingresa un asunto y una descripción
    cy.get('textarea#description').type('Descripción de prueba');
    cy.get('input#subject').type('Asunto de prueba');
    cy.contains('La descripción debe tener al menos 100 caracteres').should('be.visible');

    // Se ingresa una descripción con más de 200 caracteres
    cy.get('textarea#description').clear().type('Descripción de prueba con más de 200 caracteres'.repeat(5));

    // Se borra el asunto y aparece mensaje de error
    cy.get('input#subject').clear();
    cy.contains('Debe ingresar el asunto').should('be.visible');

    // Se vuelve a ingresar un asunto
    cy.get('input#subject').type('Asunto de prueba');

    // Se verifica que el boton Crear PQR esté deshabilitado

    cy.contains('button', 'Crear PQR').should('be.disabled');

    // Se selecciona una empresa

    cy.wait(3000);
    cy.get('select.form-select').should('be.visible').select(0);
    // Opcional: Verifica que una opción ha sido seleccionada
    cy.get('select.form-select').should('not.have.value', '');

    // Se verifica que el boton Crear PQR esté habilitado

    cy.contains('button', 'Crear PQR').should('be.enabled');
    // Se hace click en el boton crear pqr y se evidencia mensaje de exito
    cy.contains('button', 'Crear PQR').click();
    cy.contains('La PQR ha sido creada exitosamente').should('be.visible');
  });

});
