import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

import { TextToSpeech } from '@ionic-native/text-to-speech';
import { StringUtils } from '../providers/utils/strings';
import { NativeStorage } from "@ionic-native/native-storage";

@NgModule({
  declarations: [
    MyApp,
    HomePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    TextToSpeech,
    NativeStorage,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    StringUtils
  ]
})
export class AppModule {}
