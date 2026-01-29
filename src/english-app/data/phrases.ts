import { DayLesson, Phrase } from '../types';

// Day 1-10 phrases
const day1Phrases: Phrase[] = [
  { id: 'd1p1', english: "Hello, nice to meet you.", japanese: "こんにちは、はじめまして。", pronunciation: "həˈloʊ naɪs tuː miːt juː", category: 'greeting', day: 1 },
  { id: 'd1p2', english: "My name is...", japanese: "私の名前は...です。", pronunciation: "maɪ neɪm ɪz", category: 'greeting', day: 1 },
  { id: 'd1p3', english: "How are you doing?", japanese: "お元気ですか？", pronunciation: "haʊ ɑːr juː ˈduːɪŋ", category: 'greeting', day: 1 },
  { id: 'd1p4', english: "I'm doing great, thank you.", japanese: "とても元気です、ありがとう。", pronunciation: "aɪm ˈduːɪŋ ɡreɪt θæŋk juː", category: 'greeting', day: 1 },
  { id: 'd1p5', english: "Where are you from?", japanese: "どちらの出身ですか？", pronunciation: "wer ɑːr juː frʌm", category: 'greeting', day: 1 },
  { id: 'd1p6', english: "I'm from Japan.", japanese: "日本から来ました。", pronunciation: "aɪm frʌm dʒəˈpæn", category: 'greeting', day: 1 },
  { id: 'd1p7', english: "It's a pleasure to meet you.", japanese: "お会いできて光栄です。", pronunciation: "ɪts ə ˈpleʒər tuː miːt juː", category: 'greeting', day: 1 },
  { id: 'd1p8', english: "Please call me...", japanese: "...と呼んでください。", pronunciation: "pliːz kɔːl miː", category: 'greeting', day: 1 },
  { id: 'd1p9', english: "What do you do for a living?", japanese: "お仕事は何をされていますか？", pronunciation: "wɒt duː juː duː fɔːr ə ˈlɪvɪŋ", category: 'greeting', day: 1 },
  { id: 'd1p10', english: "I work as an engineer.", japanese: "エンジニアとして働いています。", pronunciation: "aɪ wɜːrk æz ən ˌendʒɪˈnɪr", category: 'greeting', day: 1 },
  { id: 'd1p11', english: "Nice talking to you.", japanese: "お話できて良かったです。", pronunciation: "naɪs ˈtɔːkɪŋ tuː juː", category: 'greeting', day: 1 },
  { id: 'd1p12', english: "See you later!", japanese: "また後で！", pronunciation: "siː juː ˈleɪtər", category: 'greeting', day: 1 },
];

const day2Phrases: Phrase[] = [
  { id: 'd2p1', english: "Good morning!", japanese: "おはようございます！", pronunciation: "ɡʊd ˈmɔːrnɪŋ", category: 'greeting', day: 2 },
  { id: 'd2p2', english: "Good afternoon!", japanese: "こんにちは！", pronunciation: "ɡʊd ˌæftərˈnuːn", category: 'greeting', day: 2 },
  { id: 'd2p3', english: "Good evening!", japanese: "こんばんは！", pronunciation: "ɡʊd ˈiːvnɪŋ", category: 'greeting', day: 2 },
  { id: 'd2p4', english: "How's it going?", japanese: "調子どう？", pronunciation: "haʊz ɪt ˈɡoʊɪŋ", category: 'greeting', day: 2 },
  { id: 'd2p5', english: "Long time no see!", japanese: "久しぶり！", pronunciation: "lɔːŋ taɪm noʊ siː", category: 'greeting', day: 2 },
  { id: 'd2p6', english: "What's new?", japanese: "最近どう？何か変わったことある？", pronunciation: "wɒts njuː", category: 'greeting', day: 2 },
  { id: 'd2p7', english: "Not much, same old.", japanese: "特に変わりないよ、いつも通り。", pronunciation: "nɒt mʌtʃ seɪm oʊld", category: 'greeting', day: 2 },
  { id: 'd2p8', english: "Take care!", japanese: "気をつけて！", pronunciation: "teɪk ker", category: 'greeting', day: 2 },
  { id: 'd2p9', english: "Have a nice day!", japanese: "良い一日を！", pronunciation: "hæv ə naɪs deɪ", category: 'greeting', day: 2 },
  { id: 'd2p10', english: "See you tomorrow!", japanese: "また明日！", pronunciation: "siː juː təˈmɒroʊ", category: 'greeting', day: 2 },
  { id: 'd2p11', english: "Goodbye!", japanese: "さようなら！", pronunciation: "ɡʊdˈbaɪ", category: 'greeting', day: 2 },
  { id: 'd2p12', english: "Have a good weekend!", japanese: "良い週末を！", pronunciation: "hæv ə ɡʊd ˈwiːkend", category: 'greeting', day: 2 },
];

const day3Phrases: Phrase[] = [
  { id: 'd3p1', english: "Let me introduce myself.", japanese: "自己紹介させてください。", pronunciation: "let miː ˌɪntrəˈduːs maɪˈself", category: 'greeting', day: 3 },
  { id: 'd3p2', english: "I'm originally from Tokyo.", japanese: "元々東京出身です。", pronunciation: "aɪm əˈrɪdʒənəli frʌm ˈtoʊkioʊ", category: 'greeting', day: 3 },
  { id: 'd3p3', english: "I've been living here for 3 years.", japanese: "ここに3年住んでいます。", pronunciation: "aɪv biːn ˈlɪvɪŋ hɪr fɔːr θriː jɪrz", category: 'greeting', day: 3 },
  { id: 'd3p4', english: "My hobbies are reading and traveling.", japanese: "趣味は読書と旅行です。", pronunciation: "maɪ ˈhɒbiz ɑːr ˈriːdɪŋ ænd ˈtrævəlɪŋ", category: 'greeting', day: 3 },
  { id: 'd3p5', english: "I'm interested in technology.", japanese: "テクノロジーに興味があります。", pronunciation: "aɪm ˈɪntrəstɪd ɪn tekˈnɒlədʒi", category: 'greeting', day: 3 },
  { id: 'd3p6', english: "I'm studying English.", japanese: "英語を勉強しています。", pronunciation: "aɪm ˈstʌdiɪŋ ˈɪŋɡlɪʃ", category: 'greeting', day: 3 },
  { id: 'd3p7', english: "I enjoy meeting new people.", japanese: "新しい人と出会うのが好きです。", pronunciation: "aɪ ɪnˈdʒɔɪ ˈmiːtɪŋ njuː ˈpiːpl", category: 'greeting', day: 3 },
  { id: 'd3p8', english: "This is my colleague, Mike.", japanese: "こちらは同僚のマイクです。", pronunciation: "ðɪs ɪz maɪ ˈkɒliːɡ maɪk", category: 'greeting', day: 3 },
  { id: 'd3p9', english: "Have you met before?", japanese: "以前お会いしたことありますか？", pronunciation: "hæv juː met bɪˈfɔːr", category: 'greeting', day: 3 },
  { id: 'd3p10', english: "I don't think we've met.", japanese: "初めてお会いすると思います。", pronunciation: "aɪ doʊnt θɪŋk wiːv met", category: 'greeting', day: 3 },
  { id: 'd3p11', english: "I've heard a lot about you.", japanese: "お噂はかねがね伺っております。", pronunciation: "aɪv hɜːrd ə lɒt əˈbaʊt juː", category: 'greeting', day: 3 },
  { id: 'd3p12', english: "It was great meeting you.", japanese: "お会いできて良かったです。", pronunciation: "ɪt wɒz ɡreɪt ˈmiːtɪŋ juː", category: 'greeting', day: 3 },
];

const day4Phrases: Phrase[] = [
  { id: 'd4p1', english: "What time is it?", japanese: "今何時ですか？", pronunciation: "wɒt taɪm ɪz ɪt", category: 'daily', day: 4 },
  { id: 'd4p2', english: "It's half past three.", japanese: "3時半です。", pronunciation: "ɪts hæf pæst θriː", category: 'daily', day: 4 },
  { id: 'd4p3', english: "What's the weather like today?", japanese: "今日の天気はどうですか？", pronunciation: "wɒts ðə ˈweðər laɪk təˈdeɪ", category: 'daily', day: 4 },
  { id: 'd4p4', english: "It's sunny and warm.", japanese: "晴れて暖かいです。", pronunciation: "ɪts ˈsʌni ænd wɔːrm", category: 'daily', day: 4 },
  { id: 'd4p5', english: "What are you doing today?", japanese: "今日は何をする予定ですか？", pronunciation: "wɒt ɑːr juː ˈduːɪŋ təˈdeɪ", category: 'daily', day: 4 },
  { id: 'd4p6', english: "I'm going shopping.", japanese: "買い物に行きます。", pronunciation: "aɪm ˈɡoʊɪŋ ˈʃɒpɪŋ", category: 'daily', day: 4 },
  { id: 'd4p7', english: "Do you have any plans?", japanese: "何か予定はありますか？", pronunciation: "duː juː hæv ˈeni plænz", category: 'daily', day: 4 },
  { id: 'd4p8', english: "I'm free this afternoon.", japanese: "今日の午後は暇です。", pronunciation: "aɪm friː ðɪs ˌæftərˈnuːn", category: 'daily', day: 4 },
  { id: 'd4p9', english: "What did you do yesterday?", japanese: "昨日は何をしましたか？", pronunciation: "wɒt dɪd juː duː ˈjestərdeɪ", category: 'daily', day: 4 },
  { id: 'd4p10', english: "I stayed home and relaxed.", japanese: "家でゆっくりしました。", pronunciation: "aɪ steɪd hoʊm ænd rɪˈlækst", category: 'daily', day: 4 },
  { id: 'd4p11', english: "What are your plans for the weekend?", japanese: "週末の予定は？", pronunciation: "wɒt ɑːr jɔːr plænz fɔːr ðə ˈwiːkend", category: 'daily', day: 4 },
  { id: 'd4p12', english: "I'm not sure yet.", japanese: "まだ決めていません。", pronunciation: "aɪm nɒt ʃʊr jet", category: 'daily', day: 4 },
];

