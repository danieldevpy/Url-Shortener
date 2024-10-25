import React, { useState } from "react";
import { motion } from "framer-motion";
import { TextField, Typography, Rating } from "@mui/material";

const UrlComponent: React.FC = () => {
    const [isRegistered, setIsRegistered] = useState(false);
    const [url, setUrl] = useState("");
    const [customText, setCustomText] = useState("");

    const handleRegister = (e: React.FormEvent) => {
        e.preventDefault();
        if (url && customText) {
            setIsRegistered(true);
        }
    };

    return (
        <div className="animated-container">
            {/* CentralBox Formulário */}
            <motion.div
                className="central-box"
                initial={{ y: 0 }}
                animate={isRegistered ? { y: -10 } : { y: 0 }}
                transition={{ type: "spring", stiffness: 60 }}
            >
                <div className="apresentation">
                    <section>
                    <h1 className="title">Fast</h1>
                    <h1 className="url-text">Url</h1>
                    </section>
                    <h2>Intuitivo, Seguro & Dinâmico. Personalize Grátis!</h2>
                </div>

                <form onSubmit={handleRegister}>
                    {isRegistered? undefined:
                     <TextField
                     required
                     className="input"
                     type="url"
                     placeholder="URL de destino (ex: https://google.com)"
                     label="URL DESTINO"
                     onChange={(e) => setUrl(e.target.value)}
                     variant="filled"
                     color="error"
                     value={url}
                     sx={{color: "wheat"}}
                     />}
                    <TextField
                        sx={{borderRadius: 4}}
                        type="text"
                        label={isRegistered?"Fique livre para renomear": ""}
                        placeholder="Texto personalizado (ex: meu-link)"
                        variant="standard"
                        color="error"
                        onChange={(e) => setCustomText(e.target.value)}
                        value={customText}/>
                    {isRegistered? undefined:
                    <button className="button" type="submit">Registrar URL</button>}
                </form>
            </motion.div>

            {/* BottomBox com a URL registrada */}
            {isRegistered && (
                <>
                <motion.div
                    className="bottom-box"
                    initial={{ y: "50vh", opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                >
                     <button>
                        <h3>https://fasturl.com/</h3>
                        <h3 className="custom-text">{`${customText}`}</h3>
                    </button>
                    <Typography variant="body2" sx={{ color: 'grey' }}>
                        clique para copiar.
                    </Typography>
                </motion.div>
                <Rating
                    name="simple-controlled"
                    value={5}
                   
                    />
                <button className="button">Apagar URL</button>
                </>
            )}
        </div>
    );
};

export default UrlComponent;
