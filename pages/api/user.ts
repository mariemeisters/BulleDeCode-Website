import { NextApiRequest, NextApiResponse } from 'next';
import pool from '../../lib/db';
import { hashPassword } from '../../lib/auth';
import { sign } from 'jsonwebtoken';

interface User {
  pseudo: string;
  email: string;
  motdepasse: string;
  role_id:string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case 'GET':
      const { email } = req.query;

      if (!email) {
        res
          .status(400)
          .json({ message: 'Le paramètre email est requis.' });
        return;
      }

      try {
        const clientBdd = await pool.connect();
        const result = await clientBdd.query(
          `SELECT * FROM user WHERE email = $1`,
          [email]
        );
        clientBdd.release();
        if (result.rowCount === 0) {
          res.status(404).json({
            message: 'Aucun utilisateur trouvé.',
            redirectTo: '/',
          });
          return;
        }

        const user: User = {
          pseudo: result.rows[0].pseudo,
          email: result.rows[0].email,
          motdepasse: result.rows[0].motdepasse,
          role_id:result.rows[0].role_id
        };

        res.status(200).json({ user });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Impossible d'effectuer la requête." });
      }

      break;

    }
    switch (req.method) {
      case 'POST':
        const { pseudo, email, motdepasse } = req.body;
        if (!pseudo || !email || !motdepasse) {
          return res.status(422).json({
            message: 'Champs du formulaire manquant.',
          });
        }
    
        try {
          const clientBdd = await pool.connect();
          const result = await clientBdd.query(
            `SELECT * FROM users WHERE email = $1`,
            [email]
          );
    
          if (result.rowCount > 0) {
            return res.status(409).json({
              message: 'Un utilisateur avec cet e-mail existe déjà.',
            });
          }
    
          const hashedPassword = await hashPassword(motdepasse);
    
          const newUser: User = {
            pseudo,
            email,
            motdepasse: hashedPassword,
            role_id: ''
          };
    
          await clientBdd.query(
            `INSERT INTO users (pseudo, email, motdepasse, role_id) VALUES ($1, $2, $3, $4)`,
            [newUser.pseudo, newUser.email, newUser.motdepasse, 2]
          );
    
          clientBdd.release();
    
          const session = {
            email: newUser.email,
            pseudo: newUser.pseudo,
          };
    
          const token = sign(session, process.env.JWT_SECRET || 'default_secret', { expiresIn: '1h' });
    
          return res.status(201).json({
            message: 'Utilisateur ajouté avec succès.',
            pseudo: newUser.pseudo,
            token,
          });
        } catch (error) {
          console.error(error);
          return res.status(500).json({
            message: "Impossible d'effectuer la requête.",
          });
        }
    
          default:
          res.status(405).json({
            message: 'Méthode HTTP non autorisée.',
          });
          break;
    }   
    
  }    

  