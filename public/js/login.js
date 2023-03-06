function submitHandler(evt) {
  const form = evt.target;
  const data = new FormData(form);

  fetch(form.action, {
    method: form.method,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      login: data.get("login"),
      pass: data.get("pass"),
    }),
  })
    .then((res) => {
      if (res.status === 200) {
        return res.json();
      }
    })
    .then((res) => {
      if (res.bearer) {
        console.log(res);
        // console.log(window.location.href);
        // window.location.href = '';
        window.location.replace('webpay');
        // window.history.go(-1)
      }
    });
  evt.preventDefault();
}

document.addEventListener("submit", submitHandler);
