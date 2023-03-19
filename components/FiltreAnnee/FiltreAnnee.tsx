import Link from 'next/link'

    interface FiltersProps {
      client: string;
      annee: number;
    }
    
export default function FiltreAnnee({ client, annee }: FiltersProps) {
      return (
        <div style={{ display: "flex", gap: "10px" }}>
          <Link legacyBehavior href={`/${client}/${annee}`}>
            <a
              style={{
                backgroundColor: "#2a6e6b",
                padding: "5px 15px 5px 15px",
                color: "white",
                borderRadius: "8px",
                textDecoration: "none",
              }}
            >
              2022
            </a>
          </Link>
          <Link legacyBehavior href={`/${client}/2023`}>
            <a
              style={{
                backgroundColor: "#2a6e6b",
                padding: "5px 15px 5px 15px",
                color: "white",
                borderRadius: "8px",
                textDecoration: "none",
              }}
            >
              2023
            </a>
          </Link>
          
          <Link legacyBehavior href={`/${client}/2024`}>
            <a
              style={{
                backgroundColor: "#2a6e6b",
                padding: "5px 15px 5px 15px",
                color: "white",
                borderRadius: "8px",
                textDecoration: "none",
              }}
            >
              2024
            </a>
          </Link>
        </div>
      );
    }
    