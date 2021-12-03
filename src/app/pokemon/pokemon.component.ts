import { Component, OnInit } from '@angular/core';
import { PokemonResponse } from '../pokemon.interface';
import { PokemonService } from '../core/pokemon.service';
import { debounceTime, distinctUntilChanged, forkJoin, Observable } from 'rxjs';

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
  public pokemons$: Observable<Array<PokemonResponse>>;

  public pokemons: Array<PokemonResponse> = [];

  public selectedPokemon: PokemonResponse = null;

  constructor(private pokemonService: PokemonService) {}

  ngOnInit() {
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

  // getPokemon() {
  //   this.pokemons$ = forkJoin(
  //     Object.values(starterPokemon).map((pokemon) => {
  //       this.pokemonService.fetchPokemon(pokemon);
  //     })
  //   );
  //   // .subscribe((pokemons) => {
  //   //     this.pokemons = pokemons;
  //   //     console.log(this.pokemons);
  //   // });
  // }
}
