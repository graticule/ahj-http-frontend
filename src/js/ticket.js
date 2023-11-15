export default class Ticket {
  constructor(ticketList, { id, name, status, created }) {
    this.ticketList = ticketList;
    this.init();
    this.id = id;
    this.name = name;
    this.status = status;
    this.created = created;
    this.bindToDOM();
  }

  init() {
    this._ticketElement = document.createElement("DIV");
    this._ticketElement.classList.add("ticket");
    this.statusElement = document.createElement("div");
    this.statusElement.classList.add("ticket__status");
    this._ticketElement.appendChild(this.statusElement);
    const infoElement = document.createElement("DIV");
    infoElement.classList.add("ticket__info");
    this.nameElement = document.createElement("DIV");
    this.nameElement.classList.add("ticket__name");
    infoElement.appendChild(this.nameElement);
    this.descriptionElement = document.createElement("DIV");
    this.descriptionElement.classList.add("ticket__description", "hidden");
    infoElement.appendChild(this.descriptionElement);
    this._ticketElement.appendChild(infoElement);
    this.createdElement = document.createElement("DIV");
    this.createdElement.classList.add("ticket__created");
    this._ticketElement.appendChild(this.createdElement);
    this.editButton = document.createElement("DIV");
    this.editButton.classList.add("ticket__edit-button");
    this._ticketElement.appendChild(this.editButton);
    this.deleteButton = document.createElement("DIV");
    this.deleteButton.classList.add("ticket__delete-button");
    this._ticketElement.appendChild(this.deleteButton);
  }

  bindToDOM() {
    this.ticketList.getElement().appendChild(this.getElement());
  }

  getElement() {
    return this._ticketElement;
  }

  set id(value) {
    this._id = value;
    this._ticketElement.setAttribute("ticketId", this._id);
  }

  set status(value) {
    this._status = value;
    if (this._status) {
      this.statusElement.classList.add("ticket__status_checked");
    } else {
      this.statusElement.classList.remove("ticket__status_checked");
    }
  }

  set name(value) {
    this._name = value;
    this.nameElement.innerText = this._name;
  }

  set description(value) {
    this._description = value;
    this.descriptionElement.innerText = this._description;
  }

  set created(value) {
    this._created = new Date(value);
    this.createdElement.innerText = `${this._created.getDate()}.${
      this._created.getMonth() + 1 < 10 ? "0" : ""
    }${this._created.getMonth() + 1}.${this._created.getFullYear()} ${
      this._created.getHours() < 10 ? "0" : ""
    }${this._created.getHours()}:${
      this._created.getMinutes() < 10 ? "0" : ""
    }${this._created.getMinutes()}`;
  }
}
