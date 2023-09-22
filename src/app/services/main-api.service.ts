import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class MainApiService {
  private readonly API = 'http://localhost:8081/api/';
  constructor(private http: HttpClient) { }

   public listAlimentos(){
     return this.http.get<any>(this.API + "alimentos");
   }
   public inserirEmLote(data: any){
    return this.http.post<any>(this.API + "addAlimentosBatch", data);
   }
   public listAlimentosIngeridos(){

      return this.http.get<any>(this.API + "listarAlimentosIngeridos");
   }
  public deleteAlimentosIngeridos(id: number){
     return this.http.delete<any>(this.API + "deletarAlimentosIngeridos/"+ id);
  }
  public listAlimentosFav(){
    return this.http.get<any>(this.API + "alimentosFav");
  }
 public inserirEmLoteFav(data: any){
    return this.http.post<any>(this.API + "addAlimentosFavBatch", data);
 }
}
