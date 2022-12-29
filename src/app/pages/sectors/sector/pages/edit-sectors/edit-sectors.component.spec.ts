import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSectorsComponent } from './edit-sectors.component';

describe('EditSectorsComponent', () => {
  let component: EditSectorsComponent;
  let fixture: ComponentFixture<EditSectorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditSectorsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditSectorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
