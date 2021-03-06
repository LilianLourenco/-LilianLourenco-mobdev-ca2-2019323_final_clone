import { FavouriteService } from '../../services/favourite.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/api.service';

@Component({
    selector: 'app-quote-details',
    templateUrl: './quote-details.page.html',
    styleUrls: ['./quote-details.page.scss'],
})
export class QuoteDetailsPage implements OnInit {





    quote: any;
    isFavourite = false;
    quoteId = null;

    constructor(private activatedRoute: ActivatedRoute, private api: ApiService, private favouriteService: FavouriteService) { }

    ngOnInit() {

        this.quoteId = this.activatedRoute.snapshot.paramMap.get('id');

        this.api.getQuote(this.quoteId).subscribe(res => {
            this.quote = res[0];
        });

        this.favouriteService.isFavourite(this.quoteId).then(isFav => {
            this.isFavourite = isFav;
        });
    }

    favouriteQuote() {
        this.favouriteService.favouriteEpisode(this.quoteId).then(() => {
            this.isFavourite = true;
        });
    }



}
