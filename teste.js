// Array para armazenar os livros
let biblioteca = [];

// Função para adicionar um livro
function adicionarLivro() {
    const titulo = document.getElementById("titulo").value.trim();
    const autor = document.getElementById("autor").value.trim();
    const emprestimos = parseInt(document.getElementById("emprestimos").value);

    if (!titulo || !autor || isNaN(emprestimos)) {
        alert("Por favor, preencha todos os campos.");
        return;
    }

    const novoLivro = {
        titulo,
        autor,
        disponivel: true,
        emprestimos
    };

    biblioteca.push(novoLivro);
    atualizarLivros();
    atualizarTotalEmprestimos();
    limparCampos();
}

// Função para atualizar a disponibilidade de um livro
function atualizarDisponibilidade(titulo) {
    biblioteca = biblioteca.map(livro => {
        if (livro.titulo === titulo) {
            return { ...livro, disponivel: !livro.disponivel };
        }
        return livro;
    });
    atualizarLivros();
}

// Função para listar apenas os livros disponíveis e exibir
function atualizarLivros() {
    const livrosDisponiveis = biblioteca.filter(livro => livro.disponivel);
    const livrosDiv = document.getElementById("livrosDisponiveis");
    livrosDiv.innerHTML = "";

    if (livrosDisponiveis.length === 0) {
        livrosDiv.innerHTML = "<p>Nenhum livro disponível.</p>";
        return;
    }

    livrosDisponiveis.forEach(livro => {
        const livroInfo = document.createElement("div");
        livroInfo.classList.add("livro-info");
        livroInfo.innerHTML = `
            <p><strong>Título:</strong> ${livro.titulo}</p>
            <p><strong>Autor:</strong> ${livro.autor}</p>
            <p><strong>Empréstimos:</strong> ${livro.emprestimos}</p>
            <button onclick="atualizarDisponibilidade('${livro.titulo}')">
                ${livro.disponivel ? "Marcar como Indisponível" : "Marcar como Disponível"}
            </button>
        `;
        livrosDiv.appendChild(livroInfo);
    });
}

// Função para calcular o total de empréstimos usando reduce
function atualizarTotalEmprestimos() {
    const totalEmprestimos = biblioteca.reduce((total, livro) => total + livro.emprestimos, 0);
    document.getElementById("totalEmprestimos").innerText = totalEmprestimos;
}

// Função para limpar os campos de entrada
function limparCampos() {
    document.getElementById("titulo").value = "";
    document.getElementById("autor").value = "";
    document.getElementById("emprestimos").value = "";
}
