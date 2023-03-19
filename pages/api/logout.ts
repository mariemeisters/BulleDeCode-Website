import { NextApiRequest, NextApiResponse } from 'next';
import { unsetToken } from '../../lib/auth';

export default async function deconnexion(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  unsetToken(res);

  return res.status(200).json({ message: 'Déconnexion réussie' });
}
