import {HttpClient, json} from 'aurelia-fetch-client';
import {inject} from 'aurelia-framework';

@inject(HttpClient)
export class WebApi{

    http: HttpClient

    constructor(http){
        this.http = http;

        const baseUrl = 'https://localhost:5001/';

        http.configure(config => {
            config.withBaseUrl(baseUrl);
        })
    }

    getCountries(){

        return this.http.fetch('getcountries')
                 .then(response => response.json())
                 .then(countries => {
                    return countries;
                 })
                .catch(error => {
                    console.log('Error retrieving countries.');
                    return [];
                });

    }

    getDepartments(){
        return this.http.fetch('getdepartments')
                 .then(response => response.json())
                 .then(departments => {
                    return departments;
                 })
                .catch(error => {
                    console.log('Error retrieving departments.');
                    return [];
                });
    }

    addAsset(asset){
        return this.http.fetch('Asset/createasset', {
            method: 'post',
            body: json(asset)
            })
            .then(response => response.json())
            .then(createdAsset => {
                return createdAsset;
            })
               .catch(error => {
                   console.log('Error adding Asset.');
            });

    }

    getAssets(){
        return this.http.fetch('Asset/getAllAssets')
                 .then(response => response.json())
                 .then(allAsset => {
                    return allAsset;
                 })
                .catch(error => {
                    console.log('Error retrieving all Assets.');
                    return [];
                });
    }

    getAssetById(asset){
      

        return this.http.fetch(`Asset/get?assetid=${asset}`)
        
                 .then(response => response.json())
                 .then(asset => {
                    return asset;
                 })
                .catch(error => {
                    console.log('Error retrieving asset.');
                    return [];
                });
    }
}