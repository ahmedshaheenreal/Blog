import jwt from "jsonwebtoken";

export default function createToken(payload: any, sceretKey: string): string {
  const token = jwt.sign(payload, sceretKey, { expiresIn: "5h" });
  return token;
}
