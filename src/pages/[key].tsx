import { useRouter } from 'next/router';
import { useEffect } from 'react';
import "@/app/globals.css"

export default function RedirectPage() {
    const router = useRouter();
    const { key } = router.query;

    useEffect(() => {
        if (key) {
            fetch(`/api?key=${key}`)
            .then(async (response)=>{
                const url = await response.json();
                router.push(url.target_url);
            })
            .catch(()=>{
                router.push('/');
            })
        }
    }, [key, router]);

  return(
    <div className="body" style={{
        justifyContent: "center",
        alignItems:"center"
    }}>
        <div className="apresentation" style={{marginTop: "-20%"}}>
            <section>
                <h1 className="title">Fast</h1>
                <h1 className="url-text">Url</h1>
            </section>
            <h2>Redirecionando...</h2>
        </div>
    </div>
  );
}