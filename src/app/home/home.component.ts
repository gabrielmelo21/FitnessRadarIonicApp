import { Component  } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ModalController} from "@ionic/angular";
import {MainApiService} from "../services/main-api.service";
import {map, Observable} from "rxjs";
import {checkbox} from "ionicons/icons";
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
  public alimentosFav: any [] = [];
  public listaAlimentos:any [] = [];
  public cardClass: any;
  public gridSize: any;
  public isToastOpen = false;
  public toastMsg: string = '';
  public meuFormGroup: FormGroup;
  public pesquisa: string = '';

  constructor(private formBuilder: FormBuilder, private modalController: ModalController, private mainApi: MainApiService) {

    this.meuFormGroup = this.formBuilder.group({
      nome: ['', Validators.required], // Obrigatório
      calorias: [0, Validators.required], // Obrigatório
      quantidade: [0, Validators.required], // Obrigatório
    });


    this.verificarTamanhoTela();

    window.addEventListener('resize', () => {
      this.verificarTamanhoTela();
    });
    this.listAlimentosIngeridos();



    this.mainApi.listAlimentos().subscribe(
     response => {

         this.listaAlimentos = response;
      }
    )
    this.mainApi.listAlimentosFav().subscribe(
      response => {
         this.alimentosFav = response;
      }
    )

  } //end constructor
  get alimentosFiltrados()  {
    return this.listaAlimentos.filter(alimento => {
      return (
        alimento.alimento.includes(this.pesquisa) && !this.alimentosFav.some(favAlimento => favAlimento.alimento === alimento.alimento)
      );
    });
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
      // O formulário é válido, você pode lidar com os dados aqui
      const dadosDoFormulario = this.meuFormGroup.value;
      console.log(dadosDoFormulario);

   //   this.alimentosIngeridos.push(dadosDoFormulario);

      this.setOpen(true, "Dados inseridos com Sucesso.");


      // Feche o modal
      await this.modalController.dismiss();
      // Limpe o formulário ou faça outra ação após a submissão
      this.meuFormGroup.reset();
    } else {
      // O formulário não é válido, trate isso de acordo (exibindo erros, etc.)
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
       this.inserirAlimentosFav();
    } else {
      // Remover da matriz de alimentosSelecionados se já estiver presente
      this.alimentosSelecionados.splice(index, 1);
    }
  }


}
