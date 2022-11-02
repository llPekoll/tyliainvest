const fs = require('fs');
const axios = require('axios');

const levels = {
  'Débutant': 1,
  'Intermédiaire': 2,
  'Avancé': 3,
  Courant: 4,
  'Langue maternelle': 5,
};


const getCountryCode = async(country) =>{
  const url = `https://restcountries.com/v3.1/name/${country}`;
  const res = await axios.get(url);
  return res.data;
}
const transform = async (input) => {
  let output = await getCountryCode(input.country);
  const address = {
      zipCode: input.zipCode,
      street: input.street,
      city: input.city,
      countryCode: output[0].cca2
  };
  // const certs = {
  //   date: "2014-07-07T10:42:54.532Z",
  //   certificate: "Economie, commerce et gestion et comptabilité",
  //   type:
  // }
  const certs = input.certificates.map(
    c => {
      date: c.date;
      certificate: c.certificate.title;
      type: c.certificateType.title
    }
  )
  console.log(certs)
  const langs = {

  }
  output = {
    id: input.id,
    firstname: input.firstname,
    lastname: input.lastname,
    address:address,
    dob: input.birthday,
    certificates:certs
    // languages:[]
  };

  return output;
};

(async () => {
  const inStr = fs.readFileSync('./in.json', 'UTF-8');
  const jsonIn = JSON.parse(inStr);
  const output = await transform(jsonIn);
  const outStr = JSON.stringify(output, null, 2);
  fs.writeFileSync('./out.json', outStr);
})();
