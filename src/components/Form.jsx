import { useState } from "react";

const months = {
  1: "A", 2: "B", 3: "C", 4: "D", 5: "E", 6: "H",
  7: "L", 8: "M", 9: "P", 10: "R", 11: "S", 12: "T"
}

const encode = (data) => {
  const surname = encodeSurname(data.surname);
  const name = encodeName(data.name);
  console.log(surname, name)
};

const encodeName = (name) => {
  name = name.toUpperCase().split("");
  const [consonants, vowels] = letters(name);
  const res = [];
  if (consonants.length > 3) {
    res.push(consonants[0]);
    res.push(consonants[2]);
    res.push(consonants[3]);
  }
  res.push(...consonants.slice(0, 3));
  if (res.length < 3) {
    res.push(...vowels.slice(0, 3 - res.length));
  }
  let x = 3 - res.length;
  for (let i = 0; i < x; i++) {
    res.push("X");
  }
  return res.join("");
}

const encodeSurname = (surname) => {
  surname = surname.toUpperCase().split("");
  const [consonants, vowels] = letters(surname);
  const res = [];
  res.push(...consonants.slice(0, 3));
  if (res.length < 3) {
    res.push(...vowels.slice(0, 3 - res.length));
  }
  let x = 3 - res.length;
  for (let i = 0; i < x; i++) {
    res.push("X");
  }
  return res.join("");
};

const letters = (word) => {
  const consonants = [];
  const vowels = [];
  for (let c of word) {
    if (!"AEIOU".split("").includes(c)) {
      consonants.push(c);
      continue;
    }
    vowels.push(c);
  }
  return [consonants, vowels];
}

const onSubmit = (data) => {
  encode(data);
};

function Form() {
  const [fields, setFields] = useState({ name: "", surname: "" });

  return (
    <div>
      <form action="#" onSubmit={() => onSubmit(fields)}>
        <input
          onChange={e => setFields({ ...fields, name: e.target.value })}
          placeholder="Name"
          type="text"
        />
        <br />
        <input
          onChange={e => setFields({ ...fields, surname: e.target.value })}
          placeholder="Surname"
          type="text"
        />
        <br />
        <select name="" id="">
          <option value=""></option>
        </select>
        <br />
        <input type="text" />
        <br />
        <button type="submit">Submit</button>
      </form>
      Your tax code is: XXXXXXXXXXXX
      <br />
      {fields.name}
      <br />
      {fields.surname}
    </div>
  );
}

export default Form;
