const currencyRatio = {
  EUR: {
    USD: 0.99,
    KRW: 1332.03,
    EUR: 1,
    JPN: 135.71,
    CNY: 6.82,
    unit: "유로",
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/Flag_of_Europe.svg/1280px-Flag_of_Europe.svg.png",
  },
  USD: {
    USD: 1,
    KRW: 1341.68,
    EUR: 1.01,
    JPN: 136.64,
    CNY: 6.87,
    unit: "달러",
    img: "https://cdn-icons-png.flaticon.com/512/555/555526.png",
  },
  KRW: {
    USD: 0.00075,
    KRW: 1,
    EUR: 0.00075,
    JPN: 0.10,
    CNY: 0.0051,
    unit: "원",
    img: "https://cdn.countryflags.com/thumbs/south-korea/flag-400.png",
  },
  JPN: {
    USD: 0.0073,
    KRW: 9.82,
    EUR: 0.0074,
    JPN: 1,
    CNY: 0.050,
    unit: "엔",
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Flag_of_Japan.svg/800px-Flag_of_Japan.svg.png",
  },
  CNY: {
    USD: 0.15,
    KRW: 195.32,
    EUR: 0.15,
    JPN: 19.88,
    CNY: 1,
    unit: "위안",
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Flag_of_the_People%27s_Republic_of_China.svg/2560px-Flag_of_the_People%27s_Republic_of_China.svg.png",
  }
};
var unitWords = ["", "만", "억", "조", "경"];
var splitUnit = 10000;
let toButton = document.getElementById("to-button");
let fromButton = document.getElementById("from-button");
let toCurrency = "USD";
let fromCurrency = "USD";

document.querySelectorAll("#from-currency-list li").forEach(function (item) {
  item.addEventListener("click", function () {
    fromCurrency = this.id;
    fromButton.innerHTML = `<img class="flag-img"src="${currencyRatio[fromCurrency].img}"/>${fromCurrency}`;
    convert("from");
  });
});

document.querySelectorAll("#to-currency-list li").forEach(function (item) {
  item.addEventListener("click", function () {
    toCurrency = this.id;
    toButton.innerHTML = `<img class="flag-img"src="${currencyRatio[toCurrency].img}"/>${toCurrency}`;
    convert("from");
  });
});

function convert(type) {
  console.log("here");
  let amount = 0;
  if (type == "from") {
    //입력갑 받기
    amount = document.getElementById("fromAmount").value;
    // 환전하기
    let convertedAmount = amount * currencyRatio[fromCurrency][toCurrency];
    // 환전한값 보여주기
    document.getElementById("toAmount").value = convertedAmount;
    //환전한값 한국어로
    renderKoreanNumber(amount, convertedAmount);
  } else {
    amount = document.getElementById("toAmount").value;
    let convertedAmount = amount * currencyRatio[toCurrency][fromCurrency];
    document.getElementById("fromAmount").value = convertedAmount;
    renderKoreanNumber(convertedAmount, amount);
  }
}
function renderKoreanNumber(from, to) {
  document.getElementById("fromNumToKorea").textContent =
    readNum(from) + currencyRatio[fromCurrency].unit;
  document.getElementById("toNumToKorea").textContent =
    readNum(to) + currencyRatio[toCurrency].unit;
}
function readNum(num) {
  let resultString = "";
  let resultArray = [];
  for (let i = 0; i < unitWords.length; i++) {
    let unitResult =
      (num % Math.pow(splitUnit, i + 1)) / Math.pow(splitUnit, i);
    unitResult = Math.floor(unitResult);
    if (unitResult > 0) {
      resultArray[i] = unitResult;
    }
  }
  for (let i = 0; i < resultArray.length; i++) {
    if (!resultArray[i]) continue;
    resultString = String(resultArray[i]) + unitWords[i] + resultString;
  }
  return resultString;
}
