webpackJsonp([0],{

/***/ 110:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 110;

/***/ }),

/***/ 151:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 151;

/***/ }),

/***/ 194:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_text_to_speech__ = __webpack_require__(195);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_native_storage__ = __webpack_require__(196);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_utils_strings__ = __webpack_require__(197);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_lodash__ = __webpack_require__(274);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_lodash__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var HomePage = (function () {
    function HomePage(navCtrl, ngZone, tts, toastCtrl, storage) {
        this.navCtrl = navCtrl;
        this.ngZone = ngZone;
        this.tts = tts;
        this.toastCtrl = toastCtrl;
        this.storage = storage;
        this.messages = [];
        this.text = "";
        this.volume = true;
        this.recording = false;
        var start = "Hi! How can I help you?";
        this.pushMessage(start, 'api');
        this.initSpeak(start);
        this.initMic();
    }
    HomePage.prototype.presentToast = function (text, position, duration) {
        if (position === void 0) { position = 'bottom'; }
        if (duration === void 0) { duration = 1500; }
        this.toastCtrl.create({
            message: text,
            duration: duration,
            position: position
        }).present();
    };
    HomePage.prototype.initMic = function () {
        var _this = this;
        window["ApiAIPlugin"].setListeningStartCallback(function () { return _this.recording = true; });
        window["ApiAIPlugin"].setListeningFinishCallback(function () { return _this.recording = false; });
    };
    HomePage.prototype.initSpeak = function (text) {
        var _this = this;
        this.storage.getItem('volume').then(function (volume) {
            _this.volume = volume;
            _this.speak(text);
        }, function (error) { return _this.speak(text); });
    };
    HomePage.prototype.pushMessage = function (text, sender) {
        this.messages.push({
            text: text,
            sender: sender
        });
    };
    HomePage.prototype.showMessage = function (text, sender) {
        var _this = this;
        if (sender === void 0) { sender = 'me'; }
        if (text) {
            this.ngZone.run(function () {
                _this.pushMessage(text, sender);
            });
            this.content.scrollToBottom(200);
        }
    };
    HomePage.prototype.showApiMessage = function (response) {
        var speech = response.result.fulfillment.speech;
        var message = __WEBPACK_IMPORTED_MODULE_5_lodash__["get"](response.result.fulfillment, "data.google.richResponse.items[0].simpleResponse.displayText", speech);
        this.showMessage(message, 'api');
        this.speak(speech);
    };
    HomePage.prototype.speak = function (text) {
        if (this.volume && text) {
            this.tts.speak({
                text: text,
                locale: "en-US",
                rate: 1
            });
        }
    };
    HomePage.prototype.toggleVolume = function () {
        this.volume = !this.volume;
        this.storage.setItem('volume', this.volume);
    };
    HomePage.prototype.sendText = function () {
        var _this = this;
        var message = this.text;
        if (!message)
            return;
        this.showMessage(message);
        window["ApiAIPlugin"].requestText({
            query: message
        }, function (response) {
            _this.showApiMessage(response);
        }, function (error) {
            _this.presentToast("Cannot connect to server");
            console.error(JSON.stringify(error));
        });
        this.text = "";
    };
    HomePage.prototype.sendVoice = function () {
        var _this = this;
        if (this.recording) {
            this.recording = false;
            window["ApiAIPlugin"].cancelAllRequests();
            return;
        }
        this.recording = true;
        window["ApiAIPlugin"].requestVoice({}, function (response) {
            _this.showMessage(__WEBPACK_IMPORTED_MODULE_4__providers_utils_strings__["a" /* StringUtils */].capitalize(response.result.resolvedQuery));
            _this.showApiMessage(response);
        }, function (error) {
            _this.ngZone.run(function () { return _this.recording = false; });
            console.error(JSON.stringify(error));
        });
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])('content'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* Content */])
    ], HomePage.prototype, "content", void 0);
    HomePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-home',template:/*ion-inline-start:"/Users/carleslc/GitHub/IonicAI/src/pages/home/home.html"*/'<ion-header hidden>\n  <ion-navbar>\n    <ion-title>\n      Ionic AI\n    </ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content #content padding>\n\n  <ion-list no-lines>\n    <ion-item *ngFor="let message of messages" class="chat-item" text-wrap>\n      <ion-avatar item-left *ngIf="message.sender == \'api\'">\n        <img src="assets/imgs/apiai.png">\n      </ion-avatar>\n      <ion-avatar item-right *ngIf="message.sender == \'me\'">\n        <img src="assets/imgs/ionic.png">\n      </ion-avatar>\n      <div *ngIf="message.sender == \'api\'" class="bubble me">\n        <h3> {{ message.text }} </h3>\n      </div>\n      <div *ngIf="message.sender == \'me\'" class="bubble you">\n        <h3> {{ message.text }} </h3>\n      </div>\n    </ion-item>\n  </ion-list>\n\n  <ion-fab top right>\n    <button ion-fab mini color="light" (click)="toggleVolume()">\n      <ion-icon *ngIf="volume" name="volume-up"></ion-icon>\n      <ion-icon *ngIf="!volume" name="volume-off"></ion-icon>\n    </button>\n  </ion-fab>\n\n  <ion-fab bottom right>\n    <button ion-fab color="danger" (click)="sendVoice()">\n      <ion-spinner *ngIf="recording" name="dots" class="spinner-energized"></ion-spinner>\n      <ion-icon *ngIf="!recording" name="mic"></ion-icon>\n    </button>\n  </ion-fab>\n\n</ion-content>\n\n<ion-footer>\n  <ion-toolbar>\n    <ion-item>\n      <ion-input #input type="text" placeholder="Write your message" [(ngModel)]="text"></ion-input>\n      <button ion-button icon-only item-right clear (click)="sendText(); input.setFocus()">\n        <ion-icon name="send"></ion-icon>\n      </button>\n    </ion-item>\n  </ion-toolbar>\n</ion-footer>\n'/*ion-inline-end:"/Users/carleslc/GitHub/IonicAI/src/pages/home/home.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* NavController */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* NgZone */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_text_to_speech__["a" /* TextToSpeech */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* ToastController */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_native_storage__["a" /* NativeStorage */]])
    ], HomePage);
    return HomePage;
}());

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 197:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return StringUtils; });
var StringUtils = (function () {
    function StringUtils() {
    }
    StringUtils.capitalize = function (s) {
        s = s.trim();
        return s ? s[0].toUpperCase() + s.slice(1) : '';
    };
    return StringUtils;
}());