const day5Phrases: Phrase[] = [
  { id: 'd5p1', english: "Could you help me?", japanese: "手伝っていただけますか？", pronunciation: "kʊd juː help miː", category: 'daily', day: 5 },
  { id: 'd5p2', english: "Of course, what do you need?", japanese: "もちろん、何が必要ですか？", pronunciation: "əv kɔːrs wɒt duː juː niːd", category: 'daily', day: 5 },
  { id: 'd5p3', english: "Can I ask you a question?", japanese: "質問してもいいですか？", pronunciation: "kæn aɪ æsk juː ə ˈkwestʃən", category: 'daily', day: 5 },
  { id: 'd5p4', english: "Sure, go ahead.", japanese: "もちろん、どうぞ。", pronunciation: "ʃʊr ɡoʊ əˈhed", category: 'daily', day: 5 },
  { id: 'd5p5', english: "I don't understand.", japanese: "わかりません。", pronunciation: "aɪ doʊnt ˌʌndərˈstænd", category: 'daily', day: 5 },
  { id: 'd5p6', english: "Could you repeat that, please?", japanese: "もう一度言っていただけますか？", pronunciation: "kʊd juː rɪˈpiːt ðæt pliːz", category: 'daily', day: 5 },
  { id: 'd5p7', english: "Could you speak more slowly?", japanese: "もう少しゆっくり話していただけますか？", pronunciation: "kʊd juː spiːk mɔːr ˈsloʊli", category: 'daily', day: 5 },
  { id: 'd5p8', english: "What does this word mean?", japanese: "この単語はどういう意味ですか？", pronunciation: "wɒt dʌz ðɪs wɜːrd miːn", category: 'daily', day: 5 },
  { id: 'd5p9', english: "How do you say this in English?", japanese: "これは英語で何と言いますか？", pronunciation: "haʊ duː juː seɪ ðɪs ɪn ˈɪŋɡlɪʃ", category: 'daily', day: 5 },
  { id: 'd5p10', english: "Let me think about it.", japanese: "少し考えさせてください。", pronunciation: "let miː θɪŋk əˈbaʊt ɪt", category: 'daily', day: 5 },
  { id: 'd5p11', english: "I'll get back to you.", japanese: "後でお返事します。", pronunciation: "aɪl ɡet bæk tuː juː", category: 'daily', day: 5 },
  { id: 'd5p12', english: "Thank you for your help.", japanese: "ご協力ありがとうございます。", pronunciation: "θæŋk juː fɔːr jɔːr help", category: 'daily', day: 5 },
];

const day6Phrases: Phrase[] = [
  { id: 'd6p1', english: "I'm sorry, I'm late.", japanese: "遅れてすみません。", pronunciation: "aɪm ˈsɒri aɪm leɪt", category: 'daily', day: 6 },
  { id: 'd6p2', english: "No problem at all.", japanese: "全然問題ありません。", pronunciation: "noʊ ˈprɒbləm æt ɔːl", category: 'daily', day: 6 },
  { id: 'd6p3', english: "Excuse me.", japanese: "すみません。", pronunciation: "ɪkˈskjuːz miː", category: 'daily', day: 6 },
  { id: 'd6p4', english: "I apologize for the inconvenience.", japanese: "ご不便をおかけして申し訳ありません。", pronunciation: "aɪ əˈpɒlədʒaɪz fɔːr ðə ˌɪnkənˈviːniəns", category: 'daily', day: 6 },
  { id: 'd6p5', english: "That's alright, don't worry.", japanese: "大丈夫です、気にしないで。", pronunciation: "ðæts ɔːlˈraɪt doʊnt ˈwʌri", category: 'daily', day: 6 },
  { id: 'd6p6', english: "I really appreciate it.", japanese: "本当に感謝しています。", pronunciation: "aɪ ˈrɪəli əˈpriːʃieɪt ɪt", category: 'daily', day: 6 },
  { id: 'd6p7', english: "You're welcome.", japanese: "どういたしまして。", pronunciation: "jʊr ˈwelkəm", category: 'daily', day: 6 },
  { id: 'd6p8', english: "It's my pleasure.", japanese: "喜んで。", pronunciation: "ɪts maɪ ˈpleʒər", category: 'daily', day: 6 },
  { id: 'd6p9', english: "I owe you one.", japanese: "借りができたね。", pronunciation: "aɪ oʊ juː wʌn", category: 'daily', day: 6 },
  { id: 'd6p10', english: "Don't mention it.", japanese: "お礼には及びません。", pronunciation: "doʊnt ˈmenʃən ɪt", category: 'daily', day: 6 },
  { id: 'd6p11', english: "That's very kind of you.", japanese: "ご親切にどうも。", pronunciation: "ðæts ˈveri kaɪnd əv juː", category: 'daily', day: 6 },
  { id: 'd6p12', english: "I'm grateful for your support.", japanese: "サポートに感謝します。", pronunciation: "aɪm ˈɡreɪtfəl fɔːr jɔːr səˈpɔːrt", category: 'daily', day: 6 },
];

const day7Phrases: Phrase[] = [
  { id: 'd7p1', english: "I'm looking for a shirt.", japanese: "シャツを探しています。", pronunciation: "aɪm ˈlʊkɪŋ fɔːr ə ʃɜːrt", category: 'shopping', day: 7 },
  { id: 'd7p2', english: "Do you have this in a different size?", japanese: "違うサイズはありますか？", pronunciation: "duː juː hæv ðɪs ɪn ə ˈdɪfrənt saɪz", category: 'shopping', day: 7 },
  { id: 'd7p3', english: "Can I try this on?", japanese: "試着してもいいですか？", pronunciation: "kæn aɪ traɪ ðɪs ɒn", category: 'shopping', day: 7 },
  { id: 'd7p4', english: "Where is the fitting room?", japanese: "試着室はどこですか？", pronunciation: "wer ɪz ðə ˈfɪtɪŋ ruːm", category: 'shopping', day: 7 },
  { id: 'd7p5', english: "How much is this?", japanese: "これはいくらですか？", pronunciation: "haʊ mʌtʃ ɪz ðɪs", category: 'shopping', day: 7 },
  { id: 'd7p6', english: "It's on sale.", japanese: "セール中です。", pronunciation: "ɪts ɒn seɪl", category: 'shopping', day: 7 },
  { id: 'd7p7', english: "Can I get a discount?", japanese: "値引きはできますか？", pronunciation: "kæn aɪ ɡet ə ˈdɪskaʊnt", category: 'shopping', day: 7 },
  { id: 'd7p8', english: "I'll take this one.", japanese: "これをください。", pronunciation: "aɪl teɪk ðɪs wʌn", category: 'shopping', day: 7 },
  { id: 'd7p9', english: "Do you accept credit cards?", japanese: "クレジットカードは使えますか？", pronunciation: "duː juː əkˈsept ˈkredɪt kɑːrdz", category: 'shopping', day: 7 },
  { id: 'd7p10', english: "Can I have a receipt?", japanese: "レシートをもらえますか？", pronunciation: "kæn aɪ hæv ə rɪˈsiːt", category: 'shopping', day: 7 },
  { id: 'd7p11', english: "Is there a warranty?", japanese: "保証はありますか？", pronunciation: "ɪz ðer ə ˈwɒrənti", category: 'shopping', day: 7 },
  { id: 'd7p12', english: "Can I return this if it doesn't fit?", japanese: "合わなかったら返品できますか？", pronunciation: "kæn aɪ rɪˈtɜːrn ðɪs ɪf ɪt ˈdʌznt fɪt", category: 'shopping', day: 7 },
];

const day8Phrases: Phrase[] = [
  { id: 'd8p1', english: "I'm just browsing.", japanese: "見ているだけです。", pronunciation: "aɪm dʒʌst ˈbraʊzɪŋ", category: 'shopping', day: 8 },
  { id: 'd8p2', english: "Do you have this in blue?", japanese: "これの青色はありますか？", pronunciation: "duː juː hæv ðɪs ɪn bluː", category: 'shopping', day: 8 },
  { id: 'd8p3', english: "This is too expensive.", japanese: "これは高すぎます。", pronunciation: "ðɪs ɪz tuː ɪkˈspensɪv", category: 'shopping', day: 8 },
  { id: 'd8p4', english: "Do you have anything cheaper?", japanese: "もっと安いものはありますか？", pronunciation: "duː juː hæv ˈeniθɪŋ ˈtʃiːpər", category: 'shopping', day: 8 },
  { id: 'd8p5', english: "It fits perfectly.", japanese: "ぴったりです。", pronunciation: "ɪt fɪts ˈpɜːrfɪktli", category: 'shopping', day: 8 },
  { id: 'd8p6', english: "This is too small/big.", japanese: "これは小さすぎ/大きすぎます。", pronunciation: "ðɪs ɪz tuː smɔːl/bɪɡ", category: 'shopping', day: 8 },
  { id: 'd8p7', english: "I need a medium size.", japanese: "Mサイズが必要です。", pronunciation: "aɪ niːd ə ˈmiːdiəm saɪz", category: 'shopping', day: 8 },
  { id: 'd8p8', english: "When does the store close?", japanese: "お店は何時に閉まりますか？", pronunciation: "wen dʌz ðə stɔːr kloʊz", category: 'shopping', day: 8 },
  { id: 'd8p9', english: "Is this the final price?", japanese: "これが最終価格ですか？", pronunciation: "ɪz ðɪs ðə ˈfaɪnl praɪs", category: 'shopping', day: 8 },
  { id: 'd8p10', english: "Could you wrap it as a gift?", japanese: "プレゼント用に包んでもらえますか？", pronunciation: "kʊd juː ræp ɪt æz ə ɡɪft", category: 'shopping', day: 8 },
  { id: 'd8p11', english: "I'll think about it.", japanese: "検討します。", pronunciation: "aɪl θɪŋk əˈbaʊt ɪt", category: 'shopping', day: 8 },
  { id: 'd8p12', english: "Keep the change.", japanese: "お釣りはいりません。", pronunciation: "kiːp ðə tʃeɪndʒ", category: 'shopping', day: 8 },
];

