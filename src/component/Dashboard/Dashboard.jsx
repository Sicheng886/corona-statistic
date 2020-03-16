import React, { useContext, useState, useEffect } from 'react';
import styles from './Dashboard.module.css';

import Header from '../Header/Header';
import { ReBarchart, ReLinechart } from '../ReChart/ReChart';

import { Context } from '../../Context';
import text from '../../text.js';

const Dashboard = () => {
  const { state } = useContext(Context);
  const { rawData, lineChartData, updateTime } = state;

  const [finalData, setFinalData] = useState(rawData);
  const [area, setArea] = useState('1');
  const [isActiveOnly, setIsActiveOnly] = useState(false);

  useEffect(() => {
    const sortedData = isActiveOnly
      ? rawData.sort((a, b) => b.Active - a.Active)
      : rawData;
    if (area === '1') {
      //china
      const filterData = sortedData.filter(
        item =>
          item.Country_Region === 'China' ||
          item.Country_Region === 'Hong Kong' ||
          item.Country_Region === 'Macau' ||
          item.Country_Region === 'Taiwan*'
      );
      setFinalData(filterData);
    } else if (area === '-1') {
      //overseas
      const filterData = sortedData.filter(
        item =>
          item.Country_Region !== 'China' &&
          item.Country_Region !== 'Hong Kong' &&
          item.Country_Region !== 'Macau' &&
          item.Country_Region !== 'Taiwan*'
      );
      setFinalData(filterData);
    } else {
      setFinalData(sortedData);
    }
  }, [area, rawData, isActiveOnly]);

  return (
    <div className={styles.container}>
      <Header title={text.title} subtitle={`${text.update} ${updateTime}`} />
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
        <div>
          <label htmlFor='active'>Show Active</label>
          <input
            type='checkbox'
            name=''
            id='active'
            onChange={e => setIsActiveOnly(e.target.checked)}
          />
        </div>
      </div>
      {/* <VirusChart barData={finalData} updateTime={updateTime} />
      <VirusLine data={finalLineData} /> */}
      <ReBarchart data={finalData} isActiveOnly={isActiveOnly} />
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

export default Dashboard;
