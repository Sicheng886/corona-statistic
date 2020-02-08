import React from 'react';
import { Chart } from 'react-google-charts';
import styles from './VirusLine.module.css';

const VirusLine = ({ data }) => {
  console.log(data);
  return (
    <div className={styles.chart}>
      <Chart
        width={'96vw'}
        height={'25vh'}
        chartType='Line'
        data={data}
        options={{
          chart: {
            title: 'Daily number change'
          },
          axes: {
            // Adds labels to each axis; they don't have to match the axis names.
            y: {
              0: { label: 'Number of people' }
            }
          },
          legend: { position: 'none' }
        }}
      />
    </div>
  );
};

export default VirusLine;
