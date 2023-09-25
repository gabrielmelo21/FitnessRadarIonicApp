import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ModalController} from "@ionic/angular";
import {MainApiService} from "../services/main-api.service";
import {map, Observable, retry} from "rxjs";



interface Item {
  nome: string,
  calorias: number,
  quantidade: number
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent   {


  public alimentosFav$: Observable<any> | undefined;

  public listaAlimentos:any [] = [];
  public cardClass: any;
  public gridSize: any;
  public isToastOpen = false;
  public toastMsg: string = '';
  public meuFormGroup: FormGroup;
  public formGroupAddAlimentosIngeridos: FormGroup;
  public pesquisa: string = '';

  public alimentoSelected: any;
  public caloriasSelected: any;
  public quantidadeSelected:number = 1;
  public finalKcal:any;

  public calorias_atual: any;
  public tmb: any;
  public deficit_calorico: any;
  public data_dia: any;
  public progressBarPercentage: any;

  public alimentosSelecionados: Array<{ alimento: string, calorias: number }> = [];
  public  selectedRadio: any;

  public changeBlockAddAlimento: boolean = false;



  constructor(private formBuilder: FormBuilder, private modalController: ModalController, private mainApi: MainApiService) {
    this.verificarTamanhoTela();window.addEventListener('resize', () => {this.verificarTamanhoTela();});
    this.meuFormGroup = this.formBuilder.group({alimento: ['', Validators.required], calorias: [0, Validators.required],});
    this.formGroupAddAlimentosIngeridos =  this.formBuilder.group({alimento: ['', Validators.required], calorias: [0, Validators.required], quantidade:[0]});
    this.listAlimentosIngeridos();
    this.listFav();
    this.mainToFav();
    this.listCalorias();


  } //end constructor
  public verificarTamanhoTela() {
    const width = window.innerWidth;
    if (width >= 768) {
      this.cardClass = 'borderRadius20 rgba pc';
      this.gridSize = "auto"
    } else {
      this.cardClass = 'borderRadius20 rgba ';
      this.gridSize = ""
    }
  }
  public setOpen(isOpen: boolean, toastMsg: string) {
    this.isToastOpen = isOpen;
    this.toastMsg = toastMsg;
  }
  public changeSelected(item: { alimento: string, calorias: number }[]) {
      this.changeBlockAddAlimento = true;
      const item2 = JSON.parse(JSON.stringify(item));
      this.alimentoSelected = item2.alimento;
      this.caloriasSelected = item2.calorias;
      this.quantidadeChange();
  }
  public quantidadeChange(){
    if (this.quantidadeSelected>1){
      this.finalKcal = this.caloriasSelected * this.quantidadeSelected;
    }
    if (this.quantidadeSelected==1){
      this.finalKcal = this.caloriasSelected;
    }
  }
  async submitForm() {
    if (this.meuFormGroup.valid) {
      const dadosDoFormulario = this.meuFormGroup.value;
      this.mainApi.inserirAlimentos(dadosDoFormulario).subscribe();
      this.setOpen(true, "Dados inseridos com Sucesso.");
      await this.modalController.dismiss();
      this.meuFormGroup.reset();
    } else {
      console.log('Formulário inválido. Verifique os campos.');
    }
  }  // add novos alimentos
  public checkboxChanged(item: { alimento: string, calorias: number }) {
    const index = this.alimentosSelecionados.findIndex(x => x.alimento === item.alimento);

    if (index === -1) {
      // Adicionar à matriz de alimentosSelecionados se não estiver presente
      this.alimentosSelecionados.push({ alimento: item.alimento, calorias: item.calorias });

    } else {
      // Remover da matriz de alimentosSelecionados se já estiver presente
      this.alimentosSelecionados.splice(index, 1);
    }
  } //tenho minhas duvidas sobre esse
  public mainToFav(){
    this.mainApi.listAlimentos().subscribe(
      (response: any[]) => { // Defina o tipo de response como um array de qualquer tipo
        if (this.alimentosFav$!==undefined){

          this.alimentosFav$.subscribe((favoritos: any[]) => { // Defina o tipo de favoritos como um array de qualquer tipo
            const alimentosFavoritos = favoritos;

            // Filtrar alimentos que não estão na lista de favoritos
            this.listaAlimentos = response.filter((alimento: any) => { // Defina o tipo de alimento como um objeto de qualquer tipo
              return !alimentosFavoritos.some((favAlimento: any) => favAlimento.alimento === alimento.alimento);
            });
          });

        }
      }
    );
  }
  public salvarFavoritos( ) {
    this.inserirAlimentosFav();
    this.mainToFav(); //retira os fav selecionados do modal de selecionar favs
    this.listFav();
  }
  public inserirAlimentosFav(){
    this.mainApi.inserirEmLoteFav(this.alimentosSelecionados).subscribe(
      response => {
        this.setOpen(true, "Alimentos mais ingeridos foi atualizado com Sucesso...");
      },
      error => {
        this.setOpen(true, "Os alimentos selecionados já estão nos Favoritos...");
      }
    )
  }

  public listFav(){this.alimentosFav$ =  this.mainApi.listAlimentosFav();}
  get alimentosFiltrados()  {return this.listaAlimentos.filter(listaAlimentos => listaAlimentos.alimento.includes(this.pesquisa) );}

  public deleteAlimentoIngerido(id: number) {
    this.mainApi.deleteAlimentosIngeridos(id).subscribe(
      response => {
        this.listAlimentosIngeridos();
        this.setOpen(true, "Alimento removido com Sucesso.");

      },
      error => {
        this.listAlimentosIngeridos();
        this.setOpen(true, "Alimento removido com Sucesso.");
        /** BOAS PRATICAS KKKKKKKKKK  **/
      }
    );
  }


  /**async buttonResetCalorias(){
     this.resetCalorias();
     this.listCalorias();
     this.setOpen(true, "Resetado com sucesos");

  }**/



  //add alimentos ingeridos
public submitFormAddAlimentosIngeridos(){
    if (this.formGroupAddAlimentosIngeridos.valid) {
      const dadosDoFormulario = this.formGroupAddAlimentosIngeridos.value;
      const caloriasDoAlimento = dadosDoFormulario.calorias;
      const newCalorias = parseInt(this.calorias_atual + caloriasDoAlimento);

      // alert(this.calorias_atual + " + "  + caloriasDoAlimento + " = " + newCalorias );

      this.setOpen(true, "Dados inseridos com Sucesso.");
      this.quantidadeSelected = 1;
      this.changeBlockAddAlimento = false;


     this.mainApi.addAlimentosIngeridos(dadosDoFormulario).subscribe();


  this.updateCalorias(newCalorias);

      setTimeout(() => {

        this.listCalorias();
        this.listAlimentosIngeridos();
      }, 500);

     this.modalController.dismiss();

    } else {

      console.log('Formulário inválido. Verifique os campos.');
    }
  }



 public resetCalorias(){
    const data = {
      calorias_atual: 0,
      deficit_calorico: 0,
      tmb:2500,
      data_dia: ''
    };

    this.mainApi.updateCaloriasData(data).subscribe();

   setTimeout(() => {

     this.listCalorias();

   }, 500);


  }


  public updateCalorias(x: number){



    const data = {
      calorias_atual:x,
      deficit_calorico: 0,
      tmb: this.tmb,
      data_dia: ``
    };
    this.mainApi.updateCaloriasData(data).subscribe();
  }





  public alimentosIngeridos$: Observable<any> | undefined;




  public listCalorias() {
   this.mainApi.getCaloriasData().subscribe(
      (resp) => {

        const data = JSON.parse(JSON.stringify(resp[0]));

        this.calorias_atual = data.calorias_atual;
        this.tmb = data.tmb;
        this.deficit_calorico = data.deficit_calorico;
        this.data_dia = data.data_dia;
        this.progressBarPercentage = ((this.calorias_atual / this.tmb) * 100).toFixed(2);
      }
    );

  }

  public listAlimentosIngeridosEmpty: any;
  public listAlimentosIngeridos() {
    this.alimentosIngeridos$ = this.mainApi.listAlimentosIngeridos().pipe(
      retry(3)
      );

    this.mainApi.listAlimentosIngeridos().pipe(
      map((resp) => {
        this.listAlimentosIngeridosEmpty = resp.length == 0;
        return resp; // Retorna resp para manter o fluxo do Observable
      })
    ).subscribe();

  }


}
