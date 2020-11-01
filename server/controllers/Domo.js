const models = require('../models');

const { Domo } = models;

const getDomoInfo = (req, res) => {
  Domo.DomoModel.findByOwner(req.session.account._id, (err, docs) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'An error occurred' });
    }
    // get oldest domo
    let oldest = { age: -1 };

    for (let i = 0; i < docs.length; i++) {
      if (docs[i].age >= oldest.age) {
        oldest = docs[i];
      }
    }
    if (oldest.age === -1) { oldest = null; }

    return res.json({ csrfToken: req.csrfToken(), domos: docs, oldest });
  });
};
const infoPage = (req, res) => {
  Domo.DomoModel.findByOwner(req.session.account._id, (err, docs) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'An error occurred' });
    }
    // get oldest domo
    let oldest = { age: -1 };

    for (let i = 0; i < docs.length; i++) {
      if (docs[i].age >= oldest.age) {
        oldest = docs[i];
      }
    }
    if (oldest.age === -1) { oldest = null; }
    return res.render('info', { csrfToken: req.csrfToken(), domos: docs, oldest });
  });
};
const makerPage = (req, res) => {
  Domo.DomoModel.findByOwner(req.session.account._id, (err, docs) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'An error occurred' });
    }
    return res.render('app', { csrfToken: req.csrfToken(), domos: docs });
  });
};

const makeDomo = (req, res) => {
  if (!req.body.name || !req.body.color || !req.body.age) {
    return res.status(400).json({ error: 'RAWR! Both name and age are required' });
  }
  const domoData = {
    name: req.body.name,
    color: req.body.color,
    age: req.body.age,
    owner: req.session.account._id,

  };

  const newDomo = new Domo.DomoModel(domoData);

  const domoPromise = newDomo.save();

  domoPromise.then(() => res.json({ redirect: '/maker' }));

  domoPromise.catch((err) => {
    console.log(err);
    if (err.code === 11000) {
      return res.status(400).json({ error: 'Domo already exists' });
    }
    return res.status(400).json({ error: 'An error occurred' });
  });
  return domoPromise;
};

const getDomos = (request, response) => {
  const req = request;
  const res = response;

  return Domo.DomoModel.findByOwner(req.session.account._id, (err, docs) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'An error occurred' });
    }
    return res.json({ domos: docs });
  });
};
module.exports.makerPage = makerPage;
module.exports.infoPage = infoPage;
module.exports.getDomoInfo = getDomoInfo;
module.exports.getDomos = getDomos;
module.exports.make = makeDomo;