const day9Phrases: Phrase[] = [
  { id: 'd9p1', english: "Where can I find the electronics section?", japanese: "電化製品売り場はどこですか？", pronunciation: "wer kæn aɪ faɪnd ðə ɪˌlekˈtrɒnɪks ˈsekʃən", category: 'shopping', day: 9 },
  { id: 'd9p2', english: "I'd like to exchange this.", japanese: "これを交換したいです。", pronunciation: "aɪd laɪk tuː ɪksˈtʃeɪndʒ ðɪs", category: 'shopping', day: 9 },
  { id: 'd9p3', english: "This is defective.", japanese: "これは不良品です。", pronunciation: "ðɪs ɪz dɪˈfektɪv", category: 'shopping', day: 9 },
  { id: 'd9p4', english: "I'd like a refund.", japanese: "返金をお願いします。", pronunciation: "aɪd laɪk ə ˈriːfʌnd", category: 'shopping', day: 9 },
  { id: 'd9p5', english: "Do you ship internationally?", japanese: "海外発送はできますか？", pronunciation: "duː juː ʃɪp ˌɪntərˈnæʃənəli", category: 'shopping', day: 9 },
  { id: 'd9p6', english: "How long is the delivery time?", japanese: "配達にどのくらいかかりますか？", pronunciation: "haʊ lɔːŋ ɪz ðə dɪˈlɪvəri taɪm", category: 'shopping', day: 9 },
  { id: 'd9p7', english: "Is this item in stock?", japanese: "この商品は在庫がありますか？", pronunciation: "ɪz ðɪs ˈaɪtəm ɪn stɒk", category: 'shopping', day: 9 },
  { id: 'd9p8', english: "When will it be available?", japanese: "いつ入荷しますか？", pronunciation: "wen wɪl ɪt biː əˈveɪləbl", category: 'shopping', day: 9 },
  { id: 'd9p9', english: "Can I put this on hold?", japanese: "取り置きできますか？", pronunciation: "kæn aɪ pʊt ðɪs ɒn hoʊld", category: 'shopping', day: 9 },
  { id: 'd9p10', english: "Do you have a loyalty program?", japanese: "ポイントカードはありますか？", pronunciation: "duː juː hæv ə ˈlɔɪəlti ˈproʊɡræm", category: 'shopping', day: 9 },
  { id: 'd9p11', english: "I'm looking for a gift.", japanese: "贈り物を探しています。", pronunciation: "aɪm ˈlʊkɪŋ fɔːr ə ɡɪft", category: 'shopping', day: 9 },
  { id: 'd9p12', english: "Can you recommend something?", japanese: "何かおすすめはありますか？", pronunciation: "kæn juː ˌrekəˈmend ˈsʌmθɪŋ", category: 'shopping', day: 9 },
];

const day10Phrases: Phrase[] = [
  { id: 'd10p1', english: "I'd like to make a reservation.", japanese: "予約をしたいのですが。", pronunciation: "aɪd laɪk tuː meɪk ə ˌrezərˈveɪʃən", category: 'restaurant', day: 10 },
  { id: 'd10p2', english: "A table for two, please.", japanese: "2名でお願いします。", pronunciation: "ə ˈteɪbl fɔːr tuː pliːz", category: 'restaurant', day: 10 },
  { id: 'd10p3', english: "Do you have a table available?", japanese: "空いている席はありますか？", pronunciation: "duː juː hæv ə ˈteɪbl əˈveɪləbl", category: 'restaurant', day: 10 },
  { id: 'd10p4', english: "How long is the wait?", japanese: "待ち時間はどのくらいですか？", pronunciation: "haʊ lɔːŋ ɪz ðə weɪt", category: 'restaurant', day: 10 },
  { id: 'd10p5', english: "Can we sit by the window?", japanese: "窓際の席にできますか？", pronunciation: "kæn wiː sɪt baɪ ðə ˈwɪndoʊ", category: 'restaurant', day: 10 },
  { id: 'd10p6', english: "Could I see the menu, please?", japanese: "メニューを見せてください。", pronunciation: "kʊd aɪ siː ðə ˈmenjuː pliːz", category: 'restaurant', day: 10 },
  { id: 'd10p7', english: "What do you recommend?", japanese: "おすすめは何ですか？", pronunciation: "wɒt duː juː ˌrekəˈmend", category: 'restaurant', day: 10 },
  { id: 'd10p8', english: "What's today's special?", japanese: "今日のおすすめは何ですか？", pronunciation: "wɒts təˈdeɪz ˈspeʃəl", category: 'restaurant', day: 10 },
  { id: 'd10p9', english: "I'll have the steak.", japanese: "ステーキをお願いします。", pronunciation: "aɪl hæv ðə steɪk", category: 'restaurant', day: 10 },
  { id: 'd10p10', english: "How would you like it cooked?", japanese: "焼き加減はいかがなさいますか？", pronunciation: "haʊ wʊd juː laɪk ɪt kʊkt", category: 'restaurant', day: 10 },
  { id: 'd10p11', english: "Medium rare, please.", japanese: "ミディアムレアでお願いします。", pronunciation: "ˈmiːdiəm rer pliːz", category: 'restaurant', day: 10 },
  { id: 'd10p12', english: "Can I have some water?", japanese: "お水をいただけますか？", pronunciation: "kæn aɪ hæv sʌm ˈwɔːtər", category: 'restaurant', day: 10 },
];

// Continue with days 11-20
const day11Phrases: Phrase[] = [
  { id: 'd11p1', english: "I'm allergic to nuts.", japanese: "ナッツアレルギーがあります。", pronunciation: "aɪm əˈlɜːrdʒɪk tuː nʌts", category: 'restaurant', day: 11 },
  { id: 'd11p2', english: "Does this contain gluten?", japanese: "これにはグルテンが入っていますか？", pronunciation: "dʌz ðɪs kənˈteɪn ˈɡluːtn", category: 'restaurant', day: 11 },
  { id: 'd11p3', english: "I'm vegetarian.", japanese: "私はベジタリアンです。", pronunciation: "aɪm ˌvedʒəˈteriən", category: 'restaurant', day: 11 },
  { id: 'd11p4', english: "Could I have this without onions?", japanese: "玉ねぎ抜きでもらえますか？", pronunciation: "kʊd aɪ hæv ðɪs wɪˈðaʊt ˈʌnjənz", category: 'restaurant', day: 11 },
  { id: 'd11p5', english: "This is delicious!", japanese: "とてもおいしいです！", pronunciation: "ðɪs ɪz dɪˈlɪʃəs", category: 'restaurant', day: 11 },
  { id: 'd11p6', english: "Can I have the bill, please?", japanese: "お会計をお願いします。", pronunciation: "kæn aɪ hæv ðə bɪl pliːz", category: 'restaurant', day: 11 },
  { id: 'd11p7', english: "Is the tip included?", japanese: "チップは含まれていますか？", pronunciation: "ɪz ðə tɪp ɪnˈkluːdɪd", category: 'restaurant', day: 11 },
  { id: 'd11p8', english: "We'd like to split the bill.", japanese: "別々に支払いたいです。", pronunciation: "wiːd laɪk tuː splɪt ðə bɪl", category: 'restaurant', day: 11 },
  { id: 'd11p9', english: "Can I have a doggy bag?", japanese: "持ち帰り用の袋をもらえますか？", pronunciation: "kæn aɪ hæv ə ˈdɒɡi bæɡ", category: 'restaurant', day: 11 },
  { id: 'd11p10', english: "The food was excellent.", japanese: "料理は素晴らしかったです。", pronunciation: "ðə fuːd wɒz ˈeksələnt", category: 'restaurant', day: 11 },
  { id: 'd11p11', english: "Thank you for the wonderful meal.", japanese: "素敵な食事をありがとうございました。", pronunciation: "θæŋk juː fɔːr ðə ˈwʌndərfəl miːl", category: 'restaurant', day: 11 },
  { id: 'd11p12', english: "We'll definitely come back.", japanese: "必ずまた来ます。", pronunciation: "wiːl ˈdefɪnətli kʌm bæk", category: 'restaurant', day: 11 },
];

const day12Phrases: Phrase[] = [
  { id: 'd12p1', english: "Could I have a coffee, please?", japanese: "コーヒーをお願いします。", pronunciation: "kʊd aɪ hæv ə ˈkɒfi pliːz", category: 'restaurant', day: 12 },
  { id: 'd12p2', english: "I'd like it to go.", japanese: "持ち帰りでお願いします。", pronunciation: "aɪd laɪk ɪt tuː ɡoʊ", category: 'restaurant', day: 12 },
  { id: 'd12p3', english: "For here, please.", japanese: "店内でお願いします。", pronunciation: "fɔːr hɪr pliːz", category: 'restaurant', day: 12 },
  { id: 'd12p4', english: "What size would you like?", japanese: "サイズはいかがなさいますか？", pronunciation: "wɒt saɪz wʊd juː laɪk", category: 'restaurant', day: 12 },
  { id: 'd12p5', english: "A large one, please.", japanese: "ラージをお願いします。", pronunciation: "ə lɑːrdʒ wʌn pliːz", category: 'restaurant', day: 12 },
  { id: 'd12p6', english: "Would you like anything else?", japanese: "他に何かいかがですか？", pronunciation: "wʊd juː laɪk ˈeniθɪŋ els", category: 'restaurant', day: 12 },
  { id: 'd12p7', english: "That's all, thank you.", japanese: "以上です、ありがとう。", pronunciation: "ðæts ɔːl θæŋk juː", category: 'restaurant', day: 12 },
  { id: 'd12p8', english: "Could I have some sugar?", japanese: "砂糖をいただけますか？", pronunciation: "kʊd aɪ hæv sʌm ˈʃʊɡər", category: 'restaurant', day: 12 },
  { id: 'd12p9', english: "Is there free Wi-Fi here?", japanese: "無料のWi-Fiはありますか？", pronunciation: "ɪz ðer friː ˈwaɪfaɪ hɪr", category: 'restaurant', day: 12 },
  { id: 'd12p10', english: "What's the Wi-Fi password?", japanese: "Wi-Fiのパスワードは何ですか？", pronunciation: "wɒts ðə ˈwaɪfaɪ ˈpæswɜːrd", category: 'restaurant', day: 12 },
  { id: 'd12p11', english: "Where is the restroom?", japanese: "トイレはどこですか？", pronunciation: "wer ɪz ðə ˈrestruːm", category: 'restaurant', day: 12 },
  { id: 'd12p12', english: "May I use this outlet?", japanese: "このコンセントを使ってもいいですか？", pronunciation: "meɪ aɪ juːz ðɪs ˈaʊtlet", category: 'restaurant', day: 12 },
];

