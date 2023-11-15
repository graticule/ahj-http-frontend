export default class Modal {
  constructor(type) {
    this.type = type;
    this.createModal();
  }

  createModal() {
    switch (this.type) {
      case "add":
        this.title = "Добавить тикет";
        break;
      case "edit":
        this.title = "Изменить тикет";
        break;
    }

    this.modal = document.createElement("div");
    this.modal.classList.add("modal-container");
    this.modal.innerHTML = `<div class="modal">
      <div class="modal__header">
        ${this.title}
      </div>
      <div class="modal__form">
        <form action="http://localhost:7070">
          <div class="modal__block">
            <label for="name">Краткое описание</label>
            <input type="text" name="name" id="name">
          </div>
          <div class="modal__block">
            <label for="description">Подробное описание</label>
            <input type="text" name="description" id="description">
          </div>
          <div class="modal__buttons">
            <button class="button modal__cancel-button">Отмена</button>
            <button class="button modal__ok-button">Ok</input>
          </div>
        </form>
      </div>
    </div>`;
  }

  get element() {
    return this.modal;
  }
}
