import { Box } from "@mui/material"
import CardBox from "../atomos/Card"
import DoughnutChart from "../atomos/DoughnutChar"
import BarChart from "../atomos/BarChar"

export default function InfosCards() {
    return (
        <Box className="infos-cards">
            <CardBox
                title="Melhores Avaliações!">
                    <DoughnutChart
                        rating={4.5}/>
                </CardBox>
            <CardBox
                title="Estatísticas">
                    <BarChart
                        totalCount={400}/>
                </CardBox>
            <CardBox
                title="Estatísticas">

                </CardBox>
        </Box>
    )
}