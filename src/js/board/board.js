import "./board.css";
import Column from "../column/column";
import Note from "../note/note";

export default class Board {
  constructor(container, content) {
    this.container = container;
    this.element = Board.createForContent(content);
    this.current = undefined;
    this.bindToDOM();
    this.init();
  }

  init() {
    this.placeholder = document.createElement("div");
    this.placeholder.classList.add("note", "note-placeholder");

    this.element.addEventListener("click", (e) => {
      e.preventDefault();
      if (e.target.closest(".note__close-button")) {
        e.target.closest(".note").remove();
        return false;
      }
      if (e.target.closest(".column__add-button")) {
        e.target.closest(".column__add-button").classList.add("hidden");
        e.target
          .closest(".column__footer")
          .querySelector(".column__add-form")
          .classList.remove("hidden");
        return false;
      }
      if (e.target.closest(".add-form__close-button")) {
        e.target
          .closest(".column__footer")
          .querySelector(".column__add-button")
          .classList.remove("hidden");
        e.target.closest(".column__add-form").classList.add("hidden");
        return false;
      }
      if (e.target.closest(".add-form__add-button")) {
        const formText = e.target
          .closest(".column__add-form")
          .querySelector(".add-form__text");
        const container = e.target.closest(".column").querySelector(".notes");
        if (formText.value !== "") {
          new Note(container, { text: formText.value });
        } else {
          return;
        }
        formText.value = "";
        e.target
          .closest(".column__footer")
          .querySelector(".column__add-button")
          .classList.remove("hidden");
        e.target.closest(".column__add-form").classList.add("hidden");
        return false;
      }
    });

    this.element.addEventListener("mousedown", (e) => {
      if (e.target.closest(".note__close-button")) return;
      if (e.target.closest(".note")) {
        document.body.style.cursor = "grabbing";
        this.startX = e.clientX;
        this.startY = e.clientY;
        this.current = e.target.closest(".note");
        this.current.after(this.placeholder);
        const { height, width } = this.current.getBoundingClientRect();
        this.current.style.width = width + "px";
        this.current.style.height = height + "px";
        this.placeholder.style.width = width + "px";
        this.placeholder.style.height = height + "px";
        this.current.classList.add("note__grabbed");
        const { top, left } = this.current.getBoundingClientRect();
        this.currentTop = top;
        this.currentLeft = left;
        return false;
      }
    });

    this.element.addEventListener("mousemove", (e) => {
      if (this.current) {
        e.preventDefault();
        this.current.style.top =
          this.currentTop + e.clientY - this.startY + "px";
        this.current.style.left =
          this.currentLeft + e.clientX - this.startX + "px";
        if (
          e.target.closest(".note") &&
          !e.target.closest(".note-placeholder")
        ) {
          const target = e.target.closest(".note");
          const { top, height } = target.getBoundingClientRect();
          if (e.clientY < top + height / 2) {
            target.before(this.placeholder);
          } else {
            target.after(this.placeholder);
          }
          return;
        }
        if (e.target.closest(".column__header")) {
          console.log("We are here");
          this.placeholder.remove();
          e.target
            .closest(".column")
            .querySelector(".notes")
            .insertAdjacentElement("afterbegin", this.placeholder);
          return;
        }
        if (e.target.closest(".column__footer")) {
          console.log("We are here");
          this.placeholder.remove();
          e.target
            .closest(".column")
            .querySelector(".notes")
            .insertAdjacentElement("beforeend", this.placeholder);
          return;
        }
      }
    });

    this.element.addEventListener("mouseover", (e) => {
      if (this.current) {
        e.preventDefault();
      }
    });

    this.element.addEventListener("mouseup", () => {
      if (this.current) {
        document.body.style.cursor = null;
        document.body.style.pointerEvents = null;
        this.current.classList.remove("note__grabbed");
        this.current.style.top = null;
        this.current.style.left = null;
        this.placeholder.replaceWith(this.current);
        this.current = undefined;
      }
    });
  }

  static createForContent(content) {
    if (content === undefined) {
      content = {
        columns: [
          {
            title: "TODO",
            notes: [],
          },
          {
            title: "IN PROGRESS",
            notes: [],
          },
          {
            title: "DONE",
            notes: [],
          },
        ],
      };
    }
    const result = document.createElement("div");
    result.classList.add("board");
    content.columns.forEach((column) => {
      new Column(result, column);
    });
    return result;
  }

  // static get markupDemo() {
  //   return `
  //   <div class="panel">
  //     <div class="column">
  //       <div class="column__header">
  //         <h4>TODO</h4>
  //         <div class="column__menu"></div>
  //       </div>
  //       <div class="cards">
  //         <div class="cards">Запись 1 столбец 1</div>
  //         <div class="cards">Запись 2 столбец 1</div>
  //         <div class="cards">Запись 3 столбец 1</div>
  //         <div class="cards">Запись 4 столбец 1</div>
  //         <div class="cards">Запись 5 столбец 1</div>
  //       </div>
  //       <div class="column__footer">
  //         Add another card
  //       </div>
  //     </div>
  //     <div class="column">
  //       <div class="column__header">
  //         <h4>IN PROGRESS</h4>
  //         <div class="column__menu"></div>
  //       </div>
  //       <div class="cards">
  //         <div class="cards">Запись 1 столбец 2</div>
  //       <div class="cards">Запись 2 столбец 2</div>
  //       <div class="cards">Запись 3 столбец 2</div>
  //       </div>
  //       <div class="column__footer">Add another card</div>
  //     </div>
  //     <div class="column">
  //       <div class="column__header">
  //         <h4>DONE</h4>
  //         <div class="column__menu"></div>
  //       </div>
  //       <div class="cards"></div>
  //       <div class="column__footer">Add another card</div>
  //     </div>
  //   </div>
  //     `;
  // }

  // bindToDOMDemo() {
  //   this.container.insertAdjacentHTML("beforeend", Board.markup);
  // }

  bindToDOM() {
    this.container.appendChild(this.element);
  }
}
