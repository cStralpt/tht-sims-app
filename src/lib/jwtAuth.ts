import jwt, { Jwt, JwtPayload } from "jsonwebtoken";
export function generateJwtAccessToken(userId: string, username: string) {
  const secretKey = process.env.JWT_SECRET;
  const payload = { sub: userId, userId, username: username };
  const token = jwt.sign(payload, "secretKey", {
    expiresIn: "48h",
  });
  return token;
}

export function verifyJwt(token: string) {
  try {
    const decoded = jwt.verify(token, "secretKey", {
      ignoreExpiration: false,
    });
    return decoded as JwtPayload;
  } catch (error) {
    console.error(error);
  }
}
