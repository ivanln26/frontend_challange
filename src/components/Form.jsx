import { GoogleSpreadsheet } from "google-spreadsheet";
import { useEffect, useState } from "react";

import credentials from "./credentials.json";
import { encode } from "../encoding/encode";

const onSubmit = (data, setCode, sheet) => {
  const code = encode(data);
  data = { ...data, code: code }
  setCode(code);
  (async function () {
    await sheet.addRow(data);
  }());
};

const useForm = () => {
  const [fields, setField] = useState({
    birthdate: "",
    gender: "M",
    name: "",
    surname: "",
  });

  const updateField = (value) => {
    setField({ ...fields, ...value });
  };

  return [fields, updateField];
};

function Form() {
  const [code, setCode] = useState(Array(10).fill("X").join(""));
  const [fields, updateField] = useForm();
  const [sheet, setSheet] = useState();

  useEffect(() => {
    (async function () {
      const doc = new GoogleSpreadsheet("1U3mKKdMzBvXqIDXii_wnzaTOGB35yX0gACbL5_jPb5g");
      doc.useServiceAccountAuth({
        client_email: credentials["client_email"],
        private_key: credentials["private_key"],
      });
      await doc.loadInfo();
      const sh = doc.sheetsById[0];
      setSheet(sh);
    }());
  }, ['']);

  return (
    <div>
      <input
        onChange={e => updateField({ name: e.target.value })}
        placeholder="Name"
        required
        type="text"
        value={fields.name}
      />
      <br />
      <input
        onChange={e => updateField({ surname: e.target.value })}
        placeholder="Surname"
        required
        type="text"
        value={fields.surname}
      />
      <br />
      Gender:
      <select
        onChange={e => updateField({ gender: e.target.value })}
        value={fields.gender}
      >
        <option value="M">Male</option>
        <option value="F">Female</option>
      </select>
      <br />
      <input
        onChange={e => updateField({ birthdate: e.target.value })}
        placeholder="Birthdate"
        required
        type="text"
        value={fields.birthdate}
      />
      <br />
      <button onClick={() => onSubmit(fields, setCode, sheet)}>Submit</button>
      <br />
      Your tax code is: {code}
    </div>
  );
}

export default Form;
