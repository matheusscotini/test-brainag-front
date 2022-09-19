import Request from "./request.service";

export default class ProducersHttpService {
    public static uri = "producers";

    public static getAllProducers(params: any) {
        return Request.get(`${this.uri}/`, params);
    }

    public static getProducer(id: any) {
        return Request.get(`${this.uri}/${id}`);
    }

    public static store(data: any) {
        return Request.post(`${this.uri}`, data);
    } 

    public static update(id: number, data: any) {
        return Request.patch(`${this.uri}/${id}`, data);
    } 
    
    public static remove(id: number) {
        return Request.del(`${this.uri}/${id}`);
    } 
}