import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VnfTopologyViewComponent } from './vnf-topology-view.component';

describe('VnfTopologyViewComponent', () => {
  let component: VnfTopologyViewComponent;
  let fixture: ComponentFixture<VnfTopologyViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VnfTopologyViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VnfTopologyViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
