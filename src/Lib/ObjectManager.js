/* jshint esversion:6 */
/* global module, require */

// ObjectManager.js
//
// Author: Jordan Murkin
// Created: 29 January 2018

import contract from "truffle-contract";

export class ObjectManager {
    constructor(web3) {
        const objectManagerData = require("./truffle/build/contracts/ObjectManager.json");

        let objectManagerContract = contract(objectManagerData);
        objectManagerContract.setProvider(web3.currentProvider);

        //dirty hack for web3@1.0.0 support for localhost testrpc, see https://github.com/trufflesuite/truffle-contract/issues/56#issuecomment-331084530
        // if (typeof objectManagerContract.currentProvider.sendAsync !== "function") {
        //   objectManagerContract.currentProvider.sendAsync = function() {
        //     return objectManagerContract.currentProvider.send.apply(
        //       objectManagerContract.currentProvider, arguments
        //     );
        //   };
        // }

        this.contract = objectManagerContract;
    }

    getOwner() {
        let self = this;

        return new Promise(function(resolve, reject) {
            self.contract.deployed()
            .then(instance => {
                return instance.owner();
            })
            .then(owner => {
                resolve(owner);
            })
            .catch(error => {
                reject(error);
            });
        });
    }

    isOwner(address) {
        let self = this;

        return new Promise(function(resolve, reject) {
            self.getOwner()
            .then(owner => {
                resolve(owner === address);
            })
            .catch(error => {
                reject(error);
            });
        });
    }

    /** Verifiers **/

    isVerifier(address) {
        /**
         * DONE
         *
         * This function needs to check if the given address is a verifier
         * To do this we need to check the `verifiers` map
         *
         * Order of events:
         * 1. Get deployed contract
         * 2. Call the verifiers map with the `address` as a parameter
         * 3. Return the result (which will be either true or false)
         *
         * Documentation for accessing contracts with Truffle can be found at:
         * http://truffleframework.com/docs/advanced/build_processes
         *
         */
         let self = this;
         let instance = null;

        return new Promise(function(resolve, reject) {
            //resolve(true);
            self.contract.deployed()
            .then(deployed => {
                instance = deployed;
                return instance.verifiers(address);
            })
            .then(result => {
                resolve(result);
            })
            .catch(error => {
                reject(error);
            })

        });
    }

    addVerifier(web3Account, address) {
        let self = this,
            instance = null;

        return new Promise(function(resolve, reject) {
            self.contract.deployed()
            .then(deployed => {
                instance = deployed;

                return instance.addVerifier.estimateGas(address, {from: web3Account});
            })
            .then(gasEstimate => {
                return instance.addVerifier(address, {from: web3Account, gas: gasEstimate});
            })
            .then(success => {
                resolve(success);
            })
            .catch(error => {
                reject(error);
            });
        });
    }

    removeVerifier(web3Account, address) {
        let self = this,
            instance = null;

        return new Promise(function(resolve, reject) {
            self.contract.deployed()
            .then(deployed => {
                instance = deployed;

                return instance.removeVerifier.estimateGas(address, {from: web3Account});
            })
            .then(gasEstimate => {
                return instance.removeVerifier(address, {from: web3Account, gas: gasEstimate});
            })
            .then(success => {
                resolve(success);
            })
            .catch(error => {
                reject(error);
            });
        });
    }

    /** Objects **/

    getObject(identifier) {
        let self = this;

        return new Promise(function(resolve, reject) {
            self.contract.deployed()
            .then(instance => {
                return instance.objects(identifier);
            })
            .then(object => {
                resolve(object);
            })
            .catch(error => {
                reject(error);
            });
        });
    }

    isObjectRegistered(identifier) {
        let self = this;

        return new Promise(function(resolve, reject) {
            self.getObject(identifier)
            .then(object => {
                resolve(object !== "0x0000000000000000000000000000000000000000");
            })
            .catch(error => {
                reject(error);
            });
        });
    }