//# sourceMappingURL=strings.js.map

/***/ }),

/***/ 198:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(199);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(222);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 222:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(191);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__ = __webpack_require__(193);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_component__ = __webpack_require__(273);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_home_home__ = __webpack_require__(194);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_text_to_speech__ = __webpack_require__(195);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__providers_utils_strings__ = __webpack_require__(197);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ionic_native_native_storage__ = __webpack_require__(196);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};










var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_6__pages_home_home__["a" /* HomePage */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["d" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* MyApp */], {}, {
                    links: []
                })
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["b" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_6__pages_home_home__["a" /* HomePage */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */],
                __WEBPACK_IMPORTED_MODULE_7__ionic_native_text_to_speech__["a" /* TextToSpeech */],
                __WEBPACK_IMPORTED_MODULE_9__ionic_native_native_storage__["a" /* NativeStorage */],
                { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["u" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* IonicErrorHandler */] },
                __WEBPACK_IMPORTED_MODULE_8__providers_utils_strings__["a" /* StringUtils */]
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 273:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(193);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(191);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_home_home__ = __webpack_require__(194);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var MyApp = (function () {
    function MyApp(platform, statusBar, splashScreen) {
        this.rootPage = __WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */];
        platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.styleDefault();
            splashScreen.hide();
            window["ApiAIPlugin"].init({
                clientAccessToken: "8268dd46704a48b0888c2418c6a4f8ed",
                lang: "en" // set lang tag from list of supported languages
            });
        });
    }
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"/Users/carleslc/GitHub/IonicAI/src/app/app.html"*/'<ion-nav [root]="rootPage"></ion-nav>\n'/*ion-inline-end:"/Users/carleslc/GitHub/IonicAI/src/app/app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ })

},[198]);
//# sourceMappingURL=main.js.map