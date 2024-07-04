import { LitElement, html, css } from 'lit';

class EvolutionForm extends LitElement {
  static styles = css`
    form {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-top: 20px;
    }
    label {
      margin: 10px 0;
      width: 100%;
      max-width: 300px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    input[type="text"], input[type="checkbox"] {
      padding: 8px;
      margin-top: 5px;
      width: calc(100% - 100px);
    }
    button {
      padding: 10px;
      background-color: #007bff;
      color: white;
      border: none;
      cursor: pointer;
      margin-top: 10px;
      width: 100px;
    }
    button:hover {
      background-color: #0056b3;
    }
  `;

  static properties = {
    evolution: { type: Object }
  };

  constructor() {
    super();
    this.evolution = { name: '', type: '', image: '' };
  }

  render() {
    return html`
      <form @submit="${this._submitForm}">
        <label>
          Name:
          <input type="text" .value="${this.evolution.name}" @input="${this._updateName}">
        </label>
        <label>
          Type:
          <input type="text" .value="${this.evolution.type}" @input="${this._updateType}">
        </label>
        <label>
          Image:
          <input type="text" .value="${this.evolution.image}" @input="${this._updateImage}">
        </label>
        <label>
          Repeated:
          <input type="checkbox" @change="${this._showModal}">
        </label>
        <button type="submit">Save</button>
      </form>
    `;
  }

  // Método para actualizar el nombre de la evolución
  _updateName(e) {
    this.evolution = { ...this.evolution, name: e.target.value };
  }

  // Método para actualizar el tipo de la evolución
  _updateType(e) {
    this.evolution = { ...this.evolution, type: e.target.value };
  }

  // Método para actualizar la URL de la imagen de la evolución
  _updateImage(e) {
    this.evolution = { ...this.evolution, image: e.target.value };
  }

  // Método para mostrar un modal cuando se marca el checkbox de repetido
  _showModal(e) {
    if (e.target.checked) {
      alert('Este Pokémon está repetido. Puedes cambiarlo en el punto más cercano.');
    }
  }

  // Método para manejar el envío del formulario
  _submitForm(e) {
    e.preventDefault();
    this.dispatchEvent(new CustomEvent('save-evolution', {
      detail: { evolution: this.evolution },
      bubbles: true,
      composed: true
    }));
  }
}

// Definición del componente web custom con el nombre 'evolution-form'
customElements.define('evolution-form', EvolutionForm);
