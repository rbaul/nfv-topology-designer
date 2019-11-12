import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HostVnfDropDialogComponent } from './host-vnf-drop-dialog.component';

describe('HostVnfDropDialogComponent', () => {
  let component: HostVnfDropDialogComponent;
  let fixture: ComponentFixture<HostVnfDropDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HostVnfDropDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HostVnfDropDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
