import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleElementsComponent } from './simple-elements.component';

describe('SimpleElementsComponent', () => {
  let component: SimpleElementsComponent;
  let fixture: ComponentFixture<SimpleElementsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SimpleElementsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SimpleElementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
