document.addEventListener("DOMContentLoaded", function () {
  const convertBtn = document.getElementById("convert-btn");
  const result = document.getElementById("result");
  const amountFrom = document.getElementById("amount-from");
  const amountTo = document.getElementById("amount-to");
  const currencyFrom = document.getElementById("currency-from");
  const currencyTo = document.getElementById("currency-to");

  // Cash sound - you'll need to replace this with your own sound file
  const cashSound = new Audio("/api/placeholder/1/1");
  cashSound.preload = "auto";

  // Show initial result
  result.classList.add("show");

  // Convert button click event
  convertBtn.addEventListener("click", function () {
    // Play cash sound
    try {
      cashSound.currentTime = 0;
      cashSound.play();

      // Stop sound after 5 seconds
      setTimeout(() => {
        cashSound.pause();
      }, 5000);
    } catch (e) {
      console.log("Sound playback failed:", e);
    }

    // Create money animation
    createMoneyAnimation();

    // For demo purposes only - in a real app you would calculate the actual conversion
    const fromValue = parseFloat(amountFrom.value) || 0;
    // Demo conversion rate - USD to EUR is approximately 0.93
    const conversionRate = 0.93;
    const toValue =
      currencyFrom.value === "USD" && currencyTo.value === "EUR"
        ? (fromValue * conversionRate).toFixed(2)
        : (fromValue * 1.5).toFixed(2); // Dummy conversion

    amountTo.value = toValue;

    // Update result
    result.textContent = `${amountFrom.value} ${currencyFrom.value} = ${toValue} ${currencyTo.value}`;
    result.classList.add("show");
  });

  // Function to create money animation
  function createMoneyAnimation() {
    // Clear any existing money elements
    document.querySelectorAll(".bill, .coin").forEach((elem) => elem.remove());

    // Create 20 bills (dropping from top)
    for (let i = 0; i < 20; i++) {
      setTimeout(() => {
        const bill = document.createElement("div");
        bill.className = "bill";

        // Random position
        const startX = Math.random() * window.innerWidth;
        bill.style.left = `${startX}px`;

        // Random rotation
        const rotation = Math.random() * 360;
        bill.style.setProperty("--rotate", `${rotation}deg`);

        // Random delay
        const animationDelay = Math.random() * 1;
        bill.style.animationDelay = `${animationDelay}s`;

        // Random bill color - more appropriate currency colors
        const bills = [
          "linear-gradient(to right, #27ae60, #2ecc71)", // Green (USD)
          "linear-gradient(to right, #2980b9, #3498db)", // Blue (EUR)
          "linear-gradient(to right, #8e44ad, #9b59b6)", // Purple (GBP)
          "linear-gradient(to right, #d35400, #e67e22)", // Orange (JPY)
        ];
        const randomBill = bills[Math.floor(Math.random() * bills.length)];
        bill.style.background = randomBill;

        // Add to body
        document.body.appendChild(bill);

        // Remove after animation
        setTimeout(() => {
          if (bill.parentNode === document.body) {
            document.body.removeChild(bill);
          }
        }, 5000);
      }, i * 100);
    }

    // Create 15 coins (now also dropping from top)
    for (let i = 0; i < 15; i++) {
      setTimeout(() => {
        const coin = document.createElement("div");
        coin.className = "coin";

        // Random position
        const startX = Math.random() * window.innerWidth;
        coin.style.left = `${startX}px`;

        // Random rotation
        const rotation = Math.random() * 360;
        coin.style.setProperty("--rotate", `${rotation}deg`);

        // Random delay
        const animationDelay = Math.random() * 1;
        coin.style.animationDelay = `${animationDelay}s`;

        // Add to body
        document.body.appendChild(coin);

        // Remove after animation
        setTimeout(() => {
          if (coin.parentNode === document.body) {
            document.body.removeChild(coin);
          }
        }, 5000);
      }, i * 120);
    }
  }
});
