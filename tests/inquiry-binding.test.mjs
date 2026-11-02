import assert from 'node:assert/strict';
import { readFileSync,readdirSync } from 'node:fs';
import path from 'node:path';
import test from 'node:test';
import { fileURLToPath,URL } from 'node:url';
import ts from 'typescript';
import { inquiryFormPreviews,inquiryListPreviews } from '../src/app/support/inquiries/inquiryPreviews.ts';
const root=fileURLToPath(new URL('../',import.meta.url));
function files(dir){return readdirSync(dir,{withFileTypes:true}).flatMap(e=>e.isDirectory()?files(path.join(dir,e.name)):[path.join(dir,e.name)]);}

test('inquiry states share responsive URLs and use distinct semantic state identifiers',()=>{
 const entries=[...inquiryFormPreviews,...inquiryListPreviews];assert.equal(new Set(entries.map(e=>e.href)).size,entries.length);assert.equal(new Set(entries.map(e=>e.state)).size,entries.length);
 for(const entry of entries){assert.ok(entry.label);assert.ok(entry.figmaNodes.length);assert.ok(!/preview-design|\/(pc|mo)\//i.test(entry.href));}
});

test('publishing screens do not execute network, browser persistence or removed service helpers',()=>{
 const banned=new Set(['useRequestAction','useBindingQuery','usePhoneVerification','submitOrderClaim','getClaimAmount']);
 const violations=[];
 for(const file of ['app','components','context','hooks'].flatMap(dir=>files(path.join(root,'src',dir))).filter(p=>/\.tsx?$/.test(p)&&!p.endsWith('.d.ts'))){
  const source=ts.createSourceFile(file,readFileSync(file,'utf8'),ts.ScriptTarget.Latest,true,file.endsWith('tsx')?ts.ScriptKind.TSX:ts.ScriptKind.TS);
  function visit(node){
   if(ts.isCallExpression(node)){const name=ts.isIdentifier(node.expression)?node.expression.text:ts.isPropertyAccessExpression(node.expression)?node.expression.name.text:'';if(name==='fetch'||banned.has(name))violations.push(path.relative(root,file)+': '+name);}
   if(ts.isPropertyAccessExpression(node)&&['localStorage','sessionStorage'].includes(node.expression.getText(source)))violations.push(path.relative(root,file)+': '+node.getText(source));
   ts.forEachChild(node,visit);
  }visit(source);
 }
 assert.deepEqual(violations,[]);
});
