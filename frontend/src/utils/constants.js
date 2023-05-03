export const validationSettings = {
  formSelector: ".form",
  inputSelector: ".form__input",
  submitButtonSelector: ".form__button",
  inactiveButtonClass: "form__button_disabled",
  inputErrorClass: "form__input_type_error",
  errorClass: "form__error-message_active",
};

export const popups = {
  editProfilePopupSelector: ".popup_type_edit-profile",
  addPhotoCardPopupSelector: ".popup_type_add-photo-card",
  imagePopupSelector: ".popup_type_image",
  deleteConfirmationPopupSelector: ".popup_type_delete-confirmation",
  updateAvatarPopupSelector: ".popup_type_update-avatar",
};

export const validations = {};

/* Dom Elements */

// Elements
export const profileName = document.querySelector(".profile__name");
export const profileDescription = document.querySelector(".profile__description");
export const profileAvatar = document.querySelector(".profile__image");
export const photosContainer = document.querySelector(".photos__inner");

// Buttons
export const editProfileBtn = document.querySelector(".profile__edit");
export const addPhotoCardBtn = document.querySelector(".profile__add-photo-card");
export const editAvatarBtn = document.querySelector(".profile__overlay");

// Form
export const editProfileForm = document.forms["editProfile"];
export const userName = editProfileForm.elements["userName"];
export const jobDescription = editProfileForm.elements["jobDescription"];

