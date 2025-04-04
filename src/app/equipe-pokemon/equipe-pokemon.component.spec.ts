import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipePokemonComponent } from './equipe-pokemon.component';

describe('EquipePokemonComponent', () => {
  let component: EquipePokemonComponent;
  let fixture: ComponentFixture<EquipePokemonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EquipePokemonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EquipePokemonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
