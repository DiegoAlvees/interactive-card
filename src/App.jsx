/* eslint-disable react/no-unescaped-entities */
import { useState } from "react";
import backCard from "./assets/bg-card-back.png";
import cardLogo from "./assets/card-logo.svg";
import iconComplete from "./assets/icon-complete.svg";

export default function App() {
  const [name, setName] = useState("JANE APLLESEED");
  const [cardNumber, setCardNumber] = useState("0000 0000 0000 0000");
  const [dateMonth, setDateMonth] = useState("00");
  const [dateYear, setDateYear] = useState("00");
  const [cvcNumber, setCvcNumber] = useState("000");

  // Estados de erro
  const [isCardNumberError, setIsCardNumberError] = useState(false);
  const [isDateMonthError, setIsDateMonthError] = useState(false);
  const [isDateYearError, setIsDateYearError] = useState(false);
  const [isCvcError, setIsCvcError] = useState(false);

  // estado para submeter

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleName = (e) => {
    const value = e.target.value.toUpperCase();
    setName(value);
  };

  const handleNumber = (e) => {
    const somenteNumeros = e.target.value.replace(/\D/g, "");
    const formattedValue = somenteNumeros.replace(/(.{4})/g, "$1 ").trim();

    setCardNumber(formattedValue);
  };

  const handleDateMonth = (e) => {
    const value = e.target.value.replace(/\D/g, "");
    setDateMonth(value);
  };

  const handleDateYear = (e) => {
    const value = e.target.value.replace(/\D/g, "");
    setDateYear(value);
  };

  const handleCvc = (e) => {
    const value = e.target.value.replace(/\D/g, "");
    setCvcNumber(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const isCardNumberValid =
      cardNumber.replace(/\s/g, "").length === 16 &&
      cardNumber !== "0000 0000 0000 0000";
    const isDateMonthValid = dateMonth !== "" && dateMonth !== "00";
    const isDateYearValid = dateYear !== "" && dateYear !== "00";
    const isCvcValid = cvcNumber !== "" && cvcNumber !== "000";

    setIsCardNumberError(!isCardNumberValid);
    setIsDateMonthError(!isDateMonthValid);
    setIsDateYearError(!isDateYearValid);
    setIsCvcError(!isCvcValid);

    const errosSubmit =
      !isCardNumberValid ||
      !isDateMonthValid ||
      !isDateYearValid ||
      !isCvcValid;

    if (!errosSubmit) {
      setIsSubmitted(true);
    }
  };

  const resetForm = () => {
    setName("JANE APLLESEED");
    setCardNumber("0000 0000 0000 0000");
    setDateMonth("00");
    setDateYear("00");
    setCvcNumber("000");
    setIsCardNumberError(false);
    setIsDateMonthError(false);
    setIsDateYearError(false);
    setIsCvcError(false);
    setIsSubmitted(false);
  };

  return (
    <main className="container">
      <div className="front-card">
        <img className="card-logo" src={cardLogo} alt="logo card" />
        <p>{cardNumber}</p>
        <div className="name-card">
          <p>{name}</p>
          <p>{`${dateMonth} / ${dateYear}`}</p>
        </div>
      </div>
      <div className="container-card">
        <p>{cvcNumber}</p>
        <img className="back-card" src={backCard} alt="card back" />
      </div>

      {isSubmitted ? (
        <div className="form-submitted">
          <img src={iconComplete} alt="Icone de formulario completo" />
          <h1>THANK YOU!</h1>
          <p>We've added your card details</p>
          <button onClick={resetForm}>Continue</button>
        </div>
      ) : (
        <form className="container-form" onSubmit={handleSubmit}>
          <label htmlFor="name">Cardholder name</label>
          <input
            className="input-name-number"
            type="text"
            placeholder="e.g Jane Appleseed"
            id="name"
            onChange={handleName}
          />

          <label htmlFor="card-number">Card Number</label>
          <input
            className={
              isCardNumberError ? "input-error-number" : "input-name-number"
            }
            type="text"
            placeholder="e.g. 1234 5678 9123 0000"
            id="card-number"
            maxLength="16"
            onChange={handleNumber}
          />
          {isCardNumberError && (
            <span className="msg-error">Wrong format, 16 numbers only</span>
          )}

          <div className="grid-container">
            <div className="grid1">
              <label htmlFor="date">Exp.date (mm/yy)</label>
              <input
                className={
                  isDateMonthError ? "input-error-date" : "input-month"
                }
                type="text"
                id="date-month"
                placeholder="MM"
                maxLength="2"
                onChange={handleDateMonth}
              />
              <input
                className={isDateYearError ? "input-error-date" : "input-year"}
                type="text"
                id="date-year"
                placeholder="YY"
                maxLength="2"
                onChange={handleDateYear}
              />
              {(isDateMonthError || isDateYearError) && (
                <span className="msg-error">can't be blank</span>
              )}
            </div>
            <div className="grid2">
              <label htmlFor="cvc">cvc</label>
              <input
                className={isCvcError ? "input-error-date" : "input-cvc"}
                type="text"
                id="cvc"
                maxLength="3"
                placeholder="e.g 123"
                onChange={handleCvc}
              />
              {isCvcError && <span className="msg-error">can't be blank</span>}
            </div>
          </div>
          <button type="submit">Confirm</button>
        </form>
      )}
    </main>
  );
}
