const API_URL = "http://localhost:3000/reserva";
const API_URL_MESA = "http://localhost:3000/mesa";
const form = document.getElementById("formReserva");
const selectMesas = document.getElementById("numeroMesa");

window.onload = carregarEvents();

form.onsubmit = async (e) => {
	e.preventDefault();

	const idReserva = form.idReserva.value;
	const nomeCliente = form.nomeCliente.value;
	const contatoCliente = form.contatoCliente.value;
	const numeroMesa = form.numeroMesa.value;
	const quatidadePessoas = form.quatidadePessoas.value;
	const dataReserva = form.dataReserva.value;
	const obsReserva = form.obsReserva.value;
	const status = form.status.value;

	const verificaDisponibilidade = await verificaQuantidadePessoas(quatidadePessoas, numeroMesa);
	console.log(verificaDisponibilidade)

	if (verificaDisponibilidade) {
		alert(verificaDisponibilidade);
	} else {
		const reserva = {
			nomeCliente: nomeCliente,
			contatoCliente: contatoCliente,
			numeroMesa: numeroMesa,
			quatidadePessoas: quatidadePessoas,
			dataReserva: dataReserva,
			obsReserva: obsReserva,
			status: status,
		};
		console.log(reserva);

		if (idReserva) {
			const response = await fetch(`${API_URL}/${idReserva}`, {
				method: "PUT",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(reserva),
			});

			const data = await response.json();
			console.log("Reserva Atualizada com sucesso", data);
		} else {
			try {
				console.log(reserva);
				const response = await fetch(`${API_URL}`, {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify(reserva),
				});

				const resResponse = await response.json();
			} catch (e) {
				console.log("Erro ao cadastrar Reserva: ", e);
			}
		}

		form.reset();
		carregarEvents();
		carregarMesas();
	}
};

async function carregarMesas() {
	try {
		const mesas = await fetch(`${API_URL_MESA}`);
		const listReservas = await fetch(`${API_URL}`);
		selectMesas.innerHTML = "";
		selectMesas.innerHTML = `
			<option value="" selected hidden>SELECIONE A MESA</option>
		`;

		const reservas = await listReservas.json();
		console.log(reservas);
		let mesasIndisponiveis = [];
		reservas.forEach((reserva) => {
			console.log(reserva.numeroMes);
			mesasIndisponiveis.push(reserva.numeroMesa);
		});

		const resResponse = await mesas.json();
		resResponse.forEach((mesa) => {
			if (!mesasIndisponiveis.includes(mesa._id)) {
				const option = document.createElement("option");
				option.id = `${mesa._id}`;
				option.value = `${mesa._id}`;
				option.innerText = `${mesa.numeroMesa}`;

				selectMesas.appendChild(option);
			}
		});
	} catch {}
}

async function carregarEvents() {
	try {
		const listReserva = await fetch(`${API_URL}`);
		const events = await listReserva.json();
		const listaReservas = document.getElementById("listaReserva");
		listaReservas.innerHTML = "";

		events.forEach(async (item) => {
			const numeroMesa = await buscarMesa(item.numeroMesa);

			const li = document.createElement("li");
			li.className = "card"
			li.id = item._id;

			const [ano, mes, dia] = item.dataReserva.split("T")[0].split("-");
			const [hora, minutos] = item.dataReserva.split("T")[1].split(":");
			const dateBr = `${dia}/${mes}/${ano} às ${hora}:${minutos}`;

			const card = document.createElement("div")
			card.className = "card"
			const cardHeader = document.createElement("div-header")
			cardHeader.className = "card-header"
			const cardBody = document.createElement("card-body")
			cardBody.className = "card-body"
			const cardFooter = document.createElement("card-footer")
			cardFooter.className = "card-footer"
			const cardButtons = document.createElement("card-buttons")
			cardButtons.className = "card-buttons"

			const pNomeCliente = document.createElement("p")
			const pTelefone = document.createElement("p")
			const pDataReserva = document.createElement("p")
			const pNumeroMesa = document.createElement("p")
			const pQuantidadePessoas = document.createElement("p")
			const pStatus = document.createElement("p")
			pNomeCliente.innerText = `Nome Cliente: ${item.nomeCliente}`
			pTelefone.innerText = `Telefone: ${item.contatoCliente}`
			pDataReserva.innerText = `Data da Reserva: ${dateBr}`
			pNumeroMesa.innerText = `Numero da mesa: ${numeroMesa}`
			pQuantidadePessoas.innerText = `Quantidade de Pessoas: ${item.quatidadePessoas}`
			pStatus.innerText = `Status: ${item.status}`

			cardHeader.append(pNomeCliente, pTelefone, pDataReserva)
			cardBody.append(pNumeroMesa, pQuantidadePessoas,pStatus)

			const alterar = document.createElement("button");
			alterar.innerText = "Alterar";
			alterar.id = "alterar";
			alterar.onclick = () => {
				const dateEventFormated = new Date(item.dataReserva).toISOString();
				console.log(dateEventFormated);
				const dateSlice = dateEventFormated.slice(0, 16);

				updateReserva(item._id, item.nomeCliente, item.contatoCliente, item.numeroMesa, item.quatidadePessoas, dateSlice, item.obsReserva, item.status);
			};

			const excluir = document.createElement("button");
			excluir.innerText = "Excluir";
			excluir.id = "excluir";
			excluir.onclick = () => {
				deleteReserva(item._id);
			};

			cardButtons.append(alterar, excluir);
			cardFooter.append(cardButtons)

			card.append(cardHeader, cardBody, cardFooter)

			listaReservas.appendChild(card);
		});
	} catch (error) {
		console.log(error);
	}
}

async function updateReserva(id, nomeCliente, contatoCliente, idMesa, quatidadePessoas, dataReserva, obsReserva, status) {
	const numeroMesa = await buscarMesa(idMesa);
	form.idReserva.value = id;
	form.nomeCliente.value = nomeCliente;
	form.contatoCliente.value = contatoCliente;
	form.numeroMesa.innerHTML += `
		<option value="${idMesa}" selected>${numeroMesa} (Mesa Atual)</option>
	`;
	form.quatidadePessoas.value = quatidadePessoas;
	form.dataReserva.value = dataReserva;
	form.obsReserva.value = obsReserva;
	form.status.value = status;
}

async function deleteReserva(id) {
	if (confirm("Tem certeza que deseja Excluir esse item?")) {
		await fetch(`${API_URL}/${id}`, {
			method: "DELETE",
		});
		form.reset();
		carregarEvents();
		carregarMesas();
	}
}

async function buscarMesa(id) {
	try {
		const mesa = await fetch(`${API_URL_MESA}/${id}`, {
			method: "GET",
		});
		const resResponse = await mesa.json();
		return resResponse.numeroMesa;
	} catch (e) {
		console.log(e);
	}
}

async function verificaQuantidadePessoas(quantReserva, id) {
	try {
		const mesa = await fetch(`${API_URL_MESA}/${id}`, {
			method: "GET",
		});
		const resResponse = await mesa.json();
		if (quantReserva > resResponse.capacidade) {
			return "Essa mesa não comporta essa quantidade de pessoas";
		}
		return false
	} catch (e) {
		console.log(e);
	}
}

carregarMesas();
