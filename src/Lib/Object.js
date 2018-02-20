/* jshint esversion:6 */
/* global module, require */

// ObjectManager.js
//
// Author: Jordan Murkin
// Created: 29 January 2018

import contract from "truffle-contract";

export class MyObject {
    constructor(web3, address) {
        let objectData = require("./truffle/build/contracts/Object.json");

        let objectContract = contract(objectData);
        objectContract.setProvider(web3.currentProvider);

        this.contract = objectContract.at(address);
    }

    getOwner() {
        return this.contract.owner();
    }

    getIdentifier() {
        return this.contract.identifier();
    }
}
