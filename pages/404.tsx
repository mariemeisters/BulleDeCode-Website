import Link from "next/link";



export default function Error404() {
    return (
        <div style={{display:"flex", flexDirection:"column", alignItems:"center"}}>
          <h1  style={{fontSize:"150px", marginTop:"150px", marginBottom:"0px", color:"#2a6e6b"}}>404</h1>
          <p style={{fontSize:"50px"}}>Désolé, la page que vous recherchez est introuvable.</p>
          <Link legacyBehavior href="/">
            <a style={{fontSize:"50px",
                backgroundColor: "#2a6e6b",
                padding: "5px 15px 5px 15px",
                color: "white",
                borderRadius: "8px",
                textDecoration: "none",}}>Retour</a>
          </Link>
        </div>
      );
    }
