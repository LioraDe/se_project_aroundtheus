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

// ===================== Cached DOM Elements =====================
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

// Profile elements
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

// Preview modal elements (cached once)
const modalImage = popupImagePreview.querySelector(".modal__image");
const modalCaption = popupImagePreview.querySelector(".modal__caption");

// ===================== Initial Cards =====================
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

// ===================== Modal Functions =====================
function openModal(popup) {
  popup.classList.add("modal_opened");
}

function closeModal(popup) {
  popup.classList.remove("modal_opened");
}

// ===================== Card Functions =====================
function handleCardClick(name, link) {
  modalImage.src = link;
  modalImage.alt = name;
  modalCaption.textContent = name;
  openModal(popupImagePreview);
}

function createCard(data) {
  return new Card(data, "#card-template", handleCardClick).generateCard();
}

function renderInitialCards() {
  initialCards.forEach((item) => {
    const cardElement = createCard(item);
    cardsList.append(cardElement);
  });
}

// ===================== Event Listeners =====================
profileEditButton.addEventListener("click", () => {
  nameInput.value = profileTitle.textContent;
  descriptionInput.value = profileDescription.textContent;
  editProfileValidator.resetValidation();
  openModal(popupEditProfile);
});

profileAddButton.addEventListener("click", () => {
  formAddCard.reset();
  addCardValidator.resetValidation();
  openModal(popupAddCard);
});

// Close buttons
document.querySelectorAll(".modal__close").forEach((button) => {
  const popup = button.closest(".modal");
  button.addEventListener("click", () => closeModal(popup));
});

// Edit Profile Form
formEditProfile.addEventListener("submit", (evt) => {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = descriptionInput.value;
  closeModal(popupEditProfile);
});

// Add Card Form
formAddCard.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const newCard = createCard({
    name: cardNameInput.value,
    link: cardLinkInput.value,
  });
  cardsList.prepend(newCard);
  closeModal(popupAddCard);
});

// ===================== Validation =====================
const editProfileValidator = new FormValidator(
  validationConfig,
  formEditProfile,
);
const addCardValidator = new FormValidator(validationConfig, formAddCard);

editProfileValidator.enableValidation();
addCardValidator.enableValidation();

// ===================== Initialize =====================
renderInitialCards();
