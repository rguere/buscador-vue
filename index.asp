<!--#include virtual="/index.html"-->
<%
    Dim data, username, pass, httpRequest, json, token

    'Generar token
    authURL = "http://localhost:5001/Auth/authenticate"
    username = "buscador"
    pass = "x6BwPfFMaPV7UeHb"
    data = "{""Username"":""" & username & """, ""Password"":""" & pass & """}"

    Set httpRequest = Server.CreateObject("MSXML2.ServerXMLHTTP")
    httpRequest.open "POST", authURL, false
    httpRequest.setRequestHeader "Content-Type", "application/json; charset=UTF-8" 
    httpRequest.Send data

    json = split(httpRequest.ResponseText, ":")

    token = replace(json(6), "}", "")
%>

<script type="text/javascript">

    var data =  new Object();
    data.username = "<%=Session("Login-Usuario")%>";
    data.email = "<%=Session("Login-EMail")%>";
                        
    var user = new Array();
    user.push(data);

    var json =  new Object();
    json.user = user
    json.token = <%=token%>;

    var dataJson = JSON.stringify(json);
    localStorage.setItem("dataJson", dataJson);
    console.log(localStorage.getItem("dataJson"));

</script> 



