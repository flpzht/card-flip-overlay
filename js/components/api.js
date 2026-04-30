function createPokemonAPI({ baseUrl, headers }) {
    const request = async (endpoint) => {
        const res = await fetch(`${baseUrl}${endpoint}`, { headers });

        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }

        return res.json();
    };

    const loadInitialPokemon = (limit = 9) => request(`/pokemon?limit=${limit}`);

    const loadPokemonById = (id) => request(`/pokemon/${id}`);
    
    const showPokemonInfo = (pokemon) => {
        const number = pokemon.id;
        const name = pokemon.name;
        const img = pokemon.sprites.front_default;
        const types = pokemon.types.map(t => t.type.name).join(', ');

        return { number, name, img, types };
    };

    const getAppInfo = async () => Promise.all([loadInitialPokemon(), loadPokemonById(id)]);

    return {
        loadInitialPokemon,
        loadPokemonById,
        showPokemonInfo,
        getAppInfo,
    };
}

export const pokemonAPI = createPokemonAPI({
    baseUrl: 'https://pokeapi.co/api/v2',
    headers: { 'Content-Type': 'application/json' },
});


pokemonAPI.loadInitialPokemon()
.then(async (pokemonList) => {
    const pokemons = await Promise.all(pokemonList.results.map(p => pokemonAPI.loadPokemonById(p.name)));
    return pokemons.map(pokemonAPI.showPokemonInfo);
});