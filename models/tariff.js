const pool = require('../utils/db');
const { tariff: tariffQuery } = require('../database/userQueries');

const renderTariffDetails = (res) => {
  const { tp_id, name, dayFee, monthFee } = res;
  if (!tp_id) {
    return 'The tariff not found'
  }
  return {
    id: tp_id,
    name,
    fee: dayFee ? dayFee : monthFee,
    isDayly: this.fee === dayFee,
  }
}

class Tariff {
  constructor(id) {
    this.id = id;
  }

  async fetchTariff() {
    const [[ tpDetails ]] = await pool.execute(tariffQuery, [this.id]);
    const response = renderTariffDetails(tpDetails);
    return response;
  }
}

module.exports = Tariff;