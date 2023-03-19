import { useRouter } from "next/router";
import CardProject from "../../components/CardProjet/CardProject";


export default function ProjetDuClientFiltre() {
    //variables
    const projects = [
        {
          id: 1,
          title: "Booki",
          urlImage: "",
          description: "Projet réalisé dans le cadre de ma formation.",
        },
        {
          id: 2,
          title: "OhMyFood",
          urlImage: "",
          description: "Projet réalisé dans le cadre de ma formation.",
        },
        {
          id: 3,
          title: "LaPanthère",
          urlImage: "",
          description: "Projet réalisé dans le cadre de ma formation.",
        },
      ];

    const router = useRouter();
    let nomDuClient = router.query.client
    const annee = router.query.annee

    if(nomDuClient ==="perso") {
        nomDuClient = `Projets personnels (${annee})`
    }
    else {
        nomDuClient = `Projets de ${nomDuClient} (${annee})`;
    }
    return (
        <section>
        <h1>{nomDuClient}</h1>
        <div className="projects-list">
          {projects.map((project) => (
            <CardProject
              key={project.id}
              id={project.id}
              title={project.title}
              description={project.description} client={""} annee={0}          
            />
          ))}
        </div>
      </section>
    )
}