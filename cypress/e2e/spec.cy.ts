describe('My First Test', () => {
  it('Visits the initial project page', () => {
    cy.visit('/')
    cy.contains('ABCall')
    cy.contains('Iniciar sesión como:')
    cy.contains('Empresa')
    cy.contains('Asesor')
  })
})
describe('Asesor ve detalle de PCC al azar', () => {
  it('should display the detail of a randomly selected PCC', () => {
    // Asesor se loggea exitosamente
    cy.visit('/');
    cy.contains('button', 'Asesor').click();
    cy.get('input[formcontrolname="email"]').type('agente@gmail.com');
    cy.get('input[formcontrolname="password"]').type('123456');
    cy.contains('button', 'Iniciar sesión').click();
    cy.wait(500); // Espera a que cargue la tabla de PQRs/PCCs

    // Verifica que la tabla de PQRs está visible y tiene al menos una fila
    cy.get('.table-responsive').should('be.visible');
    cy.get('table tbody tr').should('have.length.at.least', 1);

    // Selecciona una PCC al azar de la tabla
    cy.get('table tbody tr').then((rows) => {
      const randomIndex = Math.floor(Math.random() * rows.length);
      const selectedRow = cy.wrap(rows[randomIndex]);

      // Obtiene el ID de la PCC seleccionada para verificar en la página de detalle
      selectedRow.find('td').eq(1).invoke('text').then((pccId) => {

        // Hace clic en el botón de detalle de la PCC seleccionada
        selectedRow.find('button').contains('Detalle').click();

        // Verifica que estamos en la página de detalles de la PCC y que muestra la información correcta
        cy.url().should('include', `/pcc/${pccId.trim()}`);
        cy.contains('Detalle de la PCC').should('be.visible');

        // Verifica que los detalles de la PCC están presentes
        cy.contains('ID PCC').should('be.visible');
        cy.contains('Estado').should('be.visible');
        cy.contains('Asunto').should('be.visible');
        cy.contains('Descripción').should('be.visible');
        cy.contains('ID Consumidor').should('be.visible');
        cy.contains('Empresa').should('be.visible');

        // Opcional: Verifica que el ID mostrado corresponde al ID de la PCC seleccionada
        cy.get('.pcc-detail-id').should('contain.text', pccId.trim());

        // Verifica que otros elementos de detalle específicos están visibles
        cy.contains('Fecha de creación').should('be.visible');
        cy.contains('Última actualización').should('be.visible');

        // Si hay un botón para volver o regresar, podemos verificar su existencia y funcionalidad
        cy.contains('button', 'Regresar').should('be.visible').click();

        // Asegura que estamos de regreso en la lista de PQRs
        cy.get('.table-responsive').should('be.visible');
      });
    });
  });
});


// describe('Auth Login as Clients Tests', () => {

//   it('Should login the user Empresa Succesfully', () => {

//     // Empresa se Loggea Exitosamente
//     cy.visit('/');
//     cy.contains('button', 'Empresa').click();
//     cy.get('input[formcontrolname="email"]').type('cliente@gmail.com');
//     cy.get('input[formcontrolname="password"]').type('123456');
//     cy.contains('button', 'Iniciar sesión').click();
//     cy.contains('Bienvenido').should('be.visible');

//   });

//   it('Should show error message', () => {

//     // Empresa No se Loggea Exitosamente
//     cy.visit('/');
//     cy.contains('button', 'Empresa').click();
//     cy.get('input[formcontrolname="email"]').type('cliente@gmail.com');
//     cy.get('input[formcontrolname="password"]').type('BadPassword');
//     cy.contains('button', 'Iniciar sesión').click();
//     cy.contains('Credenciales inválidas').should('be.visible');

//   });

//   it('Should show bad email message', () => {
//     // Empresa ingresa mal email
//     cy.visit('/');
//     cy.contains('button', 'Empresa').click();
//     cy.get('input[formcontrolname="email"]').type('mal email');
//     cy.get('input[formcontrolname="password"]').type('123456');
//     cy.contains('Correo electrónico invalido').should('be.visible');
//     cy.get('button[type="submit"]').should('be.disabled');
//   });

