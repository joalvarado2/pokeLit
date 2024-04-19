// Esta función que obtiene lo datos del pokemon
export async function fetchPokemonData() {
  try {
    const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=40");
    const data = await response.json();
    //solicito en paralelo de cada pokemon (doble fetch)
    const pokemonDataList = await Promise.all(
      data.results.map(async (pokemon) => {
        const pokemonResponse = await fetch(pokemon.url);
        return pokemonResponse.json();
      })
    );
    // Mapea sobre los datos de Pokémon obtenidos y devuelve un objeto con información específica de cada Pokémon
    return pokemonDataList.map((pokemonData) => ({
      name: pokemonData.name, // Nombre del Pokémon
      image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/shiny/${pokemonData.id}.png`, // URL de la imagen 2 del Pokémon
      image1: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemonData.id}.svg`, // URL de la imagen 1 del Pokémon
      image2: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${pokemonData.id}.png`, // URL de la imagen 2 del Pokémon
      attack: getStatByName(pokemonData.stats, "attack"), // Estadística de ataque del Pokémon
      defense: getStatByName(pokemonData.stats, "defense"), // Estadística de defensa del Pokémon
      speed: getStatByName(pokemonData.stats, "speed"), // Estadística de velocidad del Pokémon
    }));
    
  } catch (error) {
    console.error("Error al obtener los datos de la API de Pokémon:", error);
    return [];
  }
}

// Esta función busca una estadística específica por nombre en un array de estadísticas
function getStatByName(stats, statName) {
  // Busca la estadística que coincide con el nombre proporcionado
  const stat = stats.find((stat) => stat.stat.name === statName);
  return stat ? stat.base_stat : null;
}
