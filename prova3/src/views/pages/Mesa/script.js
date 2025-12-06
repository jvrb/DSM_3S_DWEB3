const API_URL = "http://localhost:3000/mesa";
const form = document.getElementById("formMesa");

window.onload = carregarMesas();

form.onsubmit = async (e) => {
	e.preventDefault();

	const idMesa = form.idMesa.value;
	const numeroMesa = form.numeroMesa.value;
	const capacidade = form.capacidade.value;
	const localizacao = form.localizacao.value;
	

	const mesa = {
		numeroMesa: numeroMesa,
		capacidade: capacidade,
		localizacao: localizacao
	};
	console.log(mesa);

	if (idMesa) {
		const response = await fetch(`${API_URL}/${idMesa}`, {
			method: "PUT",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(mesa),
		});

		const data = await response.json();
		console.log("Evento Atualizada com sucesso", data);
	} else {
		try {
			const response = await fetch(`${API_URL}`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(mesa),
			});

			const resResponse = await response.json();
			console.log(resResponse);
		} catch (e) {
			console.log("Erro ao cadastrar Mesa: ", e);
		}
	}

	form.reset();
	carregarMesas();
};

async function carregarMesas() {
	try {
		const listEvents = await fetch(`${API_URL}`);
		const events = await listEvents.json();
		const listaMesas = document.getElementById("listaMesa");
		listaMesas.innerHTML = "";

		events.forEach((item) => {
			const li = document.createElement("li");
			li.id = item._id;

			li.innerText = `Numero Mesa: ${item.numeroMesa} 
							Capacidade: ${item.capacidade}
							Localização: ${item.localizacao}`;

			const alterar = document.createElement("button");
			alterar.innerText = "Alterar";
			alterar.id = "alterar";
			alterar.onclick = () => {
				updateEvents(item._id, item.numeroMesa, item.capacidade, item.localizacao);
			};

			const excluir = document.createElement("button");
			excluir.innerText = "Excluir";
			excluir.id = "excluir";
			excluir.onclick = () => {
				deleteEvent(item._id);
			};

			const divButtons = document.createElement("div");
			divButtons.className = "buttons";

			divButtons.appendChild(alterar);
			divButtons.appendChild(excluir);

			li.appendChild(divButtons);

			listaMesas.appendChild(li);
		});
	} catch (error) {
		console.log(error);
	}
}

async function updateEvents(id, nomeCliente, contatoCliente, numeroMesa, quatidadePessoas, dataReserva, obsReserva, status) {
	console.log(id);
	document.getElementById("idEvent").value = id;
	document.getElementById("nomeCliente").value = nomeCliente;
	document.getElementById("contatoCliente").value = contatoCliente;
	document.getElementById("numeroMesa").value = numeroMesa;
	document.getElementById("quatidadePessoas").value = quatidadePessoas;
	document.getElementById("dataReserva").value = dataReserva;
	document.getElementById("obsReserva").value = obsReserva;
	document.getElementById("status").value = status;
}

async function deleteEvent(id) {
	if (confirm("Tem certeza que deseja Excluir esse item?")) {
		await fetch(`${API_URL}/${id}`, {
			method: "DELETE",
		});

		carregarEvents();
	}
}
