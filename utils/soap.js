function getSoapBody(inner, isHeader = false) {
  if (isHeader) {
    return `<soap:Envelope xmlns:soap=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:urn=\"urn:api3\"><soap:Header/><soap:Body>${inner}</soap:Body></soap:Envelope>`;
  } else {
    return `<soap:Envelope xmlns:soap=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:urn=\"urn:api3\"><soap:Body>${inner}</soap:Body></soap:Envelope>`;
  }
}

function getAuthBody(login, pass) {
  const inner = `<urn:Login><login>${login}</login><pass>${pass}</pass></urn:Login>`
  return getSoapBody(inner, true);
}

function getAccounts(accountLogin) {
  const inner = `<getAccounts xmlns=\"urn:api3\"><flt><login xsi:type=\"xsd:long\">${accountLogin}</login></flt></getAccounts>`
  return getSoapBody(inner);
} 

function getAgreements(userid) {
  const inner = `<getAgreements xmlns=\"urn:api3\"><flt><userid xsi:type=\"xsd:long\">${userid}</userid></flt></getAgreements>`
  return getSoapBody(inner);
}

function getPaymentBody(agrid, amount, pid, aid, comment) {
  const inner = `<Payment xmlns=\"urn:api3\">
    <val>
      <agrmid xsi:type=\"xsd:int\">${agrid}</agrmid>
      <amount xsi:type=\"xsd:float\">${amount}</amount>
      <receipt xsi:type=\"xsd:string\">${pid}</receipt>
      <comment xsi:type=\"xsd:string\">${comment}</comment>
      <modperson xsi:type=\"xsd:long\">${aid}</modperson>
    </val>
  </Payment>`
  return getSoapBody(inner);
}

module.exports = { getAuthBody, getAccounts, getAgreements, getPaymentBody };
