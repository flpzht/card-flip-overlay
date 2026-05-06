# 🃏 Pokémon Card Flip

Projeto desenvolvido com foco em **boas práticas de Front-end**, animações CSS 3D e consumo de API REST pública.

---

## 👀 Visão Geral

Este projeto demonstra minha capacidade de:

- Estruturar aplicações Web de forma modular e organizada
- Aplicar animações 3D com CSS (`perspective`, `transform-style`, `backface-visibility`)
- Escrever JavaScript limpo com ES Modules sem bundler
- Consumir uma API REST pública de forma assíncrona
- Versionar código corretamente com Git e GitHub

---

## 🎯 Objetivo do Projeto

Criar uma Pokédex interativa onde cada Pokémon é exibido como um card. Ao clicar, o card realiza um **flip 3D** e se expande para o centro da tela, revelando detalhes como número, tipo(s) e artwork oficial, com animações suaves e dados consumidos em tempo real da [PokéAPI](https://pokeapi.co/).

---

## 🛠 Tecnologias Utilizadas

- HTML5 (estrutura semântica)
- CSS3 — Grid, `perspective`, `transform-style: preserve-3d`, `backface-visibility`, transições customizadas
- JavaScript ES Modules (sem framework, sem bundler)
- [PokéAPI v2](https://pokeapi.co/) — REST API pública e gratuita

---

## 📂 Estrutura do Projeto

```
card-flip-overlay/
├── index.html
├── assets/
│   ├── poke-icon.png
│   └── Pokdex_logo.webp
├── css/
│   ├── index.css
│   ├── vendor/
│   │   ├── normalize.css
│   │   └── reset.css
│   └── blocks/
│       ├── base.css
│       ├── header.css
│       ├── scene.css
│       ├── card.css
│       └── overlay.css
└── js/
    ├── script.js         ← entrada e orquestração
    ├── components/
    │   ├── api.js        ← chamadas à PokéAPI
    │   ├── animation.js  ← lógica de flip e transições
    │   ├── types.js      ← paleta de cores por tipo
    │   └── Cards/
    │       ├── frontCard.js
    │       └── backCard.js
```

---

## ⚙️ Funcionalidades

- Carregamento inicial com os 151 Pokémons da 1ª geração
- Grid responsivo de cards com artwork oficial
- Animação flip 3D ao clicar no card
- Expansão do card para o centro da tela com overlay escurecido
- Fechamento clicando fora do card ou no overlay
- Cores de fundo e destaque dinâmicas baseadas no tipo do Pokémon (18 tipos)
- Input para filtrar quantos Pokémons exibir

---

## 📸 Preview

> *(adicionar GIF ou screenshot do projeto)*

---

## ▶️ Como executar o projeto

O projeto usa **ES Modules nativos** (`import`/`export`), por isso é necessário servir via HTTP, abrir o `index.html` direto no navegador não funcionará.

**Opção 1 — VS Code Live Server**

Instale a extensão [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) e clique em **Go Live**.

**Opção 2 — Node.js**

```bash
npx serve .
```

**Opção 3 — Python**

```bash
python -m http.server 5500
```

Acesse `http://localhost:5500` no navegador.

---

## 🧩 Arquitetura JS

```
script.js
  ├── api.js        → createPokemonAPI(), loadPokemons()
  ├── animation.js  → openCard(), closeCard()
  ├── types.js      → typeColors, accentColors
  └── Cards/
      ├── frontCard.js → createFrontCard()
      └── backCard.js  → createBackCard()
```

A animação funciona em duas etapas:

1. **Abrir** — um elemento *ghost* invisível ocupa o lugar original no grid; um `flipWrap` com `preserve-3d` é criado na posição do card e animado até o centro com `rotateY(180deg)`, revelando o backCard.
2. **Fechar** — o `flipWrap` anima de volta para a posição do ghost com `rotateY(0deg)`; após `transitionend`, o frontCard é devolvido ao grid e o ghost removido.

---

## 📚 Aprendizados Técnicos

- Animações 3D com CSS e controle via JavaScript (`transform-style: preserve-3d`, `backface-visibility`)
- Uso de `requestAnimationFrame` duplo para garantir que o browser pinte o estado inicial antes de aplicar transições
- Gerenciamento de estado de animação com variáveis de módulo (`_flipWrap`, `_ghost`)
- Separação de responsabilidades em módulos ES sem bundler
- Consumo assíncrono de API com `Promise.all` para requisições paralelas
- Boas práticas de versionamento com Conventional Commits

---

## 🔗 Deploy

Projeto publicado via **GitHub Pages**:

[PokeDex](https://flpzht.github.io/card-flip-overlay/)

---

## 👤 Autor

Felipe Carvalho
GitHub: [flpzht](https://github.com/flpzht)
LinkedIn: [Felipe](www.linkedin.com/in/felipecarvalhodesouzabarros)

---

Este projeto faz parte do meu processo contínuo de aprendizado e evolução como desenvolvedor Web.