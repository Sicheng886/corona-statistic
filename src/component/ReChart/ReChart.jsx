import React from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  ComposedChart,
  LineChart,
  Line,
  Brush,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';
import moment from 'moment';
import styles from './Rechart.module.css';
import text from '../../text';

const BarTip = ({ active, payload, label }) => {
  if (active) {
    return (
      <div className={styles.tip}>
        <h1>{label}</h1>
        {payload
          ? payload.map((data, i) => (
              <p key={i} style={{ color: data.fill }}>
                {text[data.name]}: {data.value}
              </p>
            ))
          : null}
      </div>
    );
  }
  return null;
};

export const ReBarchart = ({ data, isActiveOnly }) => {
  console.log(data);
  return (
    <div className={styles.barChart}>
      <ResponsiveContainer width='100%' height={2000}>
        <BarChart data={data} layout='vertical' barCategoryGap='6%' barGap='4%'>
          <Brush dataKey='name' height={30} stroke='#8884d8' />
          <CartesianGrid strokeDasharray='3 3' />
          <XAxis type='number' orientation='top' />
          <YAxis type='category' dataKey='name' />
          <Tooltip content={<BarTip />} />
          <Legend />
          {isActiveOnly ? <Bar dataKey='Active' fill='#fcbc00' /> : null}
          {!isActiveOnly ? <Bar dataKey='Confirmed' fill='#fcbc00' /> : null}
          {!isActiveOnly ? <Bar dataKey='Recovered' fill='#82ca9d' /> : null}
          {!isActiveOnly ? <Bar dataKey='Deaths' fill='#760101' /> : null}
        </BarChart>
      </ResponsiveContainer>
      <p>Try to move the brush above to adjust range for display</p>
    </div>
  );
};

const ComposeToolTip = ({ active, payload, label }) => {
  if (active) {
    return (
      <div className={styles.tip}>
        <h1>{moment(label).format('MMM Do')}</h1>
        {payload && payload.length === 4 ? (
          <div>
            <div>
              <p>
                <strong>{text[payload[2].name]}:</strong> {payload[2].value} /{' '}
                {payload[0].value}&uarr;
              </p>
            </div>
            <div>
              <p>
                <strong>{text[payload[3].name]}:</strong> {payload[3].value} /{' '}
                {payload[1].value}&uarr;
              </p>
            </div>
          </div>
        ) : payload && payload.length === 2 ? (
          <div>
            <p>
              <strong>{text[payload[1].name]}:</strong> {payload[1].value} /{' '}
              {payload[0].value}&uarr;
            </p>
          </div>
        ) : null}
      </div>
    );
  }
  return null;
};

export const ReLinechart = ({ data, area }) => {
  return (
    <div className={styles.lineChart}>
      <ResponsiveContainer width='98%' height={200}>
        <ComposedChart data={data} barSize={5}>
          <CartesianGrid strokeDasharray='3 3' />
          <XAxis
            dataKey='Report_Date'
            tickFormatter={unixTime => moment(unixTime).format('MMM D')}
            padding={{ left: 22, right: 22 }}
          />
          <YAxis yAxisId='left' orientation='left' />
          <YAxis yAxisId='right' orientation='right' />
          <Tooltip content={<ComposeToolTip />} />
          <Legend />
          {area >= 0 ? (
            <Bar
              yAxisId='right'
              dataKey='Mainland_China_Increase'
              fill='#F9BF45'
            />
          ) : null}
          {area <= 0 ? (
            <Bar
              yAxisId='right'
              dataKey='Other_Locations_Increase'
              fill='#86C166'
            />
          ) : null}
          {area >= 0 ? (
            <Line
              yAxisId='left'
              type='monotone'
              dataKey='Mainland_China'
              stroke='#78552B'
            />
          ) : null}

          {area <= 0 ? (
            <Line
              yAxisId='left'
              type='monotone'
              dataKey='Other_Locations'
              stroke='#4D5139'
            />
          ) : null}
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};

const colors = ['#4D5139', '#F9BF45', '#78552B'];

export const DetailedChart = ({ data }) => {
  return (
    <div>
      <ResponsiveContainer width='100%' height={550}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray='3 3' />
          <XAxis
            dataKey='timeStamp'
            tickFormatter={unixTime => moment(unixTime * 1000).format('MMM D')}
          />
          <YAxis allowDataOverflow={false} type='number' />
          <Tooltip
            labelFormatter={unixTime => moment(unixTime * 1000).format('MMM D')}
          />
          <Legend />
          {/* <Line type='monotone' dataKey='Hubei' stroke='#8884d8' /> */}
          {Object.keys(data[0]).map((key, index) => {
            if (key !== 'timeStamp' && key !== '') {
              return (
                <Line
                  key={key}
                  type='monotone'
                  dataKey={key}
                  stroke={colors[index]}
                  strokeWidth={2}
                />
              );
            }
            return null;
          })}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
