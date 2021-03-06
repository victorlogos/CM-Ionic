import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { LoadingController } from 'ionic-angular';
import { Config } from './config';
import { Values } from './values';
import { URLSearchParams } from '@angular/http';
import { NativeStorage } from '@ionic-native/native-storage';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/forkJoin';
import { HTTP } from '@ionic-native/http';

@Injectable()
export class Service {

    data: any;
    url: any;
    categories: any;
    banners: any;
    orders: any;
    order: any;
    isloggedIn: any;
    status: any;
    address: any;
    headers: any;
    products: any;
    product: any;
    cart: any;
    configuration: any;
    loader: any;
    loginStatus: any;
    mainCategories: any;
    country: any;
    user: any;
    login_nonce: any;
    googleResponse: any;
    filter: any;
    fbResponse: any;
    has_more_items: boolean = true;
    featuredProduct: any;
    constructor(private reqhttp: HTTP, private http: Http, private config: Config, private values: Values, public loadingCtrl: LoadingController, private nativeStorage: NativeStorage) {
        this.mainCategories = [];
        this.filter = {};
        this.reqhttp.setHeader('withCredentials', 'false');
        this.reqhttp.clearCookies();
    }
    load() {
        return new Promise(resolve => {
            this.http.get(this.config.url + '/wp-admin/admin-ajax.php?action=mstoreapp-keys', this.config.options).map(res => res.json()).subscribe(data => {
                this.values.currency = data.currency;
                this.login_nonce = data.login_nonce;
                this.banners = data.banners;
                this.values.max_price = data.max_price;
                this.values.price.upper = data.max_price;
                console.log(data);
                if (data.user.data != undefined) {
                    this.values.isLoggedIn = data.user.data.status;
                    this.values.customerId = data.user.data.ID;
                    this.values.customerName = data.user.data.display_name;
                    this.values.avatar = data.user.data.avatar_url;
                    this.values.logoutUrl = this.encodeUrl(data.user.data.url);
                    this.nativeStorage.getItem('loginData').then(data => {
                        console.log(data);
                        if(data.type == 'social'){
                                this.values.customerName = data.displayName;
                                this.values.avatar = data.avatar;

                        }
                    }, error => console.error(error));
                }
                else {
                        this.nativeStorage.getItem('loginData').then(data => {
                            console.log(data);
                            if(data.type == 'woo'){
                                this.values.avatar = data.avatar;
                                this.login(data, this.login_nonce);
                            }
                            
                            else if(data.type == 'social'){
                                this.values.customerName = data.displayName;
                                this.values.avatar = data.avatar;
                                this.socialLogin(data.username);

                            }
                            
                            }, error => console.error(error));
                }
                this.reqhttp.clearCookies();
                this.reqhttp.get(this.config.setUrl('GET', '/wp-json/wc/v2/products/categories?', {per_page : 100}), {}, {}).then(data => {
                    this.categories = JSON.parse(data.data);
                    this.mainCategories = [];
                    for (var i = 0; i < this.categories.length; i++) {
                        if (this.categories[i].parent == '0') {
                            this.mainCategories.push(this.categories[i]);
                        }
                    }
                    this.http.get(this.config.url + '/wp-admin/admin-ajax.php?action=mstoreapp-cart', this.config.options).map(res => res.json()).subscribe(data => {
                        this.cart = data;
                        this.values.updateCart(this.cart);
                        this.values.cartNonce = this.cart.cart_nonce;
                    });
                    if (this.values.isLoggedIn) {
                        var params = new URLSearchParams();
                        params.append("customer_id", this.values.customerId.toString());
                        this.http.post(this.config.url + '/wp-admin/admin-ajax.php?action=mstoreapp-get_wishlist', params, this.config.options).map(res => res.json()).subscribe(data => {
                            for (let item in data) {
                                this.values.wishlistId[data[item].id] = data[item].id;
                            }
                        });
                    }
                    resolve(this.categories);
                });
            });
        });
    }
    getNonce() {
        return new Promise(resolve => {
            this.http.get(this.config.url + '/wp-admin/admin-ajax.php?action=mstoreapp-nonce', this.config.options).map(res => res.json()).subscribe(data => {
                resolve(data);
            });
        });
    }
    login(a, nonce) {
        var params = new URLSearchParams();
        params.append("username", a.username);
        params.append("password", a.password);
        params.append("_wpnonce", nonce);
        params.append("login", 'Login');
        params.append("redirect", this.config.url + '/wp-admin/admin-ajax.php?action=mstoreapp-userdata');
        return new Promise(resolve => {
            this.http.post(this.config.url + '/wp-admin/admin-ajax.php?action=mstoreapp-login', params, this.config.options).map(res => res.json()).subscribe(data => {
                if (!data.errors) {
                    this.values.isLoggedIn = data.data.status;
                    this.values.customerName = data.data.display_name;
                    this.values.customerId = data.data.ID;
                    this.values.logoutUrl = this.encodeUrl(data.data.url);
                    this.values.avatar = data.data.avatar;
                    params = new URLSearchParams();
                    params.append("customer_id", this.values.customerId.toString());
                    this.http.post(this.config.url + '/wp-admin/admin-ajax.php?action=mstoreapp-get_wishlist', params, this.config.options).map(res => res.json()).subscribe(data => {
                        for (let item in data) {
                            this.values.wishlistId[data[item].id] = data[item].id;
                        }
                    });
                    this.nativeStorage.setItem('loginData', {
                        username: a.username,
                        password: a.password,
                        type: 'woo'
                    }).then(data => console.log('Login Details Stored'), error => console.error(error));
                }
                resolve(data);
            }, err => {
                resolve(JSON.parse(err._body));
                console.log(err._body)
            });
        });
    }
    encodeUrl(href) {
        return href.replace(/&amp;/g, '&')
    }
    logout() {
        return new Promise(resolve => {
            this.http.get(this.config.url + '/wp-admin/admin-ajax.php?action=mstoreapp-logout').subscribe(data => {
                this.values.isLoggedIn = false;
                this.values.customerName = "";
                this.http.get(this.config.url + '/wp-admin/admin-ajax.php?action=mstoreapp-cart', this.config.options).map(res => res.json()).subscribe(data => {
                    this.cart = data;
                    this.values.updateCart(this.cart);
                });
                resolve(this.cart);
            });
        });
    }
    passwordreset(email, nonce, url) {
        var params = new URLSearchParams();
        params.append("user_login", email);
        params.append("wc_reset_password", "true");
        params.append("_wpnonce", nonce);
        params.append("_wp_http_referer", '/my-account/lost-password/');
        return new Promise(resolve => {
            this.http.post(this.config.url + '/my-account/lost-password/', params).subscribe(status => {
                resolve(status);
            });
        });
    }
    passwordResetNonce() {
        return new Promise(resolve => {
            this.http.get(this.config.url + '/wp-admin/admin-ajax.php?action=mstoreapp-passwordreset', this.config.options).map(res => res.json()).subscribe(data => {
                resolve(data);
            });
        });
    }
    getAddress() {
        return new Promise(resolve => {
            this.reqhttp.clearCookies();
            this.reqhttp.get(this.config.setUrl('GET', '/wp-json/wc/v2/customers/' + this.values.customerId + '?', false), {}, {}).then(data => {
                this.address = JSON.parse(data.data);
                resolve(this.address);
            });
        });
    }
    saveAddress(address) {
        var params = address;
        this.reqhttp.setHeader('Content-Type', 'application/json; charset=UTF-8');
        this.reqhttp.setDataSerializer('json');
        this.reqhttp.clearCookies();
        return new Promise(resolve => {
            this.reqhttp.put(this.config.setUrl('PUT', '/wp-json/wc/v2/customers/' + this.values.customerId + '?', false), params, {}).then(data => {
                resolve(JSON.parse(data.data));
            }, err => console.log(err));
        });
    }
    pushNotification(notification) {
        var params = new URLSearchParams();
        params.append("device_id", notification.device_id);
        params.append("platform", notification.platform);
        params.append("email", notification.email);
        params.append("city", notification.city);
        params.append("state", notification.state);
        params.append("country", notification.country);
        params.append("pincode", notification.pincode);
        return new Promise(resolve => {
            this.http.post(this.config.url + '/wp-admin/admin-ajax.php?action=mstoreapp-user-subcribe-notify', params, this.config.options).map(res => res.json()).subscribe(data => {
                this.status = data;
                resolve(this.status);
            });
        });
    }
    pushNotify(deviceId, platform) {
        var params = new URLSearchParams();
        params.append("device_id", deviceId);
        params.append("platform", platform);
        return new Promise(resolve => {
            this.http.post(this.config.url + '/wp-admin/admin-ajax.php?action=mstoreapp-user-subcribe-notify', params, this.config.options).map(res => res.json()).subscribe(data => {
                this.status = data;
                resolve(this.status);
            });
        });
    }
    getOrder(id) {
        return new Promise(resolve => {
            this.reqhttp.clearCookies();
            this.reqhttp.get(this.config.setUrl('GET', '/wp-json/wc/v2/orders/' + id + '?', false), {}, {}).then(data => {
                this.order = JSON.parse(data.data);
                resolve(this.order);
            });
        });
    }
    getCountry() {
        return new Promise(resolve => {
            this.http.get(this.config.url + '/wp-admin/admin-ajax.php?action=mstoreapp-get_country', this.config.options).map(res => res.json()).subscribe(data => {
                this.country = data;
                resolve(this.country);
            });
        });
    }
    registerCustomer(customer) {
        var params = customer
        this.reqhttp.setHeader('Content-Type', 'application/json; charset=UTF-8');
        this.reqhttp.setDataSerializer('json');
        this.reqhttp.clearCookies();
        return new Promise(resolve => {
            this.reqhttp.post(this.config.setUrl('POST', '/wp-json/wc/v2/customers?', false), params, {}).then(data => {
                this.user = JSON.parse(data.data);
                resolve(this.user);
            }, err => {
                resolve(JSON.parse(err.error));
                console.log(err.error)
            });
        });
    }
    getOrders(filter) {
        return new Promise(resolve => {
            this.reqhttp.clearCookies();
            this.reqhttp.get(this.config.setUrl('GET', '/wp-json/wc/v2/orders?', filter), {}, {}).then(data => {
                this.orders = JSON.parse(data.data);
                resolve(this.orders);
            });
        });
    }
    updateOrder(data, id) {
        this.reqhttp.setHeader('Content-Type', 'application/json; charset=UTF-8');
        this.reqhttp.setDataSerializer('json');
        this.reqhttp.clearCookies();
        return new Promise(resolve => {
            this.reqhttp.put(this.config.setUrl('PUT', '/wp-json/wc/v2/orders/' + id + '?', false), data, {}).then(data => {
                this.status = JSON.parse(data.data);
                resolve(this.status);
            }, err => console.log(err));
        });
    }
    presentLoading(text) {
        this.loader = this.loadingCtrl.create({
            content: text,
        });
        this.loader.present();
    }
    dismissLoading() {
        this.loader.dismiss();
    }
    addToWishlist(id) {
        return new Promise(resolve => {
            var params = new URLSearchParams();
            params.append("product_id", id);
            params.append("customer_id", this.values.customerId.toString());
            this.http.post(this.config.url + '/wp-admin/admin-ajax.php?action=mstoreapp-add_wishlist', params, this.config.options).subscribe(data => {
                this.status = data;
                resolve(this.status);
            });
        });
    }
    deleteItem(id) {
        var params = new URLSearchParams();
        params.append("product_id", id);
        params.append("customer_id", this.values.customerId.toString());
        return new Promise(resolve => {
            this.http.post(this.config.url + '/wp-admin/admin-ajax.php?action=mstoreapp-remove_wishlist', params, this.config.options).map(res => res.json()).subscribe(data => {
                resolve(data);
            });
        });
    }

