"use strict";

// DATA
let USERS = [
  {
    firstName: "Alisher",
    lastName: "Qobilov",
    username: "alisherqobilov",
    password: "@alisher2020",
    card: {
      balans: 16000,
      cardType: "HUMO",
      fullName: "Alisher Qobilov",
      cardNumber: 1234_5678_9123_4567,
      date: "01/23",
      transfers: [],
    },
  },
  {
    firstName: "Mahmud",
    lastName: "Qobilov",
    username: "mahmudqobilov",
    password: "@mahmud2020",
    card: {
      balans: 16000,
      cardType: "HUMO",
      fullName: "Mahmud Qobilov",
      cardNumber: 1234_5678_9123_6745,
      date: "01/23",
      transfers: [
        {
          from: "Mahmud",
          to: "Alisher",
          transferType: "credit",
          howMach: 100,
          date: "02.11.2023 10:06",
        },
      ],
    },
  },
  {
    firstName: "Elyor",
    lastName: "Qobilov",
    username: "elyorqobilov",
    password: "@elyor2020",
    card: {
      balans: 16000,
      cardType: "HUMO",
      fullName: "Elyor Qobilov",
      cardNumber: 1234_5678_9123_1620,
      date: "01/23",
      transfers: [
        {
          from: "Elyor",
          to: "Mahmud",
          transferType: "debt",
          howMach: 100,
          date: "02.11.2023 10:06",
        },
      ],
    },
  },
  {
    firstName: "Ozodbek",
    lastName: "Qobilov",
    username: "ozodbekqobilov",
    password: "@ozodbek2020",
    card: {
      balans: 16000,
      cardType: "HUMO",
      fullName: "Ozodbek Qobilov",
      cardNumber: 1234_5678_9123_0401,
      date: "01/23",
      transfers: [
        {
          from: "Ozodbek",
          to: "Elyor",
          transferType: "debt",
          howMach: 100,
          date: "02.11.2023 10:06",
        },
      ],
    },
  },
  {
    firstName: "Abbos",
    lastName: "Qobilov",
    username: "abbosqobilov",
    password: "@abbos2020",
    card: {
      balans: 16000,
      cardType: "HUMO",
      fullName: "Abbos Qobilov",
      cardNumber: 1234_5678_9123_0618,
      date: "01/23",
      transfers: [
        {
          from: "Abbos",
          to: "Ozodbek",
          transferType: "credit",
          howMach: 100,
          date: "02.11.2023 10:06",
        },
      ],
    },
  },
];

let USER = USERS[0];
let isVerify = true;
// inputs
const loginInput = document.querySelector(".loginInput");
const passwordInput = document.querySelector(".passwordInput");
const transferCardNumberInput = document.querySelector(".transfer-card-number");
const transferAmountInput = document.querySelector(".transfer-amount");
//buttons
const loginButton = document.querySelector(".loginButton");
const logOut = document.querySelector(".log-out");
const transferButton = document.querySelector(".transfer-button");

// pages
const loginPage = document.querySelector(".login-page");
const paymentPage = document.querySelector(".payment-page");

// elements
const title = document.querySelector(".title");
const cardType = document.querySelector(".card-type");
const cardAmount = document.querySelector(".amount");
const cardFullName = document.querySelector(".fullName");
const cardNumber = document.querySelector(".card-num");
const cardDate = document.querySelector(".card-date");

// custom library
const currencyFormatter = (money) => {
  return money.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
};

// events

const writeOfCardInfo = () => {
  title.textContent = `Xush Kelibsiz ${USER.firstName}`;
  cardType.textContent = USER.card.cardType;
  cardAmount.textContent = currencyFormatter(USER.card.balans);
  cardNumber.textContent = USER.card.cardNumber
    .toString()
    .match(new RegExp(".{1,4}$|.{1,4}", "g"))
    .join(" ");
  cardDate.textContent = USER.card.date;
  cardFullName.textContent = USER.card.fullName;
};

loginButton.addEventListener("click", (e) => {
  e.preventDefault();
  const login = loginInput.value;
  const password = passwordInput.value;
  loginInput.value = "";
  passwordInput.value = "";
  USER = USERS.filter(
    (user) => user.username === login && user.password === password
  )[0];
  if (!USER?.firstName) {
    alert("Login yoki Parol xato kiritildi");
    return;
  }
  alert(`Xush kelibsiz ${USER.firstName}`);
  isVerify = true;
  writeOfCardInfo();
  paymentPage.classList.remove("hidden");
  loginPage.classList.add("hidden");
});

// if (isVerify) {
writeOfCardInfo();
transferButton.addEventListener("click", (e) => {
  e.preventDefault();
  const cardNum = transferCardNumberInput.value.replaceAll(" ", "");
  const trAmount = +transferAmountInput.value.trim();
  const to = USERS.filter((u) => u.card.cardNumber === cardNum)?.[0];
  const date = new Date();
  //   if (cardNum.length !== 16 || !+cardNum) {
  //     transferCardNumberInput.classList.add("inputError");
  //     alert("Xatolik yuz berdi");
  //     return;
  //   }
  const trObj = {
    from: USER.firstName,
    to: `${to?.firstName} ${to?.lastName}`,
    transferType: "credit",
    howMach: currencyFormatter(trAmount),
    date: `${
      date.getDate() + "." + (date.getMonth() + 1) + "." + date.getFullYear()
    } ${date.getHours() + ":" + date.getMinutes()}`,
  };
  USER.card.transfers.push(trObj);
  USER.card.balans = USER.card.balans - trAmount;

  writeOfCardInfo();
});
// }

logOut.addEventListener("click", () => {
  loginPage.classList.remove("hidden");
  paymentPage.classList.add("hidden");
  USER = null;
  title.textContent = "";
});