const day13Phrases: Phrase[] = [
  { id: 'd13p1', english: "I'd like to book a flight.", japanese: "フライトを予約したいです。", pronunciation: "aɪd laɪk tuː bʊk ə flaɪt", category: 'travel', day: 13 },
  { id: 'd13p2', english: "A round-trip ticket, please.", japanese: "往復チケットをお願いします。", pronunciation: "ə ˈraʊndtrɪp ˈtɪkɪt pliːz", category: 'travel', day: 13 },
  { id: 'd13p3', english: "What time does the flight depart?", japanese: "フライトは何時に出発しますか？", pronunciation: "wɒt taɪm dʌz ðə flaɪt dɪˈpɑːrt", category: 'travel', day: 13 },
  { id: 'd13p4', english: "Where is the check-in counter?", japanese: "チェックインカウンターはどこですか？", pronunciation: "wer ɪz ðə ˈtʃekɪn ˈkaʊntər", category: 'travel', day: 13 },
  { id: 'd13p5', english: "I'd like a window seat.", japanese: "窓側の席をお願いします。", pronunciation: "aɪd laɪk ə ˈwɪndoʊ siːt", category: 'travel', day: 13 },
  { id: 'd13p6', english: "Where is the boarding gate?", japanese: "搭乗ゲートはどこですか？", pronunciation: "wer ɪz ðə ˈbɔːrdɪŋ ɡeɪt", category: 'travel', day: 13 },
  { id: 'd13p7', english: "Is the flight on time?", japanese: "フライトは定刻通りですか？", pronunciation: "ɪz ðə flaɪt ɒn taɪm", category: 'travel', day: 13 },
  { id: 'd13p8', english: "The flight has been delayed.", japanese: "フライトが遅延しています。", pronunciation: "ðə flaɪt hæz biːn dɪˈleɪd", category: 'travel', day: 13 },
  { id: 'd13p9', english: "Where can I pick up my luggage?", japanese: "どこで荷物を受け取れますか？", pronunciation: "wer kæn aɪ pɪk ʌp maɪ ˈlʌɡɪdʒ", category: 'travel', day: 13 },
  { id: 'd13p10', english: "My luggage is missing.", japanese: "荷物が見つかりません。", pronunciation: "maɪ ˈlʌɡɪdʒ ɪz ˈmɪsɪŋ", category: 'travel', day: 13 },
  { id: 'd13p11', english: "Where is immigration?", japanese: "入国審査はどこですか？", pronunciation: "wer ɪz ˌɪmɪˈɡreɪʃən", category: 'travel', day: 13 },
  { id: 'd13p12', english: "Here is my passport.", japanese: "パスポートはこちらです。", pronunciation: "hɪr ɪz maɪ ˈpæspɔːrt", category: 'travel', day: 13 },
];

const day14Phrases: Phrase[] = [
  { id: 'd14p1', english: "I have a reservation.", japanese: "予約しています。", pronunciation: "aɪ hæv ə ˌrezərˈveɪʃən", category: 'travel', day: 14 },
  { id: 'd14p2', english: "I'd like to check in.", japanese: "チェックインをお願いします。", pronunciation: "aɪd laɪk tuː tʃek ɪn", category: 'travel', day: 14 },
  { id: 'd14p3', english: "What time is check-out?", japanese: "チェックアウトは何時ですか？", pronunciation: "wɒt taɪm ɪz ˈtʃekaʊt", category: 'travel', day: 14 },
  { id: 'd14p4', english: "Can I extend my stay?", japanese: "滞在を延長できますか？", pronunciation: "kæn aɪ ɪkˈstend maɪ steɪ", category: 'travel', day: 14 },
  { id: 'd14p5', english: "Is breakfast included?", japanese: "朝食は含まれていますか？", pronunciation: "ɪz ˈbrekfəst ɪnˈkluːdɪd", category: 'travel', day: 14 },
  { id: 'd14p6', english: "Could I have a wake-up call?", japanese: "モーニングコールをお願いします。", pronunciation: "kʊd aɪ hæv ə ˈweɪkʌp kɔːl", category: 'travel', day: 14 },
  { id: 'd14p7', english: "The air conditioning doesn't work.", japanese: "エアコンが動きません。", pronunciation: "ðə er kənˈdɪʃənɪŋ ˈdʌznt wɜːrk", category: 'travel', day: 14 },
  { id: 'd14p8', english: "Could you clean my room?", japanese: "部屋を掃除してもらえますか？", pronunciation: "kʊd juː kliːn maɪ ruːm", category: 'travel', day: 14 },
  { id: 'd14p9', english: "I need extra towels.", japanese: "タオルを追加でください。", pronunciation: "aɪ niːd ˈekstrə ˈtaʊəlz", category: 'travel', day: 14 },
  { id: 'd14p10', english: "Is there a gym in the hotel?", japanese: "ホテルにジムはありますか？", pronunciation: "ɪz ðer ə dʒɪm ɪn ðə hoʊˈtel", category: 'travel', day: 14 },
  { id: 'd14p11', english: "Where is the nearest ATM?", japanese: "最寄りのATMはどこですか？", pronunciation: "wer ɪz ðə ˈnɪrəst ˌeɪtiːˈem", category: 'travel', day: 14 },
  { id: 'd14p12', english: "Could you call a taxi for me?", japanese: "タクシーを呼んでもらえますか？", pronunciation: "kʊd juː kɔːl ə ˈtæksi fɔːr miː", category: 'travel', day: 14 },
];

const day15Phrases: Phrase[] = [
  { id: 'd15p1', english: "How do I get to the station?", japanese: "駅へはどう行けばいいですか？", pronunciation: "haʊ duː aɪ ɡet tuː ðə ˈsteɪʃən", category: 'travel', day: 15 },
  { id: 'd15p2', english: "Is it far from here?", japanese: "ここから遠いですか？", pronunciation: "ɪz ɪt fɑːr frʌm hɪr", category: 'travel', day: 15 },
  { id: 'd15p3', english: "It's about a 10-minute walk.", japanese: "徒歩約10分です。", pronunciation: "ɪts əˈbaʊt ə ten ˈmɪnɪt wɔːk", category: 'travel', day: 15 },
  { id: 'd15p4', english: "Turn left at the corner.", japanese: "角を左に曲がってください。", pronunciation: "tɜːrn left æt ðə ˈkɔːrnər", category: 'travel', day: 15 },
  { id: 'd15p5', english: "Go straight and you'll see it.", japanese: "まっすぐ行くと見えます。", pronunciation: "ɡoʊ streɪt ænd juːl siː ɪt", category: 'travel', day: 15 },
  { id: 'd15p6', english: "Could you show me on the map?", japanese: "地図で教えていただけますか？", pronunciation: "kʊd juː ʃoʊ miː ɒn ðə mæp", category: 'travel', day: 15 },
  { id: 'd15p7', english: "I think I'm lost.", japanese: "道に迷ったと思います。", pronunciation: "aɪ θɪŋk aɪm lɒst", category: 'travel', day: 15 },
  { id: 'd15p8', english: "Which line should I take?", japanese: "どの路線に乗ればいいですか？", pronunciation: "wɪtʃ laɪn ʃʊd aɪ teɪk", category: 'travel', day: 15 },
  { id: 'd15p9', english: "Where do I transfer?", japanese: "どこで乗り換えますか？", pronunciation: "wer duː aɪ trænsˈfɜːr", category: 'travel', day: 15 },
  { id: 'd15p10', english: "How many stops is it?", japanese: "何駅ありますか？", pronunciation: "haʊ ˈmeni stɒps ɪz ɪt", category: 'travel', day: 15 },
  { id: 'd15p11', english: "Is this the right platform?", japanese: "このホームで合っていますか？", pronunciation: "ɪz ðɪs ðə raɪt ˈplætfɔːrm", category: 'travel', day: 15 },
  { id: 'd15p12', english: "Does this train go to downtown?", japanese: "この電車は中心街に行きますか？", pronunciation: "dʌz ðɪs treɪn ɡoʊ tuː ˈdaʊntaʊn", category: 'travel', day: 15 },
];

const day16Phrases: Phrase[] = [
  { id: 'd16p1', english: "Let me introduce our company.", japanese: "弊社を紹介させてください。", pronunciation: "let miː ˌɪntrəˈduːs ˈaʊər ˈkʌmpəni", category: 'business', day: 16 },
  { id: 'd16p2', english: "I'm in charge of marketing.", japanese: "マーケティングを担当しています。", pronunciation: "aɪm ɪn tʃɑːrdʒ əv ˈmɑːrkɪtɪŋ", category: 'business', day: 16 },
  { id: 'd16p3', english: "Could we schedule a meeting?", japanese: "打ち合わせの予定を組めますか？", pronunciation: "kʊd wiː ˈskedʒuːl ə ˈmiːtɪŋ", category: 'business', day: 16 },
  { id: 'd16p4', english: "Let me check my calendar.", japanese: "スケジュールを確認させてください。", pronunciation: "let miː tʃek maɪ ˈkæləndər", category: 'business', day: 16 },
  { id: 'd16p5', english: "How about next Tuesday?", japanese: "来週の火曜日はいかがですか？", pronunciation: "haʊ əˈbaʊt nekst ˈtuːzdeɪ", category: 'business', day: 16 },
  { id: 'd16p6', english: "That works for me.", japanese: "それで大丈夫です。", pronunciation: "ðæt wɜːrks fɔːr miː", category: 'business', day: 16 },
  { id: 'd16p7', english: "I'll send you the agenda.", japanese: "議題をお送りします。", pronunciation: "aɪl send juː ðə əˈdʒendə", category: 'business', day: 16 },
  { id: 'd16p8', english: "Please find the attached document.", japanese: "添付ファイルをご確認ください。", pronunciation: "pliːz faɪnd ðə əˈtætʃt ˈdɒkjʊmənt", category: 'business', day: 16 },
  { id: 'd16p9', english: "I'll follow up on this.", japanese: "これについてフォローアップします。", pronunciation: "aɪl ˈfɒloʊ ʌp ɒn ðɪs", category: 'business', day: 16 },
  { id: 'd16p10', english: "Let's move on to the next item.", japanese: "次の議題に移りましょう。", pronunciation: "lets muːv ɒn tuː ðə nekst ˈaɪtəm", category: 'business', day: 16 },
  { id: 'd16p11', english: "Do you have any questions?", japanese: "何か質問はありますか？", pronunciation: "duː juː hæv ˈeni ˈkwestʃənz", category: 'business', day: 16 },
  { id: 'd16p12', english: "Thank you for your time.", japanese: "お時間をいただきありがとうございます。", pronunciation: "θæŋk juː fɔːr jɔːr taɪm", category: 'business', day: 16 },
];

