
  let form = document.querySelector('form');
  let inputBlocks = form.querySelectorAll('[data-role="input-block"]');
  let errors = form.querySelectorAll('.error');
  let labels = form.querySelectorAll('label');


  
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
    
    
    for (var i = 0; i < inputBlocks.length; i++) {

      function notRequired() {
        errors[i].innerHTML = 'This field is required';
        input.classList.add('invalid');
        labels[i].classList.add('error');
      };

      function removeError() {
        errors[i].innerHTML = '';
        input.classList.remove('invalid');
        labels[i].classList.remove('error');
      };

      const input = inputBlocks[i].querySelector('input');
      const inputs = inputBlocks[i].querySelectorAll('input');
      const options = inputBlocks[i].querySelectorAll('option');
      let atr = inputBlocks[i].getAttribute('data-validation');

        switch(atr) {
          case 'text':
          if (isEmpty(input.value)) {
            notRequired();
          }else if(isBadText(input.value)) {
            errors[i].innerHTML = 'This text is not valid';
            input.classList.add('invalid');
            labels[i].classList.add('error');
          } else {
            removeError()
          }
          break;

          case 'email':
          if (!isEmail(input.value)) {
            errors[i].innerHTML = 'This email is not valid';
            input.classList.add('invalid');
            labels[i].classList.add('error');
          };

          if (isEmpty(input.value)) {
            notRequired();
          } else if(isEmail(input.value)){
            removeError()
          }
          break;

          case 'radio':
            if(inputs[0].checked == false && inputs[1].checked == false) {
              notRequired();
            } else {
              removeError()
            }

          break;

          case 'country':
            if(options.selectedIndex == 0){
              console.log('country 0')
            } else {
              removeError()
            }
            break;
        };


    }
  });
