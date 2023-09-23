const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const password2 = document.getElementById("password2");

// Show input message error
function showError(input, message){
    const formControl = input.parentElement;
    formControl.className = "form-control error";
    const small = formControl.querySelector("small");
    small.innerText = message;
}

// show success outline
function showSuccess(input){
    const formControl = input.parentElement;
    formControl.className = "form-control success";
}

// check email is valid
function checkEmail(input){
    const isValid = String(input.value.trim()).toLowerCase().match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
    if(input.value !== ""){
        if(isValid){
            showSuccess(input);
        }else {
            showError(input, "Email is not valid");
        }
    }
}

// check required field
function checkRequired(inputArr){
    inputArr.forEach(function(input) {
        if(input.value === ""){
            showError(input, `${getFieldName(input)} is required`);
        }else {
            showSuccess(input);
        }
    });
}
// check length
function checkLength(input, min, max){
    if(input.value.length < min){
        showError(input, `${getFieldName(input)} must be atleast ${min} characters`);
    }else if(input.value.length > max){
        showError(input, `${getFieldName(input)} must be less than ${max} characters`);
    }else {
        showSuccess(input);
    }
}

// check passwords Match
function checkPasswordMatch(input1, input2){
    if(input2.value !== "" && input1.value !== input2.value){
        showError(input2, "Password do not match");
    }
}
// get field name
function getFieldName(input){
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

// Event Listeners
form.addEventListener("submit", function(e){
    e.preventDefault();

    checkRequired([username, email, password, password2]);
    checkLength(username, 3, 15);
    checkLength(password, 6, 25);
    checkEmail(email);
    checkPasswordMatch(password, password2);
});