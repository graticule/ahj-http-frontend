export default class Modal {
  constructor(type) {
    this.type = type;
    this.init();
  }

  getModalHTML() {
    return `<div class="modal">
      <div class="modal__header">
        ${this.title}
      </div>
      <div class="modal__form">
        <form action="http://localhost:7070">
          <div class="modal__block">
            <label for="name">Краткое описание</label>
            <input class="input_name" type="text" name="name" id="name" required>
          </div>
          <div class="modal__block">
            <label for="description">Подробное описание</label>
            <textarea class="input_description" type="text" name="description" id="description"></textarea>
          </div>
          <div class="modal__buttons">
            <button class="button modal__cancel-button">Отмена</button>
            <button class="button modal__ok-button">Ok</input>
          </div>
        </form>
      </div>
    </div>`;
  }

  getDeleteModalHTML() {
    return `<div class="modal">
      <div class="modal__header">
        ${this.title}
      </div>
      <div class="modal__form">
        <div>Вы уверены, что хотите удалить тикет? Это действие необратимо.</div>
        <form action="http://localhost:7070">
          <div class="modal__buttons">
            <button class="button modal__cancel-button">Отмена</button>
            <button class="button modal__ok-button">Ok</input>
          </div>
        </form>
      </div>
    </div>`;
  }

  init() {
    this.modal = document.createElement("div");
    this.modal.classList.add("modal-container");
    switch (this.type) {
      case "add":
        this.title = "Добавить тикет";
        this.modal.innerHTML = this.getModalHTML();
        break;
      case "edit":
        this.title = "Изменить тикет";
        this.modal.innerHTML = this.getModalHTML();
        break;
      case "delete":
        this.title = "Удалить тикет";
        this.modal.innerHTML = this.getDeleteModalHTML();
    }
  }

  getElement() {
    return this.modal;
  }
}
