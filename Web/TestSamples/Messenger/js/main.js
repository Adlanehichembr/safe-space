var sendButton = document.getElementById("sendButton");
var messageToSent = document.getElementById("messageToSent");
var messageHistory = document.getElementById("messageHistory");
var count = 0;


function receiveMessage()
{
	var incoming_msg = document.createElement("div");
    incoming_msg.setAttribute("class", "incoming_msg");
	messageHistory.appendChild(incoming_msg);
    //image
    var incoming_msg_img  = document.createElement("div");
    incoming_msg_img.setAttribute("class", "incoming_msg_img");
	incoming_msg.appendChild(incoming_msg_img);
	var incoming_msg_img_pic  = document.createElement("img");
    incoming_msg_img_pic.setAttribute("src", "https://ptetutorials.com/images/user-profile.png");
	incoming_msg_img.appendChild(incoming_msg_img_pic);
	//text
	var received_msg = document.createElement("received_msg");
    received_msg.setAttribute("class", "received_msg");
	messageHistory.appendChild(received_msg);
	var received_withd_msg = document.createElement("received_withd_msg");
    received_withd_msg.setAttribute("class", "received_withd_msg");
	received_msg.appendChild(received_withd_msg);
	var p = document.createElement("p");
	count++;
    p.innerHTML = "pala pala pala " + count ;
	received_withd_msg.appendChild(p); 
	var time_date = document.createElement("span");
	time_date.setAttribute("class", "time_date");
    time_date.innerHTML = " 11:01 AM    |    Today";
	received_withd_msg.appendChild(time_date); 
	
    messageHistory.scrollTop = messageHistory.scrollHeight;
	
}

function sendMessage()
{
	var outgoing_msg = document.createElement("div");
    outgoing_msg.setAttribute("class", "outgoing_msg");
	messageHistory.appendChild(outgoing_msg);
    //text
    var sent_msg  = document.createElement("div");
    sent_msg.setAttribute("class", "sent_msg");
	outgoing_msg.appendChild(sent_msg);
	var p  = document.createElement("p");
    p.innerHTML = messageToSent.value;
	sent_msg.appendChild(p);
	var time_date  = document.createElement("span");
    time_date.setAttribute("class", "time_date");
	sent_msg.appendChild(time_date);
	
	messageToSent.value = ''
    messageHistory.scrollTop = messageHistory.scrollHeight;
	
}

