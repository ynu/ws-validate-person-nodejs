var http=require('http');
var soap = require('soap');

var myService = {
    validatePerson: {
        validatePerson_Port: {
            validatePerson: function(person) {
                console.info("%j", person);
                var rtn_person = {
                    RTN_PERSON: {
                        ERR_ID: 'OK',
                        ERR_MSG: '',
                        RTN_PERSON_INFO_LIST: {RTN_PERSON_INFO:[]}
                    }
                }
                person_infos = person.person.PERSON.PERSON_INFO_LIST.PERSON_INFO;
                rtn_person_infos = rtn_person.RTN_PERSON.RTN_PERSON_INFO_LIST.RTN_PERSON_INFO;
                for(var i = 0; i < person_infos.length; i++) {
                    person_info = person_infos[i];
                    rtn_person_infos.push({SORT_ID: person_info.SORT_ID,PERSON_TYPE: '1'});
                }
                return rtn_person;
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