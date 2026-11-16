import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";

const validationConfig = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_active",
};

const profileEditButton = document.querySelector("#profile-edit-button");
const profileAddButton = document.querySelector(".profile__add-button");
const popupEditProfile = document.querySelector("#profile-edit-modal");
const popupAddCard = document.querySelector("#add-card-modal");
const popupImagePreview = document.querySelector(".modal_type_preview");
const formEditProfile = document.querySelector("#edit-profile-form");
const formAddCard = document.querySelector("#add-card-form");
const nameInput = document.querySelector("#profile-title-input");
const descriptionInput = document.querySelector("#profile-description-input");
const cardNameInput = document.querySelector("#card-title-input");
const cardLinkInput = document.querySelector("#card-link-input");
const cardsList = document.querySelector(".cards__list");

const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

const editProfileValidator = new FormValidator(
  validationConfig,
  formEditProfile,
);
const addCardValidator = new FormValidator(validationConfig, formAddCard);
editProfileValidator.enableValidation();
addCardValidator.enableValidation();

function openModal(popup) {
  if (!popup) return;
  popup.style.cssText =
    "display:flex !important; visibility:visible !important; opacity:1 !important;";
  popup.classList.add("modal_opened");
}

function closeModal(popup) {
  if (!popup) return;
  popup.classList.remove("modal_opened");
  popup.style.cssText = "";
}

function handleCardClick(name, link) {
  const img = popupImagePreview.querySelector(".modal__image");
  const cap = popupImagePreview.querySelector(".modal__caption");
  img.src = link;
  img.alt = name;
  cap.textContent = name;
  openModal(popupImagePreview);
}

function createCard(data) {
  return new Card(data, "#card-template", handleCardClick).generateCard();
}

initialCards.forEach((data) => cardsList.append(createCard(data)));

profileEditButton?.addEventListener("click", () => {
  nameInput.value = document.querySelector(".profile__title").textContent;
  descriptionInput.value = document.querySelector(
    ".profile__description",
  ).textContent;
  editProfileValidator.resetValidation();
  openModal(popupEditProfile);
});

profileAddButton?.addEventListener("click", () => {
  formAddCard.reset();
  addCardValidator.resetValidation();
  openModal(popupAddCard);
});

document.querySelectorAll(".modal__close").forEach((btn) => {
  btn.addEventListener("click", () => closeModal(btn.closest(".modal")));
});

formEditProfile.addEventListener("submit", (e) => {
  e.preventDefault();
  document.querySelector(".profile__title").textContent = nameInput.value;
  document.querySelector(".profile__description").textContent =
    descriptionInput.value;
  closeModal(popupEditProfile);
});

formAddCard.addEventListener("submit", (e) => {
  e.preventDefault();
  cardsList.prepend(
    createCard({ name: cardNameInput.value, link: cardLinkInput.value }),
  );
  closeModal(popupAddCard);
});
