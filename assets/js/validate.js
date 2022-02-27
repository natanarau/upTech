const fields = document.querySelectorAll('[required]');

function ValidateField(field) {
  // logica para verificar se existem erros
  function verifyErrors() {
    let foundError = false;

    for (let error in field.validity) {
      // se não for customError
      // então verifica se tem erro
      if (field.validity[error] && !field.validity.valid) {
        foundError = error;
      }
    }
    return foundError;
  }

  function customMessage(idError) {
    const messages = {
      name: {
        valueMissing: 'Por favor, preencha seu nome',
      },
      email: {
        valueMissing: 'Email é obrigatório',
        typeMismatch: 'Por favor, preencha um e-mail válido',
      },
      cpf: {
        valueMissing: 'CPF é Obrigatório',
        patternMismatch:
          'Padrão inválido para CPF, siga o padrão xxx.xxx.xxx-xx',
      },
      cvv: {
        valueMissing: 'CVV é Obrigatório',
        patternMismatch: 'Padrão inválido para CVV, siga o padrão numérico XXX',
      },
      flag: {
        valueMissing: 'A bandeira é obrigatória',
      },
      month: {
        valueMissing: 'Validade do cartão é obrigatório',
      },
    };
    return messages[field.id][idError];
  }

  function setCustomMessage(message) {
    const spanError = field.parentNode.querySelector('span.error');

    if (message) {
      spanError.classList.add('active');
      spanError.innerHTML = message;
    } else {
      spanError.classList.remove('active');
      spanError.innerHTML = '';
    }
  }

  return function () {
    const error = verifyErrors();

    if (error) {
      const message = customMessage(error);

      field.style.borderColor = 'red';
      setCustomMessage(message);
    } else {
      field.style.borderColor = 'green';
      setCustomMessage();
    }
  };
}

function customValidation(event) {
  const field = event.target;
  const validation = ValidateField(field);

  validation();
}

for (field of fields) {
  field.addEventListener('invalid', (event) => {
    // eliminar o bubble
    event.preventDefault();
    customValidation(event);
  });
  field.addEventListener('blur', customValidation);
}

document.querySelector('form').addEventListener('submit', (event) => {
  event.preventDefault();
});
