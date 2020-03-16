export const enText = {
  title: 'Coronavirus Statistics',
  update: 'Last Update:',
  selectArea: 'Select Area: ',
  global: 'Global',
  ch: 'China',
  oversea: 'Overseas',
  Confirmed: ' Confirmed',
  Recovered: 'Recovered',
  Deaths: 'Deaths',
  Active: 'Active',
  Mainland_China: 'Mainland China',
  Other_Locations: 'Other Locations',
  datasource: 'Data source: '
};

export const chText = {
  title: '实时疫情统计',
  update: '最近更新',
  selectArea: '选择区域: ',
  global: '全球',
  ch: '中国',
  oversea: '海外',
  Confirmed: '确诊',
  Recovered: '康复',
  Deaths: '死亡',
  Active: '现存',
  Mainland_China: '中国大陆',
  Other_Locations: '其它地区',
  datasource: '数据来源: '
};

const text = navigator.language === 'zh-CN' ? chText : enText;

export default text;
