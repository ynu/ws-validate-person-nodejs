var soap = require('soap');

// var url = 'http://web-service-ceair.ynu.edu.cn/ws/validate-person?wsdl';
// var url = 'http://localhost:3000/validatePerson?wsdl';
var url = 'validatePerson.wsdl';
// var url = 'B2gAuthenticationService.wsdl.xml';

var args = {
    person: "<?xml version=\"1.0\" encoding=\"UTF-8\"?>" +
    "<PERSON>" +
    "    <USR_ID>liudonghua</USR_ID>" +
    "    <USR_PWD>1234</USR_PWD>" +
    "    <PERSON_INFO_LIST>" +
    "        <PERSON_INFO>" +
    "            <SORT_ID>1</SORT_ID>" +
    "            <PASS_TYPE>NI</PASS_TYPE>" +
    "            <PASS_NO>123456789012345678</PASS_NO>" +
    "            <PERSON_NM>刘东华</PERSON_NM>" +
    "            <UNIV_ID>12013002381</UNIV_ID>" +
    "        </PERSON_INFO>" +
    "        <PERSON_INFO>" +
    "            <SORT_ID>2</SORT_ID>" +
    "            <PASS_TYPE>NI</PASS_TYPE>" +
    "            <PASS_NO>234567890123456789</PASS_NO>" +
    "            <PERSON_NM>liyang</PERSON_NM>" +
    "            <UNIV_ID>12013002382</UNIV_ID>" +
    "        </PERSON_INFO>" +
    "    </PERSON_INFO_LIST>" +
    "</PERSON>"
};

var wsdlOptions = {
    // overrideRootElement: {
    //     namespace: "ns",
    //     xmlnsAttributes: [{
    //         name: "xmlns:ns",
    //         value: "http://web-service-ceair.ynu.edu.cn/validate-person"
    //     }]
    // }
};

soap.createClient(url, wsdlOptions, function(err, client) {
    console.info(client.describe());
    client.validatePerson(args, function(err, result) {
        console.log('%j\n', err);
        console.log('%j\n', result);
        console.log('%j\n', client.lastRequest);
    });
});