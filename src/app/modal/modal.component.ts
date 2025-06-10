import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  @Input() isOpen = false;
  @Output() closeModal = new EventEmitter();
  @Input() message = '';

  constructor() {
  }

  ngOnInit(): void {
  }

  onClose(event: any) {
    this.closeModal.emit(event);
  }

}
