import React, { useContext, useState, useEffect } from 'react';
import styles from './App.module.css';
// import VirusChart from '../VirusChart/VirusChart';
// import VirusLine from '../VirusLine/VirusLine';
import { ReBarchart, ReLinechart } from '../ReChart/ReChart';
import InstallBtn from '../InstallBtn/InstallBtn';
import { Context } from '../../Context';
import text from '../../text.js';

const App = () => {
  const { state } = useContext(Context);
  const { rawData, lineChartData, updateTime } = state;

  const [finalData, setFinalData] = useState(rawData);
  const [area, setArea] = useState('1');

  useEffect(() => {
    if (area === '1') {
      //china
      const filterData = rawData.filter(
        item =>
          item.Country_Region === 'Mainland China' ||
          item.Country_Region === 'Hong Kong' ||
          item.Country_Region === 'Macau' ||
          item.Country_Region === 'Taiwan'
      );
      setFinalData(filterData);
    } else if (area === '-1') {
      //overseas
      const filterData = rawData.filter(
        item =>
          item.Country_Region !== 'Mainland China' &&
          item.Country_Region !== 'Hong Kong' &&
          item.Country_Region !== 'Macau' &&
          item.Country_Region !== 'Taiwan'
      );
      setFinalData(filterData);
    } else {
      setFinalData(rawData);
    }
  }, [area, rawData]);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>{text.title}</h1>
          <h2 className={styles.subtitle}>
            {text.update} {updateTime}
          </h2>
        </div>
        <div>
          <InstallBtn />
        </div>
      </header>
      <div className={styles.checkBox}>
        <div>
          <label htmlFor='area'>{text.selectArea}</label>
          <select
            name='area'
            id='area'
            value={area}
            onChange={event => setArea(event.target.value)}
          >
            <option value='0'>{text.global}</option>
            <option value='1'>{text.ch}</option>
            <option value='-1'>{text.oversea}</option>
          </select>
        </div>
      </div>
      {/* <VirusChart barData={finalData} updateTime={updateTime} />
      <VirusLine data={finalLineData} /> */}
      <ReBarchart data={finalData} />
      <ReLinechart data={lineChartData} area={area} />
      <p className={styles.footer}>
        {text.datasource}{' '}
        <a href='https://gisanddata.maps.arcgis.com/apps/opsdashboard/index.html#/bda7594740fd40299423467b48e9ecf6'>
          Johns Hopkins CSSE
        </a>
        . Made by Wally, 2020
      </p>
    </div>
  );
};

export default App;
