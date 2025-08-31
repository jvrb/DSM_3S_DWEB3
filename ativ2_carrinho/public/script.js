const API_URL = "http://localhost:3000/shoppingitems";

document.addEventListener("DOMContentLoaded", carregarProdutos);

const form = document.getElementById("formProduto");
form.addEventListener("submit", salvarProduto);

async function carregarProdutos() {
	const response = await fetch(API_URL);
	const produtos = await response.json();

	const listItems = document.getElementById("listItems");
	listItems.innerHTML = "";

	produtos.forEach((produto) => {
		const li = document.createElement("li");

		li.innerHTML = `
            <div class="liLeft">
                <p>Nome Produto: <strong>${produto.nomeProduto}</strong></p>
                <p>Valor Produto: <strong>R$ ${produto.valorProduto}</strong></p>
            </div>
            <div class="liRight">
                <button onclick="editarProduto('${produto._id}', '${produto.nomeProduto}', '${produto.valorProduto}')">Editar</button>
                <button onclick="excluirProduto('${produto._id}', '${produto.nomeProduto}', '${produto.valorProduto}')">Excluir</button>
            </div>
        `;

		listItems.appendChild(li);
	});
}

async function salvarProduto(event) {
	event.preventDefault();

	const id = document.getElementById("produtoId").value;
	const nomeProduto = document.getElementById("nomeProduto").value;
	const valorProduto = document.getElementById("valorProduto").value;

	const produto = { nomeProduto, valorProduto };

	if (id) {
		await fetch(`${API_URL}/${id}`, {
			method: "PUT",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(produto),
		});
	} else {
		await fetch(API_URL, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(produto),
		});
	}

	form.reset();
	carregarProdutos();
}

function editarProduto(id, nome, valor) {
	document.getElementById("produtoId").value = id;
	document.getElementById("nomeProduto").value = nome;
	document.getElementById("valorProduto").value = valor;
}

async function excluirProduto(id, nome, valor) {
	if (confirm(`Deseja excluir o produto ${nome} - ${valor}`)) {
		await fetch(`${API_URL}/${id}`, {
			method: "DELETE",
		});
		carregarProdutos();
	}
}

carregarProdutos();