//   it('Should show password required', () => {

//     // Empresa ingresa mal password

//     cy.visit('/');
//     cy.contains('button', 'Empresa').click();
//     cy.get('input[formcontrolname="email"]').type('unemail@email');
//     cy.get('input[formcontrolname="password"]').type('BadPassword');
//     cy.get('input[formcontrolname="password"]').clear();
//     cy.get('input[formcontrolname="email"]').type('.com');
//     cy.contains('Debe ingresar la contraseña').should('be.visible');

//   });

//   it('Should show error when Empresa logs in as Asesor', () => {

//     // Empresa intenta loggearse como Asesor
//     cy.visit('/');
//     cy.contains('button', 'Empresa').click();
//     cy.get('input[formcontrolname="email"]').type('agente@gmail.com');
//     cy.get('input[formcontrolname="password"]').type('123456');
//     cy.contains('button', 'Iniciar sesión').click();
//     cy.contains('Credenciales inválidas').should('be.visible');

//   });

// });

// describe('Auth Login as Agent Tests', () => {

//   it('Should login the user Asesor Succesfully', () => {

//     // Asesor se Loggea Exitosamente
//     cy.visit('/');
//     cy.contains('button', 'Asesor').click();
//     cy.get('input[formcontrolname="email"]').type('agente@gmail.com');
//     cy.get('input[formcontrolname="password"]').type('123456');
//     cy.contains('button', 'Iniciar sesión').click();
//     cy.contains('Bienvenido').should('be.visible');

//   });

//   it('Should show error message', () => {

//     // Asesor No se Loggea Exitosamente
//     cy.visit('/');
//     cy.contains('button', 'Asesor').click();
//     cy.get('input[formcontrolname="email"]').type('agente@gmail.com');
//     cy.get('input[formcontrolname="password"]').type('BadPassword');
//     cy.contains('button', 'Iniciar sesión').click();
//     cy.contains('Credenciales inválidas').should('be.visible');

//   });

//   it('Should show login buitton disabled', () => {



//     // Asesor ingresa mal email
//     cy.visit('/');
//     cy.contains('button', 'Asesor').click();
//     cy.get('input[formcontrolname="email"]').type('mal email');
//     cy.get('input[formcontrolname="password"]').type('123456');
//     cy.contains('Correo electrónico invalido').should('be.visible');
//     cy.get('button[type="submit"]').should('be.disabled');

//   });

//   it('Should show password required', () => {
//     // Asesor ingresa mal password
//     cy.visit('/');
//     cy.contains('button', 'Asesor').click();
//     cy.get('input[formcontrolname="email"]').type('unemail@email');
//     cy.get('input[formcontrolname="password"]').type('BadPassword');
//     cy.get('input[formcontrolname="password"]').clear();
//     cy.get('input[formcontrolname="email"]').type('.com');
//     cy.contains('Debe ingresar la contraseña').should('be.visible');



//   });

//   it('Should show error when Asesor logs in as Empresa', () => {

//     // Asesor intenta loggearse como Empresa
//     cy.visit('/');
//     cy.contains('button', 'Empresa').click();
//     cy.get('input[formcontrolname="email"]').type('agente@gmail.com')
//     cy.get('input[formcontrolname="password"]').type('123456')
//     cy.contains('button', 'Iniciar sesión').click();
//     cy.contains('Credenciales inválidas').should('be.visible');

//   });

// });

// describe('Asesor Ve vista 360 de un usuario', () => {
//   it('Should login the user Asesor Succesfully', () => {

//     // Asesor se Loggea Exitosamente
//     cy.visit('/');
//     cy.contains('button', 'Asesor').click();
//     cy.get('input[formcontrolname="email"]').type('agente@gmail.com');
//     cy.get('input[formcontrolname="password"]').type('123456');
//     cy.contains('button', 'Iniciar sesión').click();
//     cy.contains('Bienvenido').should('be.visible');