const day17Phrases: Phrase[] = [
  { id: 'd17p1', english: "I'd like to propose a new idea.", japanese: "新しいアイデアを提案したいです。", pronunciation: "aɪd laɪk tuː prəˈpoʊz ə njuː aɪˈdɪə", category: 'business', day: 17 },
  { id: 'd17p2', english: "What do you think about this?", japanese: "これについてどう思いますか？", pronunciation: "wɒt duː juː θɪŋk əˈbaʊt ðɪs", category: 'business', day: 17 },
  { id: 'd17p3', english: "I agree with your point.", japanese: "おっしゃることに同意します。", pronunciation: "aɪ əˈɡriː wɪð jɔːr pɔɪnt", category: 'business', day: 17 },
  { id: 'd17p4', english: "I see your point, but...", japanese: "おっしゃることはわかりますが...", pronunciation: "aɪ siː jɔːr pɔɪnt bʌt", category: 'business', day: 17 },
  { id: 'd17p5', english: "Let me think about it.", japanese: "検討させてください。", pronunciation: "let miː θɪŋk əˈbaʊt ɪt", category: 'business', day: 17 },
  { id: 'd17p6', english: "Could you elaborate on that?", japanese: "もう少し詳しく説明していただけますか？", pronunciation: "kʊd juː ɪˈlæbəreɪt ɒn ðæt", category: 'business', day: 17 },
  { id: 'd17p7', english: "Let me summarize the key points.", japanese: "要点をまとめさせてください。", pronunciation: "let miː ˈsʌməraɪz ðə kiː pɔɪnts", category: 'business', day: 17 },
  { id: 'd17p8', english: "We need to meet the deadline.", japanese: "締め切りに間に合わせる必要があります。", pronunciation: "wiː niːd tuː miːt ðə ˈdedlaɪn", category: 'business', day: 17 },
  { id: 'd17p9', english: "I'll keep you updated.", japanese: "進捗をお知らせします。", pronunciation: "aɪl kiːp juː ˈʌpdeɪtɪd", category: 'business', day: 17 },
  { id: 'd17p10', english: "Let's wrap up the meeting.", japanese: "会議を終わりにしましょう。", pronunciation: "lets ræp ʌp ðə ˈmiːtɪŋ", category: 'business', day: 17 },
  { id: 'd17p11', english: "I'll send the minutes later.", japanese: "後で議事録を送ります。", pronunciation: "aɪl send ðə ˈmɪnɪts ˈleɪtər", category: 'business', day: 17 },
  { id: 'd17p12', english: "Looking forward to working with you.", japanese: "ご一緒できるのを楽しみにしています。", pronunciation: "ˈlʊkɪŋ ˈfɔːrwərd tuː ˈwɜːrkɪŋ wɪð juː", category: 'business', day: 17 },
];

const day18Phrases: Phrase[] = [
  { id: 'd18p1', english: "I'm calling about the project.", japanese: "プロジェクトの件でお電話しています。", pronunciation: "aɪm ˈkɔːlɪŋ əˈbaʊt ðə ˈprɒdʒekt", category: 'business', day: 18 },
  { id: 'd18p2', english: "May I speak to Mr. Smith?", japanese: "スミスさんはいらっしゃいますか？", pronunciation: "meɪ aɪ spiːk tuː ˈmɪstər smɪθ", category: 'business', day: 18 },
  { id: 'd18p3', english: "He's in a meeting right now.", japanese: "ただいま会議中です。", pronunciation: "hiːz ɪn ə ˈmiːtɪŋ raɪt naʊ", category: 'business', day: 18 },
  { id: 'd18p4', english: "Can I take a message?", japanese: "伝言を承りましょうか？", pronunciation: "kæn aɪ teɪk ə ˈmesɪdʒ", category: 'business', day: 18 },
  { id: 'd18p5', english: "Please have him call me back.", japanese: "折り返しお電話をお願いします。", pronunciation: "pliːz hæv hɪm kɔːl miː bæk", category: 'business', day: 18 },
  { id: 'd18p6', english: "I'll transfer your call.", japanese: "電話をお繋ぎします。", pronunciation: "aɪl trænsˈfɜːr jɔːr kɔːl", category: 'business', day: 18 },
  { id: 'd18p7', english: "Could you hold for a moment?", japanese: "少々お待ちいただけますか？", pronunciation: "kʊd juː hoʊld fɔːr ə ˈmoʊmənt", category: 'business', day: 18 },
  { id: 'd18p8', english: "Sorry, I didn't catch that.", japanese: "すみません、聞き取れませんでした。", pronunciation: "ˈsɒri aɪ ˈdɪdnt kætʃ ðæt", category: 'business', day: 18 },
  { id: 'd18p9', english: "Let me confirm the details.", japanese: "詳細を確認させてください。", pronunciation: "let miː kənˈfɜːrm ðə dɪˈteɪlz", category: 'business', day: 18 },
  { id: 'd18p10', english: "I'll email you the information.", japanese: "情報をメールでお送りします。", pronunciation: "aɪl ˈiːmeɪl juː ðə ˌɪnfərˈmeɪʃən", category: 'business', day: 18 },
  { id: 'd18p11', english: "Thank you for returning my call.", japanese: "折り返しのお電話ありがとうございます。", pronunciation: "θæŋk juː fɔːr rɪˈtɜːrnɪŋ maɪ kɔːl", category: 'business', day: 18 },
  { id: 'd18p12', english: "I'll get back to you by Friday.", japanese: "金曜日までにご連絡します。", pronunciation: "aɪl ɡet bæk tuː juː baɪ ˈfraɪdeɪ", category: 'business', day: 18 },
];

const day19Phrases: Phrase[] = [
  { id: 'd19p1', english: "What do you do in your free time?", japanese: "暇なときは何をしていますか？", pronunciation: "wɒt duː juː duː ɪn jɔːr friː taɪm", category: 'social', day: 19 },
  { id: 'd19p2', english: "I'm into photography.", japanese: "写真にハマっています。", pronunciation: "aɪm ˈɪntuː fəˈtɒɡrəfi", category: 'social', day: 19 },
  { id: 'd19p3', english: "Have you seen any good movies lately?", japanese: "最近何か良い映画を見ましたか？", pronunciation: "hæv juː siːn ˈeni ɡʊd ˈmuːviz ˈleɪtli", category: 'social', day: 19 },
  { id: 'd19p4', english: "I highly recommend it.", japanese: "とてもおすすめです。", pronunciation: "aɪ ˈhaɪli ˌrekəˈmend ɪt", category: 'social', day: 19 },
  { id: 'd19p5', english: "That sounds interesting.", japanese: "面白そうですね。", pronunciation: "ðæt saʊndz ˈɪntrəstɪŋ", category: 'social', day: 19 },
  { id: 'd19p6', english: "I'd love to try that sometime.", japanese: "いつかやってみたいです。", pronunciation: "aɪd lʌv tuː traɪ ðæt ˈsʌmtaɪm", category: 'social', day: 19 },
  { id: 'd19p7', english: "Do you follow any sports?", japanese: "何かスポーツは見ますか？", pronunciation: "duː juː ˈfɒloʊ ˈeni spɔːrts", category: 'social', day: 19 },
  { id: 'd19p8', english: "I'm a big fan of soccer.", japanese: "サッカーの大ファンです。", pronunciation: "aɪm ə bɪɡ fæn əv ˈsɒkər", category: 'social', day: 19 },
  { id: 'd19p9', english: "Have you been to Japan?", japanese: "日本に行ったことはありますか？", pronunciation: "hæv juː biːn tuː dʒəˈpæn", category: 'social', day: 19 },
  { id: 'd19p10', english: "It's on my bucket list.", japanese: "やりたいことリストに入っています。", pronunciation: "ɪts ɒn maɪ ˈbʌkɪt lɪst", category: 'social', day: 19 },
  { id: 'd19p11', english: "What kind of music do you like?", japanese: "どんな音楽が好きですか？", pronunciation: "wɒt kaɪnd əv ˈmjuːzɪk duː juː laɪk", category: 'social', day: 19 },
  { id: 'd19p12', english: "I listen to all kinds of music.", japanese: "いろんな音楽を聴きます。", pronunciation: "aɪ ˈlɪsn tuː ɔːl kaɪndz əv ˈmjuːzɪk", category: 'social', day: 19 },
];

const day20Phrases: Phrase[] = [
  { id: 'd20p1', english: "How was your weekend?", japanese: "週末はどうでしたか？", pronunciation: "haʊ wɒz jɔːr ˈwiːkend", category: 'social', day: 20 },
  { id: 'd20p2', english: "It was great, thanks for asking.", japanese: "良かったです、聞いてくれてありがとう。", pronunciation: "ɪt wɒz ɡreɪt θæŋks fɔːr ˈæskɪŋ", category: 'social', day: 20 },
  { id: 'd20p3', english: "I went hiking with friends.", japanese: "友達とハイキングに行きました。", pronunciation: "aɪ went ˈhaɪkɪŋ wɪð frendz", category: 'social', day: 20 },
  { id: 'd20p4', english: "That sounds like fun!", japanese: "楽しそうですね！", pronunciation: "ðæt saʊndz laɪk fʌn", category: 'social', day: 20 },
  { id: 'd20p5', english: "Would you like to join us?", japanese: "一緒にいかがですか？", pronunciation: "wʊd juː laɪk tuː dʒɔɪn ʌs", category: 'social', day: 20 },
  { id: 'd20p6', english: "I'd love to!", japanese: "ぜひ！", pronunciation: "aɪd lʌv tuː", category: 'social', day: 20 },
  { id: 'd20p7', english: "Maybe next time.", japanese: "また今度ね。", pronunciation: "ˈmeɪbi nekst taɪm", category: 'social', day: 20 },
  { id: 'd20p8', english: "Let me know if you're free.", japanese: "空いてたら教えて。", pronunciation: "let miː noʊ ɪf jʊr friː", category: 'social', day: 20 },
  { id: 'd20p9', english: "We should hang out sometime.", japanese: "いつか遊びましょう。", pronunciation: "wiː ʃʊd hæŋ aʊt ˈsʌmtaɪm", category: 'social', day: 20 },
  { id: 'd20p10', english: "Let's keep in touch.", japanese: "連絡を取り合いましょう。", pronunciation: "lets kiːp ɪn tʌtʃ", category: 'social', day: 20 },
  { id: 'd20p11', english: "It was nice chatting with you.", japanese: "お話できて良かったです。", pronunciation: "ɪt wɒz naɪs ˈtʃætɪŋ wɪð juː", category: 'social', day: 20 },
  { id: 'd20p12', english: "Enjoy the rest of your day!", japanese: "良い一日を！", pronunciation: "ɪnˈdʒɔɪ ðə rest əv jɔːr deɪ", category: 'social', day: 20 },
];

