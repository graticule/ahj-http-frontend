import Ticket from "./ticket.js";

export default class TicketList {
  constructor(container) {
    this.container = container;
  }

  updateTickets(tickets) {
    this.container.innerHTML = "";
    console.log(tickets);
    tickets.forEach(({ id, name, status, created }) => {
      console.log(typeof status, status);
      const ticket = new Ticket(id, name, status, created);
      this.container.appendChild(ticket.ticketElement);
    });
  }

  get element() {
    return this.container;
  }
}
