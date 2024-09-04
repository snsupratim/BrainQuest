import jwt from "jsonwebtoken";

const generateTokenAndSetCookie = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET2, {
    expiresIn: "1d",
  });

  res.cookie("jwt", token, {
    httpOnly: true, //more secure as no one can access this using js..for production
    maxAge: 1 * 24 * 60 * 60 * 1000, //15 days
    sameSite: "strict", //CSRF
  });

  return token;
};
export default generateTokenAndSetCookie;
