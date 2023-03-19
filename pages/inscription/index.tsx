import React from 'react';
import Head from "next/head";
import { useState } from "react";
import { useForm } from 'react-hook-form';
import { SpinnerDiamond } from "spinners-react";


interface FormData {
    pseudo: string;
    email: string;
    motdepasse: string;
  }
  
  export default function Inscription() {
    const {
      register,
      handleSubmit,
      formState: { errors },
      reset,
    } = useForm<FormData>();
  
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isRegistered, setIsRegistered] = useState(false)
    const [message, setMessage] = useState('');
  
    const onSubmittedHandler = async (data: FormData) => {
        if (!isLoading) {
          setIsLoading(true);
          try {
            const response = await fetch("./api/user", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(data),
            });
      
            if (!response.ok) {
              setIsLoading(false);
              throw new Error("Erreur lors de l'ajout de l'utilisateur.");
            }
      
            const fetchedData = await response.json();
            setFormSubmitted(true);
            setIsLoading(false);
            setIsRegistered(fetchedData.pseudo);
            setMessage("Utilisateur ajouté avec succès !");
            reset();
          } catch (error) {
            console.error(error);
            setMessage("Une erreur est survenue lors de l'ajout de l'utilisateur.");
          }
        }
      };
      
      


    return (
        <>
          <Head>
            <title>Inscription</title>
          </Head>
          <h1>Inscription</h1>
          <section style={{ display: "flex", justifyContent: "center" }}>
            <main
              style={{
                backgroundColor: "#2a6e6b",
                padding: "30px",
                color: "white",
              }}
            >
            {(errors.pseudo || errors.email || errors.motdepasse) && (
                <small>Veuillez remplir tous les champs du formulaires.</small>
            )} 
            {message && <div>{message}</div>}
            {isRegistered ? 
                <div>Félicitation {isRegistered}, vous pouvez maintenant vous connecter.</div> 
            :(
            <form onSubmit={handleSubmit(onSubmittedHandler)}>
            <p>
                <label htmlFor="pseudo">Pseudo</label>
                <input
                id="pseudo"
                placeholder="Pseudo"
                style={{ display: 'block', width: '400px', minHeight: '30px', border: '2px solid black' }}
                {...register('pseudo', { required: true })}
                />
                {errors.pseudo && <small>Pseudo est requis.</small>}
            </p>
            <p>
                <label htmlFor="email">Email</label>
                <input
                id="email"
                type="email"
                placeholder="Email"
                style={{ display: 'block', width: '400px', minHeight: '30px', border: '2px solid black' }}
                {...register('email', { required: true })}
                />
                {errors.email && <small>Email est requis.</small>}
            </p>
            <p>
                <label htmlFor="motdepasse">Mot de passe</label>
                <input
                id="motdepasse"
                type="password"
                placeholder="Mot de passe"
                style={{ display: 'block', width: '400px', minHeight: '30px', border: '2px solid black' }}
                {...register('motdepasse', { required: true })}
                />
                {errors.motdepasse && <small>Mot de passe est requis.</small>}
            </p>
            <button
                style={{
                backgroundColor: '#2a6e6b',
                color: 'white',
                width: '200px',
                minHeight: '30px',
                border: '2px solid white',
                padding: '20px',
                }}
            >
                {isLoading ? (
                <SpinnerDiamond
                    size={30}
                    thickness={100}
                    speed={100}
                    color="white"
                    secondaryColor="rgba(0, 0, 0, 0.44)"
                />
                ) : (
                'Inscription'
                )}
            </button>
            </form>
            )}
            </main>
          </section>
        </>
      );
}      



