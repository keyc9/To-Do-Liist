import resizeInput from "./resizeInput.js";

const resizeText = () => {

const tx = document.getElementsByTagName("textarea");
for (let i = 0; i < tx.length; i++) {
  tx[i].setAttribute(
    "style",
    "height:" + tx[i].scrollHeight + "px;overflow-y:_hidden;"
  );
  resizeInput(tx[i]);
  console.log("Resize text")
}
}

export default resizeText;