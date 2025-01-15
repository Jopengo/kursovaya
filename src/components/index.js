import { initialCards } from "./cards.js";
import "../pages/index.css";
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);



// Функция открытия попапа
function openModal(popup) {
  popup.classList.add("popup_is-opened");
  popup.classList.add("popup_is-animated");
  document.addEventListener("keydown", handleEscClose); // Закрытие по Escape
}

// Функция закрытия попапа
function closeModal(popup) {
  popup.classList.remove("popup_is-opened");
  popup.classList.add("popup_is-animated");
  document.removeEventListener("keydown", handleEscClose); // Убираем обработчик Escape
}

// Обработчик закрытия попапа по Escape
function handleEscClose(evt) {
  if (evt.key === "Escape") {
    const openPopup = document.querySelector(".popup_is-opened");
    closeModal(openPopup);
  }
}

// Закрытие попапа при клике на кнопку закрытия
document.querySelectorAll(".popup__close").forEach(button => {
  button.addEventListener("click", (event) => {
    const popup = event.target.closest(".popup");
    closeModal(popup);
  });
});

// @todo: Темплейт карточки
const placesList = document.querySelector(".places__list");
const cardTemplate = document.querySelector("#card-template").content.querySelector(".card");

// @todo: Функция создания карточки
function createCard(cardData) {
    const cardElement = cardTemplate.cloneNode(true);

    // @todo: DOM узлы
    const cardImage = cardElement.querySelector(".card__image");
    const cardTitle = cardElement.querySelector(".card__title");
    const likeButton = cardElement.querySelector(".card__like-button");

    cardImage.src = cardData.link;
    cardImage.alt = cardData.name;
    cardTitle.textContent = cardData.name;

    // @todo: Функция лайка карточки
    likeButton.addEventListener("click", () => toggleLike(likeButton));

    // @todo: Функция удаления карточки
    const deleteButton = cardElement.querySelector(".card__delete-button");
    deleteButton.addEventListener("click", () => cardElement.remove());

    // Функция показа изображения в попапе
    cardImage.addEventListener("click", () => showImgPopup(cardImage));

    return cardElement;
}

// @todo: Функция обработки лайка
function toggleLike(likeButton) {
    likeButton.classList.toggle("card__like-button_is-active");
}

// @todo: Вывести карточки на страницу
function renderCards(cards) {
    cards.forEach((card) => {
        const cardElement = createCard(card);
        placesList.append(cardElement);
    });
}

renderCards(initialCards);

// Редактирование профиля
const editPopup = document.querySelector(".popup_type_edit");
const editForm = document.querySelector('form[name="edit-profile"]');
const profileEditButton = document.querySelector(".profile__edit-button");
const closeEditButton = editPopup.querySelector(".popup__close");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const nameInput = editForm.querySelector(".popup__input_type_name");
const jobInput = editForm.querySelector(".popup__input_type_description");

profileEditButton.addEventListener("click", () => {
    fillPopupInput();
    openModal(editPopup);
});

closeEditButton.addEventListener("click", () => {
    closeModal(editPopup);
});

function fillPopupInput() {
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileDescription.textContent;
}

// Функция редактирования профиля
function handleFormSubmit(evt) {
    evt.preventDefault(); // Предотвращаем стандартное поведение отправки формы
    profileTitle.textContent = nameInput.value; // Обновляем название профиля
    profileDescription.textContent = jobInput.value; // Обновляем описание профиля
    closeModal(editPopup); // Закрываем модальное окно после сохранения
}

// Привязываем событие submit к форме один раз
editForm.addEventListener("submit", handleFormSubmit);

// Добавление карточки
const profileAddButton = document.querySelector(".profile__add-button");
const popupNewCard = document.querySelector(".popup_type_new-card");
const popupClose = popupNewCard.querySelector(".popup__close");
const popupCardName = document.querySelector(".popup__input_type_card-name");
const popupCardUrl = document.querySelector(".popup__input_type_url");
const addForm = document.querySelector('form[name="new-place"]');

profileAddButton.addEventListener("click", () => {
    openModal(popupNewCard);
    addForm.reset();
});

popupClose.addEventListener("click", () => {
    closeModal(popupNewCard);
});

// Функция добавления карточки
function handleAddForm(evt) {
    evt.preventDefault(); // Предотвращаем стандартное поведение отправки формы
    const cardNameValue = popupCardName.value;
    const cardUrlValue = popupCardUrl.value;
    const newCard = createCard({ name: cardNameValue, link: cardUrlValue });
    placesList.prepend(newCard);
    addForm.reset();
    closeModal(popupNewCard);
}

addForm.addEventListener("submit", handleAddForm);

// Функция показа изображения в попапе
function showImgPopup(cardImage) {
  const imgPopup = document.querySelector(".popup_type_image");
  const zoomedPopupImage = imgPopup ? imgPopup.querySelector(".popup__image") : null;
  const imgPopupCaption = imgPopup ? imgPopup.querySelector(".popup__caption") : null;

    openModal(imgPopup); // Открыть попап
    zoomedPopupImage.src = cardImage.src; // Установить src изображения
    zoomedPopupImage.alt = cardImage.alt; // Установить alt изображения
    imgPopupCaption.textContent = cardImage.alt; // Установить подпись
  
}
