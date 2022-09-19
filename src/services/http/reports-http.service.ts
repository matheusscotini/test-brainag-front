import Request from "./request.service";

export default class ReportsHttpService {
    public static uri = "reports";

    public static getTotalFarms() {
        return Request.get(`${this.uri}/total-farms`);
    }

    public static getTotalHectares() {
        return Request.get(`${this.uri}/total-hectares`);
    } 
    
    public static getTotalArableArea() {
        return Request.get(`${this.uri}/total-arable-area`);
    } 

    public static getTotalFarmsByState() {
        return Request.get(`${this.uri}/farms-by-state`);
    } 

    public static getTotalTypeArea() {
        return Request.get(`${this.uri}/type-area`);
    } 
}