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

  describe('Asesor ve listado de PQRs asignado a si mismo', () => {
    it('should show list of PQRs', () => {

      //Desde el menu principal
      // Asesor se Loggea Exitosamente
      cy.visit('/');
      cy.contains('button', 'Asesor').click();
      cy.get('input[formcontrolname="email"]').type('agente@gmail.com');
      cy.get('input[formcontrolname="password"]').type('123456');
      cy.contains('button', 'Iniciar sesión').click();
      cy.wait(500);

      // Asesor ve listado de PQRs asignado a si mismo

      cy.get('.table-responsive').should('be.visible');

      // Verifica que la tabla tenga las columnas correctas
      cy.get('table thead tr').within(() => {
      cy.contains('th', 'Estado').should('be.visible');
      cy.contains('th', 'ID PQR').should('be.visible');
      cy.contains('th', 'Asunto').should('be.visible');
      cy.contains('th', 'ID Consumidor').should('be.visible');
      cy.contains('th', 'Acciones').should('be.visible');
      }
      );
    });
  });

});


describe('Asesor crea PQR, y vuelve a la lista exitosamente. Nueva PQR no necesariamente debe aparecer en lista', () => {
  it('should create a PQR', () => {

    //Desde el menu principal
    // Asesor se Loggea Exitosamente
    cy.visit('/');
    cy.contains('button', 'Asesor').click();
    cy.get('input[formcontrolname="email"]').type('agente@gmail.com');
    cy.get('input[formcontrolname="password"]').type('123456');
    cy.contains('button', 'Iniciar sesión').click();

    // Asesor crea PQR
    cy.contains('Bienvenido').should('be.visible');
    cy.wait(200);
    cy.get('button.btn-primary.rounded-pill').should('exist');
    cy.get('button.btn-primary.rounded-pill').first().click();
    cy.contains('.dropdown-item', 'Crear PQR').click();
    cy.wait(500); // Espera 500 milisegundos

    cy.get('select#identification_type').should('be.visible').select('Pasaporte');

    // Verifica que se ha seleccionado "Pasaporte"
    cy.get('select#identification_type').should('have.value', 'Pasaporte');

    cy.get('input#identification_number').should('be.visible').clear().type('9601063007');
    cy.get('input#identification_number').should('have.value', '9601063007');

    cy.get('button').contains('Consultar').click();

    cy.get('textarea#description').clear().type('Descripción de prueba con más de 200 caracteres'.repeat(5));

    cy.get('input#subject').type('Asunto de prueba');

    cy.get('select.form-select').should('be.visible').select(0);

    cy.contains('button', 'Crear PQR').should('be.enabled');
    // Se hace click en el boton crear pqr y se evidencia mensaje de exito
    cy.contains('button', 'Crear PQR').click();
    cy.contains('La PQR ha sido creada exitosamente').should('be.visible');

    // Asesor vuelve a la lista de PQRs

    cy.get('button.btn-primary.rounded-pill').should('exist');
    cy.get('button.btn-primary.rounded-pill').first().click();
    cy.contains('.dropdown-item', 'Listar PQR').click();
    cy.wait(3000); // Espera 500 milisegundos

    // Asesor ve listado de PQRs asignado a si mismo

    cy.get('.table-responsive').should('be.visible');

    // Verifica que la tabla tenga las columnas correctas
    cy.get('table thead tr').within(() => {
    cy.contains('th', 'Estado').should('be.visible');
    cy.contains('th', 'ID PQR').should('be.visible');
    cy.contains('th', 'Asunto').should('be.visible');
    cy.contains('th', 'ID Consumidor').should('be.visible');
    cy.contains('th', 'Acciones').should('be.visible');
      });
    cy.get('table tbody tr').should('have.length.at.least', 20);
    });
  });

  describe('Asesor ve detalle de Usuario y vuelve a la lista', () => {
    it('should show user details', () => {

      //Desde el menu principal
      // Asesor se Loggea Exitosamente
      cy.visit('/');
      cy.contains('button', 'Asesor').click();
      cy.get('input[formcontrolname="email"]').type('agente@gmail.com');
      cy.get('input[formcontrolname="password"]').type('123456');
      cy.contains('button', 'Iniciar sesión').click();
      cy.wait(500);

      // Asesor ve detalle de Usuario

      cy.get('button.btn-primary.rounded-pill').first().click();
      cy.contains('.dropdown-item', 'Consultar consumidor').click();
      cy.wait(500); // Espera 500 milisegundos

      cy.get('select#identification_type').should('be.visible').select('Pasaporte');

      // Verifica que se ha seleccionado "Pasaporte"
      cy.get('select#identification_type').should('have.value', 'Pasaporte');

      cy.get('input#identification_number').should('be.visible').clear().type('9601063007');

      cy.get('button').contains('Consultar').click();

      cy.contains('Vista 360 de').should('be.visible');
      cy.contains('Número de contacto').should('be.visible');
      cy.contains('Dirección').should('be.visible');
      cy.contains('Correo electrónico').should('be.visible');
      cy.contains('Número de identificación').should('be.visible');
      cy.contains('istado de PQRs reportados por el consumidor').should('be.visible');
      cy.contains('Empresa').should('be.visible');

          // Asesor vuelve a la lista de PQRs

    cy.get('button.btn-primary.rounded-pill').should('exist');
    cy.get('button.btn-primary.rounded-pill').first().click();
    cy.contains('.dropdown-item', 'Listar PQR').click();
    cy.wait(3000); // Espera 500 milisegundos

    // Asesor ve listado de PQRs asignado a si mismo

    cy.get('.table-responsive').should('be.visible');

    // Verifica que la tabla tenga las columnas correctas
    cy.get('table thead tr').within(() => {
    cy.contains('th', 'Estado').should('be.visible');
    cy.contains('th', 'ID PQR').should('be.visible');
    cy.contains('th', 'Asunto').should('be.visible');
    cy.contains('th', 'ID Consumidor').should('be.visible');
    cy.contains('th', 'Acciones').should('be.visible');
      });
    cy.get('table tbody tr').should('have.length.at.least', 20);
    });

  });

  describe('Asesor busca una PQR especifica con la barra de busqueda', () => {
    //Desde el menu principal
    // Asesor se Loggea Exitosamente

    it('should search a PQR with the search bar', () => {
      cy.visit('/');
    cy.contains('button', 'Asesor').click();
    cy.get('input[formcontrolname="email"]').type('agente@gmail.com');
    cy.get('input[formcontrolname="password"]').type('123456');
    cy.contains('button', 'Iniciar sesión').click();
    cy.contains('Bienvenido').should('be.visible');
    cy.wait(200);

    cy.get('table tbody tr').should('have.length.at.least', 1);

    cy.get('table tbody tr').then((rows) => {
      const randomIndex = Math.floor(Math.random() * rows.length);
      cy.wrap(rows[randomIndex]).find('td').eq(1).invoke('text').then((id) => {

        // Pega el ID en el campo de búsqueda
        cy.get('input[placeholder="Buscar"]').type(id);

        // Verifica que se aplicó el filtro correctamente
        cy.get('table tbody tr').should('have.length', 1);

        // Verifica que el ID en la fila filtrada coincida con el ID buscado
        cy.get('table tbody tr td').eq(1).should('have.text', id.trim());
      });
    });
    });

  });


  describe('Asesor verifica consistencia entre tablas de PQRs y Vista 360 de Usuario', () => {

    let userId = '';
    let userIdType = '';
    let initialPqrIds = [];

    it('should show user details', () => {

      // Desde el menú principal
      // Asesor se loggea exitosamente
      cy.visit('/');
      cy.contains('button', 'Asesor').click();
      cy.get('input[formcontrolname="email"]').type('agente@gmail.com');
      cy.get('input[formcontrolname="password"]').type('123456');
      cy.contains('button', 'Iniciar sesión').click();
      cy.wait(500);

      cy.get('table tbody tr').should('have.length.at.least', 1);

      for (let i = 0; i < 3; i++) {
        // Selecciona una fila aleatoria y obtiene el ID del usuario y tipo de identificación
        cy.get('table tbody tr').then((rows) => {
          const randomIndex = Math.floor(Math.random() * rows.length);
          let userId = '';
          let userIdType = '';
          let pqrId = '';

          // Dentro de la fila aleatoria seleccionada, obtiene el ID y tipo de identificación del usuario
          cy.wrap(rows[randomIndex]).within(() => {
            cy.get('td').eq(3).invoke('text').then((text) => {
              const splitText = text.trim().split(' ');
              userIdType = splitText.slice(0, -1).join(' '); // Toma todo el tipo de identificación (sin el número)
              userId = splitText.slice(-1)[0];
            });

            // Obtiene el ID de PQR de esa misma fila
            cy.get('td').eq(1).invoke('text').then((id) => {
              pqrId = id.trim();
            });
          }).then(() => {
            // Navega a la página de detalles del usuario
            cy.get('button.btn-primary.rounded-pill').first().click();
            cy.contains('.dropdown-item', 'Consultar consumidor').click();
            cy.wait(500);

            // Selecciona el tipo de identificación y escribe el ID del usuario
            cy.get('select#identification_type').should('be.visible').select(userIdType);
            cy.get('input#identification_number').should('be.visible').clear().type(userId);
            cy.get('button').contains('Consultar').click(); // Botón para buscar al usuario
            cy.wait(4000); // Espera a que se carguen los resultados de PQRs del usuario

            // Verifica que el ID de PQR está en la lista de PQRs del usuario
            cy.get('.list-group-item').should('contain.text', pqrId);

            // vuelve a la lista de PQRS
            cy.get('button.btn-primary.rounded-pill').first().click();
            cy.contains('.dropdown-item', 'Listar PQR').click();
            cy.wait(1000);

          });
        });
      }
    });
  });


