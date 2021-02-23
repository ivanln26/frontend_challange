import { encodeBirthdate, encodeName, encodeSurname } from "./components/Form";

test("encode birthdate", () => {
  expect(encodeBirthdate("10/02/1985", "M")).toBe("85B10");
  expect(encodeBirthdate("08/12/2021", "M")).toBe("21T08");
  expect(encodeBirthdate("8/7/2012", "M")).toBe("12L08");
  expect(encodeBirthdate("1/1/2000", "F")).toBe("00A41");
});

test("encode name", () => {
  expect(encodeName("Matt")).toBe("MTT");
  expect(encodeName("Samantha")).toBe("SNT");
  expect(encodeName("Thomas")).toBe("TMS");
  expect(encodeName("Bob")).toBe("BBO");
  expect(encodeName("Paula")).toBe("PLA");
  expect(encodeName("Al")).toBe("LAX");
  expect(encodeName("")).toBe("XXX");
});

test("encode surname", () => {
  expect(encodeSurname("Newman")).toBe("NWM");
  expect(encodeSurname("Fox")).toBe("FXO");
  expect(encodeSurname("Hope")).toBe("HPO");
  expect(encodeSurname("Yu")).toBe("YUX");
  expect(encodeSurname("")).toBe("XXX");
});
