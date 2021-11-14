import { AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChild } from '@angular/core';

@Component({
  selector: 'app-simple-elements',
  templateUrl: './simple-elements.component.html',
  styleUrls: ['./simple-elements.component.scss']
})
export class SimpleElementsComponent implements OnInit {

  @ViewChild('alertsContainer') alertContainerRef!: ElementRef; 
  alertContainer!: HTMLElement;
  constructor() { }

  

  ngOnInit(): void {
  }

  createAlert() {
    this.alertContainer = this.alertContainerRef.nativeElement;
    const alert = document.createElement('div');
    const bootstrapClasses = ['alert','alert-primary','alert-dismissible'];
    bootstrapClasses.forEach((cls) => {
      alert.classList.add(cls);
    });
    alert.innerHTML = `Dynamic generated Alert!!!!<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>`;
    this.alertContainer.appendChild(alert);
  }

  modalSave() {
    alert("Saved!!!");
  }

}
