# giovannagomes.dev

Meu portfólio de Quality Assurance: quem eu sou, minha trajetória e os projetos de QA que desenvolvi.

🔗 **https://giovannagomes.dev**

## Páginas

- **Sobre mim** (`index.html`): apresentação, trajetória e habilidades.
- **Projetos** (`projetos.html`): projetos com filtro por categoria e busca.

## Tecnologias

HTML, CSS e JavaScript puro, sem frameworks e sem etapa de build. Hospedado no GitHub Pages.

## Estrutura

```
├── index.html        # Sobre mim
├── projetos.html     # Projetos
├── css/style.css     # Estilos (tema claro/escuro, responsivo)
├── js/main.js        # Tema, menu mobile e rodapé
├── js/projetos.js    # Lista de projetos + filtros e busca
├── CNAME             # Domínio personalizado
├── sitemap.xml
└── robots.txt
```

## Como rodar localmente

```bash
python -m http.server 5500
```

Depois, abra http://localhost:5500.

## Adicionar um projeto

Edite o array `projetos` em `js/projetos.js` e copie um dos objetos existentes. Use `status: "done"` para concluído ou `"wip"` para em andamento.
