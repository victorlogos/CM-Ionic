import { Component, ViewChild } from '@angular/core';
import { Platform, Nav, AlertController} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Home } from '../pages/home/home';
import { Service } from '../providers/service/service';
import { Values}  from '../providers/service/values';
import { Config}  from '../providers/service/config';
import { TranslateService } from '@ngx-translate/core';
import { OneSignal } from '@ionic-native/onesignal';
import { AccountLogin } from '../pages/account/login/login';
import { ProductsPage } from '../pages/products/products';
import { ProductPage } from '../pages/product/product';
import { CartPage } from '../pages/cart/cart';
import { AccountRegister } from '../pages/account/register/register';
import { Address } from '../pages/account/address/address';
import { Orders } from '../pages/account/orders/orders';
import { WishlistPage } from '../pages/account/wishlist/wishlist';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage: any = Home;
  status: any;
  pages: Array<{title: string, component: any}>
  menu: Array<{title: string, component: any}>
  configuration: any;
  items: any;
  buttonLanguagesSettings: boolean= false;
  showCategories: boolean= false;
  constructor(statusBar: StatusBar, splashScreen: SplashScreen, public alertCtrl: AlertController, public config: Config, private oneSignal: OneSignal, public platform: Platform, public service: Service, public values: Values, public translateService: TranslateService) {
    platform.ready().then(() => {
     statusBar.styleDefault();
     splashScreen.hide();

      if(this.config.appDir == 'rtl')
      this.platform.setDir('rtl', true);
      this.translateService.setDefaultLang('english');

      this.service.load()
        .then((results) => this.handleService(results));

      if(platform.is('cordova')){
            this.oneSignal.startInit(this.config.oneSignalAppId, this.config.googleProjectId);

            this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.InAppAlert);

            this.oneSignal.handleNotificationReceived().subscribe(result => {
             console.log(result);
            });
            this.oneSignal.handleNotificationOpened().subscribe(result => {
                if(result.notification.payload.additionalData.category){
                  this.items.id = result.notification.payload.additionalData.category;
                  this.nav.push(ProductsPage, this.items);
                }
                else if(result.notification.payload.additionalData.product){
                  this.items.id = result.notification.payload.additionalData.product;
                  this.nav.push(ProductPage, this.items.id);
                }
            });
            this.oneSignal.endInit();
      }
      this.rootPage = Home;
    });

   }

  handleService(results){
    this.service.getProducts();
    this.service.getfeaturedProduct();
  }
   openPage(page) {
       this.nav.setRoot(page);
   }
   getCategory(id, slug, name) {
       this.items = [];
       this.items.id = id;
       this.items.slug = slug;
       this.items.name = name;
       this.items.categories = this.service.categories;
       this.nav.setRoot(ProductsPage, this.items);
   }


   getCart() {
       this.nav.setRoot(CartPage);
   }
   logout() {
       this.service.logout();
       this.values.wishlistId = [];
       this.nav.setRoot(Home);
   }
   login() {
       this.nav.setRoot(AccountLogin);
   }
   register() {
       this.nav.setRoot(AccountRegister);
   }
   address() {
       this.nav.setRoot(Address);
   }
   order() {
       this.nav.setRoot(Orders);
   }
   cart() {
       this.nav.setRoot(CartPage);
   }
   wishlist() {
       this.nav.setRoot(WishlistPage);
   }
   shop() {
       this.nav.setRoot(Home);
   }
   dropDown() {
       this.showCategories = true;
   }
   dropup() {
       this.showCategories = false;
   }

}