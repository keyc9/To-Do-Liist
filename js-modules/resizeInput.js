function resizeInput(e) {
    e.style.height = 0;
    e.style.height = e.scrollHeight + "px";
    console.log("Resize input" + e.scrollHeight)
  }

  export default resizeInput;