let reports = [];

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
