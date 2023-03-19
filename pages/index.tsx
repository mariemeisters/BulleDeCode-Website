import React, { useState, useEffect } from "react";
import Head from "next/head";
import { MyNextApiRequest } from "../types/next";
import { NextApiResponse } from "next";
import { JwtPayload } from 'jsonwebtoken';
import pool from "../lib/db";
import CardProject from "../components/CardProjet/CardProject";
import { useRouter } from 'next/router';
import { useAuth } from "../lib/AuthContext";



export default function Home({ pseudo, projects, email }: {pseudo: string | null, projects: any[], email:string}) {
  const [competence, setCompetence] = useState(["MERN stack", "Javascript", "Typescript", "Node.js", "React", "Next.js", "Express", "MongoDB"]);
  const [competenceActuelle, setcompetenceActuelle] = useState(0);
  const [affichageCompetence, setaffichageCompetence] = useState("");
  const { updateLoginStatus } = useAuth();

  useEffect(() => {
    const maCompetence = competence[competenceActuelle];
    let i = 0;
    const intervalId = setInterval(() => {
      setaffichageCompetence(maCompetence.substring(0, i + 1));
      i++;
      if (i === maCompetence.length) {
        clearInterval(intervalId);
        setTimeout(() => {
          setcompetenceActuelle((competenceActuelle + 1) % competence.length);
        }, 1000);
      }
    }, 100);
    return () => clearInterval(intervalId);
  }, [competenceActuelle, competence]);

  const messageBienvenue = pseudo ? `Bienvenue sur mon site, ${pseudo} !` : "Bienvenue sur mon site !";
  const phrase = `Je suis Développeur ${affichageCompetence}`;
  const router = useRouter();

  async function deleteUser(email: string) {
    try {
      const response = await fetch(`/api/deleteUser?email=${email}`, {
        method: 'DELETE',
      });
  
      const data = await response.json();
  
      if (response.ok) {
        console.log('User successfully deleted.');
        if (data.unsetToken) {
          const logoutResponse = await fetch('/api/logout', {
            method: 'POST',
          });
  
           if (logoutResponse.ok) {
            console.log('Token successfully unset.');
            router.push('/connexion');
            updateLoginStatus();
              } else {
                console.error('Error unsetting token:', await logoutResponse.json());
              }
            }
      } else {
        console.error('Error deleting user:', data);
      }
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  }

  return (
    <>
      <Head>
        <title>Développeur MERN Stack</title>
      </Head>

      <div className="container">
        <div className="content">
          <h1>{messageBienvenue}</h1>
          <h2>{phrase}</h2>
        </div>
        <div style={{display:"inline-flex", flexWrap:"wrap"}}>
        {projects.map((project) => (
          <CardProject
            key={project.id}
            id={project.id}
            title={project.title}
            description={project.description}
            client={project.client}
            annee={project.annee}
          />
        ))}
        </div>
        {pseudo && (
          <button onClick={() => deleteUser(email)} style={{ cursor: 'pointer' }}>
         Supprimer son compte.
        </button>
      )}
      </div>
    </>
  );
}

interface DecodedToken extends JwtPayload {
  pseudo: string;
}
/**
 *  getServerSideProps est un nom de fonction réservé qui est utilisé pour précharger les données avant d'afficher la page. 
 *  Appelée côté serveur à chaque demande. Lors de export d'une fonction avec le nom getServerSideProps, 
 *  Next.js sait qu'il doit l'utiliser pour récupérer les données côté serveur avant de rendre la page.
 */
export const getServerSideProps = async (ctx: { req: MyNextApiRequest; res: NextApiResponse<any>; }) => {
  // Récupérer le cookie contenant le JWT
  const token = ctx.req.cookies.token;
  let pseudo = null;
  let email = null;

  // Vérifier si le cookie existe
  if (token) {
    const decodedToken: { pseudo: string, email: string } = JSON.parse(decodeURIComponent(token));
    pseudo = decodedToken.pseudo;
    email = decodedToken.email;
  }

  // Récupérer les projets
  try {
    const client = await pool.connect();
    const result = await client.query("SELECT id, title, description, client, annee FROM test");
    const projects = result.rows;
    client.release();

    // Retourner les données en tant que props pour la page
    return { props: { pseudo, projects, email } };
  } catch (error) {
    console.error("Failed to fetch projects", error);
    return {
      notFound: true,
    };
  }
};




// PERMET D OBLIGER L USER A SE CO EN LE REDIRIGEANT VERS LA PAGE DE CO
  // Vérifier si le cookie existe
  // if (!token) {
  //   // Rediriger vers la page de connexion ou afficher un message d'erreur
  //   return { redirect: { destination: '/connexion', permanent: false } };
  // }



// export async function getStaticProps() {
//   let bitcoinEnEuro;
//   await fetch('https://blockchain.info/ticker')
//   .then(response => response.json())
//   .then(data => bitcoinEnEuro = data.EUR.last);
//   return {
//     props: {
//       prixBitcoin: bitcoinEnEuro
//     }
//   }
// }
