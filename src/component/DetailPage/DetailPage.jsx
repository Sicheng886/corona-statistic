import React, { useContext, useState } from 'react';
import styles from './DetaiPage.module.css';

import Header from '../Header/Header';
import { DetailedChart } from '../ReChart/ReChart';

import { Context } from '../../Context';
import cityIndex from '../../cityIndex';
import text from '../../text.js';

const DetailPage = () => {
  const { state } = useContext(Context);
  const { detailedData } = state;
  const locations = Object.keys(detailedData[detailedData.length - 1]);

  const [city1, setCiti1] = useState('Yunnan');
  const [city2, setCiti2] = useState('');
  const [city3, setCiti3] = useState('');
  const displayData = detailedData.map(record => {
    const newRecord = { timeStamp: record.timeStamp };
    newRecord[city1] = record[city1];
    newRecord[city2] = record[city2];
    newRecord[city3] = record[city3];

    return newRecord;
  });

  return (
    <div className={styles.wrapper}>
      <Header title='Detail Page' subtitle='Update to 22nd Feb' />
      <div className={styles.selectDiv}>
        <label htmlFor=''>Select cities</label>
        <CitySelect value={city1} setValue={setCiti1} valueList={locations} />
        <CitySelect value={city2} setValue={setCiti2} valueList={locations} />
        <CitySelect value={city3} setValue={setCiti3} valueList={locations} />
      </div>
      <div className={styles.chart}>
        <DetailedChart data={displayData} />
      </div>
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

const CitySelect = ({ value, valueList, setValue }) => {
  return (
    <select value={value} onChange={event => setValue(event.target.value)}>
      <option key='0' value=''>
        Empty
      </option>
      {valueList.map(location => {
        if (location !== 'timeStamp') {
          return (
            <option key={location} value={location}>
              {cityIndex[location] ? cityIndex[location] : location}
            </option>
          );
        }
        return null;
      })}
    </select>
  );
};

export default DetailPage;
