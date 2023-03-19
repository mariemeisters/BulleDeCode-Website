import { useRouter } from "next/router";
import Link from "next/link";

interface PropsClient{
    client: string;
  }
export default function Projet({ client }: PropsClient) {
    //variables
    const router = useRouter();

    return (
        <>
        <h1>{router.query.slug}</h1>
        <h2>
            <Link legacyBehavior  key={client} href={`/projets/${client}`}>
                <a style={{color: '#2a6e6b', textDecoration: "none"}}>Projet de {client}</a>
            </Link></h2>
        </>
    )
}


// import { GetStaticPaths, GetStaticProps } from "next";
// import Link from "next/link";
// import pool from "../../lib/db";



// interface Projets {
//   id: number;
//   title: string;
//   description: string;
//   client: string;
//   annee: number;
// }
// export const getStaticPaths: GetStaticPaths = async () => {
//     try {
//       const client = await pool.connect();
//       const result = await client.query("SELECT DISTINCT client FROM test");
//       const clients = result.rows.map((row) => row.client);
//       client.release();
  
//       const paths = clients.map((client) => ({
//         params: {
//           slug: client,
//         },
//       }));
  
//       return {
//         paths,
//         fallback: 'blocking'
//       };
//     } catch (error) {
//       console.error("Failed to fetch clients", error);
//       return {
//         notFound: true,
//       };
//     }
//   };
  
//   console.log(projects)

//   export const getStaticProps: GetStaticProps<ProjectsProps> = async () => {
//     try {
//       const client = await pool.connect();
//       const result = await client.query(
//         "SELECT id, title, description, client, annee FROM test"
//       );
//       const projects = result.rows;
//       client.release();
//       return {
//         props: {
//           projects,
//           fallback: 'false', // nested under the props key
//         },
//       };
//     } catch (error) {
//       console.error("Failed to fetch projects", error);
//       return {
//         notFound: true,
//       };
//     }
//   };
  

// interface ProjectsProps {
//   projects: Projets[];
// }

// export default function Projets({ projects }: ProjectsProps) {
//   return (
//     <section>
//       <h1>Projets</h1>
//       <ul>
//         {projects.map((project) => (
//           <li key={project.id}>
//             <Link legacyBehavior href={`/projets/client/${project.client}`}>
//               <a style={{color: '#2a6e6b', textDecoration: "none"}}>{project.client}</a>
//             </Link>
//           </li>
//         ))}
//       </ul>
//     </section>
//   );
// }
