import { LitElement, html, css } from 'lit';
import { fetchPokemonData } from '../services/pokemon-service';

class CartaPokemon extends LitElement {

  static get styles() {
    return css`
      .carta-container {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
      }

      .carta {
        border: 1px solid #ccc;
        border-radius: 8px;
        padding: 16px;
        margin: 16px;
        width: 200px;
        text-align: center;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        transition: transform 0.3s ease, box-shadow 0.3s ease;
      }

      .carta:hover {
        transform: translateY(-5px);
        box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
      }

      .nombre {
        font-size: 18px;
        font-weight: bold;
        margin-bottom: 8px;
      }

      .imagen {
        width: 120px;
        height: 120px;
        margin: 0 auto;
        display: block;
        cursor: pointer; /* Agregamos cursor pointer para indicar que es clickeable */
        transition: transform 0.3s ease;
      }

      .imagen:hover {
        transform: scale(1.1);
      }

      .stats {
        margin-top: 12px;
      }

      .stat {
        margin: 6px 0;
      }
    `;
  }

  static get properties() {
    return {
      pokemonList: { type: Array },
    };
  }

  constructor() {
    super();
    this.pokemonList = [];
    this.fetchPokemon(); // Llamamos a la función para obtener los datos de los Pokémon
  }

  async fetchPokemon() {
    //asignamos los datos del pokemon
    this.pokemonList = await fetchPokemonData(); 
  }

  render() {
    return html`
      <div class="carta-container">
        ${this.pokemonList.map(pokemon => html`
          <div class="carta">
            <p class="nombre">${pokemon.name}</p>
            <!-- se agrega evento mouse y un data-index para identificar el pokemon -->
            <img 
              class="imagen" 
              src="${pokemon.image}" 
              alt="${pokemon.name}"
              @mouseenter="${(event) => this.changeImage(event, pokemon)}"
              data-index="${this.pokemonList.indexOf(pokemon)}"
            >
            <div class="stats">
              <p class="stat">Ataque: ${pokemon.attack}</p>
              <p class="stat">Defensa: ${pokemon.defense}</p>
              <p class="stat">Velocidad: ${pokemon.speed}</p>
            </div>
          </div>
        `)}
      </div>
    `;
  }

  changeImage(event, pokemon) {
    const index = event.target.dataset.index; // Obtenemos el índice del pokemon
    const updatedPokemonList = [...this.pokemonList]; // Creamos una copia de la lista de pokemon
    
    // Verificamos si la imagen actual es la imagen1 o imagen2 y actualizamos en consecuencia
    if (pokemon.image === pokemon.image1) {
      updatedPokemonList[index] = {
        ...pokemon,
        image: pokemon.image2 // Cambiamos la imagen por la imagen2
      };
    } else {
      updatedPokemonList[index] = {
        ...pokemon,
        image: pokemon.image1 // Cambiamos la imagen por la imagen1
      };
    }
    
    this.pokemonList = updatedPokemonList; // Actualizamos la lista de pokemon
  }
}

customElements.define('carta-pokemon', CartaPokemon);
