import "@/app/globals.css"
import InfosCards from "@/app/components/celula/InfosCards"
import UrlComponent from "@/app/components/celula/UrlComponent"

export default function HomePage(){
    return (
        <div className="body">
            <header>
                <h1>FastUrl</h1>
            </header>
            <main>
                <UrlComponent/>
            </main>
            <footer>
                <InfosCards/>                
            </footer>
        </div>
    )
}