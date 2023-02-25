const tarifs = require("../models/tarifs");

async function monthlyReminder() {
  const plansList = await tarifs.fetchAllMonthly();
  console.log(plansList);
}

module.exports = { monthlyPayReminder };