    getObjects(address) {
        /**
         * DONE
         *
         * This function should get the objects owned by the given `address`
         *
         * It should return a Promise containing a list of objects owned
         * by this address. These objects will be the bytes32 identifiers
         * of the objects
         *
         * Order of events:
         * 1. Get deployed contract
         * 2. Get the address's object index from the `objectOwnersIndex` function
         * 3. For 0..index get the object from the `objectOwners` function
         * 4. Return a list of all objects
         *
         * Tip: Using Promise.all() should help with this
         *
         */

        let self = this;
        let instance = null;
        let numberOfObjects = 0;
        // Returning fake data. These are hex encoded strings similar to those that
        // will be returned from a Solidity contract
        // The decoded list is ["fake", "fake object"]
        return new Promise(function(resolve, reject) {
            self.contract.deployed()
            .then(contract => {
              instance = contract;
              return instance.objectOwnersIndex(address);
            })
            .then(_numberOfObjects => {
              numberOfObjects = _numberOfObjects;
              const promises = [];

              for (let i=0; i < numberOfObjects; i++) {
                promises.push(instance.objectOwners(address, i));
              }
              return Promise.all(promises);
            })
            .then(listOfAddress => {
              resolve(listOfAddress);
            })
            .catch(err => {
              reject(err);
            });
        });
    }

    registerObject(web3Account, identifier, owner) {
        /**
         * DONE
         *
         * This function should register an object in the contract
         * using the `registerObject` function
         *
         * It should return a Promise for ease of use
         *
         * Remember that you need to first get your deployed contract using
         * self.contract.deployed()
         *
         * Order of events:
         * 1. Get deployed contract
         * 2. Estimate the gas needed to execute the function
         * 3. Execute the function and return
         *
         */

         let self = this;
         let instance = null;

         return new Promise(function(resolve, reject) {
             self.contract.deployed()
             .then(contract => {
               instance = contract;
               return instance.registerObject.estimateGas(identifier, owner, {from: web3Account});
             })
             .then(gasEstimate => {
                 return instance.registerObject(identifier, owner, {from: web3Account, gas: gasEstimate});
             })
             .then(success => {
                 resolve(success);
             })
             .catch(error => {
                 reject(error);
             });
         });
    }

    transferObject(web3Account, identifier, newOwner) {
        let self = this,
            instance = null;

        console.log("Transfer step 1");

        return new Promise(function(resolve, reject) {
            self.contract.deployed()
            .then(deployed => {
                instance = deployed;

                console.log("Transfer step 2");

                return instance.transferObject.estimateGas(identifier, newOwner, {from: web3Account});
            })
            .then(gasEstimate => {
                console.log("Transfer step 3");

                return instance.transferObject(identifier, newOwner, {from: web3Account, gas: gasEstimate});
            })
            .then(success => {
                resolve(success);
            })
            .catch(error => {
                reject(error);
            });
        });
    }

    getObjectTransfers(object) {
        let self = this,
            instance = null;

        return new Promise(function(resolve, reject) {
            self.contract.deployed()
            .then(deployed => {
                instance = deployed;

                resolve(self.getObjectTransfersEvents(object, instance));
            })
            .catch(error => {
                reject(error);
            });
        });
    }

    getObjectTransfersEvents(object, contract) {
        /**
         * DONE
         *
         * This function returns the 'ObjectTransferred' event logs.
         * It searches the event logs for the given object from block 0 to now
         * Then formats the results and returns them
         *
         * This event can be accessed using `contract.ObjectTransferred`
         * To get past logs we use the structure:
         * contract.Event({filters}, {options}).get(function(error, result) {});
         *
         * Documentation can be found at: https://github.com/ethereum/wiki/wiki/JavaScript-API#contract-events
         *
         * Order of events:
         * 1. Get all event logs for this object
         * 2. Extract `from`, `to` and `blockNumber` from the results
         * 3. Return list of objects containing results
         *
         */
         // Returning fake data. This is the data structure that we need
         // to extract from the events
        return new Promise(function(resolve, reject) {

            contract.ObjectTransferred({object: object},{fromBlock: 0, toBlock: 'latest'}).get(function(error, result) {
                // console.log(result);
                if (error) reject(error);

                let logs = [];
                for (let i = 0; i < result.length; i++) {
                    let object = {
                      from: result[i].args.from,
                      to: result[i].args.to,
                      block: result[i].blockNumber
                    };
                    logs.push(object);
                }
                // console.log(logs);
                resolve(logs);
            });


        });
    }

    getObjectTransfersEvent(object) {
        let self = this,
            instance = null;

        return new Promise(function(resolve, reject) {
            self.contract.deployed()
            .then(deployed => {
                instance = deployed;

                resolve(instance.ObjectTransferred({object: object},{fromBlock: 'pending'}));
            })
            .catch(error => {
                reject(error);
            });
        });
    }
}

//export let ObjectManager = new objectManager();
//export ObjectManager;
