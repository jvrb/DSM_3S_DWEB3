const API_URL = "/pessoas"
const createPeople = document.getElementById("createPeopleForm")
const listCliente = document.getElementById("listCliente")

async function loadClientes() {
    const res = await fetch(API_URL)
    const clientes = await res.json()

    listCliente.innerHTML = ""
    clientes.forEach(cliente => {
        const li = document.createElement("li")
        li.innerHTML = `
            <div class="card">
                <div class="cardHeader">
                    <span>Nome:</span><strong>${cliente.nome}</strong>
                </div>
                <div class="cardBody">
                    <p>
                </div>
            </div>
        `
        listCliente.appendChild(li)

    });
    console.log(clientes)
}

loadClientes()