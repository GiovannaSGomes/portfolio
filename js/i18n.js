// ===== Idiomas (EN / PT) =====
// O texto em inglês (idioma padrão) fica no próprio HTML. Aqui ficam as traduções em português.
// Para traduzir um elemento novo:
//   1. adicione data-i18n="chave" no HTML (troca o texto)
//      ou data-i18n-attr="atributo:chave" (troca um atributo, ex.: aria-label, placeholder, content)
//   2. adicione "chave": "texto em português" no objeto PT abaixo.

const PT = {
  // Geral
  "nav.about": "Sobre mim",
  "nav.projects": "Projetos",
  "nav.label": "Navegação principal",
  "btn.theme": "Alternar tema",
  "btn.menu": "Abrir menu",

  // Sobre mim: <head>
  "home.title": "Giovanna Gomes | QA Analyst",
  "home.description": "Portfólio de Giovanna Gomes, QA Analyst: testes manuais, documentação, testes de API e automação com Cypress.",
  "home.og.description": "Testes manuais, documentação, testes de API e automação com Cypress.",

  // Sobre mim: apresentação
  "hero.eyebrow": "// QA Analyst · Campinas-SP",
  "hero.title": "Olá, eu sou a Giovanna. Eu encontro bugs antes do usuário.",
  "hero.lead": "QA Analyst na Venturus desde 2021. Trabalho com testes manuais, escrita de casos de teste em Gherkin, testes de API com Postman, consultas em SQL e MongoDB e automação com Cypress.",
  "hero.cta": "Ver projetos →",
  "term.1": "escreve casos de teste em Gherkin",
  "term.2": "valida APIs com Postman",
  "term.3": "consulta dados em SQL e MongoDB",
  "term.4": "automatiza fluxos com Cypress",
  "term.5": "reporta bugs com clareza",
  "term.years": "(6 anos em QA)",

  // Sobre mim: texto
  "about.title": "Sobre mim",
  "about.p1": "Sou formada em Engenharia de Computação pela UniMetrocamp e trabalho com qualidade de software desde 2020, quando comecei como estagiária de QA na Venturus. Desde 2021 sou QA Analyst e atuo em times multidisciplinares com metodologia ágil.",
  "about.p2": "No dia a dia, escrevo e executo testes, reporto defeitos no Jira, escrevo documentação como requisitos e guias de usuário, testo APIs com Postman e faço consultas e validações em bancos SQL e MongoDB.",
  "about.p3": "Antes da área de software, fui técnica em eletrônica na Certlab, fazendo testes de certificação de baterias de lítio e SAR segundo normas técnicas. Foi lá que aprendi a seguir padrões com rigor, escrever relatórios e lidar com prazos de vários clientes, e levo tudo isso para o meu trabalho em QA.",

  // Trajetória
  "career.title": "Trajetória",
  "career.1.when": "2021 – atual",
  "career.1.role": "QA Analyst · Venturus",
  "career.1.desc": "Testes, reporte de defeitos, documentação, Postman, SQL e MongoDB.",
  "career.2.role": "Estagiária de QA · Venturus",
  "career.2.desc": "Escrita e execução de testes de software.",
  "career.3.role": "Engenharia de Computação · UniMetrocamp",
  "career.3.desc": "Graduação.",
  "career.4.role": "Técnica em Eletrônica · Certlab",
  "career.4.desc": "Testes de certificação de baterias de lítio e SAR conforme normas.",

  // Habilidades
  "skills.title": "Habilidades",
  "skills.subtitle": "Ferramentas e práticas que uso no dia a dia.",
  "skills.testing": "Testes e documentação",
  "skills.testcases": "Casos de teste",
  "skills.requirements": "Requisitos",
  "skills.guides": "Guias de usuário",
  "skills.api": "API e dados",
  "skills.automation": "Automação",
  "skills.process": "Processo e idiomas",
  "skills.agile": "Metodologia ágil",
  "skills.english": "Inglês intermediário",

  // Projetos
  "projects.title": "Projetos | Giovanna Gomes",
  "projects.eyebrow": "// projetos",
  "projects.h1": "Projetos de QA",
  "projects.lead": "Estudos e projetos práticos de automação, API e documentação de testes.",
  "projects.description": "Projetos de QA de Giovanna Gomes: automação com Cypress, testes de API e documentação de testes.",
  "projects.og.description": "Automação com Cypress, testes de API e documentação de testes.",
  "projects.filter": "Filtrar por categoria",
  "projects.search": "Buscar por nome ou tecnologia...",
  "projects.searchLabel": "Buscar projetos",
  "projects.all": "Todos",
  "projects.empty": "Nenhum projeto encontrado. 🐞",
  "projects.count": "{n} de {total} projetos",
  "projects.done": "✓ concluído",
  "projects.wip": "⏳ em andamento",
  "projects.code": "Código →",
};

