import { Component, OnInit } from '@angular/core';
import { HomepageComponent } from '../../homepage/homepage.component';
import { Observable } from 'rxjs/Observable';
import { UserService, ProductsListService, OrderService } from '../../services';
import { Subscription } from "rxjs";
import { Product } from '../../models/product-model';

@Component({
  selector: 'app-my-gallery',
  templateUrl: './my-gallery.component.html',
  styleUrls: ['./my-gallery.component.scss'],
  providers: [OrderService]
})
export class MyGalleryComponent implements OnInit {
	iconEmpty:string = 'collections';
	messageEmpty:string = 'There are no items in your gallery';
	usersProducts: Observable<Array<any>>;
	productIds: Array<string>;
	public showSpinner = true;

	constructor(private userService: UserService, private productService: ProductsListService) { }

	ngOnInit() {
		this.userService.getUsersGallery(this.userService.getUserId()).subscribe(gallery => {
			this.productIds = gallery.map(i => {return i.productKey});
			this.productService.getProducts().subscribe(products => {
				this.showSpinner = false;
				this.usersProducts = this.productService.getProductsByIds(this.productIds, products.reverse());
			});
		});
	}

}