describe('Asesor ve detalle de PCC al azar', () => {
  it('should display the detail of a randomly selected PCC', () => {
    let pccId = '';
    let pccSubject = '';
    // Asesor se loggea exitosamente
    cy.visit('/');
    cy.contains('button', 'Asesor').click();
    cy.get('input[formcontrolname="email"]').type('agente@gmail.com');
    cy.get('input[formcontrolname="password"]').type('123456');
    cy.contains('button', 'Iniciar sesión').click();
    cy.wait(1000); // Espera a que cargue la tabla de PQRs/PCCs

    // Verifica que la tabla de PQRs está visible y tiene al menos una fila
    cy.get('.table-responsive').should('be.visible');
    cy.get('table tbody tr').should('have.length.at.least', 1);

    // Selecciona una PCC al azar de la tabla
    cy.get('table tbody tr').then((rows) => {
      const randomIndex = Math.floor(Math.random() * rows.length);
      const selectedRow = cy.wrap(rows[randomIndex]);

      // Dentro de la fila seleccionada, obtenemos el ID de la PCC y hacemos clic en el botón de detalle
      selectedRow.within(() => {
        cy.get('td').eq(2).invoke('text').then((subject) => { // Ajusta `eq(2)` según la posición de la columna
          pccSubject = subject.trim();
          console.log(pccSubject);
        });
        // Guarda el ID de la PCC para verificarlo en la página de detalle
        cy.get('td').eq(1).invoke('text').then((id) => {
          pccId = id.trim();
        });
        // Asegura que el botón de detalle está visible antes de hacer clic
        cy.get('button.btn.btn-primary.btn-sm.rounded-pill').should('be.visible').click();

        // Verifica que estamos en la página de detalles de la PCC y que muestra la información correcta
        cy.url().should('include', `/pcc-detail/${pccId}`);
      });
    });
    cy.contains(`PQR_${pccId.split('-')[0]}`).should('be.visible');
    cy.contains('button', 'Editar PQR').should('be.visible');
    cy.contains('button', 'Regresar').should('be.visible');
    cy.contains('Estado').should('be.visible');
    cy.contains('Descripción').should('be.visible');
    cy.contains('Consumidor').should('be.visible');
    cy.contains('Empresa').should('be.visible');
    cy.wait(2000);

    cy.contains('button', 'Regresar').should('be.visible').click();
    cy.url().should('include', `/pcc-list`);

  });
});

