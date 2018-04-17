import { Injectable } from '@angular/core';

@Injectable()
export class Values {

  //avatar: any = "assets/image/profile.jpg"
  count: number = 0;
  filter: any = 10;
  isLoggedIn: boolean = false;
  customerName: string = "";
  customerId: number = null;
  listview: boolean = false;
  cart: Array<number> = [];
  filterUpdate: boolean = false;
  lan: any;
  logoutUrl: any;
  cartItem: any;
  cartNonce: any;
  avatar: any;
  currency: any = "USD";
  data: any;
  deviceId: any;
  platform: any;
  wishlistId: any = [];
  quantity: number = 2;
  max_price: any;
  setNavigation: boolean = false;
  applyFilter: boolean = false;
  selectedFilter: any = {};
  price: any = {lower: 1, upper: 1000};
  attributes: any;
  attributeTerms: any = [];
  sortType: any;
  featuredProducts: boolean = false;

  constructor() {
  	this.filter = {};
    this.data = {};
    this.sortType = 0;
    this.logoutUrl = "";
    this.avatar = "assets/image/profile.jpg";
    this.lan = {"About":"About","Account":"Account","AccountInfo":"Account Information","AccountMyDownloadableProducts":"My Downloadable Products","AccountMyDownloadableProductsDate":"Date","AccountMyDownloadableProductsOpen":"Open","AccountMyDownloadableProductsOrder":"Order","AccountMyDownloadableProductsRemainingDownloads":"Remaining downloads","AccountMyDownloadableProductsStatus":"Status","AccountSettings":"Account Settings","AccountSettingsCancel":"Home","Add":"Add","AddAddressFromContacts":"Add Address from Contacts","AddBillingAddressText":"Add a billing address","AddCustomText":"Add Custom","AddFilterTitle":"Filter","AddNewAddress":"Add New Address","AddNewEntry":"Add","AddShippingAddressText":"Add a shipping address","AddToCart":"Add to Cart","AddToCartTitle":"Add to Cart","AddToWishlistTitle":"Add to Wishlist","AddingProductToCartProgressTitle":"Adding Product to Cart...","AddingProductToWishListProgressTitle":"Adding Product to WishList...","AdditionalInfo":"Additional Info","AddressBook":"Address Book","AddressBookIsEmpty":"Address book is empty","AddressBookUpdatedMessage":"Address Book Updated","AddressInfo":"Address Info","AgreementsButtonTitle":"Read the Terms and Conditions","AgreementsCheckboxTitle":"I agree to the Terms and Conditions","AgreementsDescription":"You must read and agree to the Terms and Conditions before placing your order.","AllImages":"All Images","AlsoLikeLbl":"You may also like","Amount":"Amount","AmountIn":"Amount in %@","Amounts":"Amounts","AppIdNotActivated":"The application is currently inactive.\\nPlease try again later.","ApplicationCode":"App code","AppliedFiltersLabel":"FILTERS APPLIED","Apply":"Apply","ApplyingCouponProgressTitle":"Applying Coupon Code","ApplyingGiftCartProgressTitle":"Applying Gift Card %@","AsGuestText":"as Guest","AsLowAsExcludingTaxLabel":"As low as excl. tax","AsLowAsIncludingTaxLabel":"As low as incl. tax","AsLowAsLabel":"As low as","AuthenticationToSocialClientFailedAlertMessage":"Authentication to %@ did failed...","AverageRating":"Average Rating","Back":"Back","BackFromInfo":"Back","BiggerThanMaxMessage":"The value should not be greater than %.2f!","BillingAddressTitle":"Billing address","BillingCheckout":"Billing","BundleProductsSectionTitle":"Bundle Products","BuyMoreAndSave":"Buy More & Save","Cancel":"Cancel","CancelButtonTitle":"Cancel","CancelingPayPalMECLProgressTitle":"Canceling PayPal ...","Cart":"Shopping Cart","CartBtn":"Cart","CartIsEmpty":"The cart is empty","CartRegisteredMessage":"Offline cart stored on server","CartRegisteredTitle":"","CartRegistrationFailedMessage":"Storage of offline cart on server failed. Please retry later","CartRegistrationFailedTitle":"Error","CartUpdatedMessageTitle":"Cart Updated","CheckGiftCardLabel":"Check Gift Card","CheckingCartProgressTitle":"Checking Gift Card %@","CheckoutAsGuestButtonTitle":"Checkout as Guest","CheckoutButtonFullTitle":"Proceed to Checkout","CheckoutButtonTitle":"Checkout","CheckoutInitializationProgressTitle":"Checkout initialization...","CheckoutInitializedText":"Checkout initialized!","CheckoutTitle":"Checkout","ChooseAmount":"Choose amount","City":"City","Clear":"Clear","Close":"Close","CommitCartChangesAlertText":"You have uncommitted actions. Commit?","CommittingUpdatesProgressTitle":"Commiting updates...","ConfigurationLoadingError":"There is an error in loading an app's configuration","ConfigureTitle":"Select Options","Connecting":"Connecting","ConnectionErrorMessage":"Connection Error\\nWe're sorry. The app is experiencing connection problems. The app requires a network connection to operate.","ConnectionLostMessage":"Connection Error\\nWe're sorry. The app is experiencing connection problems. The app requires a network connection to operate.","ContactsAreEmpty":"ContactsAreEmpty","Continue":"Continue","Copyright":"Copyright: Magento (c) 2010","Country":"Country","CountrySelect":"Countries","CreateAccount":"Create an Account","CreateAccountButtonTitle":"Create Account","CreateAccountLabel":"Create Account","CreateAccountSectionHeader":"New to Our Store?","CreateAnAccountLabel":"Create an Account","CrossSellsText":"Cross Sells","CrossellTitle":"You may also like","CustomAmount":"Custom amount","DateText":"Date","DateTitle":"Date:","Delete":"Delete","DeleteItemMessage":"Are you sure you want to remove this item?","DeleteRecordButtonTitle":"Delete","Description":"Description","DiscountButtonTitle":"Apply","DiscountLabel":"Discount:","DiscountTextFieldPlaceholder":"Enter discount code if any","DiscoutnButtonTitle":"Apply","DoneTitle":"Done","DownloadableProductLinkSample":"Sample","DownloadableProductsUpdatedMessage":"Downloadable Products Updated","DownloadsLimitTitle":"Downloads limit:","Edit":"Edit","EditAccountButtonTitle":"Save","EditAddressBookRecord":"Edit Address","EditFilterTitle":"Edit filter","EditMailList":"Edit Mail List","EditNote":"Edit note","Email":"E-mail","EmailCopyLabel":"Cc:","EmailCountMaxExceed":"Too many recipients have been set.  Max amount of recipients is:","EmailLabel":"To:","EmailThemeLabel":"Subject:","EmptyCategoryMessage":"Sorry, there are no items in this category.","EmptyDiscount":"Enter discount code first.","EmptyDiscountCodeAlertMessage":"Discount code is empty","EmptyEmails":"Please enter at least one email recipient","EmptyGalleryMessage":"This product has no images.","EmptyGiftCardValueMessage":"Please, specify gift card amount!","EmptyMyDownloadableViewMessage":"List of downloadable products is empty","EmptyStoreCreditHistoryMessage":"There is no store credit history!","EmptyViewMessage":"There are no items here","EmptyWishlistViewMessage":"Wishlist is empty.","EnterEmailText":"Enter e-mail","EnterGiftCardPromo":"Enter giftcard promo code here","EnterNameText":"Enter Name","EnterText":"Enter text","Error":"Error","ErrorEmailMessage1":"Email is not specified","ErrorEmailMessage2":"Email is not correct","ErrorLoadingConfigurationFormat":"Error Loading Configuration Format","ErrorPasswordMessage1":"Password is not specified","ErrorRetrievingData":"There is an error in retrieving the data. Please try again later","ExcludingTaxLabel":"","Facebook":"Facebook","FacebookPostFailedMessage":"Facebook post failed...","FacebookPostSuccess":"Successfully posted to Facebook","FieldRequiredToBeFilledDialogMessage":"The %s field should be filled.","Filters":"Filters","FixedAmounts":"Fixed amounts","ForgotPassword":"Forgot Password","ForgotPasswordButtonTitle":"Forgot Password?","ForgotPasswordSectionHeader":"Forgot your password?","Form":"Form","FormCellTitle":"Form","FromExcludingTaxLabel":"From excl. tax","FromIncludingTaxLabel":"From incl. tax","FullDescription":"Full Description","FunctionalityIsDisabledInOfflineModeAlertMessage":"This functionality disabled in offline mode","Gallery":"Gallery","GetMoreElements":"Load more items","GettingMoreElements":"Loading more items...","GiftCardCodeCheck":"Check","GiftCardCodeRedeem":"Redeem","GiftCardPromo":"Giftcard promo code","GiftCartRedeemedMessageText":"Check Gift Card Promo Redeemed","Giftcards":"Enter the gift card code","GuestLogInMessage":"Checkout as Guest or Register","Home":"Home","IAgree":"I Agree","InStock":"In Stock","IncludingTaxLabel":"Incl. tax","IncorrectDecimalValueDialogMessage":"You have entered an incorrect decimal value in the custom amount field. Provide a valid value.","InitializationPayPalMECLFailedMessage":"Initialization of the PayPal checkout failed!","InitializationPayPalMECLProgressTitle":"Initialization PayPal ...","InvalidEmailDialogMessage":"Email address you provided is not valid. Please provide a valid one.","InvalidResponse":"The server responded with invalid data.","Item":"Item","ItemOptionsSectionTitle":"Item Options","LastOrders":"My Orders","LastUpdatePullDownText":"Last update: %@","LessThatMinMessage":"The value should not be less than %.2f!","LindedIn":"LindedIn","LinkTitle":"Link:","LinkedIn":"LinkedIn","LinkedInAuthorization":"LinkedIn Authorization","LinkedInAutorization":"LinkedIn Autorization","LinkedInPostSuccess":"Successfully posted to Linkedin","LinkedInTitle":"LinkedIn","LinkedinPostFailedMessage":"Linkedin post failed...","LoadingAccountFormProgressTitle":"Loading Account Form...","LoadingAddressBookProgressTitle":"Loading Address Book...","LoadingAddressFormProgressTitle":"Loading Address Form...","LoadingCMSPageProgtessTitle":"Loading CMS page ...","LoadingCartProgressTitle":"Loading Cart...","LoadingCategoryProgressTitle":"Loading category ...","LoadingDownloadableProductsProgressTitle":"Loading My Downloadable Products...","LoadingGalleryProgressTitle":"Loading Gallery...","LoadingLoginFormProgressTitle":"Loading Login Form...","LoadingMoreItems":"","LoadingOrderDetailsProgressTitle":"Loading Order Details","LoadingOrdersListProgressTitle":"Loading Orders List...","LoadingProductOptionsProgressTitle":"Loading Product Options...","LoadingProductProgressTitle":"Loading product ...","LoadingProductsProgressTitle":"Loading Products...","LoadingProgressTitle":"Loading %@...","LoadingRegistrationFormProgressTitle":"Loading Registration Form...","LoadingRestorePasswordFormProgressTitle":"Loading Restore Password Form...","LoadingShippindPayPalMECLProgressTitle":"Loading shipping methods ...","LoadingStoreCreditProgressTitle":"Loading Store Credit...","LoadingText":"Loading...","LoadingWishListProgressTitle":"Loading WishList...","LoadingWriteReviewFormProgressTitle":"Loading Write Review Form...","LogIn":"Log In","LogInButtonTitle":"Log into Account","LogInEmailLabel":"Email","LogInMessage":"You must login first","LogInMessageTitle":"LogInMessageTitle","LogInPasswordLabel":"Password","LogInSectionHeader":"Log into your account","LogOut":"Log Out","LogOutButtonTitle":"Log out Account","MailToText":"To:","MaxLengthMessage":"The max length of the field \"%@\" is %d!","Maximum":"Maximum: %.2f","MergeButtonTitle":"Merge","MessageText":"Message","MessageTwitterTooLong":"Message too long, please use 140 symbols","Minimize":"Minimize","Minimum":"Minimum: %.2f","MoreInfo":"More Info","MyAccount":"My Account","NameText":"Name","NewAddressBookRecord":"Add New Address","No":"No","NoInternetConnectionAlertTitle":"No internet connection. Retry later ...","NoLastOrders":"You have placed no orders.","NoProductsFoundAlertTitle":"No products found. Please retry with other term","NoProductsMatchingSelection":"","NoSupportForOrderDetails":"Currently, the system does not support the viewing of the order detail.","NotCorrectField":"%@ is not correct","NotEmail":"The following email(s) are either mistyped or have incorrect format. Check them and try again:\\n","NotLoggedInAlertMessage":"You are not logged in","NotZeroCustomValueDialogMessage":"The custom amount value should be higher than 0.","NothingSelected":"At least one option should be selected","Notice":"Notice","OK":"OK","OpenAmountPriceBoundariesText":"Minimum %@, maximum %@","Options":"Options","OptionsTitle":"Options","OrderCanceledAlertMessage":"You canceled your order. Touch \"Pay with PayPal\" to try again.","OrderCanceledPayPalMECLMessage":"Order canceled","OrderDetailsUpdatedMessage":"Order Details Updated","OrderFailedAlertMessage":"Your order failed. Touch \"Pay with PayPal\" to try again.","OrderFailedMessage":"Order failed","OrderHeader":"Order #","OrderIDTitle":"Order ID:","OrderInfoTitle":"Order Info","OrderListUpdatedMessage":"Order List Updated","OrderNumberText":"Order Number","OrderReviewCheckout":"Order Review","OrderReviewScreenTitle":"Order Review","OrderedItemsText":"Ordered Items","OtherAmount":"Other amount","OutOfStock":"Out of Stock","ParsingError":"Error while reading remote data","PasswordLength":"The minimum password length is 6","PayPalCheckout":"PayPal Checkout","PayPalText":"PayPal","PaymentBridgeServiceErrorMessage":"Unknown Payment Bridge Error","PaymentMethodSectionTitle":"Payment Method","PaymentMethodSelectionWarning":"Please select payment method to cover a quote","PaymentMethodTitle":"Payment method","PaymentMethodsCheckout":"Payment Information","PlaceOrder":"Place Order","PlacingOrderProgressTitle":"Placing order ...","PostToLinkedIn":"Share on LinkedIn","PostToTwitter":"Share on Twitter","PostToWallProduct":"Post this product to your wall","PostingEmailProgressTitle":"Posting to e-mails","Price":"Price","PriceExcludingTax":"Price excluding tax","PriceIncludingTax":"Price including tax","Product":"Product","ProductAddedAlertMessage":"Product succesfully added to cart","ProductAddedAlertTitle":"Product added","ProductAddedToCartLabelTitle":"Product Added to Cart","ProductAddedToWishlistLabelTitle":"Product Added to Wishlist","ProductGalleryUpdatedMessage":"Product Gallery Updated","ProductOptionsUpdatedMessage":"Product Options Updated","ProductOutOfStockAlertMessage":"Product is out of stock","ProductOutOfStockAlertTitle":"","ProductPaymentCompleteLabelTitle":"Success","ProductPaymentCompleteleLabelTitle":"Success","ProductRemovedFromWishlistLabelTitle":"Product Removed From Wishlist","ProductReviewsUpdatedMessage":"Product Reviews Updated","ProductUpdatedMessage":"Product Updated","ProductsText":"Products","PullDownToUpdatePullDownText":"Pull Down To Update..","Qty":"Qty","Quantity":"Quantity","QuantityTitle":"Qty:","RatingReviewsNone":"No Ratings","RatingReviewsTitle":"Ratings and Reviews","RecoverPasswordButtonTitle":"Recover","RedemingGiftCartProgressTitle":"Redeeming Gift Card %@","RegionFieldLabel":"State/Province","RegionSelect":"Regions","RegisterText":"Register","RegisteringOfflineCartProgressTitle":"Registering cart ...","RegisteringUserProgressTitle":"Registering user ...","RegularLabel":"Regular","RegularPriceLabel":"Unit Price:","RelatedProductLabel":"You may also like","ReleaseToUpdatePullDownText":"Release To Update...","RemoveFromWishlistTitle":"Remove","RemoveGiftCardLabel":"Remove","RemoveText":"Remove","RemovingAddressProgressTitle":"Remove Address...","RemovingCouponProgressTitle":"Removing Coupon...","RemovingGiftCartProgressTitle":"Removing Gift Card...","RemovingProductFromWishListProgressTitle":"Removing Product from WishList...","RemovingProgressTitle":"Removing %@...","RemovingStoreCreditProgressTitle":"Removing Store Credit...","RequiredFieldMessage":"field is required","RequiredFieldTitle":"required","RequiredLabel":"* - field is required","Revert":"Revert","RevertDiscountButtonTitle":"Revert Discount","SamplesButtonTitle":"Samples","Save":"Save","SavingAddressProgressTitle":"Saving Address...","SavingChangesProgressTitle":"Saving changes ...","SavingMethodsProgressTitle":"Saving shipping methods ...","SavingShippingAddressProgressTitle":"Saving shipping address ...","Search":"Search","SearchUpdatedMessage":"Search Updated","SearchingProgressTitle":"Searching for %@...","SeeAllText":"See all","SelectA":"Select a","SelectBillingAddressTitle":"Select a Billing Address","SelectBillingMethodTitle":"Select a Billing Address","SelectBillingMethodTitleNoAddress":"","SelectBoxFormat":"Select %@","SelectFromAddressBook":"Select from Address Book","SelectLinks":"Select Links","SelectOptions":"Select Options","SelectPaymentMethod":"Select Payment Method","SelectShippingAddressTitle":"Select a Shipping Address","SelectShippingMethod":"Select shipping method","SelectShippingMethodTitle":"Select a Shipping Address","Send":"Send","SendEmail":"Send","SendEmailTitle":"Tell a Friend","SendTitle":"Send","SendingEmailFailedMessage":"Sending e-mail failed...","SetEmailMessage":"Please set email","SettedText":"Set","ShakeToResetFilters":"Shake device to reset the filter","Share":"Share","ShareTitle":"Share","ShippingAddressTitle":"Shipping address","ShippingCheckout":"Shipping","ShippingMethodTitle":"Shipping method","ShippingMethodsCheckout":"Ship method","Shop":"Shop","ShopAll":"Shop All","ShopUpdatedMessageTitle":"Shop Updated","ShorteningUrlClientSideError":"The shortening service returned status code %d indicating a client side error.","ShorteningUrlError":"Error during shortening url","ShorteningUrlServerSideError":"The shortening service returned status code %d indicating a server side error.","ShowPasswordLabelTitle":"Show Password","SignIn":"Sign In","SignOutProgressTitle":"Signing Out ...","SigningInProgressTitle":"Signing In...","Sku":"Product SKU","SortByLabel":"SORT BY:","SpecialExcludingTaxLabel":"Special","SpecialIncludingTaxLabel":"Incl. tax","SpecifyPaymentMethod":"Please specify payment method","SpecifyShippingMethod":"Please specify shipping method","StandardCheckout":"Standard Checkout","StartingAtExcludingTaxLabel":"Starting at excl. tax","StartingAtIncludingTaxLabel":"Starting at incl. tax","StatusText":"Status","StoreCredit":"Store credit","StoreCreditBalanceHeader":"Balance","StoreCreditInfoUpdatedMessage":"Store Credit Info Updated","StrAddress":"Address","SubmitReview":"Submit Review","SubmittingReviewProgressTitle":"Submitting Review...","Subtotal":"Subtotal","SubtotalExcludingTax":"Subtotal excluding tax","SubtotalExcludingTaxLabel":"Subtotal:","SubtotalIncludingTax":"Subtotal including tax","SubtotalIncludingTaxLabel":"Subtotal incl. tax:","SubtotalRegularPriceLabel":"Subtotal:","SuccessOrderID":"Order ID","SwipeToRevealOptions":"Swipe a product to reveal more options","Telephone":"Telephone","TellAFriendButtonTitle":"Tell a Friend","TellAFriendTitle":"Tell a Friend","TermsAndConditions":"Terms And Conditions","ThereAreNoItemsInYourCart":"There are no items in your cart","ThereIsNoAddressesForThisContact":"There is no addresses for this contact","ToExcludingTaxLabel":"To excl. tax","ToHighCustomValueDialogMessage":"The custom amount value should not be higher than %s.","ToIncludingTaxLabel":"To incl. tax","ToLowCustomValueDialogMessage":"The custom amount value should not be lower than %s.","TooBigValueMessage":"The value is too big!","TooLongTextDialogMessage":"The length of the text in the %s field is too big. Please shorten the text.","TotalsText":"Totals","TouchAndHoldToDeleteProduct":"Touch and hold a product to delete from shopping cart","TouchAndHoldToRevealOptions":"Touch and hold a product to reveal more options","TryAgain":"Try Again","Twitter":"Twitter","TwitterAuthorization":"Twitter Authorization","TwitterAutorization":"Twitter Autorization","TwitterPostFailedMessage":"Twitter post failed...","TwitterPostSuccess":"Your tweet has been sent. Thanks for sharing this product on Twitter","TypeTitle":"Type","URLOrCodeNotSet":"Either remote URL or application code was not set. Please make sure you filled all the values and try again.","UnknownException":"Unknown error ocured. Please retry later","UpdateCommentErrorMessage":"Update Comment Error","UpdatingCartProgressTitle":"Updating Cart...","UpdatingPullDownText":"Updating ...","UseBillingAddress":"Use Billing Address","UseBillingAddressForShipping":"Use billing address for shipping","Version":"Version","ViewCartButtonTitle":"View Cart","ViewDetailsTitle":"View Details","ViewGalleryTitle":"View Gallery","ViewWishlistButtonTitle":"View Wishlist","WaitTitle":"Please wait...","WebStoreAvailableOnly":"Product only available on the website.","WebsiteRestrictionEnabledMessage":"Website is offline","WishListUpdatedMessage":"WishList Updated","Wishlist":"My Wishlist","WishlistPopupTitle":"Add To Wishlist","WriteAReview":"Write a review","WriteReviewTitle":"Write a Review","WrongEmailFormat":"Wrong email format","XMLConnectURL":"URL","Yes":"Yes","iPhoneAddressBookNavigationBarTitle":"Address Book","labelPayWithCheckoutTitle":"OR, Pay with Standard Checkout","qtyLabelTitle":"Quantity:","buyNow":"Buy Now","Categories":"Categories"};
  }
  updateCart(crt) {
     this.cartItem = crt.cart_contents;
     this.cart = [];
     this.count = 0;
     for (let item in crt.cart_contents) {
         this.cart[crt.cart_contents[item].product_id] = parseInt(crt.cart_contents[item].quantity);
         this.count += parseInt(crt.cart_contents[item].quantity);
     }
 }
 updateCartTwo(crt) {
     this.cart = [];
     this.count = 0;
     this.cartItem = crt;
     for (let item in crt) {
         this.cart[crt[item].product_id] = parseInt(crt[item].quantity);
         this.count += parseInt(crt[item].quantity);
     }
 }
 }