import { LitElement, html, css } from 'lit';
import './evolution-form.js';

class PokemonDetails extends LitElement {
  static styles = css`
    .details-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 20px;
    }
    .details-header {
      display: flex;
      justify-content: space-between;
      width: 100%;
      max-width: 800px;
      margin-bottom: 20px;
    }
    .details-content {
      display: flex;
      justify-content: space-between;
      width: 100%;
      max-width: 800px;
    }
    img {
      width: 150px;
      height: 150px;
      margin-bottom: 20px;
    }
    .evolutions-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-right: 20px;
    }
    .evolutions-container ul {
      list-style: none;
      padding: 0;
    }
    .evolutions-container li {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-bottom: 20px;
    }
    .form-container {
      width: 100%;
      max-width: 400px;
    }
    button {
      padding: 10px;
      background-color: #007bff;
      color: white;
      border: none;
      cursor: pointer;
      margin-bottom: 20px;
      width: 100px;
    }
    button:hover {
      background-color: #0056b3;
    }
  `;

  static properties = {
    pokemon: { type: Object }
  };

  constructor() {
    super();
    this.pokemon = {
      name: '',
      image: '',
      type: '',
      evolutions: []
    };
  }

  render() {
    return html`
      <div class="details-container" @save-evolution="${this._saveEvolution}">
        <div class="details-header">
          <button @click="${this._backToList}">Back</button>
          <h2>${this.pokemon.name}</h2>
        </div>
        <div class="details-content">
          <div class="evolutions-container">
            <img src="${this.pokemon.image}" alt="${this.pokemon.name}">
            <p>Type: ${this.pokemon.type}</p>
            ${this.pokemon.evolutions.length > 0 ? html`
              <div>
                <h3>Evolutions:</h3>
                <ul>
                  ${this.pokemon.evolutions
                    .filter(evo => evo.name !== this.pokemon.name)
                    .map(evo => html`
                      <li>
                        <img src="${evo.image}" alt="${evo.name}">
                        <p>${evo.name}</p>
                        <p>${evo.type}</p>
                      </li>
                    `)}
                </ul>
              </div>
            ` : html`
              <p>No evolutions available.</p>
            `}
          </div>
          <div class="form-container">
            ${this.pokemon.evolutions.length > 0 ? html`
              <evolution-form .evolution="${this.pokemon.evolutions[0]}"></evolution-form>
            ` : ''}
          </div>
        </div>
      </div>
    `;
  }

  _backToList() {
    const event = new CustomEvent('back-to-list');
    this.dispatchEvent(event);
  }

  _saveEvolution(event) {
    const updatedEvolution = event.detail.evolution;
    const updatedEvolutions = this.pokemon.evolutions.map(evo => 
      evo.name === updatedEvolution.name ? updatedEvolution : evo
    );
    this.pokemon = { ...this.pokemon, evolutions: updatedEvolutions };
    this.requestUpdate();
  }
}

customElements.define('pokemon-details', PokemonDetails);
