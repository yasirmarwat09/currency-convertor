document.addEventListener("DOMContentLoaded", function () {
  const convertBtn = document.getElementById("convert-btn");
  const result = document.getElementById("result");
  const amountFrom = document.getElementById("amount-from");
  const amountTo = document.getElementById("amount-to");
  const currencyFrom = document.getElementById("currency-from");
  const currencyTo = document.getElementById("currency-to");

  const cashSound = new Audio("assets/cash-sound.mp3");
  cashSound.preload = "auto";

  result.classList.add("show");

  convertBtn.addEventListener("click", function () {
    result.textContent = "Converting..."; // 👈 show instantly
    result.classList.add("show");

    // ...then continue with the fetch

    try {
      cashSound.currentTime = 0;
      cashSound.play();
    } catch (e) {
      console.log("Sound playback failed:", e);
    }
    setTimeout(() => {
      cashSound.pause();
    }, 2000); // reduced from 5000ms

    createMoneyAnimation();

    const fromCurrency = currencyFrom.value;
    const toCurrency = currencyTo.value;
    const amount = parseFloat(amountFrom.value);

    if (isNaN(amount) || amount <= 0) {
      result.textContent = "Please enter a valid amount.";
      return;
    }

    fetch(
      `https://api.frankfurter.app/latest?amount=${amount}&from=${fromCurrency}&to=${toCurrency}`
    )
      .then((res) => res.json())
      .then((data) => {
        const converted = data.rates[toCurrency];
        amountTo.value = converted;
        result.textContent = `${amount} ${fromCurrency} = ${converted} ${toCurrency}`;
        result.classList.add("show");
      })
      .catch((err) => {
        console.error("Conversion failed:", err);
        result.textContent = "Error fetching conversion rate.";
      });
  });

  function createMoneyAnimation() {
    document.querySelectorAll(".bill, .coin").forEach((elem) => elem.remove());

    for (let i = 0; i < 20; i++) {
      setTimeout(() => {
        const bill = document.createElement("div");
        bill.className = "bill";
        const startX = Math.random() * window.innerWidth;
        bill.style.left = `${startX}px`;
        const rotation = Math.random() * 360;
        bill.style.setProperty("--rotate", `${rotation}deg`);
        const animationDelay = Math.random() * 1;
        bill.style.animationDelay = `${animationDelay}s`;
        const bills = [
          "linear-gradient(to right, #27ae60, #2ecc71)",
          "linear-gradient(to right, #2980b9, #3498db)",
          "linear-gradient(to right, #8e44ad, #9b59b6)",
          "linear-gradient(to right, #d35400, #e67e22)",
        ];
        bill.style.background = bills[Math.floor(Math.random() * bills.length)];
        document.body.appendChild(bill);
        setTimeout(() => {
          if (bill.parentNode === document.body) {
            document.body.removeChild(bill);
          }
        }, 5000);
      }, i * 100);
    }

    for (let i = 0; i < 15; i++) {
      setTimeout(() => {
        const coin = document.createElement("div");
        coin.className = "coin";
        const startX = Math.random() * window.innerWidth;
        coin.style.left = `${startX}px`;
        const rotation = Math.random() * 360;
        coin.style.setProperty("--rotate", `${rotation}deg`);
        const animationDelay = Math.random() * 1;
        coin.style.animationDelay = `${animationDelay}s`;
        document.body.appendChild(coin);
        setTimeout(() => {
          if (coin.parentNode === document.body) {
            document.body.removeChild(coin);
          }
        }, 5000);
      }, i * 120);
    }
  }
});
