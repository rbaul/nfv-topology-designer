import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ZoneDropDialogComponent } from './zone-drop-dialog.component';

describe('ZoneDropDialogComponent', () => {
  let component: ZoneDropDialogComponent;
  let fixture: ComponentFixture<ZoneDropDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ZoneDropDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZoneDropDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
