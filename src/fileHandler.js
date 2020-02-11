import moment from 'moment';
/**
 *
 * @param {Object} data: the sourced data file
 * @returns {Object}
 */
const isDate = /\b\d+\W\d+\W\d{2}\s/;

const fileHandler = data => {
  const sampleData = data[0];
  let timeSeries = [];
  const processedData = [];

  //get time stamps, each day get last record
  for (const key in sampleData) {
    if (isDate.test(key)) {
      timeSeries = timeSeries.filter(record => {
        return record.split(' ')[0] !== key.split(' ')[0];
      });
      timeSeries.push(key);
    }
  }

  //put in the processed data
  timeSeries.forEach(record => {
    processedData.push({ timeStamp: moment(record, 'MM-DD-YY HH-mm ').unix() });
  });

  // put data to each timestamp
  data.forEach(item => {
    const index =
      item['Province/State'] === ''
        ? item['Country/Region']
        : item['Province/State'];
    for (const key in item) {
      if (isDate.test(key)) {
        const timeStamp = moment(key, 'MM-DD-YY HH-mm ').unix();
        processedData.forEach(record => {
          if (record.timeStamp === timeStamp) {
            record[index] = parseInt(item[key]);
          }
        });
      }
    }
  });
  //sort desc of num of people in last date
  // processedData.sort((a, b) => {
  //   const numA = a.dataInDate[a.dataInDate.length - 1].value;
  //   const numB = b.dataInDate[b.dataInDate.length - 1].value;
  //   return numB - numA;
  // });
  return processedData;
};

export default fileHandler;
