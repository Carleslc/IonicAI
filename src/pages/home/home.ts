import {Component, NgZone, ViewChild} from '@angular/core';
import {Content, NavController, ToastController} from 'ionic-angular';
import {TextToSpeech} from '@ionic-native/text-to-speech';
import {NativeStorage} from '@ionic-native/native-storage';
import {StringUtils} from "../../providers/utils/strings";
import * as _ from "lodash";

declare const window;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

  @ViewChild('content') private content: Content;

  messages: any[] = [];
  text: string = "";
  volume: boolean = true;
  recording: boolean = false;

  constructor(public navCtrl: NavController, private ngZone: NgZone, private tts: TextToSpeech,
              private toastCtrl: ToastController, private storage: NativeStorage) {
    let start = "Hi! How can I help you?";
    this.pushMessage(start, 'api');
    this.initSpeak(start);
    this.initMic();
  }

  private presentToast(text, position='bottom', duration=1500) {
    this.toastCtrl.create({
      message: text,
      duration: duration,
      position: position
    }).present();
  }

  private initMic() {
    window["ApiAIPlugin"].setListeningStartCallback(() => this.recording = true);
    window["ApiAIPlugin"].setListeningFinishCallback(() => this.recording = false);
  }

  private initSpeak(text) {
    this.storage.getItem('volume').then(volume => {
      this.volume = volume;
      this.speak(text);
    }, (error) => this.speak(text));
  }

  private pushMessage(text, sender) {
    this.messages.push({
      text: text,
      sender: sender
    });
  }

  showMessage(text, sender='me') {
    if (text) {
      this.ngZone.run(() => {
        this.pushMessage(text, sender);
      });
      this.content.scrollToBottom(200);
    }
  }

  showApiMessage(response) {
    let speech = response.result.fulfillment.speech;
    let message = _.get(response.result.fulfillment, "data.google.richResponse.items[0].simpleResponse.displayText", speech);
    this.showMessage(message, 'api');
    this.speak(speech)
  }

  speak(text) {
    if (this.volume && text) {
      this.tts.speak({
        text: text,
        locale: "en-US",
        rate: 1
      })
    }
  }

  toggleVolume() {
    this.volume = !this.volume;
    this.storage.setItem('volume', this.volume);
  }

  sendText() {
    let message = this.text;

    if (!message) return;

    this.showMessage(message);

    window["ApiAIPlugin"].requestText({
      query: message
    }, (response) => {
      this.showApiMessage(response)
    }, (error) => {
      this.presentToast("Cannot connect to server");
      console.error(JSON.stringify(error));
    });

    this.text = "";
  }

  sendVoice() {
    if (this.recording) {
      this.recording = false;
      window["ApiAIPlugin"].cancelAllRequests();
      return;
    }
    this.recording = true;
    window["ApiAIPlugin"].requestVoice({},
      (response) => {
        this.showMessage(StringUtils.capitalize(response.result.resolvedQuery));
        this.showApiMessage(response)
      },
      (error) => {
        this.ngZone.run(() => this.recording = false);
        console.error(JSON.stringify(error));
      });
  }

}
