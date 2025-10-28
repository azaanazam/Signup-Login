    const signupForm = document.getElementById("signupForm");
    const loginForm = document.getElementById("loginForm");
    const toLoginBtn = document.getElementById("toLogin");
    const toSignupBtn = document.getElementById("toSignup");
    const formContainer = document.getElementById("formContainer");

    
    toLoginBtn.addEventListener("click", () => {
      signupForm.classList.add("hidden");
      loginForm.classList.remove("hidden");
    });
    toSignupBtn.addEventListener("click", () => {
      loginForm.classList.add("hidden");
      signupForm.classList.remove("hidden");
    });

    
    signupForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.getElementById("signupName").value;
      const email = document.getElementById("signupEmail").value;
      const password = document.getElementById("signupPassword").value;

      const userData = { name, email, password };
      localStorage.setItem(email, JSON.stringify(userData));

      
      emailjs.send(
        'service_56wr1tq',   
        'template_b4v7btp', 
        {
          user_name: name,
          user_email: email,
          message: `Welcome ${name}! Your account has been successfully created.`
        }
      ).then(
        () => {
          alert("Signup successful! Email sent");
        },
        (error) => {
          console.error("EmailJS error:", error);
          alert("Signup successful, but email could not be sent.");
        }
      );

      signupForm.reset();
      signupForm.classList.add("hidden");
      loginForm.classList.remove("hidden");
    });

    
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const email = document.getElementById("loginEmail").value;
      const password = document.getElementById("loginPassword").value;

      const storedUser = JSON.parse(localStorage.getItem(email));

      if (storedUser && storedUser.password === password) {
        document.body.style.background = "linear-gradient(135deg, #59f7fe 0%, #66a6ff 100%)";
        formContainer.innerHTML = `
          <div class="welcome-screen">
            <div class="welcome-text">Welcome to your page, <span class="user-name">${storedUser.name}</span>! </div>
            <div class="sub-text">We’re so happy to see you here </div>
          </div>
        `;
      } else {
        alert("Invalid Email or Password!");
      }
      loginForm.reset();
    });