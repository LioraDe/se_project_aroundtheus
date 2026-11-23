import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import { initialCards, validationConfig } from "../utils/constants.js";
import "../pages/index.css";

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
