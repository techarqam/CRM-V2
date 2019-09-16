import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
    import { async, ComponentFixture, TestBed } from '@angular/core/testing';
    
    import { ViewEmailComponent } from './view-email.component';
    
    describe('ViewEmailComponent', () => {
      let component: ViewEmailComponent;
      let fixture: ComponentFixture<ViewEmailComponent>;
    
      beforeEach(async(() => {
        TestBed.configureTestingModule({
          declarations: [ ViewEmailComponent ],
          schemas: [CUSTOM_ELEMENTS_SCHEMA],
        })
        .compileComponents();
      }));
    
      beforeEach(() => {
        fixture = TestBed.createComponent(ViewEmailComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
      });
    
      it('should create', () => {
        expect(component).toBeTruthy();
      });
    });
    