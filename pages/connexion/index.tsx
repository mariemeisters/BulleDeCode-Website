import React from 'react';
import Head from "next/head";
import { useState } from "react";
import { useForm } from 'react-hook-form';
import { SpinnerDiamond } from "spinners-react";
import { useRouter } from 'next/router';
import { parseCookies } from 'nookies';

interface FormData {
  email: string;
  motdepasse: string;
}

export default function Connexion() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const cookies = parseCookies();
  const token = cookies.token || '';

  const onSubmitHandler = async (data: FormData) => {
    setIsLoading(true);
    const response = await fetch('./api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(data),
    });

    setIsLoading(false);

    if (response.ok) {
      router.push('/');
      // Ajouter le déclenchement de l'événement loginChange après une connexion réussie
      window.dispatchEvent(new Event('loginChange'));
    } else {
      const { message } = await response.json();
      alert(message);
    }
  };

  return (
    <>
      <Head>
        <title>Connexion</title>
      </Head>
      <h1>Connexion</h1>
      <section style={{ display: "flex", justifyContent: "center" }}>
        <main
          style={{
            backgroundColor: "#2a6e6b",
            padding: "30px",
            color: "white",
          }}
        >
          {(errors.email || errors.motdepasse) && (
            <span>Veuillez remplir tous les champs du formulaires.</span>
          )}
          <form onSubmit={handleSubmit(onSubmitHandler)}>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              placeholder="Email"
              style={{ display: 'block', width: '400px', minHeight: '30px', border: '2px solid black' }}
              {...register('email', { required: true })}
            />
            {errors.email && <span>Email est requis.</span>}
            <p>
              <label htmlFor="motdepasse">Mot de passe</label>
              <input
                id="motdepasse"
                type="password"
                placeholder="Mot de passe"
                style={{ display: 'block', width: '400px', minHeight: '30px', border: '2px solid black' }}
                {...register('motdepasse', { required: true })}
              />
              {errors.motdepasse && <span>Mot de passe est requis.</span>}
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
                'Connexion'
              )}
            </button>
          </form>
        </main>
      </section>
    </>
  );
}
