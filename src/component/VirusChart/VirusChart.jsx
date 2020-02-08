import React from 'react';
import { Chart } from 'react-google-charts';
import styles from './VirusChart.module.css';

const VirusChart = ({ barData, updateTime }) => {
  return (
    <div className={styles.chart}>
      <Chart
        chartType='Bar'
        width='96vw'
        height='200vh'
        data={barData}
        options={{
          // Material design options
          chart: {
            title: `Current Global Virus Stataic, update time: ${updateTime}`
          },
          axisTitlesPosition: 'out',
          bars: 'horizontal',
          bar: { groupWidth: '90%' },
          axes: {
            y: {
              0: { side: 'left', label: '' }
            },
            x: {
              0: { side: 'top', label: 'Number' } // Top x-axis.
            }
          },
          legend: { position: 'none' }
        }}
      />
    </div>
  );
};

export default VirusChart;
