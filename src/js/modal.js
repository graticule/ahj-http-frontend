export default class Modal {
  constructor(type, id = null) {
    this.type = type;
    this.id = id;
    this.closeModal = this.closeModal.bind(this);
    this.createModal();
    document.body.appendChild(this.modal);
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
    this.cancel = this.modal.querySelector(".modal__cancel-button");
    this.form = this.modal.querySelector("form");

    this.cancel.addEventListener("click", (e) => {
      e.preventDefault();
      this.closeModal();
    });

    this.form.addEventListener("submit", (e) => {
      e.preventDefault();
      const formData = new FormData(this.form);
      formData.append("id", this.id);

      const xhr = new XMLHttpRequest();

      xhr.onreadystatechange = () => {
        if (xhr.readyState !== 4) return;
        this.closeModal();
      };

      switch (this.type) {
        case "add":
          xhr.open("POST", this.form.getAttribute("action") + "?method=createTicket");
          break;
        case "edit":
          formData.append("method", "updateTicket");

          xhr.open("PUT", this.form.getAttribute("action") + "?method=updateTicket");
          break;
      }

      xhr.send(formData);
    });
  }

  closeModal() {
    this.modal.remove();
  }
}