//     cy.get('button.btn-primary.rounded-pill').should('exist');
//     cy.get('button[data-bs-toggle="dropdown"]').should('exist');
//     cy.get('button[type="button"].btn-primary.rounded-pill').should('exist');
//     cy.get('button.btn-primary.rounded-pill i.fa-solid.fa-bars').should('exist');
//     cy.get('button.btn-primary.rounded-pill').first().click();
//     cy.get('.dropdown-menu').should('be.visible'); // Verifica que el menú desplegable es visible

//     // Verifica que cada opción existe en el menú
//     cy.contains('.dropdown-item', 'Listar PQR').should('be.visible');
//     cy.contains('.dropdown-item', 'Crear PQR').should('be.visible');
//     cy.contains('.dropdown-item', 'Consultar consumidor').should('be.visible');

//     // Haz clic en la opción "Consultar consumidor"
//     cy.contains('.dropdown-item', 'Consultar consumidor').click();
//     cy.wait(500); // Espera 500 milisegundos

//     cy.contains('button', 'Consultar').should('be.visible');
//     cy.contains('button', 'Regresar').should('be.visible');

//     // Verifica que el selector de "Tipo identificación" es visible
//     cy.get('select#identification_type').should('be.visible');

//     // Verifica que las opciones dentro del selector sean visibles
//     cy.get('select#identification_type option').should('have.length', 4);
//     cy.get('select#identification_type').contains('Cédula de ciudadanía').should('be.visible');
//     cy.get('select#identification_type').contains('Cédula de extranjería').should('be.visible');
//     cy.get('select#identification_type').contains('Tarjeta de identidad').should('be.visible');
//     cy.get('select#identification_type').contains('Pasaporte').should('be.visible');

//     // Verifica que el campo de texto "Numero identificación" es visible
//     cy.get('input#identification_number').should('be.visible');

//     // Verifica que el selector de "Tipo identificación" es visible y selecciona "Pasaporte"
//     cy.get('select#identification_type').should('be.visible').select('Pasaporte');

//     // Verifica que se ha seleccionado "Pasaporte"
//     cy.get('select#identification_type').should('have.value', 'Pasaporte');

//     // Ingresa el número "1234556" en el campo "Numero identificación"
//     cy.get('input#identification_number').should('be.visible').type('1234556');

//     // Verifica que el número fue ingresado correctamente
//     cy.get('input#identification_number').should('have.value', '1234556');

//     // Verifica que el botón "Consultar" esté habilitado
//     cy.get('button').contains('Consultar').should('be.enabled');

//     // Hace clic en el botón "Consultar"
//     cy.get('button').contains('Consultar').click();

//     // Verifica que el mensaje de error se muestra
//     cy.contains('Consumidor no encontrado').should('be.visible');

//     // Verifica que el número fue ingresado correctamente
//     cy.get('input#identification_number').should('be.visible').clear().type('9601063007');
//     cy.get('input#identification_number').should('have.value', '9601063007');

//     // Hace clic en el botón "Consultar"
//     cy.get('button').contains('Consultar').click();

//     // Verifica que la información del consumidor se muestra

//     cy.contains('Vista 360 de').should('be.visible');
//     cy.contains('Número de contacto').should('be.visible');
//     cy.contains('Dirección').should('be.visible');
//     cy.contains('Correo electrónico').should('be.visible');
//     cy.contains('Número de identificación').should('be.visible');
//     cy.contains('istado de PQRs reportados por el consumidor').should('be.visible');
//     cy.contains('Empresa').should('be.visible');

//     cy.contains('button', 'Regresar').should('be.visible');
//     cy.contains('button', 'Regresar').click()


//   });
// });


// describe('Asesor crea una PQR a un usuario', () => {
//   it('should create a PQR Succesfully', () => {

//     //Desde el menu principal
//     // Asesor se Loggea Exitosamente
//     cy.visit('/');
//     cy.contains('button', 'Asesor').click();
//     cy.get('input[formcontrolname="email"]').type('agente@gmail.com');
//     cy.get('input[formcontrolname="password"]').type('123456');
//     cy.contains('button', 'Iniciar sesión').click();
//     cy.contains('Bienvenido').should('be.visible');
//     cy.wait(200);
//     cy.get('button.btn-primary.rounded-pill').should('exist');
//     cy.get('button.btn-primary.rounded-pill').first().click();


