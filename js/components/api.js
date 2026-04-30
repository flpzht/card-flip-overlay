function createPokemonAPI({ baseUrl, headers }) {
    const request = async (endpoint) => {
        const res = await fetch(`${baseUrl}${endpoint}`, { headers });

        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }

        return res.json();
    };

    const getInitialPokemon = (limit = 9) => request(`/pokemon?limit=${limit}`);

    const getPokemonById = (id) => request(`/pokemon/${id}`);
    
    const showPokemonInfo = (p) => {
        const number = p.id;
        const name = p.name;
        const img = p.sprites.other['official-artwork'].front_default;
        const types = p.types.map(t => t.type.name);

        return { number, name, img, types };
    };

    const loadPokemons = (list) => getInitialPokemon(list)
        .then(async (pokemonList) => {
            const pokemons = await Promise.all(pokemonList.results.map(p => getPokemonById(p.name)));
            return pokemons.map(showPokemonInfo);
        }).catch(error => {
            console.error('Error loading Pokémon data:', error);
        });

    const getAppInfo = async () => Promise.all([getInitialPokemon(), getPokemonById(id)]);

    return {
        getInitialPokemon,
        getPokemonById,
        showPokemonInfo,
        loadPokemons,
        getAppInfo,
    };
}

export const pokemonAPI = createPokemonAPI({
    baseUrl: 'https://pokeapi.co/api/v2',
    headers: { 'Content-Type': 'application/json' },
});

// pokemonAPI.loadPokemons(2).then(console.log);
pokemonAPI.getPokemonById(1).then(console.log);

// pokemonAPI.loadPokemons(2)
// .then(pokemons => {
//     pokemons.forEach(({number, name, img, types}) => {
//         console.log(`Number: ${number}, Name: ${name}, Image: ${img}, Types: ${types}`);
//     });
// });