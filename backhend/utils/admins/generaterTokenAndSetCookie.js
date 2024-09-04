import jwt from "jsonwebtoken";

const generateTokenAndSetCookie = (adminId, res) => {
  const token = jwt.sign({ adminId }, process.env.JWT_SECRET0, {
    expiresIn: "25d",
  });

  res.cookie("jwt", token, {
    httpOnly: true, //more secure as no one can access this using js..for production
    maxAge: 25 * 24 * 60 * 60 * 1000, //15 days
    sameSite: "strict", //CSRF
  });

  return token;
};
export default generateTokenAndSetCookie;
