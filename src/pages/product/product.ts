import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Content, ToastController, ModalController, LoadingController, FabContainer } from 'ionic-angular';
import { ProductService } from '../../providers/service/product-service';
import { Values } from '../../providers/service/values';
import { Functions } from '../../providers/service/functions';
import { md5 } from './md5';
import { PhotoViewer } from '@ionic-native/photo-viewer';
import { SocialSharing } from '@ionic-native/social-sharing';
import { CartPage } from '../cart/cart';
import { ReviewPage } from '../reviews/reviews';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { Slides } from 'ionic-angular';


@Component({
    templateUrl: 'product.html'
})
export class ProductPage {
    @ViewChild(Content) content: Content;
    @ViewChild(Slides) slides: Slides;
    product: any;
    id: any;
    status: any;
    options: any;
    opt: any;
    message: any;
    wishlist: any;
    quantity: any;
    reviews: any;
    reviewForm: any;
    nickname: any;
    details: any;
    AddToCart: any;
    disableSubmit: boolean = false;
    wishlistIcon: boolean = false;
    moreDescription: boolean = false;
    related: any;
    crossSell: any;
    upsell:any;
    items: any;
    item: any;
    variations: any;

    constructor(public iab: InAppBrowser, private photoViewer: PhotoViewer, public modalCtrl: ModalController, public nav: NavController, public service: ProductService, params: NavParams, public functions: Functions, public values: Values, public toastCtrl: ToastController, private socialSharing: SocialSharing, public loadingCtrl: LoadingController) {
        this.id = params.data;
        this.options = [];
        this.quantity = "1";
        this.AddToCart = "Add To Cart";
        this.service.getProduct(this.id)
            .then((results) => this.handleProductResults(results));
        this.getReviews();
    }
    handleProductResults(results) {
        this.product = results;
        if ((this.product.type == 'variable') && this.product.variations.length) this.getVariationProducts();
        this.getRelatedProducts();
        this.getUpsellProducts();
        this.getCrossSellProducts();
    }
    external(url){
     var options = "location=yes,hidden=no,toolbar=yes";
            let browser = this.iab.create(url, '_blank', options);
            browser.show();
    }
    getVariationProducts() {
        this.service.getVariationProducts(this.product.id).then((results) => this.variations = results);
    }
    getProduct(id) {
        this.nav.push(ProductPage, id);
    }
    addToCart(id) {
        if (this.product.type == 'variable' && this.options.length == 0) {
            this.functions.showAlert('Eroor', 'Please Select Product Option...')
        } else {
            this.disableSubmit = true;
            var text = '{';
            var i;
            for (i = 0; i < this.options.length; i++) {
                var res = this.options[i].split(":");
                for (var j = 0; j < res.length; j = j + 2) {
                    text += '"' + res[j] + '":"' + res[j + 1] + '",';
                }
            }
            text += '"product_id":"' + id + '",';
            text += '"quantity":"' + this.quantity + '"}';
            var obj = JSON.parse(text);
            this.service.addToCart(obj).then((results) => this.updateCart(results));
        }
    }
    chnageProduct() {
        var text = '{';
        var i;
        for (i = 0; i < this.options.length; i++) {
            var res = this.options[i].split(":");
            for (var j = 0; j < res.length; j = j + 2) {
                text += '"' + res[j] + '":"' + res[j + 1] + '",';
            }
        }
        text += '"quantity":"' + this.quantity + '"}';
        var obj = JSON.parse(text);
        for (let item in this.variations) {
            if (this.variations[item].id == obj.variation_id) {
                this.product.in_stock = this.variations[item].in_stock;
                this.product.price = this.variations[item].price;
            }
        }
    }
    updateCart(a) {
        this.disableSubmit = false;
        this.values.count += parseInt(this.quantity);
        this.AddToCart = "Add To Cart";
        this.presentToast();
    }
    getCart() {
        this.nav.push(CartPage);
    }
    mySlideOptions = {
        initialSlide: 1,
        loop: true,
        autoplay: 5800,
        pager: true
    }
    getReviews() {
        this.service.getReviews(this.id).then((results) => this.handleReview(results));
    }
    handleReview(result) {
        this.reviews = result;
        for (let item in this.reviews) {
            this.reviews[item].avatar = md5(this.reviews[item].email);
        }
    }
    addToWishlist(id) {
        if (this.values.isLoggedIn) {
            this.service.addToWishlist(id).then((results) => this.update(results));
        } else {
            this.presentToastLoginAlert();
        }
    }
    update(a) {
        if (a.success == "Success") {
            this.values.wishlistId[this.product.id] = true;
            this.presentToastAddToWishlist();
        } else {
            this.functions.showAlert("error", "error");
        }
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
    showMore() {
        this.moreDescription = true;
    }
    showLess() {
        this.moreDescription = false;
    }
    getRelatedProducts() {
        if (this.product.related_ids != 0) {
            this.service.getRelatedProducts(this.product.related_ids).then((results) => this.related = results);
        }
    }
    getRelatedProduct(id) {
        this.nav.push(ProductPage, id);
    }
    getUpsellProducts() {
        if (this.product.upsell_ids != 0) {
            this.service.getRelatedProducts(this.product.upsell_ids).then((results) => this.upsell = results);
        }
    }
    getCrossSellProducts() {
        if (this.product.cross_sell_ids != 0) {
            this.service.getRelatedProducts(this.product.cross_sell_ids).then((results) => this.crossSell = results);
        }
    }
    showMoreReviews(productName, count, rating) {
        console.log('show reviews')
        this.items = [];
        this.items.reviews = {};
        this.items.id = this.id;
        this.items.count = count;
        this.items.rating = rating;
        this.items.name = productName;
        this.items.reviews = this.reviews;
        let modal = this.modalCtrl.create(ReviewPage, this.items);
        modal.present();
    }
    viewPhotos(image) {
        this.photoViewer.show(image);
    }

    viewPhoto(index){
      this.slides.slideTo(index + 1, 500);
    }

    presentToastLoginAlert() {
        let toast = this.toastCtrl.create({
            message: 'You must login to add item to wishlist',
            duration: 2000,
            position: 'top'
        });
        toast.present();
    }
    presentToastAddToWishlist() {
        let toast = this.toastCtrl.create({
            message: 'Item added to wishlist',
            duration: 2000,
            position: 'top'
        });
        toast.present();
    }
    presentToast() {
        let toast = this.toastCtrl.create({
            message: 'Item added to cart',
            duration: 2000,
            position: 'top'
        });
        toast.present();
    }
    share(product, network: string, fab: FabContainer) {
        var options = {
            message: 'Hey check this product',
            subject: product.title,
            files: ['', ''],
            url: product.permalink,
            chooserTitle: 'Pick an app'
        }
        let loading = this.loadingCtrl.create({
            content: `Posting to ${network}`,
            duration: (Math.random() * 1000) + 500
        });
        loading.onWillDismiss(() => {
            fab.close();
        });
        loading.present();
        this.socialSharing.shareWithOptions(options);
    }
}