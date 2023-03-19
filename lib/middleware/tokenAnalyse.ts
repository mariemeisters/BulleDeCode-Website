import { NextApiResponse } from 'next';
import { verify } from 'jsonwebtoken';
import { MyNextApiRequest } from '../../types/next';

interface Session {
  email: string;
  pseudo: string;
  role: string;
}

export async function serverSideAuthenticate(req: MyNextApiRequest, res: NextApiResponse, next: () => void) {
  try {
    // Vérifier que le token d'authentification est présent dans l'en-tête Authorization
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return { redirect: { destination: '/login', permanent: false } };
    }

    // Extraire le token d'authentification de l'en-tête Authorization
    const token = authHeader.replace('Bearer ', '');
    const jwtSecret = process.env.JWT_SECRET;

    if (!jwtSecret) {
      return { status: 500, body: { message: 'Clé secrète manquante' } };
    }

    // Vérifier que le token est authentique en le décodant avec la clé secrète
    const decoded = verify(token, jwtSecret) as { email: string, pseudo: string };
    if (!decoded) {
      return { redirect: { destination: '/login', permanent: false } };
    }

    // Authentifier l'utilisateur en ajoutant les informations de session à la requête
    const session: Session = {
      email: (decoded as { email: string }).email,
      pseudo: (decoded as { pseudo: string }).pseudo,
      role: (decoded as unknown as { role: string }).role,
    };
    
    req.session = session;
    return { props: {} };
  } catch (err) {
    console.error(err);
    return { status: 401, body: { message: 'Token d\'authentification invalide' } };
  }
}
