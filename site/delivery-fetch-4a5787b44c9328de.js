/* Lossless delivery: existing loaders receive the exact original asset bytes. */
(()=>{
  const nativeFetch=globalThis.fetch.bind(globalThis);
  const base=new URL('/JoyaTimerMax-Demo/',location.href);
  const manifest=Promise.resolve({"/JoyaTimerMax-Demo/botanical/japanese-maple/far.glb":{"bytes":380876,"sha256":"0100f0c331e511c33c2940b2e155ae8b98d01cfadfabe523c9195e6a382981a7","encoding":"gzip","parts":[{"url":"/JoyaTimerMax-Demo/media/packed/0100f0c331e511c33c29-000.gzpart","bytes":234523,"sha256":"ffc391d6a7daeb85ad6534d093fc28467bbb30807fa15a12984e3ffe4d059e9c"}]},"/JoyaTimerMax-Demo/botanical/japanese-maple/mid.glb":{"bytes":2142948,"sha256":"d614dbb072c6df96207b86cf11ffedf52c659c6ffd99f2cc99bec128cae498fa","encoding":"gzip","parts":[{"url":"/JoyaTimerMax-Demo/media/packed/d614dbb072c6df96207b-000.gzpart","bytes":1120943,"sha256":"741c625a69729173962261c2149637c7abe4143e953a5365e2c4db694f4bae9c"}]},"/JoyaTimerMax-Demo/celestial/eso/detected-points.f32le.bin":{"bytes":3200000,"sha256":"f708dc80a8ea2617c3d295c1b5f0fc20c94e3cefec9f04760cb71dbc276e0164","encoding":"gzip","parts":[{"url":"/JoyaTimerMax-Demo/media/packed/f708dc80a8ea2617c3d2-000.gzpart","bytes":2700323,"sha256":"79219c88d2a73d99ed5b59c856afd1dc8c95d330904c1eeed80249349d3039e3"}]},"/JoyaTimerMax-Demo/models/winter-belfry.glb":{"bytes":29123552,"sha256":"d10477ba70c746d4a0a52ca2be9eca47ea356faa6b4b33c9bf58febc91adaf34","encoding":"gzip","parts":[{"url":"/JoyaTimerMax-Demo/media/packed/d10477ba70c746d4a0a5-000.gzpart","bytes":8388608,"sha256":"9de844766e92b6f7bcb1f2ede3c15426378831699f02448c0876e99584ba17ec"},{"url":"/JoyaTimerMax-Demo/media/packed/d10477ba70c746d4a0a5-001.gzpart","bytes":100498,"sha256":"6d775c5cbde6ccef39c8b9f50b5e0ca5600fdf8e07e786154c9c801ad937f8d0"}]},"/JoyaTimerMax-Demo/models/winter-original/candidate9b/architecture.glb":{"bytes":24614356,"sha256":"2a37fe6a62dae4f27dbfcd34474af96b200f0b2f65bc550f7336e8f98186da5d","encoding":"gzip","parts":[{"url":"/JoyaTimerMax-Demo/media/packed/2a37fe6a62dae4f27dbf-000.gzpart","bytes":5415605,"sha256":"4cf2f1c73b14b7df4dc8ec4da58de25cb0bf042da4199fea2de464836ece67cb"}]},"/JoyaTimerMax-Demo/media/compact/title-belfry-01821f073c01.glb":{"bytes":4625888,"sha256":"01821f073c0108a273ef7268d9c909574178c79a859a6a04b09a5feff611b22a","encoding":"gzip","parts":[{"url":"/JoyaTimerMax-Demo/media/packed/01821f073c0108a273ef-000.gzpart","bytes":1545419,"sha256":"c01c6ee1c27b06a4c28998cd5cc035de95b1cb21c35e8e861a949e16eb854419"}]},"/JoyaTimerMax-Demo/media/compact/winter-belfry-bf57a431a929.glb":{"bytes":2105820,"sha256":"bf57a431a9290153b9d2725a26984e052dd9248bdbaed9a90a32b52b69e5664d","encoding":"gzip","parts":[{"url":"/JoyaTimerMax-Demo/media/packed/bf57a431a9290153b9d2-000.gzpart","bytes":885460,"sha256":"a68185b0fa489ee70e2506944f559eaea5a2f6ba580f54cb501991224dbcb0e5"}]},"/JoyaTimerMax-Demo/media/compact/architecture-5b03b4905215.glb":{"bytes":13307708,"sha256":"5b03b4905215e325d2e765e68e35e670747928fbe234fa69fc84d2e1c2fffd5a","encoding":"gzip","parts":[{"url":"/JoyaTimerMax-Demo/media/packed/5b03b4905215e325d2e7-000.gzpart","bytes":4291874,"sha256":"949e825d39be5cf581b7ebd5ae10b8684b3c0a8281206889e897eba3e03a585f"}]},"/JoyaTimerMax-Demo/media/mobile/title-belfry-44234ff88a76.glb":{"bytes":2564304,"sha256":"44234ff88a7695608c1c420535b7e20523e9e3e8946684320cd1ae6515f1f793","encoding":"gzip","parts":[{"url":"/JoyaTimerMax-Demo/media/packed/44234ff88a7695608c1c-000.gzpart","bytes":1612114,"sha256":"3de7bae7e72484e081123acd9154deede84d7b0d517693d4654b0b99aa5e4c74"}]},"/JoyaTimerMax-Demo/media/mobile/winter-belfry-8ba96fcda6b9.glb":{"bytes":1748564,"sha256":"8ba96fcda6b98b0ddf863ecf05aaed1fdc044119c5baac1366ccaf100230c2bd","encoding":"gzip","parts":[{"url":"/JoyaTimerMax-Demo/media/packed/8ba96fcda6b98b0ddf86-000.gzpart","bytes":670364,"sha256":"19b6cf7cb683d34446ed04aa4635564feeaa98efa728bc738a183299e4e76153"}]},"/JoyaTimerMax-Demo/media/mobile/architecture-283d2d5d5502.glb":{"bytes":10492776,"sha256":"283d2d5d550233283cc302fc5773f8727d68331e204635a95fa6da718b8a1a69","encoding":"gzip","parts":[{"url":"/JoyaTimerMax-Demo/media/packed/283d2d5d550233283cc3-000.gzpart","bytes":2109843,"sha256":"2409a52f0a5294881702c7679e379bc25dd781934416074ec63c8e84b7cc8776"}]},"/JoyaTimerMax-Demo/media/mobile/stars-2f8d735cfd563524.bin":{"bytes":3200000,"sha256":"2f8d735cfd563524aa4c6df2cd512f742f71c60bba0e8f94aaca43fb68f14991","encoding":"gzip","parts":[{"url":"/JoyaTimerMax-Demo/media/packed/2f8d735cfd563524aa4c-000.gzpart","bytes":1757501,"sha256":"afd75d2e905a878ac0be13a030fa4bca0bbd6fd4d1c0dad30231a30f212b42c9"}]}});
  globalThis.fetch=async(input,init)=>{
    const url=new URL(input instanceof Request?input.url:input,location.href);
    if(url.origin!==location.origin)return nativeFetch(input,init);
    const request=new Request(input,init);
    if(request.method!=='GET')return nativeFetch(request);
    const entry=(await manifest)[url.pathname];
    if(!entry)return nativeFetch(request);
    const type=url.pathname.endsWith('.glb')?'model/gltf-binary':'application/octet-stream';
    const headers=new Headers({'content-type':type,'content-length':String(entry.bytes)});
    let partIndex=0,reader=null;
    let body=new ReadableStream({
      async pull(controller){
        try{
          while(true){
            if(!reader){
              if(partIndex===entry.parts.length){controller.close();return;}
              const key=entry.parts[partIndex++].url;
              const response=await nativeFetch(globalThis.joyaPackedParts?.[key]??new URL(key,base),{signal:request.signal,credentials:request.credentials});
              if(!response.ok)throw Error(`3D素材の読み込みに失敗しました (${response.status})`);
              reader=response.body.getReader();
            }
            const chunk=await reader.read();
            if(chunk.done){reader.releaseLock();reader=null;continue;}
            controller.enqueue(chunk.value);return;
          }
        }catch(error){controller.error(error);}
      },
      cancel(reason){return reader?.cancel(reason);}
    });
    if(entry.encoding==='gzip')body=body.pipeThrough(new DecompressionStream('gzip'));
    const response=new Response(body,{status:200,headers});
    Object.defineProperty(response,'url',{value:url.href});
    return response;
  };
})();
