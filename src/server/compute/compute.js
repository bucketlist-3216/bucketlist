const config = require('../config/settings');

/**
 * Defines structure for a compute resource. Any backend processing required to happen to be included in this directory.
 */
class AbstractComputeResource {

    constructor(settings) {
        this._settings = settings || config;
    }

    getSampleMessage() {
        throw new Error('Not implemented');
    }
}   


/** 
 * Sample compute resource.
 */
class Compute extends AbstractComputeResource{

    constructor(settings) {
        super();
        this._settings = settings || config;
    }

    getSampleMessage() {
        return 'Message received from compute';
    }
}

module.exports = Compute;