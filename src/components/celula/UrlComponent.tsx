import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { TextField, Typography, Snackbar, Alert, Box, Rating } from "@mui/material";
import { CreateUrlRequest, UpdateKey } from "@/controller/api";
import { maxLength } from "@/controller/keygen";

interface SnackData {
    type: "error"|"warning"|"success"|"info";
    text: string;
}


const UrlComponent: React.FC = () => {
    const [isRegistered, setIsRegistered] = useState(false);
    const [url, setUrl] = useState("");
    const [customText, setCustomText] = useState("");
    const [response, setResponse] = useState<{key: string}>();
    const [openSnack, setOpenSnack] = useState(false);
    const [snackData, setSnackData] = useState<SnackData>({type: "success", text: ""});

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        if (url) {
            const response = await CreateUrlRequest(url);
            const responseJson = await response.json();
            if (response.status == 200) {
                setResponse(responseJson);
                setCustomText(responseJson.key);
                setIsRegistered(true);
                setSnackData({
                    type: "success",
                    text: `Nova chave gerada, agora basta copiar!`});
                setOpenSnack(true);
            } else {
                setSnackData({
                    type: "error",
                    text: responseJson.error});
                setOpenSnack(true);
            }
        }
    };

    const rating = () => {
        setSnackData({type: "info", text: "Obrigado por nos avaliar!"});
        setOpenSnack(true);
    }    

    const handleCopy = () => {
        navigator.clipboard.writeText(`${window.location.origin}/${customText}`);
        setSnackData({type: "success", text: "Url copiada com sucesso!"});
        setOpenSnack(true);
    };
    
    // Function to be called after typing stops
    const onCustomTextChange = async() => {
        if(response && response.key != customText){
            const _response = await UpdateKey(response.key, customText);
            if (_response.status == 200){
                const _responseJson = await _response.json();
                setResponse(_responseJson);
                setSnackData({
                    type: "success",
                    text: `Nova chave gerada, agora basta copiar!`});
                setOpenSnack(true);
            }
            else {
                const _responseJson = await _response.json();
                console.log(_responseJson.error);
                if (String(_responseJson.error).includes('Unique')) {
                    _responseJson.error = 'Essa chave já existe, tente outra!';
                }
                setSnackData({
                    type: "error",
                    text: `${_responseJson.error}`});
                setOpenSnack(true);
                setCustomText(response.key);
            }
        }
    };

    // Debounce logic
  useEffect(() => {
    const handler = setTimeout(() => {
        if (customText) {
            onCustomTextChange();
        }
    }, 1000); // 1000 milliseconds = 1 second

    return () => {
        clearTimeout(handler); // Cleanup timeout on component unmount or when customText changes
    };
}, [customText, onCustomTextChange]); // Include onCustomTextChange here


    return (
        <div className="animated-container">
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
                    {!isRegistered && (
                        <TextField
                            required
                            className="custom-text-field"
                            type="url"
                            placeholder="URL de destino (ex: https://google.com)"
                            label="URL DESTINO"
                            onChange={(e) => setUrl(e.target.value)}
                            variant="filled"
                            autoComplete="off"
                            value={url}
                        />
                    )}

                    {isRegistered ? (
                        <Box className="box-url">
                            <TextField
                            className="custom-text-field-key"
                            type="text"
                            color="error"
                            inputProps={{
                                maxLength: maxLength  // Set maximum length
                            }}
                            autoComplete="off"
                            helperText={isRegistered ? "Fique livre para renomear" : ""}
                            placeholder="Texto personalizado (ex: meu-link)"
                            variant="standard"
                            onChange={(e)=>setCustomText(e.target.value)}
                            value={customText}
                        />
                            <button className="button" onClick={() => setIsRegistered(false)}>
                            x
                        </button>
                        </Box>
                    ) : (
                        <button className="button" type="submit">
                            Registrar URL
                        </button>
                    )}
                </form>
            </motion.div>
            <>
            {isRegistered && (
                <Box>
                    <motion.div
                    className="bottom-box"
                    initial={{ y: "50vh", opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}>
                    <button onClick={handleCopy}>
                        <section>
                            <h3>{`${window.location.origin}/`}</h3>
                            <h3 className="custom-text">{customText}</h3>
                        </section>
                        <Typography variant="body2" sx={{ color: "grey", marginBottom: 1 }}>
                            clique para copiar e também nos avalie!
                        </Typography> 
                    </button>
                   <Rating
                        onClick={rating}/>
                </motion.div>
                </Box>
            )}
            <Snackbar
                open={openSnack}
                autoHideDuration={6000}
                onClose={() => setOpenSnack(false)}>
                <Alert
                    onClose={() => setOpenSnack(false)}
                    severity={snackData.type}
                    variant="filled"
                    sx={{ width: '100%' }}>
                    {snackData.text}
                </Alert>
            </Snackbar>
            </>
        </div>
    );
};

export default UrlComponent;
