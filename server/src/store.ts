import type {DocumentRecord} from './types.js';
import {existsSync,mkdirSync,readFileSync,renameSync,writeFileSync} from 'node:fs';
import path from 'node:path';

const dir=path.resolve(process.env.UPLOAD_DIR||'./uploads');
const index=path.join(dir,'documents.json');
mkdirSync(dir,{recursive:true});
const records=new Map<string,DocumentRecord>();

if(existsSync(index)){
  const raw=readFileSync(index,'utf8');
  const saved:unknown=JSON.parse(raw);
  if(!Array.isArray(saved))throw new Error('Document index is invalid; refusing to start without risking document history.');
  for(const value of saved){
    if(!value||typeof value!=='object')throw new Error('Document index contains an invalid record.');
    const d=value as DocumentRecord;
    if(typeof d.id!=='string'||typeof d.name!=='string'||typeof d.path!=='string'||!Array.isArray(d.pageTexts))
      throw new Error('Document index contains an incomplete record.');
    records.set(d.id,d);
  }
}

function persist(){
  const temp=`${index}.${process.pid}.tmp`;
  writeFileSync(temp,JSON.stringify([...records.values()]),{mode:0o600});
  renameSync(temp,index);
}

export const documentStore={
  all:()=>Array.from(records.values()).sort((a,b)=>b.uploadedAt.localeCompare(a.uploadedAt)),
  get:(id:string)=>records.get(id),
  add:(d:DocumentRecord)=>{records.set(d.id,d);persist();},
  delete:(id:string)=>{const changed=records.delete(id);if(changed)persist();return changed;}
};