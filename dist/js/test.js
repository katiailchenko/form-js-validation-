
  let form = document.querySelector('form');
  let inputs = form.querySelectorAll('input');
  let errors = form.querySelectorAll('.error');
  let labels = form.querySelectorAll('label, p');
  let inputBlocks = form.querySelectorAll('[data-role="input-block"]');

  
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



  form.addEventListener('submit', function (event) {
    event.preventDefault();
  
    for (var i = 0; i < inputs.length; i++) {
      function notRequired() {
        errors[i].innerHTML = 'This field is required';
        inputs[i].classList.add('invalid');
        labels[i].classList.add('error');
      };

      function removeError() {
        errors[i].innerHTML = '';
        inputs[i].classList.remove('invalid');
        labels[i].classList.remove('error');
      };

      let atr = inputs[i].getAttribute('data-validation');

        switch(atr) {
          case 'text':
          if (isEmpty(inputs[i].value)) {
            notRequired();
          }else if(isBadText(inputs[i].value)) {
            errors[i].innerHTML = 'This text is not valid';
            inputs[i].classList.add('invalid');
            labels[i].classList.add('error');
          } else {
            removeError()
          }
          break;

          case 'email':
          if (!isEmail(inputs[i].value)) {
            errors[i].innerHTML = 'This email is not valid';
            inputs[i].classList.add('invalid');
            labels[i].classList.add('error');
          };

          if (isEmpty(inputs[i].value)) {
            notRequired();
          } else if(isEmail(inputs[i].value)){
            removeError()
          }
          break;

          case 'radio':
            if(inputs[i].checked == false && inputs[i+1].checked == false) {
              notRequired();
            } else {
              removeError()
            }

          break;

          // case 'country':

          // break;
        };


    }
  });