// Days 21-30
const day21Phrases: Phrase[] = [
  { id: 'd21p1', english: "What do you think about the news?", japanese: "そのニュースについてどう思いますか？", pronunciation: "wɒt duː juː θɪŋk əˈbaʊt ðə njuːz", category: 'social', day: 21 },
  { id: 'd21p2', english: "I haven't heard about it.", japanese: "それについて聞いていません。", pronunciation: "aɪ ˈhævnt hɜːrd əˈbaʊt ɪt", category: 'social', day: 21 },
  { id: 'd21p3', english: "Did you hear about...?", japanese: "...について聞きましたか？", pronunciation: "dɪd juː hɪr əˈbaʊt", category: 'social', day: 21 },
  { id: 'd21p4', english: "It's quite surprising.", japanese: "かなり驚きですね。", pronunciation: "ɪts kwaɪt sərˈpraɪzɪŋ", category: 'social', day: 21 },
  { id: 'd21p5', english: "I'm not sure what to think.", japanese: "どう思えばいいかわかりません。", pronunciation: "aɪm nɒt ʃʊr wɒt tuː θɪŋk", category: 'social', day: 21 },
  { id: 'd21p6', english: "Things are changing so fast.", japanese: "状況がとても速く変化していますね。", pronunciation: "θɪŋz ɑːr ˈtʃeɪndʒɪŋ soʊ fæst", category: 'social', day: 21 },
  { id: 'd21p7', english: "Have you read any good books?", japanese: "何か良い本を読みましたか？", pronunciation: "hæv juː red ˈeni ɡʊd bʊks", category: 'social', day: 21 },
  { id: 'd21p8', english: "I'm currently reading...", japanese: "今読んでいるのは...", pronunciation: "aɪm ˈkʌrəntli ˈriːdɪŋ", category: 'social', day: 21 },
  { id: 'd21p9', english: "I'll add it to my reading list.", japanese: "読書リストに追加します。", pronunciation: "aɪl æd ɪt tuː maɪ ˈriːdɪŋ lɪst", category: 'social', day: 21 },
  { id: 'd21p10', english: "Do you prefer e-books or paper?", japanese: "電子書籍と紙の本、どちらが好きですか？", pronunciation: "duː juː prɪˈfɜːr ˈiːbʊks ɔːr ˈpeɪpər", category: 'social', day: 21 },
  { id: 'd21p11', english: "I like the feel of real books.", japanese: "実物の本の感触が好きです。", pronunciation: "aɪ laɪk ðə fiːl əv rɪəl bʊks", category: 'social', day: 21 },
  { id: 'd21p12', english: "E-books are more convenient.", japanese: "電子書籍のほうが便利です。", pronunciation: "ˈiːbʊks ɑːr mɔːr kənˈviːniənt", category: 'social', day: 21 },
];

const day22Phrases: Phrase[] = [
  { id: 'd22p1', english: "I need to see a doctor.", japanese: "医者に診てもらう必要があります。", pronunciation: "aɪ niːd tuː siː ə ˈdɒktər", category: 'emergency', day: 22 },
  { id: 'd22p2', english: "Where is the nearest hospital?", japanese: "最寄りの病院はどこですか？", pronunciation: "wer ɪz ðə ˈnɪrəst ˈhɒspɪtl", category: 'emergency', day: 22 },
  { id: 'd22p3', english: "I'm not feeling well.", japanese: "体調が悪いです。", pronunciation: "aɪm nɒt ˈfiːlɪŋ wel", category: 'emergency', day: 22 },
  { id: 'd22p4', english: "I have a headache.", japanese: "頭痛がします。", pronunciation: "aɪ hæv ə ˈhedeɪk", category: 'emergency', day: 22 },
  { id: 'd22p5', english: "I have a fever.", japanese: "熱があります。", pronunciation: "aɪ hæv ə ˈfiːvər", category: 'emergency', day: 22 },
  { id: 'd22p6', english: "I think I caught a cold.", japanese: "風邪をひいたと思います。", pronunciation: "aɪ θɪŋk aɪ kɔːt ə koʊld", category: 'emergency', day: 22 },
  { id: 'd22p7', english: "Do you have any medicine?", japanese: "何か薬はありますか？", pronunciation: "duː juː hæv ˈeni ˈmedɪsn", category: 'emergency', day: 22 },
  { id: 'd22p8', english: "I'm allergic to penicillin.", japanese: "ペニシリンにアレルギーがあります。", pronunciation: "aɪm əˈlɜːrdʒɪk tuː ˌpenɪˈsɪlɪn", category: 'emergency', day: 22 },
  { id: 'd22p9', english: "Please call an ambulance.", japanese: "救急車を呼んでください。", pronunciation: "pliːz kɔːl ən ˈæmbjələns", category: 'emergency', day: 22 },
  { id: 'd22p10', english: "It's an emergency.", japanese: "緊急事態です。", pronunciation: "ɪts ən ɪˈmɜːrdʒənsi", category: 'emergency', day: 22 },
  { id: 'd22p11', english: "I lost my passport.", japanese: "パスポートを失くしました。", pronunciation: "aɪ lɒst maɪ ˈpæspɔːrt", category: 'emergency', day: 22 },
  { id: 'd22p12', english: "Please help me.", japanese: "助けてください。", pronunciation: "pliːz help miː", category: 'emergency', day: 22 },
];

const day23Phrases: Phrase[] = [
  { id: 'd23p1', english: "I've been robbed.", japanese: "強盗に遭いました。", pronunciation: "aɪv biːn rɒbd", category: 'emergency', day: 23 },
  { id: 'd23p2', english: "Someone stole my wallet.", japanese: "誰かが財布を盗みました。", pronunciation: "ˈsʌmwʌn stoʊl maɪ ˈwɒlɪt", category: 'emergency', day: 23 },
  { id: 'd23p3', english: "Where is the police station?", japanese: "警察署はどこですか？", pronunciation: "wer ɪz ðə pəˈliːs ˈsteɪʃən", category: 'emergency', day: 23 },
  { id: 'd23p4', english: "I need to file a report.", japanese: "届け出を出す必要があります。", pronunciation: "aɪ niːd tuː faɪl ə rɪˈpɔːrt", category: 'emergency', day: 23 },
  { id: 'd23p5', english: "I need to contact my embassy.", japanese: "大使館に連絡する必要があります。", pronunciation: "aɪ niːd tuː ˈkɒntækt maɪ ˈembəsi", category: 'emergency', day: 23 },
  { id: 'd23p6', english: "My car broke down.", japanese: "車が故障しました。", pronunciation: "maɪ kɑːr broʊk daʊn", category: 'emergency', day: 23 },
  { id: 'd23p7', english: "I had an accident.", japanese: "事故に遭いました。", pronunciation: "aɪ hæd ən ˈæksɪdənt", category: 'emergency', day: 23 },
  { id: 'd23p8', english: "Is everyone okay?", japanese: "みんな大丈夫ですか？", pronunciation: "ɪz ˈevriwʌn oʊˈkeɪ", category: 'emergency', day: 23 },
  { id: 'd23p9', english: "I need to cancel my credit card.", japanese: "クレジットカードを止める必要があります。", pronunciation: "aɪ niːd tuː ˈkænsəl maɪ ˈkredɪt kɑːrd", category: 'emergency', day: 23 },
  { id: 'd23p10', english: "Can you help me find...?", japanese: "...を見つけるのを手伝ってもらえますか？", pronunciation: "kæn juː help miː faɪnd", category: 'emergency', day: 23 },
  { id: 'd23p11', english: "I'm looking for my friend.", japanese: "友人を探しています。", pronunciation: "aɪm ˈlʊkɪŋ fɔːr maɪ frend", category: 'emergency', day: 23 },
  { id: 'd23p12', english: "Stay calm, everything will be okay.", japanese: "落ち着いて、大丈夫ですよ。", pronunciation: "steɪ kɑːm ˈevrɪθɪŋ wɪl biː oʊˈkeɪ", category: 'emergency', day: 23 },
];

const day24Phrases: Phrase[] = [
  { id: 'd24p1', english: "There's a fire!", japanese: "火事だ！", pronunciation: "ðerz ə ˈfaɪər", category: 'emergency', day: 24 },
  { id: 'd24p2', english: "Where is the emergency exit?", japanese: "非常口はどこですか？", pronunciation: "wer ɪz ðə ɪˈmɜːrdʒənsi ˈeksɪt", category: 'emergency', day: 24 },
  { id: 'd24p3', english: "Please evacuate immediately.", japanese: "すぐに避難してください。", pronunciation: "pliːz ɪˈvækjueɪt ɪˈmiːdiətli", category: 'emergency', day: 24 },
  { id: 'd24p4', english: "Don't use the elevator.", japanese: "エレベーターを使わないでください。", pronunciation: "doʊnt juːz ðə ˈelɪveɪtər", category: 'emergency', day: 24 },
  { id: 'd24p5', english: "I smell gas.", japanese: "ガスの臭いがします。", pronunciation: "aɪ smel ɡæs", category: 'emergency', day: 24 },
  { id: 'd24p6', english: "Call the fire department.", japanese: "消防署に電話してください。", pronunciation: "kɔːl ðə ˈfaɪər dɪˈpɑːrtmənt", category: 'emergency', day: 24 },
  { id: 'd24p7', english: "Is there a first aid kit?", japanese: "救急箱はありますか？", pronunciation: "ɪz ðer ə fɜːrst eɪd kɪt", category: 'emergency', day: 24 },
  { id: 'd24p8', english: "Do you know CPR?", japanese: "CPRを知っていますか？", pronunciation: "duː juː noʊ ˌsiːpiːˈɑːr", category: 'emergency', day: 24 },
  { id: 'd24p9', english: "Are you hurt?", japanese: "怪我をしていますか？", pronunciation: "ɑːr juː hɜːrt", category: 'emergency', day: 24 },
  { id: 'd24p10', english: "Where does it hurt?", japanese: "どこが痛いですか？", pronunciation: "wer dʌz ɪt hɜːrt", category: 'emergency', day: 24 },
  { id: 'd24p11', english: "Try to stay still.", japanese: "動かないようにしてください。", pronunciation: "traɪ tuː steɪ stɪl", category: 'emergency', day: 24 },
  { id: 'd24p12', english: "Help is on the way.", japanese: "助けが向かっています。", pronunciation: "help ɪz ɒn ðə weɪ", category: 'emergency', day: 24 },
];

