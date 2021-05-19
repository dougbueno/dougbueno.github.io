import { ClienteService } from './../../../../service/cliente.service';
import { Cliente } from './../../../../models/cliente';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-cliente-delete',
  templateUrl: './cliente-delete.component.html',
  styleUrls: ['./cliente-delete.component.css']
})
export class ClienteDeleteComponent implements OnInit {

  id_tec = ''

  cliente: Cliente = {
    id: '',
    nome: '',
    cpf: '',
    telefone: ''
  }

  constructor(
    private router: Router,
    private service: ClienteService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.id_tec = this.route.snapshot.paramMap.get('id')!
    this.findById();
  }

  findById(): void {
    this.service.findById(this.id_tec).subscribe(resposta => {
      this.cliente = resposta;
    })
  }

  delete(): void {
    this.service.delete(this.id_tec).subscribe(resposta => {
      this.router.navigate(['cliente'])
      this.service.message('Cliente deletado com sucesso!')
    }, err => {
      if (err.error.error.match('possui Ordens de Serviço em aberto')) {
        this.service.message(err.error.error);
      }
      })
    }
    cancel(): void {
      this.router.navigate(['cliente'])
    }
  
  
  }