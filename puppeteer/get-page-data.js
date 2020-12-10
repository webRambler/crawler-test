const fs = require('fs');
const puppeteer = require('puppeteer');

(async () => {
    const browser = await (puppeteer.launch({ headless: false }));
    const page = await browser.newPage();
    // 进入页面
    await page.goto('https://music.163.com/#');

    // 点击搜索框拟人输入 忘情水
    const musicName = '忘情水';
    await page.type('.txt.j-flag', musicName, {delay: 0});

    // 回车
    await page.keyboard.press('Enter');

    // 获取歌曲列表的 iframe
    await page.waitForTimeout(2000);
    let iframe = await page.frames().find(f => f.name() === 'contentFrame');
    const SONG_LS_SELECTOR = await iframe.$('.srchsongst');

    // 获取歌曲 忘情水 的地址
    const selectedSongHref = await iframe.evaluate(e => {
        console.log(e.childNodes, 77)
        const songList = Array.from(e.childNodes);
        const idx = songList.findIndex(v => v.childNodes[1].innerText.replace(/\s/g, '') === '忘情水(Live)');
        return songList[idx].childNodes[1].firstChild.firstChild.firstChild.href;
    }, SONG_LS_SELECTOR);
    console.log(selectedSongHref, 996)

    // 进入歌曲页面
    await page.goto(selectedSongHref);

    // 获取歌曲页面嵌套的 iframe
    await page.waitForTimeout(2000);
    iframe = await page.frames().find(f => f.name() === 'contentFrame');

    // 点击 展开按钮
    const unfoldButton = await iframe.$('#flag_ctrl');
    await unfoldButton.click();

    // 获取歌词
    const LYRIC_SELECTOR = await iframe.$('#lyric-content');
    const lyricCtn = await iframe.evaluate(e => {
        return e.innerText;
    }, LYRIC_SELECTOR);

    console.log(lyricCtn, 'lyricCtn');

    // 截图
    await page.screenshot({
        path: '忘情水-刘德华.png',
        fullPage: true,
    });

    // 写入文件
    let writerStream = fs.createWriteStream('puppeteer/忘情水.txt');
    writerStream.write(lyricCtn, 'UTF8');
    writerStream.end()

    // 获取评论数量
    const commentCount = await iframe.$eval('.sub.s-fc3', e => e.innerText);
    console.log(commentCount, 'commentCount');


    // 获取评论
    const commentList = await iframe.$$eval('.itm .cnt.f-brk', elements => {
        const ctn = elements.map(v => {
            return v.innerText.replace(/\s/g, '') + '\r\n';
        });
        return ctn;
    });
    console.log(commentList, 'commentList');
    fs.writeFileSync('puppeteer/评论.txt', commentList)

})();