// Textos em inglês usados só pelo JavaScript (o resto vem do HTML)
const EN_JS = {
  "projects.all": "All",
  "projects.empty": "No projects found. 🐞",
  "projects.count": "{n} of {total} projects",
  "projects.done": "✓ completed",
  "projects.wip": "⏳ in progress",
  "projects.code": "Code →",
  "cat.Automação": "Automation",
  "cat.Manual": "Manual",
  "cat.API": "API",
};

const META = {
  en: { htmlLang: "en", ogLocale: "en_US", button: "PT", buttonLabel: "Mudar para português", buttonLang: "pt-BR" },
  pt: { htmlLang: "pt-BR", ogLocale: "pt_BR", button: "EN", buttonLabel: "Switch to English", buttonLang: "en" },
};

// Guarda o texto original (inglês) de cada elemento antes da primeira troca
const original = new Map();

function lerIdiomaSalvo() {
  try {
    return localStorage.getItem("lang");
  } catch {
    return null;
  }
}

function idiomaInicial() {
  const salvo = lerIdiomaSalvo();
  if (salvo === "pt" || salvo === "en") return salvo;
  return "en"; // padrão: inglês (a escolha do visitante fica salva depois do primeiro clique)
}

let idiomaAtual = idiomaInicial();

// t("chave", padrao) devolve o texto no idioma atual.
function t(chave, padrao) {
  const dicionario = idiomaAtual === "pt" ? PT : EN_JS;
  return dicionario[chave] ?? padrao ?? chave;
}

function aplicarIdioma(lang) {
  idiomaAtual = lang;
  const meta = META[lang];
  document.documentElement.lang = meta.htmlLang;

  // Textos
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const chave = el.dataset.i18n;
    if (!original.has(el)) original.set(el, {});
    const cache = original.get(el);
    if (cache.text === undefined) cache.text = el.textContent;
    el.textContent = lang === "pt" && PT[chave] !== undefined ? PT[chave] : cache.text;
  });

  // Atributos (aria-label, placeholder, content das meta tags...)
  document.querySelectorAll("[data-i18n-attr]").forEach((el) => {
    if (!original.has(el)) original.set(el, {});
    const cache = original.get(el);
    el.dataset.i18nAttr.split(";").forEach((par) => {
      const [attr, chave] = par.split(":").map((s) => s.trim());
      const id = `attr:${attr}`;
      if (cache[id] === undefined) cache[id] = el.getAttribute(attr);
      el.setAttribute(attr, lang === "pt" && PT[chave] !== undefined ? PT[chave] : cache[id]);
    });
  });

  // og:locale
  document.querySelector('meta[property="og:locale"]')?.setAttribute("content", meta.ogLocale);

  // Botão de idioma mostra o idioma para o qual vai trocar
  const btn = document.querySelector("#lang-toggle");
  if (btn) {
    btn.textContent = meta.button;
    btn.setAttribute("aria-label", meta.buttonLabel);
    btn.setAttribute("lang", meta.buttonLang);
  }

  // Avisa outros scripts (ex.: projetos.js) para renderizar de novo
  document.dispatchEvent(new CustomEvent("langchange", { detail: { lang } }));
}

document.querySelector("#lang-toggle")?.addEventListener("click", () => {
  const proximo = idiomaAtual === "en" ? "pt" : "en";
  aplicarIdioma(proximo);
  try {
    localStorage.setItem("lang", proximo);
  } catch {
    /* navegação privada: ignora */
  }
});

window.i18n = {
  t,
  get lang() {
    return idiomaAtual;
  },
};

// Só precisa mexer na página se o idioma não for o do HTML (inglês)
if (idiomaAtual !== "en") aplicarIdioma(idiomaAtual);
