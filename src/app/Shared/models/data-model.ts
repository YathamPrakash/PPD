export interface menuItem{
    label:string;
    icon:string;
    route:string;
    open?:boolean;
    children?:menuItem[]
}


export interface LazyTableEvent {
  first: number;
  rows: number;
  sortField?: string;
  sortOrder?: number;
  filters?: any;
  globalFilter?: string;
}
