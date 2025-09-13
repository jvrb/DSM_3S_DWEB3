const API_URL = "http://localhost:3000/livros";
const formLivro = document.getElementById("formLivro");

window.onload = atualizarListaDeLivros();

formLivro.addEventListener("submit", async (event) => {
	event.preventDefault();

	const id = document.getElementById("idLivro").value;

	const livro = {
		titulo: document.getElementById("titulo").value,
		autor: document.getElementById("autor").value,
		ano: parseInt(document.getElementById("ano").value),
	};

	if (id) {
		const response = await fetch(`${API_URL}/${id}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(livro),
		});

		const data = await response.json();
		console.log("Livro Atualizado: ", data);
	} else {
		const response = await fetch(API_URL, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(livro),
		});

		const data = await response.json();
		console.log("Livro cadastrado: ", data);
	}
	formLivro.reset();
	atualizarListaDeLivros();
});

async function atualizarListaDeLivros() {
	const response = await fetch(API_URL);
	const livros = await response.json();
	const listaLivros = document.getElementById("listaLivros");

	listaLivros.innerHTML = "";

	livros.forEach((livro) => {
		const div = document.createElement("div");
		div.className = "livro-item";
		div.innerHTML = `
            <div class="desc">
                <strong>${livro.titulo}</strong>
                <div>
                    ${livro.autor} ${livro.ano}
                </div>
            </div>
            <div class="buttons">
                <button class="btn btn-editar" onclick="editarLivro('${livro._id}', '${livro.titulo}', '${livro.autor}', '${livro.ano}')">Alterar</button>
                <button class="btn btn-excluir" onclick="excluirLivro('${livro._id}')">Excluir</button>
            </div>
        `;
		listaLivros.appendChild(div);
	});
}

async function editarLivro(id, titulo, autor, ano) {
	document.getElementById("idLivro").value = id;
	document.getElementById("titulo").value = titulo;
	document.getElementById("autor").value = autor;
	document.getElementById("ano").value = ano;
}

async function excluirLivro(id) {
	if (confirm("Tem certez que deseja exluir este Livro:")) {
		await fetch(`${API_URL}/${id}`, {
			method: "DELETE",
		});
		atualizarListaDeLivros();
	}
	formLivro.reset();
}
