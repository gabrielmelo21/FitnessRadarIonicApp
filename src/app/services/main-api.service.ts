import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class MainApiService {
  private readonly API = 'http://localhost:8081/api/';
  constructor(private http: HttpClient) { }

   public listAlimentos(){
     return this.http.get<any>(this.API + "alimentos");
   }
  public addAlimentosIngeridos(data: any) {
      return this.http.post<any>(this.API + "addAlimentosIngeridos", data);

  }

   public inserirEmLote(data: any){
    return this.http.post<any>(this.API + "addAlimentosBatch", data);
   }
   public inserirAlimentos(data: any){
     return this.http.post<any>(this.API + "addAlimentos", data);
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
