import { Component  } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ModalController} from "@ionic/angular";
import {MainApiService} from "../services/main-api.service";
import {Observable} from "rxjs";

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

  public alimentosIngeridos$: Observable<any> | undefined;
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
  constructor(private formBuilder: FormBuilder, private modalController: ModalController, private mainApi: MainApiService) {
    this.verificarTamanhoTela();window.addEventListener('resize', () => {this.verificarTamanhoTela();});

    this.meuFormGroup = this.formBuilder.group({
      alimento: ['', Validators.required], // Obrigatório
      calorias: [0, Validators.required], // Obrigatório
    });

    this.formGroupAddAlimentosIngeridos =  this.formBuilder.group({
      alimento: ['', Validators.required], // Obrigatório
      calorias: [0, Validators.required], // Obrigatório
      quantidade:[0]
    });


    this.listAlimentosIngeridos();
    this.listFav();
    this.mainToFav();




  } //end constructor
  public changeSelected(item: { alimento: string, calorias: number }[]) {

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
  public listFav(){
    this.alimentosFav$ =  this.mainApi.listAlimentosFav();
  }

  get alimentosFiltrados()  {
    return this.listaAlimentos.filter(listaAlimentos => listaAlimentos.alimento.includes(this.pesquisa) );
  }

  public listAlimentosIngeridos(){
   this.alimentosIngeridos$ = this.mainApi.listAlimentosIngeridos();
  }

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


  setOpen(isOpen: boolean, toastMsg: string) {
    this.isToastOpen = isOpen;
    this.toastMsg = toastMsg;
  }



  async submitForm() {
    if (this.meuFormGroup.valid) {
      const dadosDoFormulario = this.meuFormGroup.value;


   //
      this.mainApi.inserirAlimentos(dadosDoFormulario).subscribe(
        response => {

        },
        error1 => {

        }
      )

      this.setOpen(true, "Dados inseridos com Sucesso.");

      await this.modalController.dismiss();
      this.meuFormGroup.reset();
    } else {
      // O formulário não é válido, trate isso de acordo (exibindo erros, etc.)
      console.log('Formulário inválido. Verifique os campos.');
    }
  }
  async submitFormAddAlimentosIngeridos(){
    if (this.formGroupAddAlimentosIngeridos.valid) {
      const dadosDoFormulario = this.formGroupAddAlimentosIngeridos.value;

      this.mainApi.addAlimentosIngeridos(dadosDoFormulario).subscribe(
        response => {

        },
        error1 => {

        }
      )

      this.setOpen(true, "Dados inseridos com Sucesso.");

      await this.modalController.dismiss();
      this.formGroupAddAlimentosIngeridos.reset();

      this.listAlimentosIngeridos();

    } else {

      console.log('Formulário inválido. Verifique os campos.');
    }
  }

  verificarTamanhoTela() {
    const width = window.innerWidth;
    if (width >= 768) {
      this.cardClass = 'borderRadius20 rgba pc';
      this.gridSize = "auto"
    } else {
      this.cardClass = 'borderRadius20 rgba ';
      this.gridSize = ""
    }
  }
  public alimentosSelecionados: Array<{ alimento: string, calorias: number }> = [];
  selectedRadio: any;

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



  checkboxChanged(item: { alimento: string, calorias: number }) {
    const index = this.alimentosSelecionados.findIndex(x => x.alimento === item.alimento);

    if (index === -1) {
      // Adicionar à matriz de alimentosSelecionados se não estiver presente
      this.alimentosSelecionados.push({ alimento: item.alimento, calorias: item.calorias });

    } else {
      // Remover da matriz de alimentosSelecionados se já estiver presente
      this.alimentosSelecionados.splice(index, 1);
    }
  }


  salvarFavoritos( ) {
    this.inserirAlimentosFav();
    this.mainToFav(); //retira os fav selecionados do modal de selecionar favs
    this.listFav();
  }




}
