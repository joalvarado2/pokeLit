export async function fetchPokemonData() {
  try {
    const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=40");
    const data = await response.json();
    const pokemonDataList = await Promise.all(
      data.results.map(async (pokemon) => {
        const pokemonResponse = await fetch(pokemon.url);
        const pokemonData = await pokemonResponse.json();
        
        // Obtener las evoluciones de cada Pokémon
        const speciesResponse = await fetch(pokemonData.species.url);
        const speciesData = await speciesResponse.json();
        
        const evolutionChainUrl = speciesData.evolution_chain.url;
        const evolutionChainResponse = await fetch(evolutionChainUrl);
        const evolutionChainData = await evolutionChainResponse.json();
        
        const evolutions = await extractEvolutions(evolutionChainData.chain);

        return {
          name: pokemonData.name,
          image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/shiny/${pokemonData.id}.png`,
          image1: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemonData.id}.svg`,
          image2: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${pokemonData.id}.png`,
          attack: getStatByName(pokemonData.stats, "attack"),
          defense: getStatByName(pokemonData.stats, "defense"),
          speed: getStatByName(pokemonData.stats, "speed"),
          evolutions: evolutions || []
        };
      })
    );
    return pokemonDataList;
  } catch (error) {
    console.error("Error al obtener los datos de la API de Pokémon:", error);
    return [];
  }
}

function getStatByName(stats, statName) {
  const stat = stats.find((stat) => stat.stat.name === statName);
  return stat ? stat.base_stat : null;
}

// Función para extraer las evoluciones desde la cadena de evolución
async function extractEvolutions(chain) {
  let evolutions = [];
  let currentChain = chain;

  while (currentChain && currentChain.evolves_to.length > 0) {
    const evolution = currentChain.evolves_to[0];
    const pokemonUrl = `https://pokeapi.co/api/v2/pokemon/${evolution.species.name}`;
    const pokemonResponse = await fetch(pokemonUrl);
    const pokemonData = await pokemonResponse.json();

    evolutions.push({
      name: evolution.species.name,
      image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${pokemonData.id}.png`,
      type: pokemonData.types.map(typeInfo => typeInfo.type.name).join('/')
    });
    currentChain = evolution;
  }

  return evolutions;
}
