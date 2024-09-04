import jwt from "jsonwebtoken";

const generateTokenAndSetCookie = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET1, {
    expiresIn: "15d",
  });

  res.cookie("jwt", token, {
    httpOnly: true, //more secure as no one can access this using js..for production
    maxAge: 15 * 24 * 60 * 60 * 1000, //15 days
    sameSite: "strict", //CSRF
  });

  return token;
};
export default generateTokenAndSetCookie;
