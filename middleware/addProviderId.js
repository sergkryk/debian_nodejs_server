const payments = {
  post: '3',
  psb: '1'
}

function post(req, res, next) {
  req.query.providerId = payments.post;
  next();
}

function psb(req, res, next) {
  req.query.providerId = payments.psb;
  next();
}



module.exports = { post, psb };
