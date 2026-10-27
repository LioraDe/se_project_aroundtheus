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

const cardTemplate = document.querySelector("#card__template").content;
const cardListEl = document.querySelector(".cards__list");
/* Functions*/
function closePopup() {
  profileEditModal.classList.remove("modal_opened");
}
function getCardElement(cardData) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);

  // Set card data
  cardElement.querySelector(".card__title").textContent = cardData.name;
  const imageElement = cardElement.querySelector(".card__image");
  imageElement.src = cardData.link;
  imageElement.alt = cardData.name;

  // Delete button
  const deleteButton = cardElement.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", () => {
    cardElement.remove();
  });
  // Like button
  const likeButton = cardElement.querySelector(".card__like-button");
  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("card__like-button_active");
  });
  // Image preview click
  imageElement.addEventListener("click", () => {
    openPreviewModal(imageElement.src, imageElement.alt);
  });

  return cardElement;
}

function handleProfileEditSubmit(e) {
  e.preventDefault();

  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;

  closePopup();
}
/* Event Handlers*/
profileEditButton.addEventListener("click", () => {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  profileEditModal.classList.add("modal_opened");
});
/* Event Listeners*/
profileEditCloseButton.addEventListener("click", closePopup);
profileEditForm.addEventListener("submit", handleProfileEditSubmit);

initialCards.forEach((cardData) => {
  const cardElement = getCardElement(cardData);
  cardListEl.prepend(cardElement);
});
// ======================  CARD MODAL ======================

const addCardButton = document.querySelector(".profile__add-button");
const addCardModal = document.querySelector("#add-card-modal");
const addCardCloseButton = addCardModal.querySelector(".modal__close");
const addCardForm = addCardModal.querySelector(".modal__form");
const cardTitleInput = addCardModal.querySelector("#card-title-input");
const cardLinkInput = addCardModal.querySelector("#card-link-input");

// Open Add Card Modal
addCardButton.addEventListener("click", () => {
  addCardModal.classList.add("modal_opened");
});

// Close Add Card Modal
addCardCloseButton.addEventListener("click", () => {
  addCardModal.classList.remove("modal_opened");
});

// Handle Add Card Form Submit
addCardForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const newCardData = {
    name: cardTitleInput.value,
    link: cardLinkInput.value,
  };

  const cardElement = getCardElement(newCardData);
  cardListEl.prepend(cardElement);

  addCardForm.reset();
  addCardModal.classList.remove("modal_opened");
});
// Preview modal elements
const previewModal = document.querySelector(".modal_type_preview");
const previewImage = previewModal.querySelector(".modal__image");
const previewCaption = previewModal.querySelector(".modal__caption");

// Function to open the image preview
function openPreviewModal(imageSrc, imageAlt = "") {
  previewImage.src = imageSrc;
  previewImage.alt = imageAlt;
  previewCaption.textContent = imageAlt;

  previewModal.classList.add("modal_opened");
}
// Close preview modal
function closePreviewModal() {
  const previewModal = document.querySelector(".modal_type_preview");
  previewModal.classList.remove("modal_opened");
}

// Close button
const previewCloseButton = document.querySelector(
  ".modal_type_preview .modal__close",
);
previewCloseButton.addEventListener("click", closePreviewModal);

// Optional but recommended: Close with Escape key
document.addEventListener("keydown", (evt) => {
  if (evt.key === "Escape") {
    const openedModal = document.querySelector(".modal_opened");
    if (openedModal) {
      openedModal.classList.remove("modal_opened");
    }
  }
});
