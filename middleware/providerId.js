const providers = {
  post: '26',
  psb: '25',
  dealer: '5'
}

const methods = {
  post: '3',
  psb: '1',
}

function post(req, res, next) {
  req.query.providerId = providers.post;
  req.query.methodId = methods.post;
  next();
}

function psb(req, res, next) {
  req.query.providerId = providers.psb;
  req.query.methodId = methods.psb;
  next();
}

function dealer(req, res, next) {
  req.query.providerId = providers.dealer;
  req.query.methodId = methods.post;
  next();
}



module.exports = { post, psb, dealer };
