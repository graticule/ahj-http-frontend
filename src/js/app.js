import "../css/style.css";
import Modal from "./modal";
import TicketList from "./ticketList";

document.addEventListener("DOMContentLoaded", () => {
  const addTicketButton = document.querySelector(".add-button");

  const ticketList = new TicketList(document.querySelector(".tickets"));

  updateTickets();

  addTicketButton.addEventListener("click", addModal);

  ticketList.getElement().addEventListener("click", (e) => {
    e.preventDefault();
    if (e.target.closest(".ticket__delete-button")) {
      const id = e.target.closest(".ticket").getAttribute("ticketId");
      deleteModal(id);
      return;
    }

    if (e.target.closest(".ticket__edit-button")) {
      const id = e.target.closest(".ticket").getAttribute("ticketId");
      editModal(id);
      return;
    }
    if (e.target.closest(".ticket__name")) {
      const descriptionElement = e.target
        .closest(".ticket")
        .querySelector(".ticket__description");
      if (descriptionElement.classList.contains("hidden")) {
        const id = e.target.closest(".ticket").getAttribute("ticketId");
        const xhr = new XMLHttpRequest();

        xhr.addEventListener("load", () => {
          if (xhr.status >= 200 && xhr.status < 300) {
            try {
              const { description } = JSON.parse(xhr.responseText);

              descriptionElement.innerHTML = description;
            } catch (e) {
              console.error(e);
            }
          }
        });

        xhr.open("GET", `http://localhost:7070/?method=ticketById&id=${id}`);

        xhr.send();
        descriptionElement.classList.remove("hidden");
      } else {
        descriptionElement.classList.add("hidden");
      }
      return;
    }
    if (e.target.closest(".ticket__status")) {
      const checkbox = e.target.closest(".ticket__status");
      // checkbox.checked = !checkbox.checked;
      const id = e.target.closest(".ticket").getAttribute("ticketId");
      const formData = new FormData();
      formData.append("id", id);
      formData.append(
        "status",
        !checkbox.classList.contains("ticket__status_checked")
      );

      const xhr = new XMLHttpRequest();

      xhr.onreadystatechange = () => {
        if (xhr.readyState !== 4) return;
        updateTickets();
      };

      xhr.open("PUT", "http://localhost:7070/" + "?method=updateTicket");

      xhr.send(formData);
      return false;
    }
  });

  function updateTickets() {
    const xhr = new XMLHttpRequest();
    xhr.addEventListener("load", () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        try {
          const tickets = JSON.parse(xhr.responseText);
          ticketList.updateTickets(tickets);
        } catch (e) {
          console.error(e);
        }
      }
    });
    xhr.open("GET", "http://localhost:7070/?method=allTickets");
    xhr.send();
  }

  function addModal() {
    const modal = new Modal("add").getElement();
    document.body.appendChild(modal);

    const cancel = modal.querySelector(".modal__cancel-button");
    const form = modal.querySelector("form");

    cancel.addEventListener("click", (e) => {
      e.preventDefault();
      modal.remove();
    });

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const formData = new FormData(form);

      const xhr = new XMLHttpRequest();

      xhr.onreadystatechange = () => {
        if (xhr.readyState !== 4) return;
        modal.remove();
        updateTickets();
      };

      xhr.open("POST", form.getAttribute("action") + "?method=createTicket");

      xhr.send(formData);
    });
  }

  function editModal(id) {
    const modal = new Modal("edit").getElement();
    document.body.appendChild(modal);

    const cancel = modal.querySelector(".modal__cancel-button");
    const form = modal.querySelector("form");

    const xhr = new XMLHttpRequest();

    xhr.onreadystatechange = () => {
      if (xhr.readyState !== 4) return;
      try {
        const data = JSON.parse(xhr.responseText);
        modal.querySelector(`[name="name"]`).value = data.name;
        modal.querySelector(`[name="description"]`).value = data.description;
      } catch (e) {
        console.error(e);
      }
    };

    xhr.open(
      "GET",
      form.getAttribute("action") + `?method=ticketById&id=${id}`
    );
    xhr.send();

    cancel.addEventListener("click", (e) => {
      e.preventDefault();
      modal.remove();
    });

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const formData = new FormData(form);
      formData.append("id", id);

      const xhr = new XMLHttpRequest();

      xhr.onreadystatechange = () => {
        if (xhr.readyState !== 4) return;
        modal.remove();
        updateTickets();
      };

      xhr.open("PUT", form.getAttribute("action") + "?method=updateTicket");

      xhr.send(formData);
    });
  }

  function deleteModal(id) {
    const modal = new Modal("delete").getElement();
    document.body.appendChild(modal);

    const cancel = modal.querySelector(".modal__cancel-button");
    const form = modal.querySelector("form");

    cancel.addEventListener("click", (e) => {
      e.preventDefault();
      modal.remove();
    });

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const xhr = new XMLHttpRequest();

      xhr.onreadystatechange = () => {
        if (xhr.readyState !== 4) return;
        updateTickets();
        modal.remove();
      };

      xhr.open("DELETE", `http://localhost:7070/?method=deleteTicket&id=${id}`);

      xhr.send();
    });
  }
});
