export interface Employee {
    id: number;
    name: string;
    position: string;
    hireDate: string;
    active: boolean;
    directReports: number[];
}