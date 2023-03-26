import { Component, OnInit } from '@angular/core';
import { SolicitudesService } from '../../../../services/solicitudes.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { DialogoEliminarComponent } from '../../components/dialogo-eliminar/dialogo-eliminar.component';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-consultar',
  templateUrl: './consultar.component.html',
  styleUrls: ['./consultar.component.css'],
})
export class ConsultarComponent implements OnInit {
  solicitudes: any = [];

  dataSource: any = [];
  displayedColumns = ['nombre', 'dispositivo', 'topic', 'id', 'token', 'edificio', 'sala', 'longitud', 'latitud'];

  constructor(
    private solicitudesService: SolicitudesService,
    private snackBar: MatSnackBar,
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.solicitudesService.findOne(this.route.snapshot.paramMap.get('title')).subscribe((res) => {
    //this.solicitudesService.findAll().subscribe((res) => {
      //this.dataSource = res;
      this.dataSource.push(res)
      if (this.dataSource.length == 0) {
        this.snackBar.open('No hay solicitudes', '', {
          duration: 1500,
        });
      }
    });
  }
      
}