//     // Haz clic en la opción "Consultar consumidor"
//     cy.contains('.dropdown-item', 'Crear PQR').click();
//     cy.wait(500); // Espera 500 milisegundos


//     cy.contains('button', 'Consultar').should('be.visible');
//     cy.contains('button', 'Regresar').should('be.visible');

//     // Verifica que el selector de "Tipo identificación" es visible
//     cy.get('select#identification_type').should('be.visible');

//     // Verifica que las opciones dentro del selector sean visibles
//     cy.get('select#identification_type option').should('have.length', 4);
//     cy.get('select#identification_type').contains('Cédula de ciudadanía').should('be.visible');
//     cy.get('select#identification_type').contains('Cédula de extranjería').should('be.visible');
//     cy.get('select#identification_type').contains('Tarjeta de identidad').should('be.visible');
//     cy.get('select#identification_type').contains('Pasaporte').should('be.visible');

//     // Verifica que el campo de texto "Numero identificación" es visible
//     cy.get('input#identification_number').should('be.visible');

//     // Verifica que el selector de "Tipo identificación" es visible y selecciona "Pasaporte"
//     cy.get('select#identification_type').should('be.visible').select('Pasaporte');

//     // Verifica que se ha seleccionado "Pasaporte"
//     cy.get('select#identification_type').should('have.value', 'Pasaporte');

//     // Ingresa el número "1234556" en el campo "Numero identificación"
//     cy.get('input#identification_number').should('be.visible').type('1234556');

//     // Hace clic en el botón "Consultar"
//     cy.get('button').contains('Consultar').click();

//     // Verifica que el mensaje de error se muestra
//     cy.contains('Consumidor no encontrado').should('be.visible');

//     // Verifica que el número fue ingresado correctamente
//     cy.get('input#identification_number').should('be.visible').clear().type('9601063007');
//     cy.get('input#identification_number').should('have.value', '9601063007');

//     // Hace clic en el botón "Consultar"
//     cy.get('button').contains('Consultar').click();

//     // se verifican elementos graficos propios de creacion de pqr

//     cy.contains('Crear PQR para').should('be.visible');
//     cy.contains('Número de contacto').should('be.visible');
//     cy.contains('Dirección').should('be.visible');
//     cy.contains('Correo electrónico').should('be.visible');
//     cy.contains('Número de identificación').should('be.visible');
//     cy.contains('Empresa').should('be.visible');

//     cy.contains('Asunto').should('be.visible');
//     cy.contains('Descripción').should('be.visible');
//     cy.contains('button', 'Regresar').should('be.visible');

//     // Verifica que el dropdown de compañías está visible
//     cy.get('select.form-select').should('be.visible');

//     // Verifica que el dropdown contiene opciones (compañías)
//     cy.get('select.form-select option').should('have.length.greaterThan', 0);

//     // Opcional: Verifica que el contenido de las opciones no esté vacío
//     cy.get('select.form-select option').each(($el) => {
//       cy.wrap($el).invoke('text').should('not.be.empty');
//     });

//     // Selecciona una compañía cualquiera (en este caso, selecciona la primera opción)
//     //cy.get('select#identification_type').should('be.visible').select('Pasaporte');

//     // Ingresa un asunto y una descripción
//     cy.get('textarea#description').type('Descripción de prueba');
//     cy.get('input#subject').type('Asunto de prueba');
//     cy.contains('La descripción debe tener al menos 100 caracteres').should('be.visible');

//     // Se ingresa una descripción con más de 200 caracteres
//     cy.get('textarea#description').clear().type('Descripción de prueba con más de 200 caracteres'.repeat(5));

//     // Se borra el asunto y aparece mensaje de error
//     cy.get('input#subject').clear();
//     cy.contains('Debe ingresar el asunto').should('be.visible');

//     // Se vuelve a ingresar un asunto
//     cy.get('input#subject').type('Asunto de prueba');

//     // Se verifica que el boton Crear PQR esté deshabilitado

