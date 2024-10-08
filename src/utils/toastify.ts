import Toastify from "toastify-js";
import "toastify-js/src/toastify.css"; // Import the CSS for styling

export const showToast = (message: string) => {
  Toastify({
    text: message,
    duration: 3000, // Duration in milliseconds
    close: true, // Show close button
    gravity: "top", // "top" or "bottom"
    position: "right", // "left", "center" or "right"
    backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)",
    stopOnFocus: true, // Stop when the user hovers over the toast
  }).showToast();
};
