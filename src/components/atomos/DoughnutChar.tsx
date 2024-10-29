import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, Chart, registerables } from 'chart.js';

// Registrar todos os componentes do Chart.js necessários
ChartJS.register(...registerables);

interface DoughnutChartProps {
    rating: number; // Avaliação entre 0 e 5
}

const DoughnutChart: React.FC<DoughnutChartProps> = ({ rating }) => {
    const ratingPercentage = (rating / 5) * 100;

    const data = {
        labels: [''],
        datasets: [
            {
                data: [ratingPercentage, 100 - ratingPercentage],
                backgroundColor: [
                    'rgb(255,48,88, 0.8)', // Cor para a avaliação
                    'rgba(230, 230, 230, 0.3)', // Cor para a parte restante
                ],
                borderColor: 'rgba(255, 255, 255, 0)', // Remove bordas
                borderWidth: 0,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false, // Permite definir tamanho fixo
        plugins: {
            legend: {
                display: false, // Remove a legenda
            },
            tooltip: {
                enabled: false, // Desativa o tooltip
            },
        },
        elements: {
            arc: {
                borderWidth: 0, // Remove a borda das fatias
            },
        },
    };

    // Plugin para desenhar o texto no centro e o texto do restante
    const drawText = {
        id: 'drawText',
        beforeDraw: (chart: Chart<"doughnut", number[], unknown>) => {
            const { ctx, chartArea } = chart;
            if (!chartArea) return;

            const { width, height } = chartArea;
            const centerFontSize = (height / 10).toFixed(2); // Aumentar o tamanho do texto central
            ctx.restore();

            // Texto central
            ctx.font = `${centerFontSize}px sans-serif`;
            ctx.textBaseline = 'middle';
            ctx.fillStyle = 'white'; // Cor do texto central
            const centerText = rating.toFixed(1); // Formata o texto para uma casa decimal
            const centerTextX = Math.round((width - ctx.measureText(centerText).width) / 2);
            const centerTextY = Math.round(height / 2);

            ctx.fillText(centerText, centerTextX, centerTextY); // Desenha o texto central
            
            ctx.save();
        },
    };

    return (
        <Doughnut data={data} options={options} plugins={[drawText]} />
    );
};

export default DoughnutChart;
