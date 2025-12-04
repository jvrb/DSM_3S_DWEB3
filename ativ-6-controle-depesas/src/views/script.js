const API_URL = "http://localhost:3000/controle-despesas"
const API_URL_TOTAL = "http://localhost:3000/controle-despesas/total"
const form = document.getElementById("formDepesas");

window.onload = carregarExpenses()

form.onsubmit = async (e) => {
	e.preventDefault();

    const idExpense = form.idExpense.value
	const description = form.description.value;
	const amount = Number(form.amount.value.replace(",", "."));
	const date = form.date.value;
    console.log(date)

    const expense = {
        description: description,
        amount: amount,
        date: date
    }
    
    if(idExpense){
        const response = await fetch(`${API_URL}/${idExpense}`, {
            method: "PUT",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(expense)
        })

        const data = await response.json()
        console.log("Despesa Atualizada com sucesso", data)
    }else{
        const response = await fetch(`${API_URL}`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(expense)
        })

        const data = await response.json()
        console.log("Despesa Cadastrada com sucesso", data)
    }

    form.reset()
    carregarExpenses()
};

async function carregarExpenses(){
    try {

        const getTotal = await fetch(`${API_URL_TOTAL}`, {
            method: "GET"
        })

        const totalJson = await getTotal.json()
        console.log(totalJson)
        const h2TotalDespesas = document.getElementById("totalDespesas")
        h2TotalDespesas.innerText = `Total das Despesas: R$${totalJson.totalAmount}`

        const listExpenses = await fetch(`${API_URL}`)
        const expenses = await listExpenses.json()
        const listaExpenses = document.getElementById("listaDespesas")
        listaExpenses.innerHTML = ""

        expenses.forEach((item) => {
            const li = document.createElement("li")
            li.id = item._id
            
            const [ano, mes, dia] = item.date.split("T")[0].split("-")
            const dateBr = `${dia}/${mes}/${ano}`
            li.innerText = `${item.description} - R$${item.amount} - ${dateBr}`

            const alterar = document.createElement("button")
            alterar.innerText = "Alterar"
            alterar.onclick = () => {
                updateExpense(
                    item._id,
                    item.description,
                    item.amount,
                    item.date.split("T")[0]
                )
            }

            const excluir = document.createElement("button")
            excluir.innerText = "Excluir"
            excluir.onclick = () => {
                deleteExpense(item._id)
            }

            li.appendChild(alterar)
            li.appendChild(excluir)

            listaExpenses.appendChild(li)
        })
    } catch (error) {
        console.log(error)
    }
}


async function updateExpense(id, description, amount, date) {
    document.getElementById("idExpense").value = id
    document.getElementById("description").value = description
    document.getElementById("amount").value = amount
    document.getElementById("date").value = date
}

async function deleteExpense(id) {
    if(confirm("Tme certeza que deseja Excluir esse item")){
        await fetch(`${API_URL}/${id}`, {
            method: "DELETE"
        })

        carregarExpenses()
    }
}