document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("form");
  if (form) {
      form.addEventListener("submit", function (e) {
          e.preventDefault();
          salvarInfo();
      });

      const salvarId = getParameterByName("id");
      if (salvarId) {
          populateForm(salvarId);
      }
  } else {
      displayRecords();
  }
});

function displayRecords() {
  const listaSalva = document.getElementById("lista-salva");
  listaSalva.innerHTML = "";

  for (let key in localStorage) {
      if (localStorage.hasOwnProperty(key)) {
          const salvar = JSON.parse(localStorage.getItem(key));

          const row = document.createElement("tr");
          row.innerHTML = `
              <td>${salvar.nome}</td>
              <td>${salvar.email}</td>
              <td>${salvar.status}</td>
              <td>
                  <button onclick="editRecord('${key}')">Editar</button>
                  <button onclick="deleteRecord('${key}')">Excluir</button>
              </td>
          `;

          listaSalva.appendChild(row);
      }
  }
}

function salvarInfo() {
  const nome = document.getElementById("nome").value;
  const email = document.getElementById("email").value;
  const senha = document.getElementById("senha").value;
  const status = document.getElementById("status").value;
  const salvarId = document.getElementById("salvar-id").value || Date.now().toString();

  const salvar = { nome, email, senha, status };
  localStorage.setItem(salvarId, JSON.stringify(salvar));

  window.location.href = "index.html";
}

function populateForm(salvarId) {
  const salvar = JSON.parse(localStorage.getItem(salvarId));
  document.getElementById("salvar-id").value = salvarId;
  document.getElementById("nome").value = salvar.nome;
  document.getElementById("email").value = salvar.email;
  document.getElementById("senha").value = salvar.senha;
  document.getElementById("status").value = salvar.status;
}

function editRecord(salvarId) {
  window.location.href = `form.html?id=${salvarId}`;
}

function deleteRecord(salvarId) {
  if (confirm("Tem certeza de que deseja excluir este registro?")) {
      localStorage.removeItem(salvarId);
      displayRecords();
  }
}

function getParameterByName(nome) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(nome);
}
