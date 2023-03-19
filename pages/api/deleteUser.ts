import { deleteUserByEmail } from "../../lib/db";

import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'DELETE') {
    const email = req.query.email as string;

    try {
      const success = await deleteUserByEmail(email);

      if (success) {
        res.status(200).json({ message: 'User successfully deleted.', unsetToken: true });
    } else {
        res.status(404).json({ message: 'User not found.' });
      }
    } catch (error) {
      console.error(`Error deleting user with email: ${email}`, error);
      res.status(500).json({ message: 'Internal server error.' });
    }
  } else {
    res.setHeader('Allow', ['DELETE']);
    res.status(405).json({ message: `Method ${req.method} not allowed.` });
  }
}
