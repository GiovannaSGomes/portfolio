// ===== Lista de projetos =====
// Para adicionar um projeto, copie um objeto e edite os campos.
// status: "done" (concluído) ou "wip" (em andamento)
// titulo_en / descricao_en: versão em inglês (se ficar vazio, mostra o texto em português)
const projetos = [
  {
    titulo: "Cypress Básico (Talking About Testing)",
    categoria: "Automação",
    descricao:
      "Testes automatizados E2E de um formulário web com Cypress: preenchimento de campos, validações, uploads, links e simulação de viewport mobile.",
    titulo_en: "Cypress Basics (Talking About Testing)",
    descricao_en:
      "Automated E2E tests for a web form with Cypress: filling in fields, validations, uploads, links and mobile viewport simulation.",
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
    titulo_en: "Automated Testing Course",
    descricao_en:
      "Hands-on test automation exercises, covering UI scenarios and good practices for organizing test code.",
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
    titulo_en: "REST API Testing",
    descricao_en:
      "Postman collection validating the endpoints of a public API: status codes, contract (JSON Schema) and negative scenarios.",
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
    titulo_en: "Test plan and test cases",
    descricao_en:
      "Test plan, Gherkin test cases and bug reports for a demo web application.",
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

let categoriaAtiva = "Todos"; // valor interno (em português), não muda com o idioma

// Textos no idioma atual (usa js/i18n.js; se não carregar, fica em português)
const tr = (chave, pt) => (window.i18n ? window.i18n.t(chave, pt) : pt);
const emIngles = () => window.i18n?.lang === "en";
const tituloDe = (p) => (emIngles() && p.titulo_en) || p.titulo;
const descricaoDe = (p) => (emIngles() && p.descricao_en) || p.descricao;
const nomeCategoria = (c) => (c === "Todos" ? tr("projects.all", "Todos") : tr(`cat.${c}`, c));

function escapeHTML(texto) {
  const div = document.createElement("div");
  div.textContent = texto;
  return div.innerHTML;
}

function criarCard(p) {
  const statusTexto =
    p.status === "done" ? tr("projects.done", "✓ concluído") : tr("projects.wip", "⏳ em andamento");
  const links = [
    p.repo && `<a href="${p.repo}" target="_blank" rel="noopener">${tr("projects.code", "Código →")}</a>`,
    p.demo && `<a href="${p.demo}" target="_blank" rel="noopener">Demo →</a>`,
  ]
    .filter(Boolean)
    .join("");

  return `
    <article class="card project-card">
      <div class="project-top">
        <span class="category">${escapeHTML(nomeCategoria(p.categoria))}</span>
        <span class="status ${p.status}">${statusTexto}</span>
      </div>
      <h3>${escapeHTML(tituloDe(p))}</h3>
      <p>${escapeHTML(descricaoDe(p))}</p>
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
    // Busca funciona com termos em português e em inglês
    const texto = [p.titulo, p.descricao, p.titulo_en, p.descricao_en, ...p.tecnologias]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();
    return naCategoria && texto.includes(termo);
  });

  grid.innerHTML = filtrados.length
    ? filtrados.map(criarCard).join("")
    : `<p class="empty">${tr("projects.empty", "Nenhum projeto encontrado. 🐞")}</p>`;

  countEl.textContent = tr("projects.count", "{n} de {total} projetos")
    .replace("{n}", filtrados.length)
    .replace("{total}", projetos.length);
}

function desenharFiltros() {
  const categorias = ["Todos", ...new Set(projetos.map((p) => p.categoria))];

  filtersEl.innerHTML = categorias
    .map(
      (c) =>
        `<button class="filter-btn${c === categoriaAtiva ? " active" : ""}" data-cat="${c}">${escapeHTML(nomeCategoria(c))}</button>`
    )
    .join("");
}

function criarFiltros() {
  desenharFiltros();

  filtersEl.addEventListener("click", (e) => {
    const btn = e.target.closest(".filter-btn");
    if (!btn) return;
    categoriaAtiva = btn.dataset.cat;
    filtersEl.querySelectorAll(".filter-btn").forEach((b) => b.classList.toggle("active", b === btn));
    renderizar();
  });
}

searchEl.addEventListener("input", renderizar);

// Troca de idioma: redesenha filtros e cards
document.addEventListener("langchange", () => {
  desenharFiltros();
  renderizar();
});

criarFiltros();
renderizar();
