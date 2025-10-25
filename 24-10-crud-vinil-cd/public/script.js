const API_URL = "http://localhost:3000/discos";
const formLivro = document.getElementById("formDisco");

window.onload = atualizarListaDeDiscos();

formLivro.addEventListener("submit", async (event) => {
	event.preventDefault();

	const id = document.getElementById("idDisco").value;

	const Disco = {
		titulo: document.getElementById("titulo").value,
		artista: document.getElementById("artista").value,
		ano: parseInt(document.getElementById("ano").value),
		genero: document.getElementById("genero").value,
		formato: document.getElementById("formato").value,
		preco: parseFloat(document.getElementById("preco").value),
	};

	if (id) {
		const response = await fetch(`${API_URL}/${id}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(Disco),
		});

		const data = await response.json();
		console.log("Disco Atualizado: ", data);
	} else {
		const response = await fetch(API_URL, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(Disco),
		});

		const data = await response.json();
		console.log("Disco cadastrado: ", data);
	}
	formDisco.reset();
	atualizarListaDeDiscos();
});

async function atualizarListaDeDiscos() {
	const response = await fetch(API_URL);
	const discos = await response.json();
	const listaDiscos = document.getElementById("listaDiscos");
	const sectionItems = document.getElementById("sectionItems");

	listaDiscos.innerHTML = "";

	discos.forEach((disco) => {
		const div = document.createElement("div");
		div.className = "disco-item";
		div.innerHTML = `
            <div class="desc">
                Titulo:<strong> ${disco.titulo}</strong>
                <div>
                    Artista: <strong>${disco.artista}</strong><br>
					Ano: <strong>${disco.ano}</strong><br>
					Gênero: <strong>${disco.genero}</strong><br>
					Tipo: <strong>${disco.formato}</strong><br>
					Preço: R$<strong>${disco.preco}</strong>
                </div>
            </div>
            <div class="buttons">
                <button class="btn btn-editar" onclick="editarDisco('${disco._id}', '${disco.titulo}', '${disco.artista}', '${disco.ano}', '${disco.genero}', '${disco.formato}', '${disco.preco}')">Alterar</button>
                <button class="btn btn-excluir" onclick="excluirDisco('${disco._id}')">Excluir</button>
            </div>
        `;
		listaDiscos.appendChild(div);
	});
}

async function editarDisco(id, titulo, artista, ano, genero, formato, preco) {
	document.getElementById("idDisco").value = id;
	document.getElementById("titulo").value = titulo;
	document.getElementById("artista").value = artista;
	document.getElementById("ano").value = ano;
	document.getElementById("genero").value = genero;
	document.getElementById("formato").value = formato;
	document.getElementById("preco").value = preco;
}

async function excluirDisco(id) {
	if (confirm("Tem certez que deseja exluir este Item:")) {
		await fetch(`${API_URL}/${id}`, {
			method: "DELETE",
		});
		atualizarListaDeDiscos();
	}
	formDisco.reset();
}
