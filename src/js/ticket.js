export default class Ticket {
  constructor(id, name, status, created) {
    this.init();
    this.id = id;
    this.name = name;
    this.status = status;
    this.created = created;
  }

  init() {
    this._ticketElement = document.createElement("DIV");
    this._ticketElement.classList.add("ticket");
    const mainElement = document.createElement("DIV");
    mainElement.classList.add("ticket__main");
    this.statusElement = document.createElement("div");
    this.statusElement.classList.add("ticket__status");
    mainElement.appendChild(this.statusElement);
    this.nameElement = document.createElement("DIV");
    this.nameElement.classList.add("ticket__name");
    mainElement.appendChild(this.nameElement);
    this.createdElement = document.createElement("DIV");
    this.createdElement.classList.add("ticket__created");
    mainElement.appendChild(this.createdElement);
    this.editButton = document.createElement("DIV");
    this.editButton.classList.add("ticket__edit-button");
    mainElement.appendChild(this.editButton);
    this.deleteButton = document.createElement("DIV");
    this.deleteButton.classList.add("ticket__delete-button");
    mainElement.appendChild(this.deleteButton);
    this._ticketElement.appendChild(mainElement);
    this.descriptionElement = document.createElement("DIV");
    this.descriptionElement.classList.add("ticket__details", "hidden");
    this._ticketElement.appendChild(this.descriptionElement);
  }

  get ticketElement() {
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
      this._created.getMonth() + 1
    }.${this._created.getFullYear()} ${this._created.getHours()}:${this._created.getMinutes()}`;
  }
}
