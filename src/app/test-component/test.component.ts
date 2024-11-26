import { Component, OnInit } from "@angular/core";
import { CardService } from "../card.service";


@Component({
    selector: 'app-test-component',
    templateUrl: './test.component.html',
    styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {
    cards: any[] = [];
    errorMessage: string = '';

    constructor(private cardService: CardService) { }

    ngOnInit(): void {
        this.cardService.getCards().subscribe({
            next: (data) => {
                console.log('Cards: ', data);
                this.cards = data
            },
            error: (err) => {
                console.log('Error: ', err);
                this.errorMessage = err;
            }
        })
    }
}