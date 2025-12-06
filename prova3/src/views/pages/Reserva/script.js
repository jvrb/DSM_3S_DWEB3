const API_URL = "http://localhost:3000/reserva";
const API_URL_MESA = "http://localhost:3000/mesa"
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
			console.log(reserva)
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
};

async function carregarMesas() {
	try {
		const mesas = await fetch(`${API_URL_MESA}`);

		const resResponse = await mesas.json();
		resResponse.forEach((mesa) => {
			const option = document.createElement("option")
			option.id = `${mesa._id}`
			option.value = `${mesa._id}`
			option.innerText = `${mesa.numeroMesa}`

			selectMesas.appendChild(option)
		})
	} catch {}
}

async function carregarEvents() {
	try {
		const listEvents = await fetch(`${API_URL}`);
		const events = await listEvents.json();
		const listaReservas = document.getElementById("listaReserva");
		listaReservas.innerHTML = "";

		events.forEach(async (item) => {

			const numeroMesa = await buscarMesa(item.numeroMesa)

			const li = document.createElement("li");
			li.id = item._id;

			const [ano, mes, dia] = item.dataReserva.split("T")[0].split("-");
			const [hora, minutos] = item.dataReserva.split("T")[1].split(":")
			const dateBr = `${dia}/${mes}/${ano} às ${hora}:${minutos}`;
			li.innerHTML = `

			
			`
			li.innerText = `Nome: ${item.nomeCliente}
							Telefone: ${item.contatoCliente}
							Numero da Mesa: ${numeroMesa}
							Quantidade de Pessoas: ${item.quatidadePessoas}
							Data: ${dateBr}
							Status: ${item.status}
			`;

			const alterar = document.createElement("button");
			alterar.innerText = "Alterar";
			alterar.id = "alterar";
			alterar.onclick = () => {
				const dateEventFormated = new Date(item.dataReserva).toISOString();
				console.log(dateEventFormated);
				const dateSlice = dateEventFormated.slice(0, 16);

				updateEvents(item._id, item.nomeCliente, item.contatoCliente, item.numeroMesa, item.quatidadePessoas, dateSlice, item.obsReserva, item.status);
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

			listaReservas.appendChild(li);
		});
	} catch (error) {
		console.log(error);
	}
}

async function updateEvents(id, nomeCliente, contatoCliente, numeroMesa, quatidadePessoas, dataReserva, obsReserva, status) {
	form.idReserva.value = id;
	form.nomeCliente.value = nomeCliente;
	form.contatoCliente.value = contatoCliente;
	form.numeroMesa.value = numeroMesa;
	form.quatidadePessoas.value = quatidadePessoas;
	form.dataReserva.value = dataReserva;
	form.obsReserva.value = obsReserva;
	form.status.value = status;
}

async function deleteEvent(id) {
	if (confirm("Tem certeza que deseja Excluir esse item?")) {
		await fetch(`${API_URL}/${id}`, {
			method: "DELETE",
		});

		carregarEvents();
	}
}


async function buscarMesa(id) {
	try {
		const mesa = await fetch(`${API_URL_MESA}/${id}`, {
			method: "GET"
		})
		const resResponse = await mesa.json();
		return resResponse.numeroMesa
	} catch (e){
		console.log(e)
	}
}

carregarMesas()
