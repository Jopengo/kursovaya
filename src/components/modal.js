export function openModal(popup) {
  popup.classList.add("popup_is-opened");
  popup.addEventListener("mousedown", closeOverlayModal);
  document.addEventListener("keydown", closePressEscape);
}

export function closeModal(popup) {
  popup.classList.remove("popup_is-opened");
  popup.removeEventListener("mousedown", closeOverlayModal);
  document.removeEventListener("keydown", closePressEscape);
}

function closeOverlayModal(evt) {
  if (evt.target === evt.currentTarget) {
    closeModal(evt.currentTarget);
  }
}

function closePressEscape(evt) {
  if (evt.key === "Escape") {
    closeModal(document.querySelector(".popup_is-opened"));
  }
}
