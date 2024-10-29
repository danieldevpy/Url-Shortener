import "@/app/globals.css"
import InfosCards from "@/components/celula/InfosCards"
import UrlComponent from "@/components/celula/UrlComponent"
import ResponsiveAppBar from "@/components/atomos/AppBar"


export default function HomePage(){
    return (
        <div className="body">
            <header><ResponsiveAppBar/></header>
            <main><UrlComponent/></main>
            <footer><InfosCards/></footer>
        </div>
    )
}