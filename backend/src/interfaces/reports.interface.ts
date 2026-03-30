export interface Reports {
  readonly image:string;
  readonly title:string;
  readonly description:string;
  readonly coords:[number,number];
  readonly popup: ReportPopup;
};

export interface ReportPopup {
  readonly image:string;
  readonly title:string;
  readonly description:string;
  readonly address:string;
  readonly schedule?:[
    ReportSchedule, ReportSchedule, ReportSchedule,
    ReportSchedule, ReportSchedule, ReportSchedule,
    ReportSchedule
  ];
};

export interface ReportSchedule {
  readonly openHours:number;
  readonly openMinutes:number;
  readonly closeHours:number;
  readonly closeMinutes:number;
  readonly dayoff?:boolean
};