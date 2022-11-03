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
  const countryCode = await getCountryCode(input.country);
  const address = {
      zipCode: input.zipCode,
      street: input.street,
      city: input.city,
      countryCode: countryCode[0].cca2
  };
  const experiences = input.experiences.map(
    xp => {
      return {
        companyName: xp.companyName,
        startDate: xp.startDate,
        endDate: xp.endDate,
        jobId: xp.job.id
      }
    }
  )
  const certificates = input.certificates.map(
    cert => {
      return {
        date: cert.date,
        certificate: cert.certificate.title,
        type: cert.certificateType.title
      }
    }
  )
  const languages = input.languages.map(
    lang => {
      return {
        languageId: lang.id,
        title: lang.title,
        levelTitle: lang.level,
        level:levels[lang.level]
      }
    }
  )

  return {
    id: input.id,
    firstname: input.firstname,
    lastname: input.lastname,
    address,
    dob: input.birthday,
    experiences,
    certificates,
    languages
  };
};

(async () => {
  const inStr = fs.readFileSync('./in.json', 'UTF-8');
  const jsonIn = JSON.parse(inStr);
  const output = await transform(jsonIn);
  const outStr = JSON.stringify(output, null, 2);
  fs.writeFileSync('./out.json', outStr);
})();
