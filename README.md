# 🃏 Pokémon Card Flip

Projeto de cards interativos de Pokémon com animação de flip 3D. Ao clicar em um card, ele se expande para o centro da tela e revela detalhes do Pokémon: número, tipo(s) e artwork oficial — com transições suaves em CSS. Os dados são consumidos em tempo real da [PokéAPI](https://pokeapi.co/).

---

## ✨ Funcionalidades

- Grid 3×2 de cards com skeleton de loading
- Animação flip 3D ao abrir e fechar
- Expansão do card para o centro da tela com overlay escurecido
- Fechamento pelo botão `×` ou clicando fora do card
- Cores de tipo dinâmicas (18 tipos de Pokémon)
- Cor de destaque única por card

---

## 🗂 Estrutura de pastas

```
pokemon-card-flip/
├── index.html
├── assets/
│   ├── poke-icon.png
│   └── Pokdex_logo.webp
├── css/
│   ├── index.css           ← importa todos os blocos
│   └── blocks/
│       ├── base.css        ← reset e layout global
│       ├── header.css      ← logo e cabeçalho
│       ├── scene.css       ← container 3D e grid
│       ├── card.css        ← card, faces, skeleton, ghost
│       └── overlay.css     ← fundo escurecido
└── js/
    ├── index.js            ← ponto de entrada
    ├── api.js              ← chamadas à PokéAPI
    ├── card.js             ← construção do HTML dos cards
    ├── animation.js        ← lógica de flip e transições
    └── types.js            ← paletas de cores por tipo
```

---

## 🚀 Como rodar

O projeto usa **ES Modules** nativos (`import`/`export`), então é necessário servir os arquivos via HTTP, abrir o `index.html` diretamente no navegador não funcionará por restrições de CORS.

### Opção 1 — VS Code Live Server

Instale a extensão [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) e clique em **Go Live**.

### Opção 2 — Node.js `serve`

```bash
npx serve .
```

### Opção 3 — Python

```bash
# Python 3
python -m http.server 5500
```

Acesse `http://localhost:5500` no navegador.

---

## 🔌 API

Os dados são obtidos da [PokéAPI v2](https://pokeapi.co/). Nenhuma chave de API é necessária.

| Endpoint usado | Descrição |
|---|---|
| `GET /pokemon/{id}` | Dados, sprites e tipos do Pokémon |

Para alterar os Pokémon exibidos, edite o array `POKEMON_IDS` em `js/index.js`:

```js
const POKEMON_IDS = [1, 2, 3, 4, 5, 6]; // aceita IDs ou nomes
```

---

## 🎨 Personalização

| O que mudar | Onde |
|---|---|
| Pokémon exibidos | `js/index.js` → `POKEMON_IDS` |
| Cores de destaque dos cards | `js/types.js` → `accentColors` |
| Paleta de cores por tipo | `js/types.js` → `typeColors` |
| Velocidade das animações | `js/animation.js` → valores de `transition` |
| Tamanho do card expandido | `js/animation.js` → `popW` |
| Layout do grid | `css/blocks/scene.css` → `.grid` |

---

## 🧩 Arquitetura JS

O JavaScript é dividido em módulos ES com responsabilidades claras:

```
index.js
  ├── api.js        → fetchMultiplePokemon()
  ├── card.js       → buildCard()
  ├── animation.js  → openNew() / closeCard()
  └── types.js      → typeColors / accentColors
```

A animação funciona em duas etapas:

1. **Abrir** — um elemento *ghost* (invisível) ocupa o lugar original do card no grid; o card real é movido para a `scene` e transicionado até o centro com `rotateY(180deg)`.
2. **Fechar** — o card reverte posição e rotação; ao fim da `transitionend`, é devolvido ao `wrap` e o ghost é removido.

---

## 🛠 Tecnologias

- HTML5 semântico
- CSS3 — Grid, `perspective`, `transform-style: preserve-3d`, `backface-visibility`
- JavaScript ES Modules (sem bundler)
- [PokéAPI](https://pokeapi.co/) — REST API pública

---

## 📄 Licença

MIT — livre para uso pessoal e comercial.

---

Feito por [Felipe Carvalho](https://github.com/flpzht) · 2026