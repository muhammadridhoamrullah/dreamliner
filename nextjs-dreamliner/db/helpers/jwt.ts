import jwt, { JwtPayload } from "jsonwebtoken";

const SECRET_KEY = process.env.SECRET!;

export function signToken(payload: JwtPayload) {
  return jwt.sign(payload, SECRET_KEY, { expiresIn: "1d" });
}

