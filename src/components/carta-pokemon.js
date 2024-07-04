import { LitElement, html, css } from 'lit';
import { fetchPokemonData } from '../services/pokemon-service';
import './pokemon-details.js';
class CartaPokemon extends LitElement {
  static styles = css`
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
      cursor: pointer;
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

  static properties = {
    pokemonList: { type: Array },
    selectedPokemon: { type: Object }
  };

  constructor() {
    super();
    this.pokemonList = [];
    this.selectedPokemon = null;
    this.fetchPokemon();
  }

  async fetchPokemon() {
    //asignamos los datos del pokemon
    this.pokemonList = await fetchPokemonData();
  }

  render() {
    return html`
      ${this.selectedPokemon ? html`
        <!-- Si hay un Pokémon seleccionado, muestra los detalles del Pokémon -->
        <pokemon-details .pokemon="${this.selectedPokemon}" @back-to-list="${this._backToList}"></pokemon-details>
      ` : html`
        <!-- Si no hay un Pokémon seleccionado, muestra la lista de cartas de Pokémon -->
        <div class="carta-container">
          ${this.pokemonList.map(pokemon => html`
            <div class="carta" @click="${() => this._showDetails(pokemon)}">
              <p class="nombre">${pokemon.name}</p>
              <img 
                class="imagen" 
                src="${pokemon.image}" 
                alt="${pokemon.name}"
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
      `}
    `;
  }

  // Método para mostrar los detalles de un Pokémon seleccionado
  _showDetails(pokemon) {
    this.selectedPokemon = pokemon;
  }

  // Método para volver a la lista de cartas de Pokémon
  _backToList() {
    this.selectedPokemon = null;
  }
}
customElements.define('carta-pokemon', CartaPokemon);