//     cy.contains('button', 'Crear PQR').should('be.disabled');

//     // Se selecciona una empresa

//     cy.wait(3000);
//     cy.get('select.form-select').should('be.visible').select(0);
//     // Opcional: Verifica que una opción ha sido seleccionada
//     cy.get('select.form-select').should('not.have.value', '');

//     // Se verifica que el boton Crear PQR esté habilitado

//     cy.contains('button', 'Crear PQR').should('be.enabled');
//     // Se hace click en el boton crear pqr y se evidencia mensaje de exito
//     cy.contains('button', 'Crear PQR').click();
//     cy.contains('La PQR ha sido creada exitosamente').should('be.visible');
//   });

//   describe('Asesor ve listado de PQRs asignado a si mismo', () => {
//     it('should show list of PQRs', () => {

//       //Desde el menu principal
//       // Asesor se Loggea Exitosamente
//       cy.visit('/');
//       cy.contains('button', 'Asesor').click();
//       cy.get('input[formcontrolname="email"]').type('agente@gmail.com');
//       cy.get('input[formcontrolname="password"]').type('123456');
//       cy.contains('button', 'Iniciar sesión').click();
//       cy.wait(500);

//       // Asesor ve listado de PQRs asignado a si mismo

//       cy.get('.table-responsive').should('be.visible');

//       // Verifica que la tabla tenga las columnas correctas
//       cy.get('table thead tr').within(() => {
//       cy.contains('th', 'Estado').should('be.visible');
//       cy.contains('th', 'ID PQR').should('be.visible');
//       cy.contains('th', 'Asunto').should('be.visible');
//       cy.contains('th', 'ID Consumidor').should('be.visible');
//       cy.contains('th', 'Acciones').should('be.visible');
//       }
//       );
//     });
//   });

// });



//   describe('Asesor ve listado de PQRs asignado a si mismo', () => {
//     it('should show list of PQRs', () => {

//       //Desde el menu principal
//       // Asesor se Loggea Exitosamente
//       cy.visit('/');
//       cy.contains('button', 'Asesor').click();
//       cy.get('input[formcontrolname="email"]').type('agente@gmail.com');
//       cy.get('input[formcontrolname="password"]').type('123456');
//       cy.contains('button', 'Iniciar sesión').click();
//       cy.wait(500);

//       // Asesor ve listado de PQRs asignado a si mismo

//       cy.get('.table-responsive').should('be.visible');
//       cy.get('table tbody tr').should('have.length.at.least', 20);
//       // Verifica que la tabla tenga las columnas correctas
//       cy.get('table thead tr').within(() => {
//       cy.contains('th', 'Estado').should('be.visible');
//       cy.contains('th', 'ID PQR').should('be.visible');
//       cy.contains('th', 'Asunto').should('be.visible');
//       cy.contains('th', 'ID Consumidor').should('be.visible');
//       cy.contains('th', 'Acciones').should('be.visible');
//       });

//     });
//   });

// describe('Asesor crea PQR, y vuelve a la lista exitosamente. Nueva PQR no necesariamente debe aparecer en lista', () => {
//   it('should create a PQR', () => {

//     //Desde el menu principal
//     // Asesor se Loggea Exitosamente
//     cy.visit('/');
//     cy.contains('button', 'Asesor').click();
//     cy.get('input[formcontrolname="email"]').type('agente@gmail.com');
//     cy.get('input[formcontrolname="password"]').type('123456');
//     cy.contains('button', 'Iniciar sesión').click();

//     // Asesor crea PQR
//     cy.contains('Bienvenido').should('be.visible');
//     cy.wait(200);
//     cy.get('button.btn-primary.rounded-pill').should('exist');
//     cy.get('button.btn-primary.rounded-pill').first().click();
//     cy.contains('.dropdown-item', 'Crear PQR').click();
//     cy.wait(500); // Espera 500 milisegundos

//     cy.get('select#identification_type').should('be.visible').select('Pasaporte');

//     // Verifica que se ha seleccionado "Pasaporte"
//     cy.get('select#identification_type').should('have.value', 'Pasaporte');

