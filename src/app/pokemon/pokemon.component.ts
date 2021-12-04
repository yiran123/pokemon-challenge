import { Component, OnInit, TemplateRef } from '@angular/core';
import { PokemonResponse } from '../pokemon.interface';
import { PokemonService } from '../core/pokemon.service';
import { debounceTime, distinctUntilChanged, forkJoin, Observable } from 'rxjs';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

const starterPokemon = {
  BULBASAUR: 'bulbasaur',
  SQUIRTLE: 'squirtle',
  CHARMANDER: 'charmander',
};

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.scss'],
})
export class PokemonComponent implements OnInit {
  modalRef?: BsModalRef;
  pokemons$: Observable<Array<PokemonResponse>>;

  pokemons: Array<PokemonResponse> = [];

  selectedPokemon: PokemonResponse = null;
  tmpSelection: PokemonResponse = null;

  constructor(
    private pokemonService: PokemonService,
    private modalService: BsModalService
  ) {}

  ngOnInit() {
    this.selectedPokemon = null;
    this.getPokemon();
  }

  getPokemon() {
    forkJoin(
      Object.values(starterPokemon).map((pokemonType) =>
        this.pokemonService.fetchPokemon(pokemonType)
      )
    ).subscribe((res) => {
      this.pokemons = res;
      console.log(this.pokemons);
      //console.log(this.pokemons[0].sprites.other.dream_world.front_default);
    });
  }

  openModal(template: TemplateRef<any>, pokemon: PokemonResponse) {
    this.modalRef = this.modalService.show(template);
    this.tmpSelection = pokemon;
  }

  makeSelection(answer: boolean) {
    if (answer) {
      this.selectedPokemon = this.tmpSelection;
    } else {
      this.tmpSelection = null;
    }
  }
}
