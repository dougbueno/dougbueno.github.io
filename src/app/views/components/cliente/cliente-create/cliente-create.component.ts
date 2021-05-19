import { Cliente } from './../../../../models/cliente';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ClienteService } from 'src/app/service/cliente.service';

@Component({
  selector: 'app-cliente-create',
  templateUrl: './cliente-create.component.html',
  styleUrls: ['./cliente-create.component.css']
})
export class ClienteCreateComponent implements OnInit { 
  
    cliente: Cliente = {
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
      private service: ClienteService) { }
  
    ngOnInit(): void {
    }
  
    cancel(): void {
      this.router.navigate(['cliente'])
    }
  
    create(): void {
      this.service.create(this.cliente).subscribe((resposta) => {
        this.router.navigate(['cliente'])
        this.service.message('Cliente criado com sucesso!')
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
  