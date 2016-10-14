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

            var rtn_person = {
                RTN_PERSON: {
                    ERR_ID: '1',
                    ERR_MSG: '',
                    RTN_PERSON_INFO_LIST: {RTN_PERSON_INFO:[]}
                }
            }
            person_infos = result.PERSON.PERSON_INFO_LIST[0].PERSON_INFO;
            rtn_person_infos = rtn_person.RTN_PERSON.RTN_PERSON_INFO_LIST.RTN_PERSON_INFO;
            for(var i = 0; i < person_infos.length; i++) {
                person_info = person_infos[i];
                rtn_person_infos.push({SORT_ID: person_info.SORT_ID,PERSON_TYPE: '1'});
            }

            var xml = builder.buildObject(rtn_person);
            resolve(xml);
        });
    });

};

var soapServer = new soap.SoapServer();
var soapService = soapServer.addService('validatePerson', new validatePersonsService());

var validatePersonOperation = soapService.getOperation('validatePerson');
validatePersonOperation.setOutputType('string');
validatePersonOperation.setInputType('person', {type: 'string'});

soapServer.listen(3000, '0.0.0.0');