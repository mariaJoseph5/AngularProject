import {ComponentFixture, TestBed} from '@angular/core/testing';
import {ModalComponent} from './modal.component';
import {By} from '@angular/platform-browser';

describe('ModalComponent', () => {
  let component: ModalComponent;
  let fixture: ComponentFixture<ModalComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({declarations: [ModalComponent]}).compileComponents();
    fixture = TestBed.createComponent(ModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the modal component', () => {
    expect(component).toBeTruthy();
  });

  it('should have default isOpen as false and message as empty', () => {
    expect(component.isOpen).toBeFalse();
    expect(component.message).toBe('');
  });

  it('should display the message input correctly', () => {
    component.message = 'Test Modal Message';
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Test Modal Message');
  });

  it('should emit closeModal event when onClose is called', () => {
    spyOn(component.closeModal, 'emit');
    const mockEvent = {reason: 'clicked close'};
    component.onClose(mockEvent);
    expect(component.closeModal.emit).toHaveBeenCalledWith(mockEvent);
  });

  it('should show modal content only if isOpen is true', () => {
    component.isOpen = true;
    component.message = 'Modal is Open';
    fixture.detectChanges();
    const content = fixture.debugElement.query(By.css('.modal-content'));
    expect(content).toBeTruthy();
  });

  it('should hide modal content if isOpen is false', () => {
    component.isOpen = false;
    fixture.detectChanges();
    const content = fixture.debugElement.query(By.css('.modal-content'));
    expect(content).toBeNull();
  });
});
