import { useRouter } from "next/router";
import Link from "next/link";
import CardProject from "../../components/CardProjet/CardProject";
import FiltreAnnee from "../../components/FiltreAnnee/FiltreAnnee";
import pool, { getAllClients } from "../../lib/db";

interface Projets {
  id: number;
  title: string;
  description: string;
  client: string;
  annee: number;
}

interface ProjectsProps {
  projects: Projets[];
  annee: number;
}

export const getStaticProps = async ({ params }: { params: { [key: string]: string } }) => {
    try {
    const client = await pool.connect();
    const result = await client.query(
      "SELECT id, title, description, client, annee FROM test WHERE client = $1",
      [params.client]
    );
    const projects = result.rows;
    client.release();
    return {
      props: {
        projects: projects || [],
      },
    };
  } catch (error) {
    console.error("Failed to fetch projects", error);
    return {
      notFound: true,
    };
  }
};

export async function getStaticPaths() {
  const clients = await getAllClients();
  const paths = clients.map((client) => ({ params: { client } }));
  return {
    paths,
    fallback: false,
  };
}

export default function ProjetsDuClient({ projects }: ProjectsProps) {
  const router = useRouter();
  const client = router.query.client as string;
  const annee = router.query.annee as unknown as number;
  const nomDuClient = client === "perso" ? "Projets personnels" : `Projets de ${client}`;
  
  return (
    <section>
      <h1>{nomDuClient}</h1>
      <FiltreAnnee client={client} annee={annee} />
      <div className="projects-list">
        {projects.map((Allproject) => (
          <CardProject
            key={Allproject.id}
            id={Allproject.id}
            title={Allproject.title}
            description={Allproject.description}
            client={Allproject.client}
            annee={Allproject.annee}
          />
        ))}
      </div>
    </section>
  );
}
