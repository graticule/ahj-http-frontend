import Ticket from "./ticket.js";

export default class TicketList {
  constructor(container) {
    this.container = container;
  }

  updateTickets(tickets) {
    this.container.innerHTML = "";
    console.log(tickets);
    tickets.forEach((ticket) => {
      new Ticket(this, ticket);
    });
  }

  getElement() {
    return this.container;
  }
}
