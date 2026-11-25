const film=document.getElementById('film');
const status=document.getElementById('media-status');
const save=document.getElementById('download-film');
const playlistURL=new URL('media/film/film.m3u8?v=6ff4dc31',document.baseURI);
const englishErrors={
  "このブラウザでは映像の連続再生に対応していません。「MP4を保存」から鑑賞できます。": "This browser cannot stream the film. Choose Download MP4 to watch it.",
  "映像の案内を読み込めませんでした。": "The film playlist could not be loaded.",
  "映像の開始部分を確認できませんでした。": "The opening segment is missing from the playlist.",
  "映像の再生区間を確認できませんでした。": "No playable segments were found.",
  "映像の再生準備に失敗しました。": "The video player could not prepare the film.",
  "映像の区間を読み込めませんでした。再読み込みしてください。": "A video segment could not be loaded. Reload the page to try again.",
  "保存する映像の案内を読み込めませんでした。": "The download information could not be loaded.",
  "映像の保存に失敗しました。もう一度お試しください。": "The film could not be saved. Please try again.",
  "映像の読み込みが中断されました。もう一度お試しください。": "The download was interrupted. Please try again.",
  "映像の読み込みが中断されました。": "The download was interrupted."
};
function message(text){window.JoyaLanguage.bind(status,text,englishErrors[text] ?? text);status.hidden=!text;}
const codec='video/mp4; codecs="avc1.64002a, mp4a.40.2"';
let mediaSource;
async function attachMovie(){
  if(film.canPlayType('application/vnd.apple.mpegurl')){film.src=playlistURL.href;return;}
  if(!window.MediaSource?.isTypeSupported(codec)){
    message('このブラウザでは映像の連続再生に対応していません。「MP4を保存」から鑑賞できます。');return;
  }
  const playlistResponse=await fetch(playlistURL);
  if(!playlistResponse.ok)throw Error('映像の案内を読み込めませんでした。');
  const playlist=await playlistResponse.text();
  const initName=playlist.match(/#EXT-X-MAP:URI="([^"]+)"/)?.[1];
  if(!initName)throw Error('映像の開始部分を確認できませんでした。');
  const segments=[];let start=0;
  for(const match of playlist.matchAll(/#EXTINF:([\d.]+),[^\n]*\n([^#\n]+)/g)){
    const duration=Number(match[1]);segments.push({url:new URL(match[2].trim(),playlistURL),start,end:start+duration});start+=duration;
  }
  if(!segments.length)throw Error('映像の再生区間を確認できませんでした。');
  mediaSource=new MediaSource();film.src=URL.createObjectURL(mediaSource);
  await new Promise(resolve=>mediaSource.addEventListener('sourceopen',resolve,{once:true}));
  mediaSource.duration=start;
  const buffer=mediaSource.addSourceBuffer(codec);
  const append=bytes=>new Promise((resolve,reject)=>{
    const done=()=>{cleanup();resolve();};const fail=()=>{cleanup();reject(Error('映像の再生準備に失敗しました。'));};
    const cleanup=()=>{buffer.removeEventListener('updateend',done);buffer.removeEventListener('error',fail);};
    buffer.addEventListener('updateend',done);buffer.addEventListener('error',fail);
    try{buffer.appendBuffer(bytes);}catch(error){cleanup();reject(error);}
  });
  async function bytes(url){const r=await fetch(url);if(!r.ok)throw Error('映像の区間を読み込めませんでした。再読み込みしてください。');return r.arrayBuffer();}
  await append(await bytes(new URL(initName,playlistURL)));
  const loaded=new Set();
  while(loaded.size<segments.length){
    const current=Math.max(0,segments.findIndex(s=>film.currentTime>=s.start&&film.currentTime<s.end));
    const order=[...segments.keys()].slice(current).concat([...segments.keys()].slice(0,current));
    const next=order.find(i=>!loaded.has(i));
    await append(await bytes(segments[next].url));loaded.add(next);
  }
  if(mediaSource.readyState==='open')mediaSource.endOfStream();
}
attachMovie().catch(error=>message(error.message));
save.addEventListener('click',async()=>{
  save.disabled=true;
  try{
    const response=await fetch('delivery-assets.json?v=6ff4dc31');if(!response.ok)throw Error('保存する映像の案内を読み込めませんでした。');
    const entry=(await response.json())['/joya-timer-max.mp4'];const parts=[];let size=0;
    for(let i=0;i<entry.parts.length;i++){
      const count=(i+1)+"/"+entry.parts.length;
      window.JoyaLanguage.bind(save,"MP4を準備中 "+count,"Preparing MP4 "+count);
      const r=await fetch(entry.parts[i].url);if(!r.ok)throw Error('映像の保存に失敗しました。もう一度お試しください。');
      const b=await r.arrayBuffer();if(b.byteLength!==entry.parts[i].bytes)throw Error('映像の読み込みが中断されました。もう一度お試しください。');
      parts.push(b);size+=b.byteLength;
    }
    if(size!==entry.bytes)throw Error('映像の読み込みが中断されました。');
    const url=URL.createObjectURL(new Blob(parts,{type:'video/mp4'}));
    const link=document.createElement('a');link.href=url;link.download='JoyaTimerMax-20261122-sakura-stacked-Amiga-audio.mp4';link.click();
    setTimeout(()=>URL.revokeObjectURL(url),60000);message('');
  }catch(error){message(error.message);}
  finally{window.JoyaLanguage.bind(save,"MP4を保存","Download MP4");save.disabled=false;}
});
