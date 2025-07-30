<script>
let NameInput = document.querySelector(".nameInput");
  let EmailInput = document.querySelector(".emailInput");
  let PhoneInput = document.querySelector(".phoneInput");
  let PasswordInput = document.querySelector(".passInput");
  let Genrater = document.querySelector(".genLenghtInput");
  let rangeValue = document.querySelector("#rangeValue");
  let submitBtn = document.querySelector(".subBtn");

  // Track whether the password was manually typed
  let isTypedPassword = false;

  // Detect manual typing in password field
  PasswordInput.addEventListener("input", () => {
    isTypedPassword = true;
  });

  // Generate random password of selected length
  function genRadnd(sizePass) {
    let chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+~`|}{[]:;?><,./-=";
    let password = "";
    for (let i = 0; i < sizePass; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return password;
  }

  // Password regex validation function
  function checkPassword(password) {
    let passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,12}$/;
    return passwordRegex.test(password);
  }

  // Update range value and generate password
  Genrater.addEventListener("input", () => {
    rangeValue.innerHTML = Genrater.value;
    let llength = Genrater.value;
    let generatedPassword = genRadnd(llength);
    PasswordInput.value = generatedPassword;
    isTypedPassword = false; // Reset manual flag
  });

  // Email regex validation
  function CheckEmail() {
    let Emailval = EmailInput.value;
    let emailRegex = /^[a-zA-Z0-9]+@[a-z]+\.(com)$/;
    return emailRegex.test(Emailval);
  }

  // Validate function on submit
  function Validate() {
  let nameVal = NameInput.value;
  let phoneVal = PhoneInput.value;
  let Passvalu = PasswordInput.value;

  if (nameVal.length > 5) {
    if (CheckEmail()) {
      if (phoneVal.length === 11 && !isNaN(phoneVal)) {

        if (Passvalu.trim() === "") {
          Swal.fire({
            title: "Password Required!",
            text: "Please enter or generate a password before submitting.",
            icon: "error",
          });
          return;
        }

        // Check manually typed password against regex
        if (isTypedPassword && !checkPassword(Passvalu)) {
          Swal.fire({
            title: "Invalid Password!",
            text: "Typed password must be 8–12 characters and include uppercase, lowercase, number, and special character.",
            icon: "error",
          });
          return;
        }

        // All validations passed
        Swal.fire({
          title: "Success!",
          text: "Submitted Successfully",
          icon: "success",
        });

      } else {
        Swal.fire({
          title: "Phone number should be 11 digits",
          text: "Not Submitted",
          icon: "error",
        });
      }
    } else {
      Swal.fire({
        title: "Email is not Valid",
        text: "Not Submitted",
        icon: "error",
      });
    }
  } else {
    Swal.fire({
      title: "Name input is not Valid",
      text: "Not Submitted",
      icon: "error",
    });
  }
}


  // Handle submit
  submitBtn.addEventListener("click", (e) => {
    e.preventDefault();
    Validate();
    console.log("Button pressed");
  });
</script>