// e2e tests for updating a Pcc
describe('Update Pcc', () => {
  it('Visits the initial project page', () => {
    cy.visit('/')
    cy.contains('ABCall')
    cy.contains('Iniciar sesión como:')
    cy.contains('Empresa')
    cy.contains('Asesor')
  })

  it('should display the detail of a randomly selected PCC', () => {
    let pccId = '';
    let pccSubject = '';
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

      // Dentro de la fila seleccionada, obtenemos el ID de la PCC y hacemos clic en el botón de detalle
      selectedRow.within(() => {
        cy.get('td').eq(2).invoke('text').then((subject) => { // Ajusta `eq(2)` según la posición de la columna
          pccSubject = subject.trim();
          console.log(pccSubject);
        });
        // Guarda el ID de la PCC para verificarlo en la página de detalle
        cy.get('td').eq(1).invoke('text').then((id) => {
          pccId = id.trim();
        });
        // Asegura que el botón de detalle está visible antes de hacer clic
        cy.get('button.btn.btn-primary.btn-sm.rounded-pill').should('be.visible').click();

        // Verifica que estamos en la página de detalles de la PCC y que muestra la información correcta
        cy.url().should('include', `/pcc-detail/${pccId}`);

      });
    });
    cy.contains(`PQR_${pccId.split('-')[0]}`).should('be.visible');

    cy.contains('button', 'Regresar').should('be.visible');
    cy.contains('Estado').should('be.visible');
    cy.contains('Descripción').should('be.visible');
    cy.contains('Consumidor').should('be.visible');
    cy.contains('Empresa').should('be.visible');
    cy.wait(200);
    cy.contains('button', 'Editar PQR').should('be.visible').click();
    cy.wait(200);

    cy.contains('label', 'Razón de modificación de PQR').should('be.visible');
    cy.get('textarea[formcontrolname="reason"]').should('be.visible');

    cy.get('textarea[formcontrolname="reason"]').type('Short');
    cy.get('textarea[formcontrolname="reason"]').blur();
    // Check for the minlength error message
    cy.contains('La razon debe tener al menos 8 caracteres').should('be.visible');
    cy.get('textarea[formcontrolname="reason"]').clear();
    // Step 5: Test the "maxlength" validation
    // Input text longer than 1000 characters
    const longText = 'A'.repeat(1001);
    cy.get('textarea[formcontrolname="reason"]').clear().type(longText);

    // Check for the maxlength error message
    cy.contains('La razon debe tener maximo 1000 caracteres').should('be.visible');

    cy.get('textarea[formcontrolname="reason"]').clear();
    cy.get('textarea[formcontrolname="reason"]').blur();
    cy.contains('Por favor, ingrese la Razón por la cual se modifica la PQR').should('be.visible');


    // boton Guardar Cambios debe aparecer no valido
    cy.contains('button', 'Guardar Cambios').should('be.disabled');

    // Input text with 1000 characters
    const validText = 'A'.repeat(10);
    cy.get('textarea[formcontrolname="reason"]').clear().type(validText);

    cy.contains('button', 'Guardar Cambios').should('be.disabled');

    cy.contains('label', 'Nuevo Estado').should('be.visible');
    cy.get('select[formcontrolname="status"]').should('be.visible');

    cy.get('select[formcontrolname="status"] option').should('have.length', 5);

    cy.get('select[formcontrolname="status"]').contains('Pendiente por documentación').should('be.visible');
    cy.get('select[formcontrolname="status"]').contains('En revisión').should('be.visible');
    cy.get('select[formcontrolname="status"]').contains('Cerrada con solución').should('be.visible');
    cy.get('select[formcontrolname="status"]').contains('Cerrada sin solución').should('be.visible');

    // Focus on the select field
    cy.get('select[formcontrolname="status"]').focus();

    // Blur the select field to trigger validation
    cy.get('select[formcontrolname="status"]').blur();

    // Check for the required error message
    cy.contains('Estado requerido').should('be.visible');

    cy.contains('button', 'Guardar Cambios').should('be.disabled');

    // Select the first option
    cy.get('select[formcontrolname="status"]').select('Pendiente por documentación');

    cy.contains('button', 'Guardar Cambios').should('be.enabled');
    cy.contains('button', 'Regresar').should('be.visible');

    cy.contains('button', 'Guardar Cambios').click();


    // verificar mensaje de exito
    cy.contains('La PQR ha sido Editada exitosamente').should('be.visible');

    cy.contains('button', 'Guardar Cambios').should('be.disabled');

    // verificar que campos estan vacios
    cy.get('textarea[formcontrolname="reason"]').should('have.value', '');
    cy.get('select[formcontrolname="status"]').should('have.value', null);

    cy.contains('button', 'Regresar').should('be.visible');
    cy.contains('button', 'Regresar').click();

    cy.url().should('include', `/pcc-list`);
  });

})


