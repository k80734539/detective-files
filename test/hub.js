const { chromium, devices } = require('/usr/local/lib/pnpm/5/.pnpm/playwright-core@1.59.1/node_modules/playwright-core/index.js');
const HUB=process.argv[2],LJ=process.argv[3],WS=process.argv[4],OUT=process.argv[5]||'/workspace/epshots';let bad=0;const ck=(c,m)=>{console.log((c?'✔ ':'✘ ')+m);if(!c)bad++};
(async()=>{const b=await chromium.launch({executablePath:'/usr/bin/google-chrome',args:['--no-sandbox']});const ctx=await b.newContext(devices['iPhone 13']);const pg=await ctx.newPage();const errs=[];pg.on('pageerror',e=>errs.push(e.message));
await pg.goto(HUB);await pg.evaluate(()=>localStorage.clear());await pg.reload();await pg.waitForTimeout(1500);
let h=await pg.evaluate(()=>__hub);ck(h.cl===0&&h.cnt===0,'fresh state '+JSON.stringify(h));ck((await pg.textContent('[data-g="laojie"]'))==='未偵破','fresh: laojie 未偵破');
ck(await pg.getAttribute('#c-laojie','href')==='https://k80734539.github.io/laojie-mystery/'&&await pg.getAttribute('#c-wusuo','href')==='https://k80734539.github.io/wusuo-villa/','case links');
await pg.tap('.lock');await pg.waitForTimeout(400);ck((await pg.textContent('#toast')).includes('夜市'),'knock toast');await pg.waitForTimeout(2800);
await pg.screenshot({path:OUT+'/hub-fresh.png',fullPage:true});
// simulated clear: game-format records (same origin)
await pg.evaluate(()=>{localStorage.setItem('laojie_clear','1');localStorage.setItem('laojie_best',JSON.stringify({sc:92,rk:'S',t:1}));localStorage.setItem('laojie_cloud','1');localStorage.setItem('wusuo_clear','1');localStorage.setItem('wusuo_best',JSON.stringify({sc:68,rk:'B',t:1}));localStorage.setItem('wusuo_cloud','1')});
await pg.reload();await pg.waitForTimeout(1500);h=await pg.evaluate(()=>__hub);ck(h.cl===2&&h.cnt===2,'cleared state '+JSON.stringify(h));
ck((await pg.textContent('[data-r="laojie"]'))==='S'&&(await pg.textContent('[data-r="wusuo"]'))==='B','ranks S/B shown');ck(await pg.isVisible('#k-wusuo.on'),'clue lit');
await pg.screenshot({path:OUT+'/hub-ranks.png',fullPage:true});
for(const u of [LJ,WS]){const p=await ctx.newPage();await p.goto(u);await p.waitForTimeout(800);ck(await p.isVisible('#hubLink'),'hub link on title '+u);ck((await p.getAttribute('#hubLink','href'))==='https://k80734539.github.io/detective-files/','hub link href');await p.close()}
ck(!errs.length,'no page errors '+errs);console.log(bad?'FAIL':'PASS');await b.close();process.exit(bad?1:0)})();
