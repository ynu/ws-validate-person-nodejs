var http=require('http');
var soap = require('soap');
var xml2js = require('xml2js');
var parser = new xml2js.Parser();
var builder = new xml2js.Builder({cdata: true});

var myService = {
    validatePerson: {
        validatePerson_Port: {
            validatePerson: function(person) {
                console.info("parsed request is %j", person);
                var rtn_person = {
                    RTN_PERSON: {
                        ERR_ID: 'OK',
                        ERR_MSG: '',
                        RTN_PERSON_INFO_LIST: {RTN_PERSON_INFO:[]}
                    }
                }
                person_infos = person.person.$value.PERSON.PERSON_INFO_LIST.PERSON_INFO;
                rtn_person_infos = rtn_person.RTN_PERSON.RTN_PERSON_INFO_LIST.RTN_PERSON_INFO;
                if(person_infos.constructor === Array) {
                    for(var i = 0; i < person_infos.length; i++) {
                        person_info = person_infos[i];
                        rtn_person_infos.push({SORT_ID: person_info.SORT_ID,PERSON_TYPE: '1'});
                    }
                }
                else if(typeof person_infos === "object") {
                    rtn_person_infos.push({SORT_ID: rtn_person_infos.SORT_ID,PERSON_TYPE: '1'});
                }
                var rtn_person_string = builder.buildObject(rtn_person);
                var rtn_person_cdata_string = "<![CDATA[" + rtn_person_string + "]]>";
                console.info("parsed response is %s", rtn_person_cdata_string);
                return {validatePersonResult: rtn_person_cdata_string};
            }
        }
    }
};

var xml = require('fs').readFileSync('validatePerson.wsdl', 'utf8');

//http server example
var server = http.createServer(function(request,response) {
    response.end("404: Not Found: " + request.url);
});

server.listen(3000);
soap.listen(server, '/validatePerson', myService, xml);
