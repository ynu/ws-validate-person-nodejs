var soap = require('soap-server');
var fs = require('fs'),
    xml2js = require('xml2js'),
    util = require('util');
var Promise = require('promise');

var parser = new xml2js.Parser();
var builder = new xml2js.Builder();

function validatePersonsService(){
}

validatePersonsService.prototype.validatePerson = function(person){
    console.info("The input is %j", person);

    return new Promise(function (resolve, reject) {
        parser.parseString(person, function (err, result) {
            if(err) {
                console.log("Error in parseString!");
                reject(err);
            }
            var xml_object = result;
            console.log(util.inspect(result, false, null));
            console.log("json_object: %s", JSON.stringify(result));

            result_object = {RTN_PERSON: {ERR_ID: '1', ERR_MSG: '', RTN_PERSON_INFO_LIST: []}};
            RTN_PERSON_INFO = result_object.RTN_PERSON.RTN_PERSON_INFO_LIST;
            xml_object.PERSON.PERSON_INFO_LIST[0].PERSON_INFO.forEach(function(person_info) {
                RTN_PERSON_INFO.push({RTN_PERSON_INFO: {SORT_ID: person_info.SORT_ID[0], PERSON_TYPE: "1"}})
            });

            resolve(result_object);
        });
    });

};

var soapServer = new soap.SoapServer();
var soapService = soapServer.addService('validatePerson', new validatePersonsService());

soapServer.listen(3000, '0.0.0.0');