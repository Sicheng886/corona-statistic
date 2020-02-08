import React, { Component } from 'react';
import axios from 'axios';
import citiIndex from './cityIndex.json';
import moment from 'moment';

export const Context = React.createContext();

export class Provider extends Component {
  state = {
    rawData: [],
    updateTime: 'not avaliable',
    lineChartData: [],
    getData: async () => {
      const { data } = await axios.get(
        `https://services1.arcgis.com/0MSEUqKaxRlEPj5g/arcgis/rest/services/ncov_cases/FeatureServer/1/query?f=json&where=1=1&returnGeometry=false&spatialRel=esriSpatialRelIntersects&outFields=*&orderByFields=Confirmed desc,Country_Region asc,Province_State asc&resultOffset=0&resultRecordCount=250&cacheHint=true`
      );

      const content = data.features;
      const rawData = content.map(item => {
        const data = item.attributes;
        data.name = data.Province_State
          ? citiIndex[data.Province_State]
            ? citiIndex[data.Province_State]
            : data.Province_State
          : data.Country_Region;
        return data;
      });
      this.setState({ rawData: rawData });
      const lastUpdate = content[0].attributes.Last_Update;
      this.setState({ updateTime: new Date(lastUpdate).toLocaleString() });
    },
    getLineChartData: async () => {
      const { data } = await axios.get(
        `https://services1.arcgis.com/0MSEUqKaxRlEPj5g/arcgis/rest/services/cases_time/FeatureServer/0/query?f=json&where=Report_Date<='${moment(
          new Date().getTime()
        ).format(
          'YYYY[-]MM[-]DD[ ]HH[:]mm[:]ss'
        )}'&returnGeometry=false&spatialRel=esriSpatialRelIntersects&outFields=*&orderByFields=Report_Date asc&resultOffset=0&resultRecordCount=2000&cacheHint=true`
      );

      const content = data.features;
      const rawData = content.map((item, i) => {
        const data = item.attributes;
        if (i > 0) {
          data.Mainland_China_Increase =
            content[i].attributes.Mainland_China -
            content[i - 1].attributes.Mainland_China;
          data.Other_Locations_Increase =
            content[i].attributes.Other_Locations -
            content[i - 1].attributes.Other_Locations;
        } else {
          data.Mainland_China_Increase = content[i].attributes.Mainland_China;
          data.Other_Locations_Increase = content[i].attributes.Other_Locations;
        }

        return data;
      });
      this.setState({ lineChartData: rawData });
    }
  };

  componentDidMount() {
    this.state.getData();
    this.state.getLineChartData();
  }

  render() {
    return (
      <Context.Provider value={{ state: this.state }}>
        {this.props.children}
      </Context.Provider>
    );
  }
}
