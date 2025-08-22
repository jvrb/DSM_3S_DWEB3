const API_URL_ALUGADOS = "/alugados"
const API_URL_CARROS = "/carros"
const API_URL_CLIENTES = "/pessoas"
const API_URL_TELEFONE = "/telefone"

const carForm = document.getElementById("createAlugadosForm")
const listAlugados = document.getElementById("listAlugados")
const optCarGroup = document.getElementById("carGroup")
const optClienteGroup = document.getElementById("clienteGroup")

async function loadAlugados() {

    const res = await fetch(API_URL_ALUGADOS)
    const alugados = await res.json()
    await loadOption()

    listAlugados.innerHTML = ""

    for (alugado of alugados) {
        const resClinteOne = await fetch(`${API_URL_CLIENTES}/${alugado.pessoaId}`)
        const dadosCliente = await resClinteOne.json()

        const resCarOne = await fetch(`${API_URL_CARROS}/${alugado.carroId}`)
        const dadoCarro = await resCarOne.json()
        if (resClinteOne && resCarOne) {
            const li = document.createElement("li")
            li.innerHTML = `
            <div class="card">
                <div class="cardBody">
                    <div class="bodyLeft">
                        <div class="dadosCliente">
                            <p><span>Cliente: </span><strong>${dadosCliente.nome}</strong></p>
                            <p><span>Email: </span>${dadosCliente.email}</p>    
                            ${dadosCliente.telefone.map((element) => `<p><span>Telefone: </span>${element.numero}</p>`).join("")}
                        </div>
                        <div class="dadosCarro">
                            <p><span>Carro: </span><strong>${dadoCarro.modelo}</strong></p>
                            <p><span>Marca: </span>${dadoCarro.marca}</p>    
                            <p><span>Ano: </span>${dadoCarro.ano}</p>  
                        </div>  
                    </div> 
                    <div class="bodyRight">
                        <button id="excluir" onclick="deleteAlugado(${alugado.id})">Excluir</button>      
                    </div> 
                </div>
            </div>
        `;
        listAlugados.appendChild(li)
    
        }
        

    };
}

async function loadOption() {
    optCarGroup.innerHTML = ""
    const placeholder = document.createElement('option');
    placeholder.textContent = 'Selecionar';
    placeholder.value = '';
    placeholder.disabled = true;
    placeholder.selected = true;
    optCarGroup.appendChild(placeholder);

    optClienteGroup.innerHTML = ""
    const placeholder2 = document.createElement('option');
    placeholder2.textContent = 'Selecionar';
    placeholder2.value = '';
    placeholder2.disabled = true;
    placeholder2.selected = true;
    optClienteGroup.appendChild(placeholder2);

    const resCar = await fetch(`${API_URL_CARROS}/avaible`)
    const carros = await resCar.json()

    const resClientes = await fetch(`${API_URL_CLIENTES}/avaible`)
    const clientes = await resClientes.json()

    carros.forEach(async carro => {
        const optionCar = document.createElement("option")
        optionCar.id = "carroId"
        optionCar.value = carro.id
        optionCar.innerHTML = `
            ${carro.id} - ${carro.modelo} - ${carro.ano}
        `
        optCarGroup.appendChild(optionCar)
    })

    clientes.forEach(async cliente => {
        const optionCliente = document.createElement("option")
        optionCliente.id = "clienteId"
        optionCliente.value = cliente.id
        optionCliente.innerHTML = `
            ${cliente.id} - ${cliente.nome} - ${cliente.email}
        `
        optClienteGroup.appendChild(optionCliente)
    })
}

carForm.addEventListener("submit", async (e) => {
    e.preventDefault()

    const cliente = document.getElementById("clienteGroup").value
    const carro = document.getElementById("carGroup").value

    await fetch(API_URL_ALUGADOS, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            pessoaId: Number(cliente),
            carroId: Number(carro)
        })
    })
    carForm.reset()
    loadAlugados()
})

async function deleteAlugado(id) {
    fetch(`${API_URL_ALUGADOS}/${id}`, { method: "DELETE" });

    await loadAlugados()
}

loadAlugados()