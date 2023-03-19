import React from "react";
import classes from './CardProject.module.css';
//import { useRouter } from "next/router";
import Link from "next/link";



interface CardProjectProps {
  id: number;
  title: string;
  description: string;
  client: string;
  annee: number;
}

function CardProject({ id, title, description, client, annee }: CardProjectProps) {
  

  return (
    <Link legacyBehavior href={`/projets/${title}`}>
      <a className={classes.CardProject}>
        <article>
          <h3>{title}</h3>
          <p>{description}</p>
          <p>{client}</p>
        </article>
      </a>
    </Link>
  );
}

export default CardProject;

  //variable
 // const router = useRouter();
  
  // const cardCliquedHandler = () => {
  //   router.push({
  //     pathname: "/projets/[slug]",
  //     query: {
  //       slug: "test"
  //     }
  //   })
  // }     //onClick={cardCliquedHandler}
