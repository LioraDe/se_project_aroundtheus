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
const profileEditCloseButton = profileEditModal.querySelector(".modal__close");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input",
);
const profileEditForm = profileEditModal.querySelector(".modal__form");

// Card elements
const cardTemplate = document.querySelector("#card__template").content;
const cardListEl = document.querySelector(".cards__list");

// Add card elements
const addCardButton = document.querySelector(".profile__add-button");
const addCardModal = document.querySelector("#add-card-modal");
const addCardCloseButton = addCardModal.querySelector(".modal__close");
const addCardForm = addCardModal.querySelector(".modal__form");
const cardTitleInput = addCardModal.querySelector("#card-title-input");
const cardLinkInput = addCardModal.querySelector("#card-link-input");

// Preview modal elements
const previewModal = document.querySelector(".modal_type_preview");
const previewImage = previewModal.querySelector(".modal__image");
const previewCaption = previewModal.querySelector(".modal__caption");
const previewCloseButton = previewModal.querySelector(".modal__close");

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

  // Like button
  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("card__like-button_active");
  });

  // Delete button
  deleteButton.addEventListener("click", () => {
    cardElement.remove();
  });

  // Image preview
  imageElement.addEventListener("click", () => {
    openPreviewModal(cardData.link, cardData.name);
  });

  return cardElement;
}

function renderInitialCards() {
  initialCards.forEach((cardData) => {
    const cardElement = getCardElement(cardData);
    cardListEl.prepend(cardElement);
  });
}

/* ==================== Profile Edit ==================== */
function handleProfileEditSubmit(e) {
  e.preventDefault();

  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;

  closeModal(profileEditModal);
}

/* ==================== Add Card ==================== */
function handleAddCardSubmit(e) {
  e.preventDefault();

  const newCardData = {
    name: cardTitleInput.value,
    link: cardLinkInput.value,
  };

  const cardElement = getCardElement(newCardData);
  cardListEl.prepend(cardElement);

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
// Profile modal
profileEditButton.addEventListener("click", () => {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  openModal(profileEditModal);
});

profileEditCloseButton.addEventListener("click", () =>
  closeModal(profileEditModal),
);
profileEditForm.addEventListener("submit", handleProfileEditSubmit);

// Add card modal
addCardButton.addEventListener("click", () => openModal(addCardModal));
addCardCloseButton.addEventListener("click", () => closeModal(addCardModal));
addCardForm.addEventListener("submit", handleAddCardSubmit);

// Preview modal
previewCloseButton.addEventListener("click", () => closeModal(previewModal));

// Overlay click (close on background)
function setOverlayCloseListeners() {
  const modals = document.querySelectorAll(".modal");
  modals.forEach((modal) => {
    modal.addEventListener("click", (evt) => {
      if (evt.target === modal) {
        closeModal(modal);
      }
    });
  });
}
setOverlayCloseListeners();

// Escape key
document.addEventListener("keydown", (evt) => {
  if (evt.key === "Escape") {
    const openedModal = document.querySelector(".modal_opened");
    if (openedModal) {
      closeModal(openedModal);
    }
  }
});

/* ==================== Initialization ==================== */
renderInitialCards();
