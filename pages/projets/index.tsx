import React from "react";
import CardProject from "../../components/CardProjet/CardProject";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import pool from "../../lib/db";
import Head from "next/head";

interface Projets {
    id: number;
    title: string;
    description: string;
    client: string;
    annee: number;
  }
  

  export const getStaticProps: GetStaticProps = async () => {
    try {
      const client = await pool.connect();
      const result = await client.query("SELECT id, title, description, client, annee FROM test");
      const projects = result.rows;
      client.release();
      return {
        props: {
          projects: projects || [],
          fallback: 'false' 
        },
      };
    } catch (error) {
      console.error("Failed to fetch projects", error);
      return {
        notFound: true,
      };
    }
  };
  

interface ProjectsProps {
    projects: Projets[];
  }
export default function Projets({ projects }: ProjectsProps) {
        return (
    <section>
          <Head>
        <title>Projets de Bulle de Code - Développeur Web</title>
    </Head>
      <h1>Projets</h1>
      <div className="projects-list" style={{display:"flex", flexWrap:"wrap"}}>
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
    </section>
  );
}
