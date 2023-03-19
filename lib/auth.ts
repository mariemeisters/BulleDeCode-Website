import bcrypt, { compare } from 'bcrypt';
import { serialize } from 'cookie';
import { NextApiResponse } from 'next';




const TOKEN_NAME = 'token';
const MAX_AGE = 60 * 60 * 24 * 7; // 7 days

export async function setLoginSession(res: NextApiResponse, session: Record<string, any>) {
  const cookie = serialize(TOKEN_NAME, JSON.stringify(session), {
    maxAge: MAX_AGE,
    expires: new Date(Date.now() + MAX_AGE * 1000),
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    sameSite: 'lax',
  });

  res.setHeader('Set-Cookie', cookie);
}


export async function hashPassword(motdepasse: string): Promise<string> {
  const saltRounds = 12;
  const hashedPassword = await bcrypt.hash(motdepasse, saltRounds);
  return hashedPassword;
}

export async function verifyPassword(motdepasse: string, hashedPassword: string): Promise<boolean> {
    return await compare(motdepasse, hashedPassword);
  }
  
  export async function unsetToken(res: NextApiResponse) {
    const cookie = serialize(TOKEN_NAME, '', {
      maxAge: -1,
      path: '/',
    });
  
    res.setHeader('Set-Cookie', cookie);
  }