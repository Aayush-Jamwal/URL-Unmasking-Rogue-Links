/*
$('a').click(function(){
    alert("You are about to go to "+$(this).attr('href'));
});
*/

var result = {};
//---------------------- 1.  IP Address  ----------------------

var url = window.location.href;
// alert(url);
var urlDomain = window.location.hostname;

//url="0x58.0xCC.0xCA.0x62"

var patt = /(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[0-9]?[0-9])(\.|$){4}/;
var patt2 = /(0x([0-9][0-9]|[A-F][A-F]|[A-F][0-9]|[0-9][A-F]))(\.|$){4}/;
var ip = /\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/;


if(ip.test(urlDomain)||patt.test(urlDomain)||patt2.test(urlDomain)){ 
    result["IP Address"]="1";
}else{
    result["IP Address"]="-1";
}

//alert(result);

//---------------------- 2.  URL Length  ----------------------


//alert(url.length);
if(url.length<54){
    result["URL Length"]="-1";
}else if(url.length>=54&&url.length<=75){
    result["URL Length"]="0";
}else{
    result["URL Length"]="1";
}
//alert(result);


//---------------------- 3.  Tiny URL  ----------------------

var onlyDomain = urlDomain.replace('www.','');

if(onlyDomain.length<7){
    result["Tiny URL"]="1";
}else{
    result["Tiny URL"]="-1";
}
//alert(result);

//---------------------- 4.  @ Symbol  ----------------------

patt=/@/;
if(patt.test(url)){ 
    result["@ Symbol"]="1";
}else{
    result["@ Symbol"]="-1";
}

//---------------------- 5.  Redirecting using //  ----------------------

if(url.lastIndexOf("//")>7){
    result["Redirecting using //"]="1";
}else{
    result["Redirecting using //"]="-1";
}

//---------------------- 6. (-) Prefix/Suffix in domain  ----------------------

patt=/-/;
if(patt.test(urlDomain)){ 
    result["(-) Prefix/Suffix in domain"]="1";
}else{
    result["(-) Prefix/Suffix in domain"]="-1";
}

//---------------------- 7.  No. of Sub Domains  ----------------------

//patt=".";

if((onlyDomain.match(RegExp('\\.','g'))||[]).length==1){ 
    result["No. of Sub Domains"]="-1";
}else if((onlyDomain.match(RegExp('\\.','g'))||[]).length==2){ 
    result["No. of Sub Domains"]="0";    
}else{
    result["No. of Sub Domains"]="1";
}

//---------------------- 8.  HTTPS  ----------------------


patt=/https:\/\//;
if(patt.test(url)){
    result["HTTPS"]="-1";
}else{
    result["HTTPS"]="1";
}

//---------------------- 9.  Query Length  ----------------------
var queryLength = url.split('?')[1]?.length || 0;
result["Query Length"] = queryLength < 15 ? "-1" : queryLength <= 30 ? "0" : "1";

//---------------------- 10. Path Length  ----------------------
var pathLength = new URL(url).pathname.length;
result["Path Length"] = pathLength < 15 ? "-1" : pathLength <= 30 ? "0" : "1";

//---------------------- 11. Number of Parameters  ----------------------
var params = (url.split('?')[1] || '').split('&').length;
result["Number of Parameters"] = params <= 2 ? "-1" : params <= 5 ? "0" : "1";

//---------------------- 12. Number of Login Forms  ----------------------
var loginForms = Array.from(document.getElementsByTagName('form')).filter(form => form.innerHTML.toLowerCase().includes('password')).length;
result["Number of Login Forms"] = loginForms > 0 ? "1" : "-1";

//---------------------- 13. Presence of Brand Name  ----------------------
var brandNames = ["paypal", "amazon", "facebook", "google"];
result["Presence of Brand Name"] = brandNames.some(name => urlDomain.includes(name)) ? "1" : "-1";

//---------------------- 14. Presence of Fake HTTPS  ----------------------
result["Presence of Fake HTTPS"] = url.includes("https") && !url.startsWith("https://") ? "1" : "-1";

//---------------------- 15. Count of Redirections  ----------------------
var redirections = (url.match(/\/\//g) || []).length - 1;
result["Count of Redirections"] = redirections < 2 ? "-1" : redirections <= 4 ? "0" : "1";

//---------------------- 16. Frequency of N-grams  ----------------------
var nGrams = url.split('').map((_, i, arr) => arr.slice(i, i + 3).join('')).filter(gram => gram.length === 3);
result["Frequency of N-grams"] = nGrams.length > 15 ? "1" : "-1";

//---------------------- 17. Presence of User Input Fields  ----------------------
result["Presence of User Input Fields"] = document.querySelector('input, textarea, select') ? "1" : "-1";

//---------------------- 18. JavaScript Usage  ----------------------
result["JavaScript Usage"] = document.scripts.length > 5 ? "1" : "-1";

//---------------------- 19. Redundant Subdomains  ----------------------
var subdomains = onlyDomain.split('.').length - 2;
result["Redundant Subdomains"] = subdomains > 2 ? "1" : "-1";

//---------------------- 20. Average Token Length  ----------------------
var tokens = onlyDomain.split('.');
var avgTokenLength = tokens.reduce((sum, token) => sum + token.length, 0) / tokens.length;
result["Average Token Length"] = avgTokenLength < 5 ? "-1" : avgTokenLength <= 10 ? "0" : "1";

//---------------------- 22. Domain Popularity  ----------------------
result["Domain Popularity"] = "0"; // Placeholder for integration with external APIs.

//---------------------- 23. Frequency of HTTP vs. HTTPS  ----------------------
var httpLinks = Array.from(document.links).filter(link => link.href.startsWith('http://')).length;
var httpsLinks = Array.from(document.links).filter(link => link.href.startsWith('https://')).length;
result["Frequency of HTTP vs. HTTPS"] = httpsLinks >= httpLinks ? "-1" : "1";

//---------------------- 24. Security Certificates  ----------------------
result["Security Certificates"] = "0"; // Placeholder for certificate validation logic.

//---------------------- Sending the result  ----------------------

chrome.runtime.sendMessage(result, function(response) {
    console.log(result);
    //console.log(response);
});

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      if (request.action == "alert_user")
        alert("Warning!!! This seems to be a phishing website.");
      return Promise.resolve("Dummy response to keep the console quiet");
    }
);
