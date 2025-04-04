import { TestBed } from '@angular/core/testing';

import { EquipePokemonService } from '../service/equipe-pokemon.service';

describe('EquipePokemonService', () => {
  let service: EquipePokemonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EquipePokemonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
