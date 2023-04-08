const sortableList = document.querySelectorAll(".sortable-list");
const items = sortableList.querySelectorAll(".item");

items.forEach(items => {
    items.addEventListener("dragstart", () => {
        setTimeout(items.classList.add("dragging"), 0);
    });
    items.addEventListener("dragend", () => items.classList.remove("dragging"));
});

const initSortableList = (e) => {
    e.preventDefault();
    const draggingItem = sortableList.querySelector(".dragging");
    const siblings = [...sortableList.querySelectorAll(".item:not(.dragging)")];

    let nextSibling = siblings.find(siblings => {
        return e.clientY <= siblings.offsetTop + siblings.offsetHeight / 2;
    })

}
    sortableList.addEventListener("dragover", initSortableList);
    sortableList.addEventListener("dragenter", e => e.preventDefault());