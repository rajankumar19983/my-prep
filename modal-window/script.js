"use strict";

//All elements are selected with which we will be interacting
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".close-modal");
const btnOpenModal = document.querySelectorAll(".show-modal");

//This is for simply removing "hidden" class from modal so that it can be visible
const openModal = function(){
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
}

//This is for adding "hidden" class to modal so that it can be hidden
const closeModal = function(){
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
}

//btnOpenModel contains 3 buttons with ".show-modal" class. So an click-eventListener is added to all those button which then triggers openModal function
for(let i=0; i < btnOpenModal.length; i++){
  btnOpenModal[i].addEventListener("click", openModal);
}

//This eventListener triggers closeModal function
btnCloseModal.addEventListener("click", closeModal);

//This eventListener also triggers closeModal function when clicked anywhere on overlay
overlay.addEventListener("click", closeModal);

//An eventListener is added to document, where if a key is presses once and if the key is "Escape" and modal does not contain "hidden" class then it triggers closeModal function.
document.addEventListener("keydown", function(e){
  if(e.key === "Escape" && !modal.classList.contains("hidden") ){
      closeModal();
  }
})