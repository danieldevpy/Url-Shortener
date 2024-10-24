import { useRouter } from 'next/router';
import { useEffect } from 'react';

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

  return <p>Redirecionando...</p>;
}