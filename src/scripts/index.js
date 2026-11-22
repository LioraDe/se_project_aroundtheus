import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import "../pages/index.css";
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

const formEditProfile = document.querySelector("#edit-profile-form");
const formAddCard = document.querySelector("#add-card-form");

const nameInput = formEditProfile.querySelector('[name="title"]');
const descriptionInput = formEditProfile.querySelector('[name="description"]');

const cardsList = document.querySelector(".cards__list");

// ===================== User Info Instance =====================
const userInfo = new UserInfo({
  nameSelector: ".profile__title",
  jobSelector: ".profile__description",
});

// ===================== Popup Instances =====================
const imagePopup = new PopupWithImage(".modal_type_preview");
imagePopup.setEventListeners();

const profilePopup = new PopupWithForm("#profile-edit-modal", (inputValues) => {
  userInfo.setUserInfo({
    name: inputValues.title,
    job: inputValues.description,
  });
  profilePopup.close();
});
profilePopup.setEventListeners();

const addCardPopup = new PopupWithForm("#add-card-modal", (inputValues) => {
  const newCard = createCard({
    name: inputValues.title,
    link: inputValues.link,
  });

  cardSection.addItem(newCard);

  formAddCard.reset();
  addCardValidator.resetValidation();
  addCardPopup.close();
});
addCardPopup.setEventListeners();

// ===================== Validators =====================
const editProfileValidator = new FormValidator(
  validationConfig,
  formEditProfile,
);
const addCardValidator = new FormValidator(validationConfig, formAddCard);

editProfileValidator.enableValidation();
addCardValidator.enableValidation();

// ===================== Initial Cards Data =====================
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

// ===================== Card Helpers =====================
function handleCardClick(name, link) {
  imagePopup.open({ name, link });
}

function createCard(data) {
  return new Card(data, "#card-template", handleCardClick).generateCard();
}

const cardSection = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      cardSection.addItem(createCard(item));
    },
  },
  ".cards__list",
);

// ===================== Event Listeners =====================
profileEditButton.addEventListener("click", () => {
  const currentUserInfo = userInfo.getUserInfo();
  nameInput.value = currentUserInfo.name;
  descriptionInput.value = currentUserInfo.job;

  editProfileValidator.resetValidation();
  profilePopup.open();
});

profileAddButton.addEventListener("click", () => {
  addCardValidator.resetValidation();
  addCardPopup.open();
});

// ===================== Initialize =====================
cardSection.renderItems();
