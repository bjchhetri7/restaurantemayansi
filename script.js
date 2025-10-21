const flagButtons = document.querySelectorAll('.flag-btn');

flagButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const page = btn.getAttribute('data-page');
    window.location.href = page;
  });
});


// Reservation form
const reservationForm = document.getElementById("reservationForm");
if (reservationForm) {
  reservationForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const guests = document.getElementById("guests").value;
    const date = document.getElementById("date").value;

    try {
      await emailjs.send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", {
        to_email: "owner@example.com",
        subject: "New Reservation - Restaurante Mayansi",
        message: `New reservation:\nName: ${name}\nEmail: ${email}\nGuests: ${guests}\nDate & Time: ${date}`,
      });

      alert("✅ Reservation successful!");
      e.target.reset();
    } catch (error) {
      console.error(error);
      alert("❌ Failed to send reservation email.");
    }
  });
}

// Contact form email sender
const contactForm = document.getElementById("contactForm");
if (contactForm) {
  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("contactName").value;
    const email = document.getElementById("contactEmail").value;
    const message = document.getElementById("contactMessage").value;

    try {
      await emailjs.send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", {
        to_email: "info@restaurante-mayansi.com",
        subject: "New Contact Message - Restaurante Mayansi",
        message: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
      });

      alert("✅ Message sent successfully!");
      e.target.reset();
    } catch (error) {
      console.error(error);
      alert("❌ Failed to send your message. Please try again.");
    }
  });
}




// ✅ Initialize cart from localStorage
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// ✅ Add to cart function
function addToOrder(itemName, price) {
  cart.push({ name: itemName, price: price });
  localStorage.setItem("cart", JSON.stringify(cart));
  alert(`${itemName} added to your cart!`);
}

// ✅ Display cart items (for cart.html)
function displayCart() {
  const cartContainer = document.getElementById("cartItems");
  const totalContainer = document.getElementById("cartTotal");

  if (!cartContainer) return; // only run on cart.html

  cartContainer.innerHTML = "";
  if (cart.length === 0) {
    cartContainer.innerHTML = "<p>Your cart is empty.</p>";
    totalContainer.textContent = "0";
    return;
  }

  let total = 0;
  cart.forEach((item, index) => {
    total += item.price;
    const div = document.createElement("div");
    div.classList.add("cart-item");
    div.innerHTML = `
      <p>${item.name} - $${item.price}</p>
      <button onclick="removeFromCart(${index})" class="remove-btn">Remove</button>
    `;
    cartContainer.appendChild(div);
  });

  totalContainer.textContent = total.toFixed(2);
}

// ✅ Remove item from cart
function removeFromCart(index) {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  displayCart();
}

// ✅ Checkout button
document.addEventListener("DOMContentLoaded", () => {
  const checkoutBtn = document.getElementById("checkoutBtn");
  if (checkoutBtn) {
    checkoutBtn.addEventListener("click", () => {
      alert("Proceeding to checkout...");
      window.location.href = "index.html#payment";
    });
  }

  displayCart();
});