const day25Phrases: Phrase[] = [
  { id: 'd25p1', english: "In my opinion...", japanese: "私の意見では...", pronunciation: "ɪn maɪ əˈpɪnjən", category: 'opinion', day: 25 },
  { id: 'd25p2', english: "I believe that...", japanese: "私は...と信じています。", pronunciation: "aɪ bɪˈliːv ðæt", category: 'opinion', day: 25 },
  { id: 'd25p3', english: "From my perspective...", japanese: "私の視点から見ると...", pronunciation: "frʌm maɪ pərˈspektɪv", category: 'opinion', day: 25 },
  { id: 'd25p4', english: "I think you have a point.", japanese: "あなたの言うことは一理あると思います。", pronunciation: "aɪ θɪŋk juː hæv ə pɔɪnt", category: 'opinion', day: 25 },
  { id: 'd25p5', english: "That's a valid argument.", japanese: "それは正当な主張ですね。", pronunciation: "ðæts ə ˈvælɪd ˈɑːrɡjʊmənt", category: 'opinion', day: 25 },
  { id: 'd25p6', english: "I respectfully disagree.", japanese: "申し訳ありませんが、同意できません。", pronunciation: "aɪ rɪˈspektfəli ˌdɪsəˈɡriː", category: 'opinion', day: 25 },
  { id: 'd25p7', english: "Let me play devil's advocate.", japanese: "あえて反対意見を述べさせてください。", pronunciation: "let miː pleɪ ˈdevlz ˈædvəkət", category: 'opinion', day: 25 },
  { id: 'd25p8', english: "Have you considered...?", japanese: "...を考慮しましたか？", pronunciation: "hæv juː kənˈsɪdərd", category: 'opinion', day: 25 },
  { id: 'd25p9', english: "That's an interesting viewpoint.", japanese: "興味深い視点ですね。", pronunciation: "ðæts ən ˈɪntrəstɪŋ ˈvjuːpɔɪnt", category: 'opinion', day: 25 },
  { id: 'd25p10', english: "I see what you mean.", japanese: "おっしゃることはわかります。", pronunciation: "aɪ siː wɒt juː miːn", category: 'opinion', day: 25 },
  { id: 'd25p11', english: "Could you explain further?", japanese: "もう少し説明していただけますか？", pronunciation: "kʊd juː ɪkˈspleɪn ˈfɜːrðər", category: 'opinion', day: 25 },
  { id: 'd25p12', english: "Let's agree to disagree.", japanese: "意見の相違は認め合いましょう。", pronunciation: "lets əˈɡriː tuː ˌdɪsəˈɡriː", category: 'opinion', day: 25 },
];

const day26Phrases: Phrase[] = [
  { id: 'd26p1', english: "What are the pros and cons?", japanese: "メリットとデメリットは何ですか？", pronunciation: "wɒt ɑːr ðə proʊz ænd kɒnz", category: 'opinion', day: 26 },
  { id: 'd26p2', english: "On one hand... on the other hand...", japanese: "一方では...他方では...", pronunciation: "ɒn wʌn hænd ɒn ðə ˈʌðər hænd", category: 'opinion', day: 26 },
  { id: 'd26p3', english: "Generally speaking...", japanese: "一般的に言えば...", pronunciation: "ˈdʒenərəli ˈspiːkɪŋ", category: 'opinion', day: 26 },
  { id: 'd26p4', english: "To be honest...", japanese: "正直に言うと...", pronunciation: "tuː biː ˈɒnɪst", category: 'opinion', day: 26 },
  { id: 'd26p5', english: "Frankly speaking...", japanese: "率直に言うと...", pronunciation: "ˈfræŋkli ˈspiːkɪŋ", category: 'opinion', day: 26 },
  { id: 'd26p6', english: "As far as I know...", japanese: "私の知る限り...", pronunciation: "æz fɑːr æz aɪ noʊ", category: 'opinion', day: 26 },
  { id: 'd26p7', english: "It depends on the situation.", japanese: "状況によります。", pronunciation: "ɪt dɪˈpendz ɒn ðə ˌsɪtʃuˈeɪʃən", category: 'opinion', day: 26 },
  { id: 'd26p8', english: "That makes sense.", japanese: "なるほど、納得です。", pronunciation: "ðæt meɪks sens", category: 'opinion', day: 26 },
  { id: 'd26p9', english: "I hadn't thought of it that way.", japanese: "そういう風には考えていませんでした。", pronunciation: "aɪ ˈhædnt θɔːt əv ɪt ðæt weɪ", category: 'opinion', day: 26 },
  { id: 'd26p10', english: "You've changed my mind.", japanese: "あなたのおかげで考えが変わりました。", pronunciation: "juːv tʃeɪndʒd maɪ maɪnd", category: 'opinion', day: 26 },
  { id: 'd26p11', english: "I need more time to think.", japanese: "もう少し考える時間が必要です。", pronunciation: "aɪ niːd mɔːr taɪm tuː θɪŋk", category: 'opinion', day: 26 },
  { id: 'd26p12', english: "Let me sleep on it.", japanese: "一晩考えさせてください。", pronunciation: "let miː sliːp ɒn ɪt", category: 'opinion', day: 26 },
];

const day27Phrases: Phrase[] = [
  { id: 'd27p1', english: "The main point is...", japanese: "要点は...", pronunciation: "ðə meɪn pɔɪnt ɪz", category: 'opinion', day: 27 },
  { id: 'd27p2', english: "In conclusion...", japanese: "結論として...", pronunciation: "ɪn kənˈkluːʒən", category: 'opinion', day: 27 },
  { id: 'd27p3', english: "To summarize...", japanese: "まとめると...", pronunciation: "tuː ˈsʌməraɪz", category: 'opinion', day: 27 },
  { id: 'd27p4', english: "Let me give you an example.", japanese: "例を挙げさせてください。", pronunciation: "let miː ɡɪv juː ən ɪɡˈzæmpl", category: 'opinion', day: 27 },
  { id: 'd27p5', english: "For instance...", japanese: "例えば...", pronunciation: "fɔːr ˈɪnstəns", category: 'opinion', day: 27 },
  { id: 'd27p6', english: "What I'm trying to say is...", japanese: "私が言いたいのは...", pronunciation: "wɒt aɪm ˈtraɪɪŋ tuː seɪ ɪz", category: 'opinion', day: 27 },
  { id: 'd27p7', english: "In other words...", japanese: "言い換えれば...", pronunciation: "ɪn ˈʌðər wɜːrdz", category: 'opinion', day: 27 },
  { id: 'd27p8', english: "The bottom line is...", japanese: "結局のところ...", pronunciation: "ðə ˈbɒtəm laɪn ɪz", category: 'opinion', day: 27 },
  { id: 'd27p9', english: "Here's the thing...", japanese: "つまりこういうことです...", pronunciation: "hɪrz ðə θɪŋ", category: 'opinion', day: 27 },
  { id: 'd27p10', english: "My point exactly.", japanese: "まさにその通りです。", pronunciation: "maɪ pɔɪnt ɪɡˈzæktli", category: 'opinion', day: 27 },
  { id: 'd27p11', english: "That's a good question.", japanese: "良い質問ですね。", pronunciation: "ðæts ə ɡʊd ˈkwestʃən", category: 'opinion', day: 27 },
  { id: 'd27p12', english: "Let me think about that.", japanese: "それについて考えさせてください。", pronunciation: "let miː θɪŋk əˈbaʊt ðæt", category: 'opinion', day: 27 },
];

const day28Phrases: Phrase[] = [
  { id: 'd28p1', english: "I'm so happy!", japanese: "とても嬉しい！", pronunciation: "aɪm soʊ ˈhæpi", category: 'emotion', day: 28 },
  { id: 'd28p2', english: "I'm excited about this.", japanese: "これにワクワクしています。", pronunciation: "aɪm ɪkˈsaɪtɪd əˈbaʊt ðɪs", category: 'emotion', day: 28 },
  { id: 'd28p3', english: "I'm feeling nervous.", japanese: "緊張しています。", pronunciation: "aɪm ˈfiːlɪŋ ˈnɜːrvəs", category: 'emotion', day: 28 },
  { id: 'd28p4', english: "I'm a bit worried.", japanese: "少し心配です。", pronunciation: "aɪm ə bɪt ˈwʌrid", category: 'emotion', day: 28 },
  { id: 'd28p5', english: "That's disappointing.", japanese: "残念です。", pronunciation: "ðæts ˌdɪsəˈpɔɪntɪŋ", category: 'emotion', day: 28 },
  { id: 'd28p6', english: "I'm frustrated.", japanese: "イライラしています。", pronunciation: "aɪm frʌˈstreɪtɪd", category: 'emotion', day: 28 },
  { id: 'd28p7', english: "I feel relieved.", japanese: "安心しました。", pronunciation: "aɪ fiːl rɪˈliːvd", category: 'emotion', day: 28 },
  { id: 'd28p8', english: "That's amazing!", japanese: "すごい！", pronunciation: "ðæts əˈmeɪzɪŋ", category: 'emotion', day: 28 },
  { id: 'd28p9', english: "I'm so proud of you!", japanese: "あなたを誇りに思います！", pronunciation: "aɪm soʊ praʊd əv juː", category: 'emotion', day: 28 },
  { id: 'd28p10', english: "Congratulations!", japanese: "おめでとうございます！", pronunciation: "kənˌɡrætʃuˈleɪʃənz", category: 'emotion', day: 28 },
  { id: 'd28p11', english: "I'm sorry to hear that.", japanese: "それは残念です。", pronunciation: "aɪm ˈsɒri tuː hɪr ðæt", category: 'emotion', day: 28 },
  { id: 'd28p12', english: "I hope everything works out.", japanese: "うまくいくといいですね。", pronunciation: "aɪ hoʊp ˈevrɪθɪŋ wɜːrks aʊt", category: 'emotion', day: 28 },
];

