var sslaConfig = {
    autoLaunchFirstSco: true,
    setDataAjaxMethod: "POST",
    getDataAjaxMethod: "POST",
    setDataUrl: setDataURL,
    getDataUrl: getDataURL,
    setDataHeaders: dataHeaders,
    getDataHeaders: dataHeaders,
    openContentIn: openContentIn,
    popupWindowParams: popupWindowParams,
    courseId: courseId,
    courseDirectory: courseDirectory,
    studentId: studentId,
    studentName: studentName
};


var messageData = null;
var ssla_player_debug = false;

// we don't want alerts displaying in production
if (!(ssla_player_debug)) window.alert = function() {};

window.addEventListener("message", receiveMessage, false);

function receiveMessage(event) {
  console.log("Receive Message:", event);
  var origin = event.origin || event.originalEvent.origin; // For Chrome, the origin property is in the event.originalEvent object.
  /*
  if (origin !== "http://example.org:8080")
    return;
  */
  if (ssla_player_debug) alert('SSLA player received message!');
  messageData = event.data;
  ssla.ssla.start();
}

function dataHeaders() {
   try {
     return {"X-CSRFToken": messageData.csrftoken};
   }
   catch (e) {
     //fail on cross-domain security error...
     return {};
   }
}

function getDataURL() {
  console.log('calling getDataURL');
  try {
    return messageData.get_url;
  }
  catch (e){
    //fail on cross-domain security error...
    //we don't want preview from Studio to send get/set
    return "#";
  }
}

function setDataURL() {
  try {
    return messageData.set_url;
  }
  catch (e){
    //fail on cross-domain security error...
    //we don't want preview from Studio to send get/set
    return "#";
  }
}

function openContentIn() {
  try {
    return messageData.display_type.toLowerCase() == "iframe" ? "inline" : "popup";
  }
  catch (e){
    return "1";
  }
}

function popupWindowParams() {
  try {
    width = messageData.display_width;
    height = messageData.display_height;
    menubar = toolbar = status = scrollbar = "no";
    if (ssla_player_debug) {
      menubar = toolbar = status = scrollbar = "yes";
    }
    attrstr = "width="+width+",height="+height+",menubar="+menubar+",toolbar="+toolbar+",status="+status+",scrollbar="+scrollbar;
    return attrstr;
  }
  catch (e){
    return "";
  }
}

function courseId() {
  try {
    return messageData.course_id;
  }
  catch (e){
    return "";
  }
}

function courseDirectory() {
  try {
    //console.log('courseDirectory is '+messageData.course_location);
    return messageData.course_location;
  }
  catch (e){
    console.log(e)
    return "";
  }
}

function studentId() {
  try {
    return messageData.student_id;
  }
  catch (e){
    return "";
  }
}

function studentName() {
  try {
    return messageData.student_name;
  }
  catch (e){
    return "";
  }
}
