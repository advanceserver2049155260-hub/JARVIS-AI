const $=id=>document.getElementById(id);
const chat=$("chat"), promptBox=$("prompt");
function say(text){ addMsg(text,"bot"); $("status").textContent=text.slice(0,100); if("speechSynthesis" in window){speechSynthesis.cancel(); const u=new SpeechSynthesisUtterance(text);u.lang="hi-IN";speechSynthesis.speak(u);} }
function addMsg(text,who){const d=document.createElement("div");d.className="msg "+who;d.textContent=text;chat.appendChild(d);chat.scrollTop=chat.scrollHeight;}
function notes(){try{return JSON.parse(localStorage.getItem("jarvis_notes")||"[]")}catch{return []}}
function saveNote(s){const a=notes();a.push({text:s,at:new Date().toLocaleString("hi-IN")});localStorage.setItem("jarvis_notes",JSON.stringify(a));}
async function batteryInfo(){if(!navigator.getBattery)return "इस ब्राउज़र में बैटरी API उपलब्ध नहीं है।";try{const b=await navigator.getBattery();return `बैटरी ${Math.round(b.level*100)}% है। ${b.charging?"चार्जिंग चालू है।":"चार्जिंग नहीं हो रही।"}`}catch{return "बैटरी जानकारी नहीं मिल सकी।"}}
async function run(raw){const s=raw.trim();if(!s)return;addMsg(s,"user");promptBox.value="";const q=s.toLowerCase();
 if(/समय|टाइम|time/.test(q)){say("अभी समय है "+new Date().toLocaleTimeString("hi-IN",{hour:"2-digit",minute:"2-digit"})+"।");return}
 if(/तारीख|डेट|date/.test(q)){say("आज "+new Date().toLocaleDateString("hi-IN",{weekday:"long",year:"numeric",month:"long",day:"numeric"})+" है।");return}
 if(/नोट.*(याद|लिख|सेव)|याद रखो/.test(q)){const n=s.replace(/.*?(नोट|याद रखो)\s*[:：]?\s*/i,"").trim();if(n){saveNote(n);say("ठीक है, यह नोट इसी फोन में सेव कर दिया: "+n)}else say("नोट के बाद अपनी बात लिखें।");return}
 if(/नोट.*(दिखा|देख)|मेरे नोट/.test(q)){const a=notes();say(a.length?a.map((n,i)=>`${i+1}. ${n.text} (${n.at})`).join("\n"):"अभी कोई नोट सेव नहीं है।");return}
 if(/बैटरी/.test(q)){say(await batteryInfo());return}
 if(/राम|ram|बूस्ट|boost|सफाई|clean/.test(q)){say("मैं फोन की RAM को जबरन खाली या असली RAM को बढ़ा नहीं सकता। सुरक्षित तरीका: भारी ऐप बंद करें, अनावश्यक ऐप अनइंस्टॉल करें और फोन रीस्टार्ट करें। यह ऐप केवल मार्गदर्शन देता है; नकली RAM boost नहीं करता।");return}
 if(/गेम|gaming/.test(q)){say("Gaming तैयारी: बैटरी पर्याप्त रखें, बैकग्राउंड डाउनलोड रोकें, फोन को ठंडा रखें और उपलब्ध हो तो Do Not Disturb चालू करें। मैं सिस्टम की गेमिंग सेटिंग अपने आप नहीं बदल सकता।");return}
 if(/सेटिंग|settings/.test(q)){say("Android सेटिंग खोलने के लिए नीचे बटन इस्तेमाल करें। कुछ ब्राउज़र इसे सीधे नहीं खोलते।");return}
 if(/हैलो|नमस्ते|hello|hi/.test(q)){say("नमस्ते! मैं ऑफलाइन बेसिक कमांड, कैलकुलेशन और आपके सेव किए नोट्स में मदद कर सकता हूँ।");return}
 const m=s.match(/(\d+(?:\.\d+)?)\s*([+\-*\/])\s*(\d+(?:\.\d+)?)/);if(m){const a=Number(m[1]),b=Number(m[3]);const v=m[2]==="+"?a+b:m[2]==="-"?a-b:m[2]==="*"?a*b:b===0?"शून्य से भाग नहीं कर सकते।":a/b;say("जवाब: "+v);return}
 say("यह कमांड मेरे ऑफलाइन बेसिक सेट में नहीं है। मैं समय, तारीख, नोट्स, बैटरी की उपलब्ध जानकारी, सामान्य कैलकुलेशन और फोन-सेफ्टी गाइड कर सकता हूँ।");
}
$("send").onclick=()=>run(promptBox.value);promptBox.addEventListener("keydown",e=>{if(e.key==="Enter")run(promptBox.value)});
$("checkPhone").onclick=async()=>{const b=await batteryInfo();$("phoneInfo").textContent=`${navigator.userAgent.includes("Android")?"Android डिवाइस":"डिवाइस"} · ${navigator.onLine?"इंटरनेट जुड़ा है":"ऑफलाइन"} · ${b}`;say($("phoneInfo").textContent)};
$("battery").onclick=async()=>{const s=await batteryInfo();$("batteryInfo").textContent=s;say(s)};
$("gameMode").onclick=()=>say("Gaming Mode गाइड: Do Not Disturb, कम बैकग्राउंड ऐप, पर्याप्त बैटरी और ठंडा फोन। Android की सिस्टम सेटिंग इस PWA से सीधे नहीं बदली जा सकती।");
$("showNotes").onclick=()=>run("मेरे नोट दिखाओ");$("clearChat").onclick=()=>{chat.innerHTML="";addMsg("बातचीत साफ हो गई।","bot")};
document.querySelectorAll("[data-cmd]").forEach(b=>b.onclick=()=>run(b.dataset.cmd));
$("net").textContent=navigator.onLine?"● Online · Offline-ready":"● Offline";addEventListener("online",()=>$("net").textContent="● Online · Offline-ready");addEventListener("offline",()=>$("net").textContent="● Offline");
const SpeechRecognition=window.SpeechRecognition||window.webkitSpeechRecognition;
$("mic").onclick=()=>{if(!SpeechRecognition){say("इस ब्राउज़र में वॉइस पहचान उपलब्ध नहीं है। टेक्स्ट से कमांड दें।");return}const r=new SpeechRecognition();r.lang="hi-IN";r.interimResults=false;r.maxAlternatives=1;r.onstart=()=>$("status").textContent="सुन रहा हूँ…";r.onresult=e=>run(e.results[0][0].transcript);r.onerror=()=>say("आवाज समझ नहीं आई। दोबारा कोशिश करें या लिखें।");r.start()};