//     cy.get('input#identification_number').should('be.visible').clear().type('9601063007');
//     cy.get('input#identification_number').should('have.value', '9601063007');

//     cy.get('button').contains('Consultar').click();

//     cy.get('textarea#description').clear().type('Descripción de prueba con más de 200 caracteres'.repeat(5));

//     cy.get('input#subject').type('Asunto de prueba');

//     cy.get('select.form-select').should('be.visible').select(0);

//     cy.contains('button', 'Crear PQR').should('be.enabled');
//     // Se hace click en el boton crear pqr y se evidencia mensaje de exito
//     cy.contains('button', 'Crear PQR').click();
//     cy.contains('La PQR ha sido creada exitosamente').should('be.visible');

//     // Asesor vuelve a la lista de PQRs

//     cy.get('button.btn-primary.rounded-pill').should('exist');
//     cy.get('button.btn-primary.rounded-pill').first().click();
//     cy.contains('.dropdown-item', 'Listar PQR').click();
//     cy.wait(500); // Espera 500 milisegundos

//     // Asesor ve listado de PQRs asignado a si mismo

//     cy.get('.table-responsive').should('be.visible');

//     // Verifica que la tabla tenga las columnas correctas
//     cy.get('table thead tr').within(() => {
//     cy.contains('th', 'Estado').should('be.visible');
//     cy.contains('th', 'ID PQR').should('be.visible');
//     cy.contains('th', 'Asunto').should('be.visible');
//     cy.contains('th', 'ID Consumidor').should('be.visible');
//     cy.contains('th', 'Acciones').should('be.visible');
//       });
//     cy.get('table tbody tr').should('have.length.at.least', 20);
//     });
//   });

//   describe('Asesor ve detalle de Usuario y vuelve a la lista', () => {
//     it('should show user details', () => {

//       //Desde el menu principal
//       // Asesor se Loggea Exitosamente
//       cy.visit('/');
//       cy.contains('button', 'Asesor').click();
//       cy.get('input[formcontrolname="email"]').type('agente@gmail.com');
//       cy.get('input[formcontrolname="password"]').type('123456');
//       cy.contains('button', 'Iniciar sesión').click();
//       cy.wait(500);

//       // Asesor ve detalle de Usuario

//       cy.get('button.btn-primary.rounded-pill').first().click();
//       cy.contains('.dropdown-item', 'Consultar consumidor').click();
//       cy.wait(500); // Espera 500 milisegundos

//       cy.get('select#identification_type').should('be.visible').select('Pasaporte');

//       // Verifica que se ha seleccionado "Pasaporte"
//       cy.get('select#identification_type').should('have.value', 'Pasaporte');

//       cy.get('input#identification_number').should('be.visible').clear().type('9601063007');

//       cy.get('button').contains('Consultar').click();

//       cy.contains('Vista 360 de').should('be.visible');
//       cy.contains('Número de contacto').should('be.visible');
//       cy.contains('Dirección').should('be.visible');
//       cy.contains('Correo electrónico').should('be.visible');
//       cy.contains('Número de identificación').should('be.visible');
//       cy.contains('istado de PQRs reportados por el consumidor').should('be.visible');
//       cy.contains('Empresa').should('be.visible');

//           // Asesor vuelve a la lista de PQRs

//     cy.get('button.btn-primary.rounded-pill').should('exist');
//     cy.get('button.btn-primary.rounded-pill').first().click();
//     cy.contains('.dropdown-item', 'Listar PQR').click();
//     cy.wait(500); // Espera 500 milisegundos

//     // Asesor ve listado de PQRs asignado a si mismo

//     cy.get('.table-responsive').should('be.visible');

//     // Verifica que la tabla tenga las columnas correctas
//     cy.get('table thead tr').within(() => {
//     cy.contains('th', 'Estado').should('be.visible');
//     cy.contains('th', 'ID PQR').should('be.visible');
//     cy.contains('th', 'Asunto').should('be.visible');
//     cy.contains('th', 'ID Consumidor').should('be.visible');
//     cy.contains('th', 'Acciones').should('be.visible');
//       });
//     cy.get('table tbody tr').should('have.length.at.least', 20);
//     });

