// Pegando todos os campos com required
const fields = document.querySelectorAll('[required]');

function ValidateField(field) {
  // Varificar se existe erros
  function verifyErrors() {
    let foundError = false;
    for (let error in field.validity) {
      if (field.validity[error] && !field.validity.valid) {
        foundError = error;
      }
    }
    return foundError;
  }

  // Mensagens de erros personalizados de acordo com o ID do campo que tem required
  function customMessage(idError) {
    const messages = {
      name: {
        valueMissing: 'Por favor, preencha seu nome.',
      },
      email: {
        valueMissing: 'Email é obrigatório.',
        typeMismatch: 'Por favor, preencha um e-mail válido.',
      },
      cpf: {
        valueMissing: 'CPF é Obrigatório.',
        patternMismatch:
          'Padrão inválido para CPF, siga o padrão xxx.xxx.xxx-xx.',
      },
      cvv: {
        valueMissing: 'CVV é Obrigatório.',
        patternMismatch:
          'Padrão inválido para CVV, siga o padrão numérico XXX.',
      },
      flag: {
        valueMissing: 'A bandeira é obrigatória.',
      },
      month: {
        valueMissing: 'Validade do cartão é obrigatório.',
      },
      amount: {
        valueMissing: 'Campo obrigatório',
        rangeUnderflow: 'Você precisa ter pelo menos 1 produto.',
        rangeOverflow: 'Você só pode ter no máximo 99 produtos.',
      },
    };
    console.log();
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
    // Se existir erro de padronização ou campo vazio
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

// Submit de formlário
document.querySelector('form').addEventListener('submit', (event) => {
  event.preventDefault();

  // Quando enviar formulario válido mostrar alert de sucesso
  const confirmed = document.querySelector('span.confirmed');
  const menConfirmed = '<b>Parabens!</b> Seu pedido foi confirmado.';

  confirmed.classList.add('active');
  confirmed.innerHTML = menConfirmed;

  // Esperar 5 segundo para fechar o alert
  setTimeout(() => {
    confirmed.classList.remove('active');
    confirmed.innerHTML = '';
  }, 5000);
});