describe('Representante de Empresa ve reporte', () => {

  it('Should login the user Empresa Succesfully', () => {

    // Empresa se Loggea Exitosamente
    cy.visit('/');
    cy.contains('button', 'Empresa').click();
    cy.get('input[formcontrolname="email"]').type('Maymie_Wyman@gmail.com');
    cy.get('input[formcontrolname="password"]').type('123456');
    cy.contains('button', 'Iniciar sesión').click();
    cy.contains('Bienvenido').should('be.visible');

    cy.wait(500);
    cy.contains('Grafica Estados PQR Por Mes').should('be.visible');

    // Paso 3: Verificar los filtros de fechas
    cy.wait(500);
    cy.get('input#fromDate[type="date"]').should('be.visible');
    cy.get('input#toDate[type="date"]').should('be.visible');
    cy.contains('label', 'Desde').should('be.visible');
    cy.contains('label', 'Hasta').should('be.visible');


    // Paso 4: Verificar la gráfica
    cy.wait(500);
  cy.get('canvas[basechart]').should('be.visible');
  cy.contains('h3', 'Grafica Estados PQR Por Mes').should('be.visible');

  // Paso 5: Verificar la tabla
  cy.wait(500);
  cy.get('.table-responsive').should('be.visible');
  cy.get('table.table.table-dark.table-hover.align-middle.text-center').within(() => {
    // Verificar los encabezados de la tabla
    cy.get('thead').within(() => {
      cy.get('th').eq(0).should('contain', 'Estado');
      cy.get('th').eq(1).should('contain', 'ID PQR');
      cy.get('th').eq(2).should('contain', 'Asunto');
      cy.get('th').eq(3).should('contain', 'ID Consumidor');
      cy.get('th').eq(4).should('contain', 'Acciones');
    });

    // Verificar que hay al menos una fila en el cuerpo de la tabla
    cy.get('tbody tr').should('have.length.at.least', 1);

    // Opcional: Verificar el contenido de la primera fila
    cy.get('tbody tr').first().within(() => {
      cy.get('td').should('have.length', 5);
    });

    // Paso 6: Verificar que el botón de detalle está presente en las acciones
    cy.wait(500);
        cy.get('tbody tr').each(($row) => {
          cy.wrap($row).find('td').last().within(() => {
            cy.get('button.btn.btn-primary.btn-sm.rounded-pill').should('be.visible');
          });
        });



      });

       // Step 5: Select a random row and click on the "Detalle" button

       cy.wait(500);
    cy.get('table.table tbody tr').then(($rows) => {
      const rowCount = $rows.length;
      const randomIndex = Math.floor(Math.random() * rowCount);
      const selectedRow = cy.wrap($rows[randomIndex]);

      selectedRow.within(() => {
        cy.get('button.btn.btn-primary.btn-sm.rounded-pill').should('be.visible').click();
      })



    });


    cy.wait(500);
    cy.contains('Descripción').should('be.visible');
    cy.contains('Estado del PQR').should('be.visible');
    cy.contains('Empresa').should('be.visible');
    cy.contains('Consumidor').should('be.visible');
    cy.contains('Notificaciones').should('be.visible');
    cy.contains('Correo electrónico').should('be.visible');

    cy.contains('button', 'Regresar').should('be.visible').click();





      // Ingresar las fechas en los campos correspondientes
      // Generar dos fechas aleatorias

     const startDate = randomDate(new Date(2020, 0, 1), new Date());
     const endDate = randomDate(startDate, new Date());

     // Formatear las fechas en 'YYYY-MM-DD'
     const formatDate = (date: Date) => date.toISOString().split('T')[0];

     const formattedStartDate = formatDate(startDate);
     const formattedEndDate = formatDate(endDate);


     cy.get('input#fromDate[type="date"]').should('be.visible');
     cy.get('input#toDate[type="date"]').should('be.visible');
     cy.wait(500);
     cy.get('input#fromDate[type="date"]').clear().type(formattedStartDate);
     cy.get('input#toDate[type="date"]').clear().type(formattedEndDate);
     cy.wait(500);

     cy.contains('Grafica Estados PQR Por Mes').should('be.visible');


     cy.get('input#fromDate[type="date"]').clear().type(formattedEndDate);
     cy.get('input#toDate[type="date"]').clear().type(formattedStartDate);


     cy.wait(500);

     cy.contains('Grafica Estados PQR Por Mes').should('be.visible');

     // Paso 5: Verificar la tabla
     cy.wait(500);
  cy.get('.table-responsive').should('be.visible');
  cy.get('table.table.table-dark.table-hover.align-middle.text-center').within(() => {
    // Verificar los encabezados de la tabla
    cy.get('thead').within(() => {
      cy.get('th').eq(0).should('contain', 'Estado');
      cy.get('th').eq(1).should('contain', 'ID PQR');
      cy.get('th').eq(2).should('contain', 'Asunto');
      cy.get('th').eq(3).should('contain', 'ID Consumidor');
      cy.get('th').eq(4).should('contain', 'Acciones');
    });

    // Verificar que hay al menos una fila en el cuerpo de la tabla
    cy.get('tbody tr').should('have.length', 0);



    });
    cy.wait(500);
    cy.get('input#fromDate[type="date"]').clear()
    cy.get('input#toDate[type="date"]').clear()

     cy.get('input#fromDate[type="date"]').should('be.visible');
     cy.get('input#toDate[type="date"]').should('be.visible');
     cy.wait(500);
     cy.get('input#fromDate[type="date"]').clear().type(formattedStartDate);
     cy.get('input#toDate[type="date"]').clear().type(formattedEndDate);



  });
  });

  // Función para generar una fecha aleatoria entre dos fechas
function randomDate(start: Date, end: Date) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}
