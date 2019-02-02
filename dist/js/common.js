
  let form = document.querySelector('form');
  let inputBlocks = form.querySelectorAll('[data-role="input-block"]');
  let valid = true;

  const errorMessage = {
    required: 'This field is required',
    badText: 'Field shouldn\'t contain quotes',
    email: 'Please enter correct email'
  }
  
  function isEmpty(str) {
    return (str !== 0 && !str || /^\s*$/.test(str));
  };

  function isBadText(str) {
    return (str.includes('"') || str.includes("'"));
  };

  function isEmail(str) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(str);
  };

 

  function validate(field) {
    const {value, required, validation} = field;
    const validationResult = {
      valid: true,
      error: ''
    }

    if (required && isEmpty(value)) {
      validationResult.valid = false;
      validationResult.error = errorMessage.required;
    }

    if (validationResult.valid && validation && !isEmpty(value)) {
        switch (validation) {
          case 'text': {
            if (isBadText(value)) {
              validationResult.valid = false;
              validationResult.error = errorMessage.badText;
            }
            break;
          }
          case 'email': {
            if (!isEmail(value)) {
              validationResult.valid = false;
              validationResult.error = errorMessage.email;
            }
            break;
          }
          defaul: {
            console.log('This field can\'t be validated');
          }
        }
    }

    return validationResult;

  }

  form.addEventListener('submit', function (event) {
    event.preventDefault();
    
    
    for (var i = 0; i < inputBlocks.length; i++) {
      const inputBlock = inputBlocks[i];
      const input = inputBlock.querySelector('[data-role="input"]');
      const error = inputBlock.querySelector('[data-role="error"]');
      const label = inputBlock.querySelector('[data-role="label"]');
      let validationResult = {
        valid: true,
        error: ''
      };
      
      let {validation, type, required} = inputBlock.dataset;

      if (type === 'radio') {
        const inputs = Array.from(inputBlock.querySelectorAll('[data-role="input"]'));
        validationResult.valid = inputs.filter(function(radio) {return radio.checked}).length > 0;
        validationResult.error = validationResult.valid ? '' : errorMessage.required;
      } else {
        const field = {
          value: input.value,
          validation,
          required
        }
        validationResult = validate(field);
      }

      inputBlock.classList.toggle('invalid', !validationResult.valid);
      error.innerHTML = validationResult.error;

      if (!validationResult.valid) {
        valid = false;
      }

    }
    if (valid) {
      alert('Congratulations. Form has been sent.')
    }
  });
