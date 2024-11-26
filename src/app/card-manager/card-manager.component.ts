import { Component, ElementRef, OnInit, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardService } from '../card.service';
import { HighlightCardDirective } from '../highlight-card.directive';
import { CardNameFormatterPipe } from '../card-name-formatter.pipe';
import { PokemonCard } from '../util/pokemon-card.interface';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-card-manager',
  standalone: true,
  imports: [CommonModule, HighlightCardDirective, CardNameFormatterPipe, FormsModule],
  templateUrl: './card-manager.component.html',
  styleUrl: './card-manager.component.scss'
})
export class CardManagerComponent implements OnInit {
  pokemonCard: PokemonCard | null = null;
  hideLoadingCard: boolean = true;
  searchString: string = ''

  @ViewChild('loading', { static: true }) loadingTemplate!: TemplateRef<any>
  @ViewChild('spinner', { static: true }) spinnerElement!: ElementRef;

  constructor(private cardService: CardService, private viewContainerRef: ViewContainerRef) { }

  ngOnInit(): void {
    console.log('Card-Manager Starting');
    this.cardService.getDefaultPokemonCard().subscribe({
      next: (card) => {
        this.pokemonCard = card;
      },
      error: (err) => {
        console.log(`Error fetching Pokemon data: ${err}`);

      }
    })
  }

  onSimulateLoading(): void {
    this.viewContainerRef.clear()
    this.viewContainerRef.createEmbeddedView(this.loadingTemplate);
    setTimeout(() => {
      this.viewContainerRef.clear();
    }, 3000)
  }

  onToggleSpinner(): void {
    const spinner = this.spinnerElement.nativeElement;
    spinner.style.display = spinner.style.display === 'none' ? 'block' : 'none';
  }

  onSearch(): void {
    this.onFetchPokemon(this.searchString.trim())
  }

  onFetchPokemon(query: string): void {
    this.cardService.getPokemonCard(query).subscribe({
      next: (card) => {
        this.pokemonCard = card;
        console.log(card);
      },
      error: err => console.log(err)
    })
  }

  onToggleLoadingCard(): void {
    this.hideLoadingCard = !this.hideLoadingCard;
  }
}
