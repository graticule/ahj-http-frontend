import "../css/style.css";
import Modal from "./modal";

document.addEventListener("DOMContentLoaded", () => {
  const addTicketButton = document.querySelector(".add-button");

  const ticketsContainer = document.querySelector(".tickets");

  addTicketButton.addEventListener("click", () => {
    new Modal("add");
  });

  // subscribeForm.addEventListener("submit", (e) => {
  //   e.preventDefault();

  //   const body = new FormData(subscribeForm);
  //   // Array.from(subscribeForm.elements)
  //   //   .filter(({ name }) => name)
  //   //   .map(({ name, value }) => `${name}=${encodeURIComponent(value)}`)
  //   //   .join("&");

  //   const xhr = new XMLHttpRequest();

  //   xhr.onreadystatechange = function () {
  //     if (xhr.readyState !== 4) return;

  //     console.log(xhr.responseText);
  //   };

  //   xhr.open("POST", subscribeForm.getAttribute("action"));

  //   xhr.send(body);
  // });

  // unsubs.addEventListener("click", (e) => {
  //   e.preventDefault();

  //   const body = Array.from(subscribeForm.elements)
  //     .filter(({ name }) => name)
  //     .map(({ name, value }) => `${name}=${encodeURIComponent(value)}`)
  //     .join("&");

  //   const xhr = new XMLHttpRequest();

  //   xhr.onreadystatechange = function () {
  //     if (xhr.readyState !== 4) return;

  //     console.log(xhr.responseText);
  //   };

  //   xhr.open("DELETE", subscribeForm.getAttribute("action") + "?" + body);

  //   xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

  //   xhr.send();
  // });
});
