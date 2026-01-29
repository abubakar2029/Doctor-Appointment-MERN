import jwt, { JwtPayload } from "jsonwebtoken";

if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined");
}

const JWT_SECRET = process.env.JWT_SECRET;

export interface AuthTokenPayload extends JwtPayload {
    sub: string;
    email: string;
}

type DecodedToken = JwtPayload & {
    sub: string;
    email: string;
};


export const decodeToken = (token: string): DecodedToken => {
    return jwt.verify(token, JWT_SECRET) as DecodedToken;
};


export const signToken = (user: { _id: string; email: string }): string => {
    return jwt.sign(
        {
            sub: user._id,
            email: user.email,
        },
        JWT_SECRET,
        { expiresIn: "7d" }
    );
};

export const verifyToken = (token: string): AuthTokenPayload => {
  return jwt.verify(token, JWT_SECRET) as AuthTokenPayload;
};
