import jwt, { JwtPayload, SignOptions } from 'jsonwebtoken';

function generateToken(payload: Record<string, any>, options: SignOptions = {}): string {
  return jwt.sign(payload, process.env.JWT_SECRET || '', options);
}

function verifyToken(token: string): string | JwtPayload {
  return jwt.verify(token, process.env.JWT_SECRET || '');
}

export {
  generateToken,
  verifyToken
}