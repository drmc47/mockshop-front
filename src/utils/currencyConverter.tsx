export const currencyConverter = (currency: string, price: number) => {
  switch (currency) {
    case "EUR":
      return `€ ${(price * 1.07).toFixed(2)}`;
    case "HNL":
      return `L ${(price * 24).toFixed(2)}`;
    default:
      return `$ ${price.toFixed(2)}`;
  }
  // ? might need to move them to an .env file
};
