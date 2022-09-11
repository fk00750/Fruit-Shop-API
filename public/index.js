const form = document.getElementById("register_user");
const Username = document.getElementById("user");
const Email = document.getElementById("email");
const Password = document.getElementById("password");

const registerUser = async function (e) {
  e.preventDefault();

  const name = Username.value;
  const email = Email.value;
  const password = Password.value;

  const result = await fetch("/api/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      email,
      password,
    }),
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      console.log(data);
    });
};

form.addEventListener("submit", registerUser);
