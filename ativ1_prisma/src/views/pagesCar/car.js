const API_URL = "/carros"

const carForm = document.getElementById("createCarForm")
const listCar = document.getElementById("listCarro")

async function loadCars() {
    const res = await fetch(API_URL)
    const carros = await res.json()

    listCar.innerHTML = ""
    carros.forEach(carro => {
        const li = document.createElement("li")
        li.innerHTML = `
            <div class="card ${carro.pessoas != "" ? "redbg" : ""}">
                <div class="cardBody">
                    <div class="bodyLeft">
                        <p><span>Marca: </span><strong>${carro.marca}</strong></p>
                        <p><span>Modelo: </span>${carro.modelo}</p>    
                        <p><span>Ano: </span>${carro.ano}</p> 
                    </div> 
                    <div class="bodyRight">
                        <button onclick="editarCar(${carro.id})">Editar</button>   
                        <button onclick="deleteCar(${carro.id})">Excluir</button>      
                    </div> 
                </div>
            </div>
        `
        listCar.appendChild(li)

    });
}

carForm.addEventListener("submit", async (e) => {
    e.preventDefault()

    const marca = document.getElementById("marca").value
    const modelo = document.getElementById("modelo").value
    const ano = Number(document.getElementById("ano").value)

    await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ modelo, marca, ano })
    })
    carForm.reset()
    loadCars()
})

async function deleteCar(id) {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    loadCars();
}

async function editarCar(id) {
    try {
        const newModelo = prompt("modelo")
        const newMarca = prompt("marca")
        const newAno = Number(prompt("ano"))

        if (modelo && marca && ano) {
            await fetch(`${API_URL}/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    modelo: newModelo,
                    marca: newMarca,
                    ano: newAno
                })

            });

            loadCars()
        }
    }catch(e){
        console.log("Digite as informações")
    }

}

loadCars()