const { expect } = require('chai');
const { captureLog } = require('./test-helpers/console');

const revealWords = require('./01.revealWords');
const modernTimesOfHashTag = require('./02.modernTimesOfHashTag');
const extractFile = require('./03.extractFile');
const stringSubstring = require('./04.stringSubstring');
const replaceRepeatingChars = require('./05.replaceRepeatingChars');
const pascalCaseSplitter = require('./06.pascalCaseSplitter');
const cutAndReverse = require('./07.cutAndReverse');
const hardWords = require('./08.hardWords');
const passwordGenerator = require('./09.passwordGenerator');
const lettersChangeNumbers = require('./10.lettersChangeNumbers');

describe('Text Processing - Exercise', () => {
    it('01. Reveal Words', () => {
        expect(
            captureLog(() =>
                revealWords(
                    'great',
                    'softuni is ***** place for learning new programming languages',
                ),
            ),
        ).to.deep.equal(['softuni is great place for learning new programming languages']);
        expect(
            captureLog(() =>
                revealWords(
                    'great, learning',
                    'softuni is ***** place for ******** new programming languages',
                ),
            ),
        ).to.deep.equal(['softuni is great place for learning new programming languages']);
    });

    it('02. Modern Times of #(HashTag)', () => {
        expect(
            captureLog(() =>
                modernTimesOfHashTag(
                    'Nowadays everyone uses # to tag a #special word in #socialMedia',
                ),
            ),
        ).to.deep.equal(['special', 'socialMedia']);
    });

    it('03. Extract File', () => {
        expect(
            captureLog(() => extractFile('C:\\Internal\\training-internal\\Template.pptx')),
        ).to.deep.equal(['File name: Template', 'File extension: pptx']);
        expect(
            captureLog(() => extractFile('C:\\Projects\\Data-Structures\\LinkedList.cs')),
        ).to.deep.equal(['File name: LinkedList', 'File extension: cs']);
        expect(captureLog(() => extractFile('C:\\template.bak.pptx'))).to.deep.equal([
            'File name: template.bak',
            'File extension: pptx',
        ]);
    });

    it('04. String Substring', () => {
        expect(
            captureLog(() =>
                stringSubstring('javascript', 'JavaScript is the best programming language'),
            ),
        ).to.deep.equal(['javascript']);
        expect(
            captureLog(() =>
                stringSubstring('python', 'JavaScript is the best programming language'),
            ),
        ).to.deep.equal(['python not found!']);
    });

    it('05. Replace Repeating Chars', () => {
        expect(captureLog(() => replaceRepeatingChars('aaaaabbbbbcdddeeeedssaa'))).to.deep.equal([
            'abcdedsa',
        ]);
        expect(captureLog(() => replaceRepeatingChars('qqqwerqwecccwd'))).to.deep.equal([
            'qwerqwecwd',
        ]);
    });

    it('06. Pascal-Case Splitter', () => {
        expect(
            captureLog(() => pascalCaseSplitter('SplitMeIfYouCanHaHaYouCantOrYouCan')),
        ).to.deep.equal(['Split, Me, If, You, Can, Ha, Ha, You, Cant, Or, You, Can']);
        expect(captureLog(() => pascalCaseSplitter('HoldTheDoor'))).to.deep.equal([
            'Hold, The, Door',
        ]);
    });

    it('07. Cut and Reverse', () => {
        expect(captureLog(() => cutAndReverse('tluciffiDsIsihTgnizamAoSsIsihT'))).to.deep.equal([
            'ThisIsDifficult',
            'ThisIsSoAmazing',
        ]);
        expect(captureLog(() => cutAndReverse('sihToDtnaCuoYteBIboJsihTtAdooGoSmI'))).to.deep.equal(
            ['IBetYouCantDoThis', 'ImSoGoodAtThisJob'],
        );
    });

    it('08. Hard Words', () => {
        expect(
            captureLog(() =>
                hardWords([
                    "Hi, grandma! I'm so ____ to write to you. ______ the winter vacation, so _______ things happened. " +
                        'Mom started a new job as a __________. Mom cooks ___ on your recipe. Santa will _____ me a robot.',
                    ['pie', 'bring', 'glad', 'During', 'amazing', 'pharmacist', 'sprained'],
                ]),
            ),
        ).to.deep.equal([
            "Hi, grandma! I'm so glad to write to you. During the winter vacation, so amazing things happened. " +
                'Mom started a new job as a pharmacist. Mom cooks pie on your recipe. Santa will bring me a robot.',
        ]);
    });

    it('09. Password Generator', () => {
        expect(
            captureLog(() => passwordGenerator(['ilovepizza', 'ihatevegetables', 'orange'])),
        ).to.deep.equal(['Your generated password is sElbGtNgAvRtOhEGzzNpAvRlO']);
        expect(
            captureLog(() =>
                passwordGenerator(['easymoneyeazylife', 'atleasttencharacters', 'absolute']),
            ),
        ).to.deep.equal(['Your generated password is srTtcUrLhcnOttsSBltAEfTlyzULyOnSmysBA']);
        expect(
            captureLog(() =>
                passwordGenerator(['areyousureaboutthisone', 'notquitebutitrustyou', 'disturbed']),
            ),
        ).to.deep.equal(['Your generated password is SIytsDrtDtEbBtRUqtTnSnIsDhttDEbBRrUsTSyIrD']);
    });

    it('10. Letters Change Numbers', () => {
        expect(captureLog(() => lettersChangeNumbers('A12b s17G'))).to.deep.equal(['330.00']);
        expect(captureLog(() => lettersChangeNumbers('P34562Z q2576f   H456z'))).to.deep.equal([
            '46015.13',
        ]);
        expect(captureLog(() => lettersChangeNumbers('a1A'))).to.deep.equal(['0.00']);
    });
});
