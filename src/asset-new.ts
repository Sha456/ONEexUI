
  import {inject} from 'aurelia-framework';
  import {EventAggregator} from 'aurelia-event-aggregator';
  import {WebApi} from './Services/WebAPI';
  
  interface Asset {
    assetname: string;
    department: number;
    countryOfDepartment: string;
    eMailAdressOfDepartment: string;
    purchaseDate: Date;
    broken: boolean;
  }

  interface Department {
    departmentId: number;
    departmentName: string;
  }

  @inject(WebApi, EventAggregator)
  export class AssetNew {
    countries : any;
    departments: Department[];
    asset: Asset;
    assets:any;

    selectedDepartment : number;
    selectedCountryCode : string
 
    constructor(private api: WebApi, private ea: EventAggregator) { }
  
    created() {
        
        this.loadCountries();
        this.loadDepartments();
    }

    loadCountries() {
        this.api.getCountries().then(countries => {
            this.countries = countries;
        });
    }

    loadDepartments() {
        this.api.getDepartments().then(departments => {
            this.departments = departments;
        });
    }

    save(){

        this.asset.countryOfDepartment=this.selectedCountryCode;
        this.asset.department = this.selectedDepartment;

        this.api.addAsset(this.asset).then(assets => {
            this.assets = assets;
        });
    }
  }