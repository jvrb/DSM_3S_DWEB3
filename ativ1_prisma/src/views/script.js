const API_URL_CARROS = "/carros"
const API_URL_CLIENTES = "/pessoas"
const API_URL_TELEFONE = "/telefone"

const carForm = document.getElementById("carForm")
const clientForm = document.getElementById("clientForm")
const listSearch = document.getElementById("idListResult")

carForm.addEventListener("submit", async (e) => {
    e.preventDefault()
    listSearch.innerHTML = ""
    const idCarro = document.getElementById("carro").value

    const searchCar = await fetch(`${API_URL_CARROS}/${idCarro}`)
    const resCar = await searchCar.json()

    const li = document.createElement("li")

    if (!resCar || resCar === null) {
        li.innerHTML = `
            <div class="redbg}">
                <div class="cardBody">
                    <span>Nenhum carro encontrado</span>
                </div>
            </div>
        `
    } else {
        li.innerHTML = `
            <div class="card ${resCar.pessoas != "" ? "redbg" : ""}">
                <div class="cardBody">
                    <div class="bodyLeft">
                        <p><span>Marca: </span><strong>${resCar.marca}</strong></p>
                        <p><span>Modelo: </span>${resCar.modelo}</p>    
                        <p><span>Ano: </span>${resCar.ano}</p> 
                    </div>
                </div>
            </div>
        `
    }
    listSearch.appendChild(li)
    carForm.reset()
})

clientForm.addEventListener("submit", async (e) => {
    e.preventDefault()

    listSearch.innerHTML = ""
    const idClient = document.getElementById("cliente").value

    const searchClient = await fetch(`${API_URL_CLIENTES}/${idClient}`)
    const resClient = await searchClient.json()
    console.log(resClient)

    const li = document.createElement("li")

    if (!resClient || resClient === null) {
        li.innerHTML = `
            <div class="redbg}">
                <div class="cardBody">
                    <span>Nenhum usuario encontrado</span>
                </div>
            </div>
        `
    }else{
        li.innerHTML = `
            <div class="card">
                <div class="cardBody">
                    <div class="bodyLeft">
                        <p><span>Nome: </span><strong>${resClient.nome}</strong></p>
                        <p><span>Email: </span>${resClient.email}</p>    
                        ${resClient.telefone.map((element) => `<p><span>Telefone: </span>${element.numero}</p>`).join("")}
                    </div>
                </div>
            </div>
        `
    }
    listSearch.appendChild(li)
    clientForm.reset()
})