  import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-poster-page',
  templateUrl: './poster-page.component.html',
  styleUrls: ['./poster-page.component.css']
})
export class PosterPageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  images: string[] = [
    'https://pbs.twimg.com/media/GPEwE3nXwAAw6l6.jpg:large',
    'https://img.leboncoin.fr/api/v1/lbcpb1/images/c6/a4/35/c6a43554b89bc45b177f9446b3349b8e90021061.jpg?rule=ad-large',
    'https://resizing.flixster.com/-jxaZlh_JULgQR8RMNl_8p8lSa8=/fit-in/705x460/v2/https://resizing.flixster.com/-XZAfHZM39UwaGJIFWKAE8fS0ak=/v3/t/assets/p20738391_b_v8_ah.jpg',
    'https://static.posters.cz/image/1300/254049.jpg',
    'https://preview.redd.it/9qohwpg1h07e1.png?auto=webp&s=27efa4561c67425c1a342c4b0e2a89be62b6bcd5',
    'https://cmsassets.rgpub.io/sanity/images/dsfx7636/news_live/ddd91a06f8350d6cb8592483e0aabf528e543622-1280x720.jpg?auto=format&fit=fill&q=80&w=1082',

  ];

}
