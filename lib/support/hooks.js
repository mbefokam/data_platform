'use strict';

const config = require('../config.js');

module.exports = function(){

  
    this.Before({tags: ["@baseUrl"]}, function(scenario){
        const tags = scenario.getTags();
        for(let i = 0; i < tags.length; i++){
            const name = tags[i].getName();
            if(name.includes('baseUrl-')){
                const value = name.split('-')[1];
                this.baseUrl = config.baseUrl[value];
                return;
            }
        }
    });

};