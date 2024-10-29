import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Box, Typography } from '@mui/material';

// Registrar os componentes do Chart.js necessários
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface BarProps {
    totalCount: number; // Exemplo de propriedade, pode ser usada conforme necessário
}

const BarChart: React.FC<BarProps> = ({ totalCount }) => {
    const data = {
        labels: ['Este Mês', 'Mês Passado', 'Mês Anterior'], // Datas
        datasets: [
            {
                label: 'Valores',
                data: [30, 50, 20], // Valores para cada mês
                backgroundColor: '#ff717b', // Cor das barras
                borderColor: '', // Cor das bordas
                borderWidth: 0,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false, // Permite que o gráfico ocupe todo o espaço disponível
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                enabled: true,
            },
        },
        scales: {
            y: {
                beginAtZero: true, // Inicia o eixo Y em 0
            },
        },
    };

    return (
        <Box>

            <Bar style={{maxHeight: 150}} data={data} options={options} />
            <Box  sx={{
                display: "flex",
                justifyContent: "center",
                alignItems :"center",
                gap: 0.5,
                }}>
            <Typography style={{color: "#ff717b", fontSize: 30, letterSpacing: -1, }}>
                {`+${totalCount}`}
            </Typography>
            <Typography style={{color: "white", marginTop: 5}}>URLS ENCURTADAS</Typography>
            </Box>
        </Box>
    );
};

export default BarChart;
