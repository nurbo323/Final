//Contact Page
document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");
  if (form) {
    form.addEventListener("submit", e => {
      e.preventDefault();

      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const message = document.getElementById("message").value.trim();

      if (!name || !email || !message) {
        alert("⚠️ Please fill in all required fields!");
        return;
      }

      if (!email.includes("@") || !email.includes(".")) {
        alert("❌ Please enter a valid email address!");
        return;
      }

      alert("✅ Message sent successfully!");
      form.reset();
    });
  }
});

//Background change
function changeBackground() {
  const colors = ["#0a0a0f", "#001f3f", "#0d0d12", "#111", "#002b36"];
  document.body.style.background = colors[Math.floor(Math.random() * colors.length)];
}

// date and time
function showDateTime() {
  const now = new Date();
  const formatted = now.toLocaleString("en-US", {
    dateStyle: "long",
    timeStyle: "medium"
  });
  const dateBox = document.getElementById("datetime");
  if (dateBox) dateBox.textContent = formatted;
}
setInterval(showDateTime, 1000);

//POPUP
function openPopup() {
  const popup = document.getElementById("popup");
  if (popup) popup.style.display = "flex";
}
function closePopup() {
  const popup = document.getElementById("popup");
  if (popup) popup.style.display = "none";
}

//FAQ
document.addEventListener("DOMContentLoaded", () => {
  const questions = document.querySelectorAll(".question");
  questions.forEach(q => {
    q.addEventListener("click", () => {
      q.nextElementSibling.classList.toggle("active");
    });
  });
});
