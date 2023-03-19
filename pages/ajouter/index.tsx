import Head from "next/head";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { SpinnerDiamond } from "spinners-react";
import { MyNextApiRequest } from "../../types/next";
import { NextApiResponse } from "next";

interface FormData {
  id: string;
  title: string;
  slug: string;
  description: string;
  client: string;
  annee: string;
}

interface Props {
  isAuthenticated: boolean;
}

export default function Ajouter({ isAuthenticated }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>();

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [warningError, setWarningError] = useState();

  const onSubmittedHandler = async (data: FormData) => {
    if (!isLoading) {
      setIsLoading(true);
      try {
        const response = await fetch("./api/projet", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });

        if (!response.ok) {
          setIsLoading(false);
          throw new Error("Erreur lors de l'ajout du projet.");
        }
        setFormSubmitted(true);
        setIsLoading(false);
        alert("Projet ajouté avec succès !");
        reset();
      } catch (error) {
        console.error(error);
        alert("Une erreur est survenue lors de l'ajout du projet.");
      }
    }
  };
  return (
    <>
      <Head>
        <title>Ajouter un Projet</title>
      </Head>
      <h1>Ajouter un projet</h1>
      <section style={{ display: "flex", justifyContent: "center" }}>
        <main
          style={{
            backgroundColor: "#2a6e6b",
            padding: "30px",
            color: "white",
          }}
        >
          {(errors.id ||
          errors.title ||
          errors.slug ||
          errors.description ||
          errors.annee) && (
            <span>Veuillez remplir tous les champs du formulaires.</span>
          )}
          <form onSubmit={handleSubmit(onSubmittedHandler)}>
            <p>
                <label htmlFor="id">Id</label>
                <input id="id" placeholder="Id du projet" style={{display:'block', width:"400px", minHeight:"30px", border: "2px solid black"}}
                {...register("id",{ required : true})}                
                />
                {errors.id && <span>Id est requis.</span>}

            </p>
            <p>
                <label htmlFor="title">Titre</label>
                <input id="title" placeholder="Titre du projet" style={{display:'block', width:"400px", minHeight:"30px", border: "2px solid black"}}
                {...register("title",{required : true})}
                />
                {errors.title && <span>Titre est requis.</span>}
            </p>
            <p>
                <label htmlFor="slug">Slug</label>
                <input id="slug" placeholder="Slug du projet" style={{display:'block', width:"400px", minHeight:"30px", border: "2px solid black"}}
                {...register("slug", {required : true})}
                />
                {errors.slug && <span>Slug est requis.</span>}
            </p>
            <p>
                <label htmlFor="description">Description</label>
                <textarea id="description" placeholder="Description du projet" style={{display:'block', width:"400px", minHeight:"30px", border: "2px solid black"}}
                {...register("description", {required :true})}
                />
                {errors.description && <span>Description est requis.</span>}
            </p>
            <p>
                <label htmlFor="client">Client</label>
                <input id="client" placeholder="Client du projet" style={{display:'block', width:"400px", minHeight:"30px", border: "2px solid black"}}
                {...register("client", {required :true})}
                />
                {errors.client && <span>Client est requis.</span>}

            </p>
            <p>
                <label htmlFor="annee">Annee</label>
                <input id="annee" placeholder="Annee du projet" style={{display:'block', width:"400px", minHeight:"30px", border: "2px solid black"}}
                {...register("annee", {required :true})}
                />
                {errors.annee && <span>Annee est requis.</span>}

            </p>
            <button style={{backgroundColor: "#2a6e6b", color:"white" , width:"200px", minHeight:"30px", border: "2px solid white", padding:"20px"}}>
              {isLoading ? (
              <SpinnerDiamond 
                size={30} 
                thickness={100} 
                speed={100} 
                color="white" 
                secondaryColor="rgba(0, 0, 0, 0.44)" />
                ) : (
                  "Ajouter"
                )}
            
              </button>
            </form>
        </main>
        </section>
        </>
    )
}

const getServerSidePropsForAdd = async (ctx: { req: MyNextApiRequest; res: NextApiResponse<any>; }) => {
  // Récupérer le cookie contenant le JWT
  const token = ctx.req.cookies.token;

  // Vérifier si le cookie existe
  if (!token) {
    // Rediriger vers la page de connexion
    return {
      redirect: {
        destination: "/connexion",
        permanent: false,
      },
    };
  }

  // Si le cookie existe, continuer normalement
  return { props: { isAuthenticated: true } };
};
//effectue la vérification de l'authentification et la redirection si nécessaire. Pour que Next.js sache utiliser cette fonction, 
//il faut l'exporter avec le nom getServerSideProps
export const getServerSideProps = getServerSidePropsForAdd;