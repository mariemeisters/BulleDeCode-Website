import { NextApiRequest, NextApiResponse } from 'next';
import { setLoginSession } from '../../lib/auth';
import { getUserByEmail } from '../../lib/db';
import { verifyPassword } from '../../lib/auth';
import { setCookie } from 'nookies';

export default async function login(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }
  
  const { email, motdepasse } = req.body;
  if (!email || !motdepasse) {
    return res.status(400).json({ message: 'Email et mot de passe requis' });
  }
  
  const utilisateur = await getUserByEmail(email);
  if (!utilisateur) {
    return res.status(401).json({ message: 'Utilisateur non trouvé' });
  }

  const isValid = await verifyPassword(motdepasse, utilisateur.motdepasse);
  if (!isValid) {
    return res.status(401).json({ message: 'Mot de passe invalide' });
  }

  const session = {
    email: utilisateur.email,
    pseudo: utilisateur.pseudo,
    role: utilisateur.role
  };
  // Stockage du token dans le cookie de l'application
  setCookie({ res }, 'token', JSON.stringify(session), {
    maxAge: 60 * 60 * 24 * 7, // 7 jours
    path: '/',
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
  });

  return res.status(200).json({ message: 'Connexion réussie' });
}
