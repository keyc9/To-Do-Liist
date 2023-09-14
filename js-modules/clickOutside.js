const clickOutside = function (elem, isClickedOutside) {
    if (isClickedOutside) {
      elem.classList.add("_hidden");
      console.log("outside click")
      document.removeEventListener("click", clickOutside);
      
    }
  };

  export default clickOutside