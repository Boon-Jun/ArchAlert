console.log("Injected");

var myAudio = new Audio();
myAudio.src = chrome.extension.getURL("alarm.mp3");
myAudio.loop = true;

// Play sound
function playSound(){
  setTimeout(function(){
    myAudio.play().catch(err => console.log("Due to chrome autoplay policy, alert can't play sound"));
  }, 20);
}

//Flash screen with red background
function flashBackground(){
  var div = document.createElement('div');
  document.body.appendChild(div);
  div.className = 'arch_blinker';
  div.addEventListener("click", function(){
    this.remove();
    myAudio.pause();
  });
}

// Select the node that will be observed for mutations
var targetNode = document.getElementsByClassName('ng-toast__list');

if(targetNode.length != 0){
  var observer = new MutationObserver(function(mutationsList) {
    for (var i = 0; i < mutationsList.length; i++) {
      if((document.getElementsByClassName('arch_blinker').length == 0) && (mutationsList[i].addedNodes.length)){
        console.log('sucessfully detected');
        playSound();
        flashBackground();
      }
    }
  });
  // Start observing the target node for configured mutations
  observer.observe(targetNode[0], {childList: true});
}
