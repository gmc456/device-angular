import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { lastValueFrom } from 'rxjs';
import { PersonaService } from '../../../../services/persona.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Solicitud } from '../../../../interfaces/solicitud';
import { SolicitudesService } from '../../../../services/solicitudes.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-crear',
  templateUrl: './crear.component.html',
  styleUrls: ['./crear.component.css'],
})
export class CrearComponent {
  id: any;
  persona: any;

  formHorario: FormGroup = this.fb.group({
    name: [, [Validators.required]],
    id_estacion: [, [Validators.required]],
    topic: [, [Validators.required]],
    building: [, [Validators.required]],
    room: [, [Validators.required]],
    longitude: [, [Validators.required]],
    latitude: [, [Validators.required]]
  });  

  constructor(
    private fb: FormBuilder,
    private personaService: PersonaService,
    private solicitudesService: SolicitudesService,
    private snackBar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute
  ) {}  

  isValidForm() {
    return this.formHorario.valid;
  }

  save() {
    let solicitud = this.formHorario.getRawValue();

    this.solicitudesService.save(solicitud).subscribe((res) => {
      this.snackBar.open('Dispositivo registrado', '', {
        duration: 1500,
      });
      console.log("creado")
      this.router.navigate(['/solicitudes/consultar', {title: solicitud.id_estacion}]);
    });
  }
}
