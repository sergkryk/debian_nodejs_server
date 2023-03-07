const payments = {
  post: '3',
  psb: '1',
  dealer: '3'
}

function post(req, res, next) {
  req.query.providerId = payments.post;
  next();
}

function psb(req, res, next) {
  req.query.providerId = payments.psb;
  next();
}

function dealer(req, res, next) {
  req.query.providerId = payments.dealer;
  next();
}



module.exports = { post, psb, dealer };
