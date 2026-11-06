// LLM factory: Gemini, NVIDIA and FreeLLMAPI (OpenAI-compatible).
function stripDataUrl(dataUrl){const m=/^data:(.+?);base64,(.*)$/s.exec(dataUrl||'');return m?{mime:m[1],b64:m[2]}:null;}
async function streamOpenAI({apiKey,model,system,turns,imageDataUrl,maxTokens,onToken,baseURL}){
 const OpenAI=require('openai');const client=new OpenAI({apiKey,baseURL,timeout:120000});
 const messages=[{role:'system',content:system}];
 turns.forEach((t,i)=>{const last=i===turns.length-1;if(last&&imageDataUrl&&t.role==='user')messages.push({role:'user',content:[{type:'text',text:t.text},{type:'image_url',image_url:{url:imageDataUrl}}]});else messages.push({role:t.role,content:t.text});});
 const stream=await client.chat.completions.create({model,messages,stream:true,max_tokens:maxTokens});
 let full='';for await(const part of stream){const d=part.choices?.[0]?.delta?.content;if(d){full+=d;onToken(d);}}return full;
}
async function streamGemini({apiKey,model,system,turns,imageDataUrl,maxTokens,onToken}){
 const {GoogleGenAI}=require('@google/genai');const ai=new GoogleGenAI({apiKey});
 const contents=turns.map((t,i)=>{const parts=[{text:t.text}];if(i===turns.length-1&&imageDataUrl&&t.role==='user'){const img=stripDataUrl(imageDataUrl);if(img)parts.push({inlineData:{mimeType:img.mime,data:img.b64}});}return {role:t.role==='assistant'?'model':'user',parts};});
 const stream=await ai.models.generateContentStream({model,contents,config:{systemInstruction:system,maxOutputTokens:maxTokens||4096}});
 let full='';for await(const chunk of stream){const t=chunk?.text;if(t){full+=t;onToken(t);}}return full;
}
async function completeGemini({apiKey,model,system,turns,imageDataUrl,maxTokens,json}){
 const {GoogleGenAI}=require('@google/genai');const ai=new GoogleGenAI({apiKey});
 const contents=turns.map((t,i)=>{const parts=[{text:t.text}];if(i===turns.length-1&&imageDataUrl&&t.role==='user'){const img=stripDataUrl(imageDataUrl);if(img)parts.push({inlineData:{mimeType:img.mime,data:img.b64}});}return {role:t.role==='assistant'?'model':'user',parts};});
 const config={systemInstruction:system,maxOutputTokens:Math.max(Number(maxTokens)||0,1024),temperature:0.2};if(json)config.responseMimeType='application/json';
 const res=await ai.models.generateContent({model,contents,config});return typeof res.text==='string'?res.text:(res.text||'');
}
function createLLM(settings){
 const provider=settings.provider,keys=settings.apiKeys||{},apiKey=keys[provider],tier=settings.smart?'smart':'fast';
 const model=(settings.models[provider]||{})[tier],baseURL=provider==='nvidia'?'https://integrate.api.nvidia.com/v1':provider==='freellmapi'?(settings.baseURL||'http://localhost:3001/v1'):undefined;
 const maxTokens=4096;
 return {provider,model,apiKey,ready:!!apiKey&&!!model,
 async stream(params){const args={apiKey,model,maxTokens,...params};if(provider==='gemini')return streamGemini(args);if(provider==='nvidia'||provider==='freellmapi')return streamOpenAI({...args,baseURL});throw new Error('unknown provider: '+provider);},
 async complete(params){const args={apiKey,model,maxTokens:params.maxTokens||512,...params,onToken:()=>{}};if(provider==='gemini')return completeGemini(args);if(provider==='nvidia'||provider==='freellmapi')return streamOpenAI({...args,baseURL});throw new Error('unknown provider: '+provider);}
 };
}
module.exports={createLLM};