const day29Phrases: Phrase[] = [
  { id: 'd29p1', english: "I can't wait!", japanese: "待ちきれない！", pronunciation: "aɪ kænt weɪt", category: 'emotion', day: 29 },
  { id: 'd29p2', english: "I'm looking forward to it.", japanese: "楽しみにしています。", pronunciation: "aɪm ˈlʊkɪŋ ˈfɔːrwərd tuː ɪt", category: 'emotion', day: 29 },
  { id: 'd29p3', english: "I'm feeling stressed.", japanese: "ストレスを感じています。", pronunciation: "aɪm ˈfiːlɪŋ strest", category: 'emotion', day: 29 },
  { id: 'd29p4', english: "I need a break.", japanese: "休憩が必要です。", pronunciation: "aɪ niːd ə breɪk", category: 'emotion', day: 29 },
  { id: 'd29p5', english: "That cheered me up.", japanese: "元気が出ました。", pronunciation: "ðæt tʃɪrd miː ʌp", category: 'emotion', day: 29 },
  { id: 'd29p6', english: "I'm feeling overwhelmed.", japanese: "圧倒されています。", pronunciation: "aɪm ˈfiːlɪŋ ˌoʊvərˈwelmd", category: 'emotion', day: 29 },
  { id: 'd29p7', english: "Take your time.", japanese: "ゆっくりでいいですよ。", pronunciation: "teɪk jɔːr taɪm", category: 'emotion', day: 29 },
  { id: 'd29p8', english: "Don't be too hard on yourself.", japanese: "自分を責めすぎないで。", pronunciation: "doʊnt biː tuː hɑːrd ɒn jɔːrˈself", category: 'emotion', day: 29 },
  { id: 'd29p9', english: "Everything will be fine.", japanese: "きっとうまくいきますよ。", pronunciation: "ˈevrɪθɪŋ wɪl biː faɪn", category: 'emotion', day: 29 },
  { id: 'd29p10', english: "I'm here for you.", japanese: "あなたの味方ですよ。", pronunciation: "aɪm hɪr fɔːr juː", category: 'emotion', day: 29 },
  { id: 'd29p11', english: "Hang in there!", japanese: "頑張って！", pronunciation: "hæŋ ɪn ðer", category: 'emotion', day: 29 },
  { id: 'd29p12', english: "You did a great job!", japanese: "よくやりましたね！", pronunciation: "juː dɪd ə ɡreɪt dʒɒb", category: 'emotion', day: 29 },
];

const day30Phrases: Phrase[] = [
  { id: 'd30p1', english: "I've learned so much.", japanese: "たくさん学びました。", pronunciation: "aɪv lɜːrnd soʊ mʌtʃ", category: 'emotion', day: 30 },
  { id: 'd30p2', english: "Thank you for teaching me.", japanese: "教えてくれてありがとう。", pronunciation: "θæŋk juː fɔːr ˈtiːtʃɪŋ miː", category: 'emotion', day: 30 },
  { id: 'd30p3', english: "I'll keep practicing.", japanese: "これからも練習を続けます。", pronunciation: "aɪl kiːp ˈpræktɪsɪŋ", category: 'emotion', day: 30 },
  { id: 'd30p4', english: "Practice makes perfect.", japanese: "継続は力なり。", pronunciation: "ˈpræktɪs meɪks ˈpɜːrfɪkt", category: 'emotion', day: 30 },
  { id: 'd30p5', english: "Never give up!", japanese: "諦めないで！", pronunciation: "ˈnevər ɡɪv ʌp", category: 'emotion', day: 30 },
  { id: 'd30p6', english: "I'm confident in my English.", japanese: "英語に自信がついてきました。", pronunciation: "aɪm ˈkɒnfɪdənt ɪn maɪ ˈɪŋɡlɪʃ", category: 'emotion', day: 30 },
  { id: 'd30p7', english: "I'm ready for new challenges.", japanese: "新しいチャレンジの準備ができました。", pronunciation: "aɪm ˈredi fɔːr njuː ˈtʃælɪndʒɪz", category: 'emotion', day: 30 },
  { id: 'd30p8', english: "The journey continues.", japanese: "旅は続きます。", pronunciation: "ðə ˈdʒɜːrni kənˈtɪnjuːz", category: 'emotion', day: 30 },
  { id: 'd30p9', english: "I'll never stop learning.", japanese: "学び続けます。", pronunciation: "aɪl ˈnevər stɒp ˈlɜːrnɪŋ", category: 'emotion', day: 30 },
  { id: 'd30p10', english: "This is just the beginning.", japanese: "これはまだ始まりにすぎません。", pronunciation: "ðɪs ɪz dʒʌst ðə bɪˈɡɪnɪŋ", category: 'emotion', day: 30 },
  { id: 'd30p11', english: "I believe in myself.", japanese: "自分を信じています。", pronunciation: "aɪ bɪˈliːv ɪn maɪˈself", category: 'emotion', day: 30 },
  { id: 'd30p12', english: "Let's keep going!", japanese: "これからも頑張りましょう！", pronunciation: "lets kiːp ˈɡoʊɪŋ", category: 'emotion', day: 30 },
];

// Combine all phrases
export const allPhrases: Phrase[] = [
  ...day1Phrases, ...day2Phrases, ...day3Phrases, ...day4Phrases, ...day5Phrases,
  ...day6Phrases, ...day7Phrases, ...day8Phrases, ...day9Phrases, ...day10Phrases,
  ...day11Phrases, ...day12Phrases, ...day13Phrases, ...day14Phrases, ...day15Phrases,
  ...day16Phrases, ...day17Phrases, ...day18Phrases, ...day19Phrases, ...day20Phrases,
  ...day21Phrases, ...day22Phrases, ...day23Phrases, ...day24Phrases, ...day25Phrases,
  ...day26Phrases, ...day27Phrases, ...day28Phrases, ...day29Phrases, ...day30Phrases,
];

// Day lessons data
export const dayLessons: DayLesson[] = [
  { day: 1, title: "First Impressions", titleJa: "初対面の挨拶", description: "Learn essential greetings and self-introduction phrases", category: 'greeting', phrases: day1Phrases },
  { day: 2, title: "Daily Greetings", titleJa: "日常の挨拶", description: "Master everyday greetings and farewells", category: 'greeting', phrases: day2Phrases },
  { day: 3, title: "Self Introduction", titleJa: "自己紹介", description: "Introduce yourself and others confidently", category: 'greeting', phrases: day3Phrases },
  { day: 4, title: "Daily Conversations", titleJa: "日常会話", description: "Talk about time, weather, and daily plans", category: 'daily', phrases: day4Phrases },
  { day: 5, title: "Asking for Help", titleJa: "助けを求める", description: "Learn to ask questions and request assistance", category: 'daily', phrases: day5Phrases },
  { day: 6, title: "Apologies & Thanks", titleJa: "謝罪と感謝", description: "Express apologies and gratitude properly", category: 'daily', phrases: day6Phrases },
  { day: 7, title: "Shopping Basics", titleJa: "買い物の基本", description: "Essential phrases for shopping", category: 'shopping', phrases: day7Phrases },
  { day: 8, title: "At the Store", titleJa: "店舗にて", description: "Navigate stores and make purchases", category: 'shopping', phrases: day8Phrases },
  { day: 9, title: "Customer Service", titleJa: "カスタマーサービス", description: "Handle returns, exchanges, and inquiries", category: 'shopping', phrases: day9Phrases },
  { day: 10, title: "Restaurant Basics", titleJa: "レストランの基本", description: "Make reservations and order food", category: 'restaurant', phrases: day10Phrases },
  { day: 11, title: "Dining Out", titleJa: "外食", description: "Communicate dietary needs and pay the bill", category: 'restaurant', phrases: day11Phrases },
  { day: 12, title: "Cafe Conversations", titleJa: "カフェでの会話", description: "Order drinks and use cafe services", category: 'restaurant', phrases: day12Phrases },
  { day: 13, title: "At the Airport", titleJa: "空港にて", description: "Navigate airports and handle flights", category: 'travel', phrases: day13Phrases },
  { day: 14, title: "Hotel Stay", titleJa: "ホテル滞在", description: "Check in, check out, and use hotel services", category: 'travel', phrases: day14Phrases },
  { day: 15, title: "Getting Around", titleJa: "移動", description: "Ask for and give directions", category: 'travel', phrases: day15Phrases },
  { day: 16, title: "Business Basics", titleJa: "ビジネス基本", description: "Professional introductions and meetings", category: 'business', phrases: day16Phrases },
  { day: 17, title: "Meeting Skills", titleJa: "会議スキル", description: "Participate effectively in meetings", category: 'business', phrases: day17Phrases },
  { day: 18, title: "Phone Calls", titleJa: "電話対応", description: "Handle business phone conversations", category: 'business', phrases: day18Phrases },
  { day: 19, title: "Small Talk", titleJa: "雑談", description: "Engage in casual conversations", category: 'social', phrases: day19Phrases },
  { day: 20, title: "Making Plans", titleJa: "予定を立てる", description: "Discuss weekends and make plans", category: 'social', phrases: day20Phrases },
  { day: 21, title: "Current Events", titleJa: "時事トピック", description: "Discuss news and current events", category: 'social', phrases: day21Phrases },
  { day: 22, title: "Health & Medical", titleJa: "健康・医療", description: "Describe symptoms and seek medical help", category: 'emergency', phrases: day22Phrases },
  { day: 23, title: "Emergency Help", titleJa: "緊急時の助け", description: "Handle theft, accidents, and emergencies", category: 'emergency', phrases: day23Phrases },
  { day: 24, title: "Safety & First Aid", titleJa: "安全と応急処置", description: "Emergency situations and safety phrases", category: 'emergency', phrases: day24Phrases },
  { day: 25, title: "Expressing Opinions", titleJa: "意見の表明", description: "Share your views respectfully", category: 'opinion', phrases: day25Phrases },
  { day: 26, title: "Discussion Skills", titleJa: "議論スキル", description: "Analyze and discuss topics", category: 'opinion', phrases: day26Phrases },
  { day: 27, title: "Presentation Skills", titleJa: "プレゼンスキル", description: "Structure and deliver your points", category: 'opinion', phrases: day27Phrases },
  { day: 28, title: "Expressing Emotions", titleJa: "感情表現", description: "Express feelings and respond to others", category: 'emotion', phrases: day28Phrases },
  { day: 29, title: "Support & Encouragement", titleJa: "サポートと励まし", description: "Encourage and support others", category: 'emotion', phrases: day29Phrases },
  { day: 30, title: "Celebration & Growth", titleJa: "お祝いと成長", description: "Celebrate achievements and look forward", category: 'emotion', phrases: day30Phrases },
];

// Get phrases for a specific day
export const getPhrasesByDay = (day: number): Phrase[] => {
  return allPhrases.filter(p => p.day === day);
};

// Get lesson by day
export const getLessonByDay = (day: number): DayLesson | undefined => {
  return dayLessons.find(l => l.day === day);
};

// Get all phrases for review
export const getReviewPhrases = (phraseIds: string[]): Phrase[] => {
  return allPhrases.filter(p => phraseIds.includes(p.id));
};
