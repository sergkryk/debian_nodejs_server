const pool = require("../utils/db");
const jwt = require("jsonwebtoken");
const cookie = require("cookie");
const { secret } = require("../config/secret");

const checkResponse = (response) => {
  if (response.length <= 0) {
    throw new Error("User not found");
  }
  return response;
};

const checkResponseObjKeys = (response) => {
  if (
    !response[0].hasOwnProperty("uid") ||
    !response[0].hasOwnProperty("deleted") ||
    !response[0].hasOwnProperty("password")
  ) {
    throw new Error("The response doesn't have needed keys");
  }
  return response;
};

const checkUserExists = (response) => {
  if (response[0].deleted === 1) {
    throw new Error("User is deleted");
  }
  return response;
};

const checkPassword = (response, password) => {
  if (response[0].password !== password) {
    throw new Error("Login or password is invalid");
  }
  return response;
};

const loginController = async (req, res) => {
  const { login, password } = req.body;
  if (!login || !password) {
    res.status(404).send({ message: "Provide login or password" });
    return;
  }
  try {
    const [dbResponse] = await pool.execute(
      `SELECT uid, deleted, password, CONVERT(DECODE(password, 'abills345678901234490137') USING utf8) as password FROM users WHERE id = '${login}'`
    );
    checkResponse(dbResponse);
    checkResponseObjKeys(dbResponse);
    checkUserExists(dbResponse);
    checkPassword(dbResponse, password);
    const payload = { id: dbResponse[0].uid };
    const token = jwt.sign(payload, secret, {
      expiresIn: "12h",
      algorithm: "HS256",
    });
    res.setHeader(
      "Set-Cookie",
      cookie.serialize("token", String(token), {
        httpOnly: true,
        // secure: process.env.NODE_ENV !== 'development',
        secure: true,
        maxAge: 60 * 60 * 12 * 1000,
        sameSite: "none",
        path: "/",
      })
    );
    // res.setHeader(
    //   "Set-Cookie",
    //   cookie.serialize("authorized", 1), {
    //   // secure: process.env.NODE_ENV !== 'development',
    //   secure: true,
    //   maxAge: 60 * 60 * 12 * 1000,
    //   sameSite: "none",
    //   path: "/",
    // });
    // res.cookie(
    //   cookie.serialize("token", String(token), {
    //     httpOnly: true,
    //     maxAge: 60 * 60 * 12,
    //     // secure: process.env.NODE_ENV !== "development",
    //     secure: true,
    //     sameSite: 'None',
    //   })
    // );
    res.cookie("authorized", 1, {
      maxAge: 60 * 60 * 12 * 1000,
      // secure: process.env.NODE_ENV !== "development",
      secure: true,
      sameSite: 'none',
    });
    res.status(200).json(token);
  } catch (error) {
    console.log(error);
    res.status(401).send({ message: error.message });
  }
};

module.exports = { loginController };
