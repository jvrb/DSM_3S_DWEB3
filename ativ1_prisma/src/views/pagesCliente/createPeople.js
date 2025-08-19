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
                    <class="bodyLeft">
                        <p><span>Email:</span>${cliente.email}</p>
                        ${cliente.telefone.map((element) => `<p><span>Telefone: </span>${element.numero}</p>`).join("")}        
                    </div> 
                    <class="bodyRight">
                        <button onclick="editarCliente(${cliente.id})">Editar</button>   
                        <button onclick="deleteCliente(${cliente.id})">Excluir</button>      
                    </div> 
                </div>
            </div>
        `
        listCliente.appendChild(li)

    });
    console.log(clientes)
}

createPeople.addEventListener("submit", async (e) => {
    e.preventDefault()

    const nome = document.getElementById("nome").value
    const email = document.getElementById("email").value
    const telefone = document.getElementById("telefone").value

    // console.log(`${nome.value}, ${email.value}, ${telefone.value}`) //debug
    await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome, email, telefone })
    })

    createPeople.reset()
    loadClientes()
})

async function deleteCliente(id) {
    await fetch(`${API_URL}/${id}`, {method: "DELETE"});
    loadClientes();
}

async function editarCliente(id) {
    const newNome = prompt("nome")
    const newEmail = prompt("Email")
    const newTelefone = prompt("Telefone")

    if (nome && email && telefone) {
        await fetch(`${API_URL}/${id}`, {
            method: "PUT",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                nome: newNome,
                email: newEmail,
                telefone: newTelefone
            })
            
        });
        loadClientes()     
    }
    
}
loadClientes()