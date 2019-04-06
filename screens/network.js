let reports = [
  {
    latitude: 32.0809,
    longitude: 34.7799,
    type: 'Crash',
    text: 'ebike crash with helmet - he was okay',
    color: 'red',
    id: 0,
  },

  {
    latitude: 32.0689,
    longitude: 34.7709,
    type: 'Animal in Lane',
    text: 'cat with kittens. Very cute, easy to run over',
    color: 'blue',
    id: 1,
  },
  
  {
    latitude: 32.0681,
    longitude: 34.7710,
    type: 'Animal in Lane',
    text: 'Drunk Homie running around',
    color: 'green',
    id: 2,
  },

  ...[...Array(15)].map((o, i)=> ({
    latitude: 32.09 - i*0.0009,
    longitude: 34.7829 - i*0.00024 + 0.00001 * i*i,
    type: 'Safety Event',
    text: 'Biking against traffic',
    color: 'orange',
    id: 8 + i,
  })),
];

let reportMarker = null;

export default {
  saveReportMarker: (latlng)=>{
    reportMarker = latlng;
    return ({ savedReportMarker: latlng });
  },

  loadReportMarker: ()=> ({ reportMarker }),

  createReport: report => ({ reports: reports = [...reports, report] }),

  loadReports: ()=> ({ reports })
};
