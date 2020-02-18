import moment from 'moment';
/**
 *
 * @param {Object} data: the sourced data file
 * @returns {Object}
 */
const isDate = /\b\d+\W\d+\W\d{2}/;

const fileHandler = data => {
  const sampleData = data[0];
  const processedData = [];

  //get time stamps
  for (const key in sampleData) {
    if (isDate.test(key)) {
      processedData.push({ timeStamp: moment(key, 'MM-DD-YY HH-mm ').unix() });
    }
  }

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

  return processedData;
};

export default fileHandler;
