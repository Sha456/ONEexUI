
  import {inject} from 'aurelia-framework';
  import {EventAggregator} from 'aurelia-event-aggregator';
  import {WebApi} from './Services/WebAPI';
  import {ContactUpdated,ContactViewed} from './messages';
  import {areEqual} from './utility';

  
interface Asset {
    assetName : string;
    department: number;
    countryOfDepartment: string;
    eMailAdressOfDepartment: string;
    purchaseDate: Date;
    broken: boolean;
}
  interface AssetGroup {
    asset: Asset;

  }

  interface Department {
    departmentId: number;
    departmentName: string;
  }
  
  @inject(WebApi, EventAggregator)
  export class AssetDetail {
    routeConfig;
    assertGroup: AssetGroup;
    originalAssertGroup: AssetGroup;
    departments : Department[];
    countries: any;

    constructor(private api: WebApi, private ea: EventAggregator) { }
  
    activate(params, routeConfig) {
        this.loadDepartments();
        this.loadCountries();
      this.routeConfig = routeConfig;
  
      console.log("AAAAA "+ JSON.stringify(params));
      return this.api.getAssetById(params.id).then(asset => {
        console.log("Whats In "+ JSON.stringify(asset));

        this.assertGroup = <AssetGroup>asset;
        this.routeConfig.navModel.setTitle(this.assertGroup.asset.assetName);
        this.originalAssertGroup = JSON.parse(JSON.stringify(this.assertGroup));
        this.ea.publish(new ContactViewed(this.assertGroup.asset));

        

        console.log("OKK "+JSON.stringify(this.assertGroup));
      });
    }
  
    get canSave() {
      return this.assertGroup.asset.assetName && this.assertGroup.asset.assetName;// && !this.api.isRequesting;
    }
  
    save() {
    //   this.api.saveContact(this.assertGroup).then(contact => {
    //     this.assertGroup = <Contact>contact;
    //     this.routeConfig.navModel.setTitle(this.assertGroup.firstName);
    //     this.this.originalAssertGroup = JSON.parse(JSON.stringify(this.assertGroup));
    //     this.ea.publish(new ContactUpdated(this.assertGroup));
    //   });
    }

    loadDepartments() {
        this.api.getDepartments().then(departments => {
            this.departments = departments;
        });
    }

    loadCountries() {
        this.api.getCountries().then(countries => {
            this.countries = countries;
        });
    }

  
    canDeactivate() {
      if(!areEqual(this.originalAssertGroup, this.assertGroup)){
        let result = confirm('You have unsaved changes. Are you sure you wish to leave?');
  
        if(!result) {
          this.ea.publish(new ContactViewed(this.assertGroup));
        }
  
        return result;
      }
  
      return true;
    }
  }
  
