import {EventAggregator} from 'aurelia-event-aggregator';
import {Router, RouterConfiguration} from 'aurelia-router';

  import {WebApi} from './Services/WebAPI';
  import {ContactUpdated, ContactViewed} from './messages';
  import {inject} from 'aurelia-framework';
  
  @inject(WebApi, EventAggregator)
  export class AssetList {
    router: Router;

    contacts;
    selectedId = 0;
    lisOfAssets: any;

    constructor(private api: WebApi, ea: EventAggregator, router: Router) {
      ea.subscribe(ContactViewed, msg => this.select(msg.contact));
      ea.subscribe(ContactUpdated, msg => {
        let id = msg.contact.id;
        let found = this.contacts.find(x => x.id == id);
        Object.assign(found, msg.contact);
      });

      this.router = router;
    }
  
    created() {
      this.loadAssets();
    }
  
    select(asset) {
        console.log("Inside Seleeect" + JSON.stringify(asset));
        this.selectedId = asset.id;


    //   return true;
    }

    loadAssets() {
        this.api.getAssets().then(lisOfAssets => {
            this.lisOfAssets = lisOfAssets;
        });
    }
  }
  

  