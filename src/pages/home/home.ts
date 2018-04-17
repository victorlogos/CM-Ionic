import {Component} from '@angular/core';
import {NavController, ToastController } from 'ionic-angular';
import {Service} from '../../providers/service/service';
import { Values } from '../../providers/service/values';
import { Functions } from '../../providers/service/functions';
import { ProductsPage } from '../products/products';
import { SearchPage } from '../search/search';
import { CartPage } from '../cart/cart';
import { ProductPage } from '../product/product';

@Component({
    templateUrl: 'home.html'
})
export class Home {

    items: any;
    has_more_items: boolean = true;
    constructor(public toastCtrl: ToastController, public nav: NavController, public service: Service, public values: Values, public functions: Functions) {
        this.items = [];

    }
    getCategory(id, slug, name) {
        this.items.id = id;
        this.items.name = name;
        this.items.slug = slug;
        this.values.featuredProducts = false;
        this.items.categories = this.service.categories;
        this.nav.push(ProductsPage, this.items);
    }
    getCart() {
        this.nav.push(CartPage);
    }
    getSearch() {
        this.nav.push(SearchPage);
    }
    mySlideOptions = {
        initialSlide: 1,
        loop: true,
        autoplay: 5800,
        pager: true
    }
    getProduct(id) {
        this.nav.push(ProductPage, id);
    }

    addToWishlist(id) {
        if (this.values.isLoggedIn) {
            this.values.wishlistId[id] = true;
            this.service.addToWishlist(id).then((results) => this.update(results, id));
        } else {
            this.presentToastLoginAlert();
        }
    }
    update(results, id) {
        if (results.success == "Success") {
            this.values.wishlistId[id] = true;
        } else {}
    }
    removeFromWishlist(id) {
        this.values.wishlistId[id] = false;
        this.service.deleteItem(id).then((results) => this.updateWish(results, id));
    }
    updateWish(results, id) {
        if (results.status == "success") {
            this.values.wishlistId[id] = false;
        }
    }
    doInfinite(infiniteScroll) {
        this.service.loadMore().then((results) => this.handleMore(results, infiniteScroll));
    }
    handleMore(results, infiniteScroll) {
        if (!results) {
            this.has_more_items = false;
        }
        infiniteScroll.complete();
    }

        presentToastLoginAlert() {
        let toast = this.toastCtrl.create({
          message: 'You must login to add item to wishlist',
          duration: 1000,
           position: 'top'
        });
        toast.present();
    }

    viewAllFeatured() {
        this.values.featuredProducts = true;
        this.nav.push(ProductsPage);
    }
}