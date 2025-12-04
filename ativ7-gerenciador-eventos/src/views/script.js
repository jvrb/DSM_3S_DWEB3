const API_URL = "http://localhost:3001/gerenciador-eventos";
const form = document.getElementById("formEvent");

window.onload = carregarEvents();

form.onsubmit = async (e) => {
	e.preventDefault();

	const idEvent = form.idEvent.value;
	const eventTitle = form.titleEvent.value;
	const description = form.description.value;
	const date = form.data.value;
	const locationEvent = form.locationEvent.value;
	const amount = Number(form.amount.value.replace(",", "."));
	// console.log(new Date(date).toISOString());

	const event = {
		title: eventTitle,
		description: description,
		eventDate: new Date(date),
		locationEvent: locationEvent,
		amount: amount,
	};
	console.log(event.eventDate);

	if (idEvent) {
		const response = await fetch(`${API_URL}/${idEvent}`, {
			method: "PUT",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(event),
		});

		const data = await response.json();
		console.log("Evento Atualizada com sucesso", data);
	} else {
		try {
			const response = await fetch(`${API_URL}`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(event),
			});

            const resResponse = await response.json()
            console.log(resResponse)
		} catch (e) {
            console.log("Erro ao cadastrar evento: ", e)
        }
	}

	form.reset();
	carregarEvents();
};

async function carregarEvents() {
	try {
		const listEvents = await fetch(`${API_URL}`);
		const events = await listEvents.json();
		const listaEvents = document.getElementById("listaEvents");
		listaEvents.innerHTML = "";

		events.forEach((item) => {
			const li = document.createElement("li");
			li.id = item._id;

			const [ano, mes, dia] = item.eventDate.split("T")[0].split("-");
			const dateBr = `${dia}/${mes}/${ano}`;
			li.innerText = `${item.description} - R$${item.amount} - ${dateBr}`;

			const alterar = document.createElement("button");
			alterar.innerText = "Alterar";
			alterar.id = "alterar"
			alterar.onclick = () => {
                const dateEventFormated = new Date(item.eventDate).toISOString()
                console.log(dateEventFormated)
                const dateSlice = dateEventFormated.slice(0, 16)
                updateEvents(item._id, item.title, item.description, dateSlice,  item.locationEvent ,item.amount);
			};

			const excluir = document.createElement("button");
			excluir.innerText = "Excluir";
			excluir.id = "excluir"
			excluir.onclick = () => {
				deleteEvent(item._id);
			};

			const divButtons = document.createElement("div")
			divButtons.className = "buttons"
	
			divButtons.appendChild(alterar);
			divButtons.appendChild(excluir);

			li.appendChild(divButtons)

			listaEvents.appendChild(li);
		});
	} catch (error) {
		console.log(error);
	}
}

async function updateEvents(id, title, description, data, locationEvent, amount) {
    console.log(id)
	document.getElementById("idEvent").value = id;
	document.getElementById("titleEvent").value = title;
	document.getElementById("description").value = description;
	document.getElementById("data").value = data;
	document.getElementById("locationEvent").value = locationEvent;
	document.getElementById("amount").value = amount;
}

async function deleteEvent(id) {
	if (confirm("Tem certeza que deseja Excluir esse item?")) {
		await fetch(`${API_URL}/${id}`, {
			method: "DELETE",
		});

		carregarEvents();
	}
}
