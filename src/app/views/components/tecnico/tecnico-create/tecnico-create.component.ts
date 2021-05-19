import { TecnicoService } from './../../../../service/tecnico.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Tecnico } from 'src/app/models/tecnico';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-tecnico-create',
  templateUrl: './tecnico-create.component.html',
  styleUrls: ['./tecnico-create.component.css']
})
export class TecnicoCreateComponent implements OnInit {


  tecnico: Tecnico = {
    id:'',
    nome:'',
    cpf:'',
    telefone:''
  };

  nome = new FormControl('',[Validators.minLength(2)])
  cpf = new FormControl('',[Validators.minLength(11)])
  telefone = new FormControl('',[Validators.minLength(11)])

  constructor(
    private router: Router,
    private service: TecnicoService) { }

  ngOnInit(): void {
  }

  cancel(): void {
    this.router.navigate(['tecnico'])
  }

  create(): void {
    this.service.create(this.tecnico).subscribe((resposta) => {
      this.router.navigate(['tecnico'])
      this.service.message('Técnico criado com sucesso!')
    }, err => {
      if (err.error.error.match('já cadastrado')) {
        this.service.message(err.error.error)
      }else if(err.error.errors[0].message === "invalid Brazilian individual taxpayer registry number (CPF)"){
        this.service.message("CPF inválido!")
      } 
    })
  }

  errorValidName(){
    if(this.nome.invalid){
      return 'O Nome não pode conter números!';
    }
    return false;
  }

  errorValidCPF(){
    if(this.cpf.invalid){
      return 'O CPF está incompleto';
    }
    return false;
  }

  errorValidTelefone(){
    if(this.telefone.invalid){
      return 'O Telefone está incompleto!';
    }
    return false;
  }
}