    getfeaturedProduct(){
        this.filter.featured = true;
        this.filter.on_sale = undefined;
        this.reqhttp.clearCookies();
        this.reqhttp.get(this.config.setUrl('GET', '/wp-json/wc/v2/products/?', this.filter), {}, {})
                 .then(data => {
                    this.featuredProduct = JSON.parse(data.data);

                });
    }

    getProducts(){

        this.filter = {};
        this.filter.page = 1;
        this.filter.status = 'publish';


        this.reqhttp.clearCookies();
        this.reqhttp.get(this.config.setUrl('GET', '/wp-json/wc/v2/products/?', this.filter), {}, {})
            .then(data => {
                this.products = JSON.parse(data.data);
        });
    }

    loadMore(){

    this.filter.page += 1;
    this.filter.on_sale = undefined;
    this.filter.featured = undefined;

    return new Promise(resolve => {
        this.reqhttp.clearCookies();
            this.reqhttp.get(this.config.setUrl('GET', '/wp-json/wc/v2/products/?', this.filter), {}, {})
                 .then(data => {
                   
                    this.handleMore(JSON.parse(data.data));
                     resolve(true);
                });
                  });

    }

    handleMore(results) {
        if (results != undefined) {
            for (var i = 0; i < results.length; i++) {
                this.products.push(results[i]);
            };
        }
        if (results.length == 0) {
            this.has_more_items = false;
        }
    }
    sendToken(token) {
        var params = new URLSearchParams();
        params.append("access_token", token);
        return new Promise(resolve => {
            this.http.post(this.config.url + '/wp-admin/admin-ajax.php?action=mstoreapp-facebook_connect', params, this.config.options).map(res => res.json()).subscribe(data => {
                console.log(data);
                this.fbResponse = data;
                if (data.status) {
                    this.values.isLoggedIn = true;
                    this.values.setNavigation = true;
                    this.values.customerName = data.last_name;
                    this.values.customerId = data.user_id;
                    this.values.avatar = data.avatar;

                    this.nativeStorage.setItem('loginData', {username: data.user_login, avatar: data.avatar, type: 'social', displayName: data.last_name}).then(data => console.log('Data Stored'), error => console.error(error));
                    resolve(data);
                }
            });
        });
    }
    googleLogin(res) {
        var params = new URLSearchParams();
        params.append("access_token", res.userId);
        params.append("email", res.email);
        params.append("first_name", res.displayName);
        params.append("last_name", res.displayName);
        return new Promise(resolve => {
            this.http.post(this.config.url + '/wp-admin/admin-ajax.php?action=mstoreapp-google_connect', params, this.config.options).map(res => res.json()).subscribe(data => {
                console.log(data);
                this.googleResponse = data;
                if (data.status) {
                    this.values.isLoggedIn = true;
                    this.values.setNavigation = true;
                    this.values.customerName = res.displayName;
                    this.values.customerId = data.user_id;
                    console.log(data);
                    this.nativeStorage.setItem('loginData', {username: res.email, avatar: res.imageUrl, type: 'social', displayName: res.displayName}).then(data => console.log('Data Stored'), error => console.error(error));
                    resolve(data);
                }
                //this.status = data;
            });
        });
    }
    socialLogin(email){
        var params = new URLSearchParams();
        params.append("access_token", 'token');
        params.append("email", email);
        this.http.post(this.config.url + '/wp-admin/admin-ajax.php?action=mstoreapp-google_connect', params, this.config.options).map(res => res.json()).subscribe(data => {
                console.log(data);
                this.googleResponse = data;
                if (data.status) {
                    this.values.isLoggedIn = true;
                    this.values.setNavigation = true;
                    //this.values.customerName = data.displayName;
                    this.values.customerId = data.user_id;
                }
        });

    }
    getAttributes() {
        if (this.values.attributes) {
            return Promise.resolve(this.values.attributes);
        }

        this.filter ={};
        this.filter.per_page = 50;

        return new Promise(resolve => {
            this.reqhttp.clearCookies();
            this.reqhttp.get(this.config.setUrl('GET', '/wp-json/wc/v2/products/attributes?', this.filter), {}, {}).then(data => {
                this.values.attributes = JSON.parse(data.data);
                if(this.values.attributes[0]){
                this.values.attributes[0].selected = true;
                this.values.selectedFilter = this.values.attributes[0];
                this.values.filter.attribute = this.values.attributes[0].id;
                resolve(this.values.attributes);
                }  
            });
        });
    }
    attributeTerms(id) {
        if (this.values.attributeTerms[id]) {
            return Promise.resolve(this.values.attributeTerms[id]);
        }

        this.filter ={};
        this.filter.per_page = 50;

        return new Promise(resolve => {
            this.reqhttp.clearCookies();
            this.reqhttp.get(this.config.setUrl('GET', '/wp-json/wc/v2/products/attributes/' + id + '/terms?', this.filter), {}, {}).then(data => {
                this.values.attributeTerms[id] = JSON.parse(data.data);
                resolve(this.values.attributeTerms[id]);
            });
        });
    }

}