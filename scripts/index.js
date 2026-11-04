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

// Profile elements
const profileEditButton = document.querySelector("#profile-edit-button");
const profileEditModal = document.querySelector("#profile-edit-modal");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input",
);
const profileEditForm = document.querySelector("#edit-profile-form");

// Card elements
const cardTemplate = document.querySelector("#card__template").content;
const cardListEl = document.querySelector(".cards__list");

// Add card elements
const addCardButton = document.querySelector(".profile__add-button");
const addCardModal = document.querySelector("#add-card-modal");
const addCardForm = document.querySelector("#add-card-form");
const cardTitleInput = addCardModal.querySelector("#card-title-input");
const cardLinkInput = addCardModal.querySelector("#card-link-input");

// Preview modal elements
const previewModal = document.querySelector(".modal_type_preview");
const previewImage = previewModal.querySelector(".modal__image");
const previewCaption = previewModal.querySelector(".modal__caption");

/* ==================== Modal Functions ==================== */
function openModal(modal) {
  modal.classList.add("modal_opened");
}

function closeModal(modal) {
  modal.classList.remove("modal_opened");
}

/* ==================== Card Functions ==================== */
function getCardElement(cardData) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const imageElement = cardElement.querySelector(".card__image");
  const titleElement = cardElement.querySelector(".card__title");
  const likeButton = cardElement.querySelector(".card__like-button");
  const deleteButton = cardElement.querySelector(".card__delete-button");

  titleElement.textContent = cardData.name;
  imageElement.src = cardData.link;
  imageElement.alt = cardData.name;

  likeButton.addEventListener("click", () =>
    likeButton.classList.toggle("card__like-button_active"),
  );
  deleteButton.addEventListener("click", () => cardElement.remove());
  imageElement.addEventListener("click", () =>
    openPreviewModal(cardData.link, cardData.name),
  );

  return cardElement;
}

function renderInitialCards() {
  initialCards.forEach((cardData) => {
    cardListEl.prepend(getCardElement(cardData));
  });
}

/* ==================== Form Handlers ==================== */
function handleProfileEditSubmit(e) {
  e.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closeModal(profileEditModal);
}

function handleAddCardSubmit(e) {
  e.preventDefault();
  const newCard = { name: cardTitleInput.value, link: cardLinkInput.value };
  cardListEl.prepend(getCardElement(newCard));
  addCardForm.reset();
  closeModal(addCardModal);
}

/* ==================== Preview Modal ==================== */
function openPreviewModal(imageSrc, imageAlt) {
  previewImage.src = imageSrc;
  previewImage.alt = imageAlt;
  previewCaption.textContent = imageAlt;
  openModal(previewModal);
}

/* ==================== Event Listeners ==================== */
profileEditButton.addEventListener("click", () => {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  resetValidation(profileEditForm);
  openModal(profileEditModal);
});

profileEditForm.addEventListener("submit", handleProfileEditSubmit);

addCardButton.addEventListener("click", () => {
  resetValidation(addCardForm);
  openModal(addCardModal);
});

addCardForm.addEventListener("submit", handleAddCardSubmit);

// Close buttons + overlay + Escape
document.querySelectorAll(".modal__close").forEach((btn) => {
  btn.addEventListener("click", () => closeModal(btn.closest(".modal")));
});

document.querySelectorAll(".modal").forEach((modal) => {
  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal(modal);
  });
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    const opened = document.querySelector(".modal_opened");
    if (opened) closeModal(opened);
  }
});

/* ==================== Initialization ==================== */
renderInitialCards();

const validationConfig = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_active",
};

enableValidation(validationConfig);
