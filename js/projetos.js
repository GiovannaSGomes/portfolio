// ===== Lista de projetos =====
// Para adicionar um projeto, copie um objeto e edite os campos.
// status: "done" (concluído) ou "wip" (em andamento)
const projetos = [
  {
    titulo: "Cypress Básico (Talking About Testing)",
    categoria: "Automação",
    descricao:
      "Testes automatizados E2E de um formulário web com Cypress: preenchimento de campos, validações, uploads, links e simulação de viewport mobile.",
    tecnologias: ["Cypress", "JavaScript"],
    status: "done",
    repo: "https://github.com/GiovannaSGomes/cypress-basico-v2",
    demo: "",
  },
  {
    titulo: "Curso de Testes Automatizados",
    categoria: "Automação",
    descricao:
      "Atividades práticas de automação de testes, com cenários de interface e boas práticas de organização de código de teste.",
    tecnologias: ["Cypress", "JavaScript"],
    status: "done",
    repo: "https://github.com/GiovannaSGomes/curso-testes-automatizados",
    demo: "",
  },
  {
    titulo: "Testes de API REST",
    categoria: "API",
    descricao:
      "Coleção Postman validando os endpoints de uma API pública: status code, contrato (JSON Schema) e cenários negativos.",
    tecnologias: ["Postman", "Newman", "JSON Schema"],
    status: "wip",
    repo: "",
    demo: "",
  },
  {
    titulo: "Plano e casos de teste",
    categoria: "Manual",
    descricao:
      "Plano de testes, casos de teste em Gherkin e relatórios de bugs para uma aplicação web de demonstração.",
    tecnologias: ["Gherkin", "BDD", "Bug report"],
    status: "wip",
    repo: "",
    demo: "",
  },
];

// ===== Renderização, filtros e busca =====
const grid = document.querySelector("#projects-grid");
const filtersEl = document.querySelector("#filters");
const searchEl = document.querySelector("#search");
const countEl = document.querySelector("#count");

let categoriaAtiva = "Todos";

function escapeHTML(texto) {
  const div = document.createElement("div");
  div.textContent = texto;
  return div.innerHTML;
}

function criarCard(p) {
  const statusTexto = p.status === "done" ? "✓ concluído" : "⏳ em andamento";
  const links = [
    p.repo && `<a href="${p.repo}" target="_blank" rel="noopener">Código →</a>`,
    p.demo && `<a href="${p.demo}" target="_blank" rel="noopener">Demo →</a>`,
  ]
    .filter(Boolean)
    .join("");

  return `
    <article class="card project-card">
      <div class="project-top">
        <span class="category">${escapeHTML(p.categoria)}</span>
        <span class="status ${p.status}">${statusTexto}</span>
      </div>
      <h3>${escapeHTML(p.titulo)}</h3>
      <p>${escapeHTML(p.descricao)}</p>
      <ul class="tags">
        ${p.tecnologias.map((t) => `<li class="tag">${escapeHTML(t)}</li>`).join("")}
      </ul>
      ${links ? `<div class="project-links">${links}</div>` : ""}
    </article>`;
}

function renderizar() {
  const termo = searchEl.value.trim().toLowerCase();

  const filtrados = projetos.filter((p) => {
    const naCategoria = categoriaAtiva === "Todos" || p.categoria === categoriaAtiva;
    const texto = [p.titulo, p.descricao, ...p.tecnologias].join(" ").toLowerCase();
    return naCategoria && texto.includes(termo);
  });

  grid.innerHTML = filtrados.length
    ? filtrados.map(criarCard).join("")
    : `<p class="empty">Nenhum projeto encontrado. 🐞</p>`;

  countEl.textContent = `${filtrados.length} de ${projetos.length} projetos`;
}

function criarFiltros() {
  const categorias = ["Todos", ...new Set(projetos.map((p) => p.categoria))];

  filtersEl.innerHTML = categorias
    .map(
      (c) =>
        `<button class="filter-btn${c === categoriaAtiva ? " active" : ""}" data-cat="${c}">${c}</button>`
    )
    .join("");

  filtersEl.addEventListener("click", (e) => {
    const btn = e.target.closest(".filter-btn");
    if (!btn) return;
    categoriaAtiva = btn.dataset.cat;
    filtersEl.querySelectorAll(".filter-btn").forEach((b) => b.classList.toggle("active", b === btn));
    renderizar();
  });
}

searchEl.addEventListener("input", renderizar);
criarFiltros();
renderizar();