//   });

//   describe('Asesor busca una PQR especifica con la barra de busqueda', () => {
//     //Desde el menu principal
//     // Asesor se Loggea Exitosamente

//     it('should search a PQR with the search bar', () => {
//       cy.visit('/');
//     cy.contains('button', 'Asesor').click();
//     cy.get('input[formcontrolname="email"]').type('agente@gmail.com');
//     cy.get('input[formcontrolname="password"]').type('123456');
//     cy.contains('button', 'Iniciar sesión').click();
//     cy.contains('Bienvenido').should('be.visible');
//     cy.wait(200);

//     cy.get('table tbody tr').should('have.length.at.least', 1);

//     cy.get('table tbody tr').then((rows) => {
//       const randomIndex = Math.floor(Math.random() * rows.length);
//       cy.wrap(rows[randomIndex]).find('td').eq(1).invoke('text').then((id) => {

//         // Pega el ID en el campo de búsqueda
//         cy.get('input[placeholder="Buscar"]').type(id);

//         // Verifica que se aplicó el filtro correctamente
//         cy.get('table tbody tr').should('have.length', 1);

//         // Verifica que el ID en la fila filtrada coincida con el ID buscado
//         cy.get('table tbody tr td').eq(1).should('have.text', id.trim());
//       });
//     });
//     });

//   });


//   describe('Asesor se cersiora de consistencia entre tablas de PQRs y Vista 360 de Usuario', () => {

//     let userId = '';
//     let userIdType = '';
//     let initialPqrIds = [];

//     it('should show user details', () => {

//       // Desde el menú principal
//       // Asesor se loggea exitosamente
//       cy.visit('/');
//       cy.contains('button', 'Asesor').click();
//       cy.get('input[formcontrolname="email"]').type('agente@gmail.com');
//       cy.get('input[formcontrolname="password"]').type('123456');
//       cy.contains('button', 'Iniciar sesión').click();
//       cy.wait(500);

//       cy.get('table tbody tr').should('have.length.at.least', 1);

//       for (let i = 0; i < 10; i++) {
//         // Selecciona una fila aleatoria y obtiene el ID del usuario y tipo de identificación
//         cy.get('table tbody tr').then((rows) => {
//           const randomIndex = Math.floor(Math.random() * rows.length);
//           let userId = '';
//           let userIdType = '';
//           let pqrId = '';

//           // Dentro de la fila aleatoria seleccionada, obtiene el ID y tipo de identificación del usuario
//           cy.wrap(rows[randomIndex]).within(() => {
//             cy.get('td').eq(3).invoke('text').then((text) => {
//               const splitText = text.trim().split(' ');
//               userIdType = splitText.slice(0, -1).join(' '); // Toma todo el tipo de identificación (sin el número)
//               userId = splitText.slice(-1)[0];
//             });

//             // Obtiene el ID de PQR de esa misma fila
//             cy.get('td').eq(1).invoke('text').then((id) => {
//               pqrId = id.trim();
//             });
//           }).then(() => {
//             // Navega a la página de detalles del usuario
//             cy.get('button.btn-primary.rounded-pill').first().click();
//             cy.contains('.dropdown-item', 'Consultar consumidor').click();
//             cy.wait(500);

//             // Selecciona el tipo de identificación y escribe el ID del usuario
//             cy.get('select#identification_type').should('be.visible').select(userIdType);
//             cy.get('input#identification_number').should('be.visible').clear().type(userId);
//             cy.get('button').contains('Consultar').click(); // Botón para buscar al usuario
//             cy.wait(500); // Espera a que se carguen los resultados de PQRs del usuario

//             // Verifica que el ID de PQR está en la lista de PQRs del usuario
//             cy.get('.list-group-item').should('contain.text', pqrId);

//             // vuelve a la lista de PQRS
//             cy.get('button.btn-primary.rounded-pill').first().click();
//             cy.contains('.dropdown-item', 'Listar PQR').click();
//             cy.wait(500);

//           });
//         });
//       }
//     });
//   });




