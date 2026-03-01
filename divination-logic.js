// Hexagram data dictionary with names, meanings, and interpretations
const hexagramData = {
    // Key format: binary representation from bottom to top (e.g., '111111' means all yang lines)
    '111111': {
        number: 1,
        name: '乾 (Qián)',
        meaning: '天行健，君子以自强不息',
        interpretation: '表示刚健、坚韧、创造力和领导力。代表一切事物的开始和纯阳的能量。',
        image: '天',
        attribute: '健',
        proverb: '潜龙勿用，见龙在田，终日乾乾，或跃在渊，飞龙在天，亢龙有悔。',
        advice: '此卦象征积极进取、刚健有为。建议保持坚韧不拔的态度，坚持自己的原则和目标，但也要注意避免过于刚强而失去弹性。'
    },
    '000000': {
        number: 2,
        name: '坤 (Kūn)',
        meaning: '地势坤，君子以厚德载物',
        interpretation: '表示顺从、包容、承载和柔顺。代表包容万物的大地之力和纯阴的能量。',
        image: '地',
        attribute: '顺',
        proverb: '履霜坚冰至，坤厚载物，安贞吉。',
        advice: '此卦象征包容、顺从与承载。建议保持谦逊态度，顺应自然规律，不要强求，多积累内在力量。厚德载物，静待时机。'
    },
    '010001': {
        number: 3,
        name: '屯 (Zhūn)',
        meaning: '云雷屯，君子以经纶',
        interpretation: '表示初始困难、蓄势待发。象征事物的初始阶段，充满艰难但蕴含希望。',
        image: '云雷',
        attribute: '艰',
        proverb: '元亨利贞，勿用有攸往，利建侯。',
        advice: '此卦象征初始的困难和阻碍。建议坚守正道，不急于行动。当下要积蓄力量，精心规划，等待适当时机。初期困难是为了日后的丰收。'
    },
    '100010': {
        number: 4,
        name: '蒙 (Méng)',
        meaning: '山下出泉，蒙；君子以果行育德',
        interpretation: '表示蒙昧、启蒙、教育和成长。象征需要学习和寻求指导的状态。',
        image: '山水',
        attribute: '昧',
        proverb: '发蒙启蒙，蒙以养正，匪我求童蒙，童蒙求我。',
        advice: '此卦象征蒙昧和启蒙教育。建议虚心学习，寻求明师指导，不要自以为是。现在是培养基础、累积知识的时期，应当端正态度，求真务实。'
    },
    '010111': {
        number: 5,
        name: '需 (Xū)',
        meaning: '云上于天，需；君子以饮食宴乐',
        interpretation: '表示等待、耐心和适时行动。象征需要等待合适时机的状态。',
        image: '水天',
        attribute: '待',
        proverb: '有孚光亨，贞吉。利涉大川。',
        advice: '此卦象征等待和需求。建议保持耐心，适时而动，不要急躁。当前形势需要等待天时地利人和，有所准备，等到合适时机再行动。'
    },
    '111010': {
        number: 6,
        name: '讼 (Sòng)',
        meaning: '天水讼，君子以作事谋始',
        interpretation: '表示争讼、冲突和矛盾。象征需要谨慎处理的争执状态。',
        image: '天水',
        attribute: '争',
        proverb: '有孚窒惕，中吉，终凶。利见大人，不利涉大川。',
        advice: '此卦象征争讼和冲突。建议审慎行事，避免激化矛盾。处理冲突时保持公正客观，适当时寻求权威人士的调解。当前不宜冒险，应稳妥为先。'
    },
    '000010': {
        number: 7,
        name: '师 (Shī)',
        meaning: '地中有水，师；君子以容民畜众',
        interpretation: '表示组织、纪律和领导。象征需要团结一致、共同行动的状态。',
        image: '地水',
        attribute: '众',
        proverb: '贞丈人吉，无咎。',
        advice: '此卦象征组织和纪律。建议服从领导，团结一致。当前情况需要有序行动，遵循规矩，保持内部团结。选择经验丰富的领导者，遵循正道。'
    },
    '010000': {
        number: 8,
        name: '比 (Bǐ)',
        meaning: '水在地上，比；先王以建万国，亲诸侯',
        interpretation: '表示亲近、联合和团结。象征需要建立和谐关系的状态。',
        image: '水地',
        attribute: '亲',
        proverb: '吉，原筮元永贞，无咎。不宁方来，后夫凶。',
        advice: '此卦象征亲近和联合。建议寻求志同道合的伙伴，建立互信关系。当前应当增进团结，选择正确的盟友，保持诚信，但也要警惕投机取巧者。'
    },
    '111011': {
        number: 9,
        name: '小畜 (Xiǎo Chù)',
        meaning: '风行天上，小畜；君子以懿文德',
        interpretation: '表示涵养、畜积和小有所成。象征需要积累力量的状态。',
        image: '风天',
        attribute: '畜',
        proverb: '密云不雨，自我西郊。',
        advice: '此卦象征小有畜积。建议逐步积累，不急于求成。当前是力量积蓄期，宜完善细节，提升内在素质，为日后大展宏图奠定基础。'
    },
    '110111': {
        number: 10,
        name: '履 (Lǚ)',
        meaning: '上天下泽，履；君子以辨上下，定民志',
        interpretation: '表示行进、谨慎和循序渐进。象征需要小心前行的状态。',
        image: '天泽',
        attribute: '行',
        proverb: '履虎尾，不咥人，亨。',
        advice: '此卦象征谨慎行走。建议步步为营，小心前行。当前处境需要谨慎对待危险，保持警惕，遵循规则，不冒不必要的风险，循序渐进。'
    },
    '111000': {
        number: 11,
        name: '泰 (Tài)',
        meaning: '天地交泰，小往大来，吉亨',
        interpretation: '天地交感，阴阳和谐，万物通泰，诸事顺遂',
        image: '地天',
        attribute: '通',
        proverb: '拔茅茹以其汇，征吉',
        advice: '把握时机，积极进取，天地和合之时当大有作为'
    },
    '000111': {
        number: 12,
        name: '否 (Pǐ)',
        meaning: '天地不交，否之匪人，不利君子贞',
        interpretation: '天地闭塞，阴阳不通，世道艰难，宜守正待时',
        image: '天地',
        attribute: '塞',
        proverb: '休否，大人吉',
        advice: '闭塞之时当韬光养晦，坚守正道，静待转机'
    },
    '101111': {
        number: 13,
        name: '同人 (Tóng Rén)',
        meaning: '同人于野，亨，利涉大川，利君子贞',
        interpretation: '志同道合，和衷共济，以公心待人则无往不利',
        image: '天火',
        attribute: '和',
        proverb: '同人于门，无咎',
        advice: '以诚待人，求同存异，团结协作方能成就大事'
    },
    '111101': {
        number: 14,
        name: '大有 (Dà Yǒu)',
        meaning: '大有，元亨',
        interpretation: '日丽中天，万物咸照，丰盛富有，光明正大',
        image: '火天',
        attribute: '丰',
        proverb: '厥孚交如，威如，吉',
        advice: '居盛不骄，以德服人，分享所有方能长久'
    },
    '001000': {
        number: 15,
        name: '谦 (Qiān)',
        meaning: '谦亨，君子有终',
        interpretation: '地中有山，内高外卑，谦虚退让，无往不利',
        image: '坤山',
        attribute: '谦',
        proverb: '劳谦君子，有终吉',
        advice: '谦虚谨慎，不自满不居功，谦德可行于天下'
    },
    '000100': {
        number: 16,
        name: '豫 (Yù)',
        meaning: '豫，利建侯行师',
        interpretation: '雷出地奋，顺而动，喜悦欢乐，因势利导',
        image: '雷地',
        attribute: '悦',
        proverb: '冥豫，成有渝，无咎',
        advice: '居安思危，不可沉溺安乐，宜未雨绸缪预作准备'
    },
    '100110': {
        number: 17,
        name: '随 (Suí)',
        meaning: '随，元亨利贞，无咎',
        interpretation: '泽中有雷，顺势而为，择善而从，灵活变通',
        image: '泽雷',
        attribute: '从',
        proverb: '系小子，失丈夫',
        advice: '顺应时势，择善而随，但须辨明方向不可盲从'
    },
    '011001': {
        number: 18,
        name: '蛊 (Gǔ)',
        meaning: '蛊，元亨，利涉大川',
        interpretation: '山下有风，积弊已久，当振作整治，拨乱反正',
        image: '山风',
        attribute: '治',
        proverb: '干父之蛊，有子考，无咎',
        advice: '面对积弊当果断革新，先甲三日后甲三日慎始慎终'
    },
    '110000': {
        number: 19,
        name: '临 (Lín)',
        meaning: '临，元亨利贞，至于八月有凶',
        interpretation: '泽上有地，居高临下，以上临下，教化万物',
        image: '地泽',
        attribute: '临',
        proverb: '知临，大君之宜，吉',
        advice: '以宽厚仁慈之心对待下属，居盛虑衰未雨绸缪'
    },
    '000011': {
        number: 20,
        name: '观 (Guān)',
        meaning: '观，盥而不荐，有孚颙若',
        interpretation: '风行地上，周遍观察，以道示人，省察自身',
        image: '风地',
        attribute: '观',
        proverb: '观国之光，利用宾于王',
        advice: '静观世态，省察自我，以诚心正意感化他人'
    },
    '100101': {
        number: 21,
        name: '噬嗑 (Shì Kè)',
        meaning: '噬嗑亨，利用狱',
        interpretation: '雷电交作，刑罚分明，除恶务尽，咬碎障碍',
        image: '火雷',
        attribute: '决',
        proverb: '噬腊肉，得黄金',
        advice: '果断清除障碍，明辨是非，执法如山方得亨通'
    },
    '101001': {
        number: 22,
        name: '贲 (Bì)',
        meaning: '贲亨，小利有攸往',
        interpretation: '山下有火，文明以止，文饰修养，以质为本',
        image: '山火',
        attribute: '饰',
        proverb: '白贲无咎',
        advice: '注重外在修饰更须内在充实，质胜于文方为上'
    },
    '000001': {
        number: 23,
        name: '剥 (Bō)',
        meaning: '剥，不利有攸往',
        interpretation: '山附于地，阴盛阳衰，小人道长，宜静不宜动',
        image: '山地',
        attribute: '剥',
        proverb: '剥床以辨，凶',
        advice: '形势不利时当忍耐退守，保存实力以待来日'
    },
    '100000': {
        number: 24,
        name: '复 (Fù)',
        meaning: '复亨，出入无疾，朋来无咎，反复其道',
        interpretation: '雷在地中，一阳来复，生机再现，循环往复',
        image: '地雷',
        attribute: '复',
        proverb: '休复，吉',
        advice: '一阳初生之时宜休养生息，循序渐进不可急躁'
    },
    '100111': {
        number: 25,
        name: '无妄 (Wú Wàng)',
        meaning: '无妄，元亨利贞',
        interpretation: '天下雷行，万物自然，不妄为不妄求，顺天而行',
        image: '天雷',
        attribute: '诚',
        proverb: '无妄之疾，勿药有喜',
        advice: '行事须出于至诚，不可妄动妄求，顺其自然'
    },
    '111001': {
        number: 26,
        name: '大畜 (Dà Xù)',
        meaning: '大畜，利贞，不家食吉，利涉大川',
        interpretation: '天在山中，积蓄大德，充实储备，厚积薄发',
        image: '山天',
        attribute: '蓄',
        proverb: '何天之衢，亨',
        advice: '广泛积累学识与德行，时机成熟自然大有可为'
    },
    '100001': {
        number: 27,
        name: '颐 (Yí)',
        meaning: '颐，贞吉，观颐，自求口实',
        interpretation: '山下有雷，颐养之道，慎言节食，自养养人',
        image: '山雷',
        attribute: '养',
        proverb: '虎视眈眈，其欲逐逐，无咎',
        advice: '谨慎言行饮食，涵养身心，自力更生方为正道'
    },
    '011110': {
        number: 28,
        name: '大过 (Dà Guò)',
        meaning: '大过，栋桡，利有攸往，亨',
        interpretation: '泽灭木，本末弱中间强，非常之时行非常之事',
        image: '泽风',
        attribute: '过',
        proverb: '枯杨生华，老妇得士夫',
        advice: '非常时期须有非常魄力，独立不惧，果敢行动'
    },
    '010010': {
        number: 29,
        name: '坎 (Kǎn)',
        meaning: '习坎，有孚维心亨，行有尚',
        interpretation: '水洊至，重重险阻，以信念坚持，习险不畏险',
        image: '坎水',
        attribute: '险',
        proverb: '坎不盈，祇既平，无咎',
        advice: '身处险境当以诚信守正，反复磨练终能化险为夷'
    },
    '101101': {
        number: 30,
        name: '离 (Lí)',
        meaning: '离，利贞亨，畜牝牛吉',
        interpretation: '明两作，光明相续，附丽正道，柔顺中正',
        image: '离火',
        attribute: '明',
        proverb: '日昃之离，不鼓缶而歌，则大耋之嗟，凶',
        advice: '光明附丽于正道方能持久，柔顺守中自然亨通'
    },
    '001110': {
        number: 31,
        name: '咸 (Xián)',
        meaning: '咸亨，利贞，取女吉',
        interpretation: '山上有泽，阴阳感应，以虚心相交，感而遂通',
        image: '泽山',
        attribute: '感',
        proverb: '咸其拇，志在外也',
        advice: '以真诚感动他人，虚心接纳，人际和谐万事可成'
    },
    '011100': {
        number: 32,
        name: '恒 (Héng)',
        meaning: '恒亨，无咎，利贞，利有攸往',
        interpretation: '雷风相与，刚柔相应，持之以恒，始终如一',
        image: '雷风',
        attribute: '恒',
        proverb: '浚恒，贞凶',
        advice: '立定志向持之以恒，但须随时变通不可固执僵化'
    },
    '001111': {
        number: 33,
        name: '遁 (Dùn)',
        meaning: '遁亨，小利贞',
        interpretation: '天下有山，阴渐长盛，见机而退，全身远害',
        image: '天山',
        attribute: '退',
        proverb: '好遁，君子吉，小人否',
        advice: '时势不利当知进退，适时隐退方为明智之举'
    },
    '111100': {
        number: 34,
        name: '大壮 (Dà Zhuàng)',
        meaning: '大壮，利贞',
        interpretation: '雷在天上，刚健威壮，壮而能止，非礼勿行',
        image: '雷天',
        attribute: '壮',
        proverb: '羝羊触藩，不能退不能遂',
        advice: '虽有大力仍须守正，壮而不妄方为真壮'
    },
    '000101': {
        number: 35,
        name: '晋 (Jìn)',
        meaning: '晋，康侯用锡马蕃庶，昼日三接',
        interpretation: '明出地上，光明日进，顺而丽明，进而上升',
        image: '火地',
        attribute: '进',
        proverb: '晋如摧如，贞吉',
        advice: '光明正大地前进，以柔顺之德求上进，自然受赏识'
    },
    '101000': {
        number: 36,
        name: '明夷 (Míng Yí)',
        meaning: '明夷，利艰贞',
        interpretation: '明入地中，光明受损，韬光养晦，内明外暗',
        image: '地火',
        attribute: '晦',
        proverb: '箕子之明夷，利贞',
        advice: '身处暗世当隐藏才华，忍辱负重，待天明再出'
    },
    '101011': {
        number: 37,
        name: '家人 (Jiā Rén)',
        meaning: '家人，利女贞',
        interpretation: '风自火出，治家之道，各正其位，言行有信',
        image: '风火',
        attribute: '家',
        proverb: '王假有家，勿恤，吉',
        advice: '齐家以正，各尽本分，家和则万事兴'
    },
    '110101': {
        number: 38,
        name: '睽 (Kuí)',
        meaning: '睽，小事吉',
        interpretation: '上火下泽，二女同居，志不同行，求同存异',
        image: '火泽',
        attribute: '异',
        proverb: '睽孤，遇元夫',
        advice: '意见相左时不必强求一致，小事灵活大事坚守原则'
    },
    '001010': {
        number: 39,
        name: '蹇 (Jiǎn)',
        meaning: '蹇，利西南，不利东北，利见大人，贞吉',
        interpretation: '山上有水，行路艰难，见险而止，反身修德',
        image: '水山',
        attribute: '难',
        proverb: '往蹇来誉',
        advice: '遇到困难当反求诸己，修养德行以待时机'
    },
    '010100': {
        number: 40,
        name: '解 (Xiè)',
        meaning: '解，利西南，无所往，其来复吉',
        interpretation: '雷雨作，万物解散，险难消除，宽宏大量',
        image: '雷水',
        attribute: '解',
        proverb: '公用射隼于高墉之上，获之无不利',
        advice: '困难解除后宜宽以待人，回归正常秩序不宜拖延'
    },
    '110001': {
        number: 41,
        name: '损 (Sǔn)',
        meaning: '损，有孚，元吉无咎，可贞，利有攸往',
        interpretation: '山下有泽，损下益上，减损过多，补益不足',
        image: '山泽',
        attribute: '损',
        proverb: '损益盈虚，与时偕行',
        advice: '适当减损自己以利他人，克己修身终有大获'
    },
    '100011': {
        number: 42,
        name: '益 (Yì)',
        meaning: '益，利有攸往，利涉大川',
        interpretation: '风雷激荡，损上益下，增益正道，见善则迁',
        image: '风雷',
        attribute: '益',
        proverb: '有孚惠心，勿问元吉',
        advice: '把握增益良机，见善则行有过则改，利国利民'
    },
    '111110': {
        number: 43,
        name: '夬 (Guài)',
        meaning: '夬，扬于王庭，孚号有厉，告自邑，不利即戎',
        interpretation: '泽上于天，刚决柔断，果断除恶，扬善抑邪',
        image: '泽天',
        attribute: '决',
        proverb: '壮于前趾，往不胜为咎',
        advice: '果断决除弊端，但须以德服人不可一味强硬'
    },
    '011111': {
        number: 44,
        name: '姤 (Gòu)',
        meaning: '姤，女壮，勿用取女',
        interpretation: '天下有风，一阴渐长，不期而遇，防微杜渐',
        image: '天风',
        attribute: '遇',
        proverb: '系于金柅，贞吉',
        advice: '偶然相遇须辨识善恶，防微杜渐不可姑息养奸'
    },
    '000110': {
        number: 45,
        name: '萃 (Cuì)',
        meaning: '萃亨，王假有庙，利见大人，亨利贞',
        interpretation: '泽上于地，万物聚集，荟萃精华，和合众人',
        image: '泽地',
        attribute: '聚',
        proverb: '萃有位，无咎',
        advice: '汇聚人才资源，以诚信凝聚众心，居安思危'
    },
    '011000': {
        number: 46,
        name: '升 (Shēng)',
        meaning: '升，元亨，用见大人，勿恤，南征吉',
        interpretation: '地中生木，积小成大，循序渐升，稳步前进',
        image: '地风',
        attribute: '升',
        proverb: '王用亨于岐山，吉，无咎',
        advice: '脚踏实地逐步提升，以谦德向上定能亨通'
    },
    '010110': {
        number: 47,
        name: '困 (Kùn)',
        meaning: '困亨，贞大人吉，无咎，有言不信',
        interpretation: '泽无水，困穷之象，身虽困而道不穷',
        image: '泽水',
        attribute: '困',
        proverb: '困于石，据于蒺藜，入于其宫不见其妻，凶',
        advice: '穷困之时守正不移，以乐观之心度过难关'
    },
    '011010': {
        number: 48,
        name: '井 (Jǐng)',
        meaning: '井，改邑不改井，无丧无得，往来井井',
        interpretation: '木上有水，井养不穷，修身养德，泽被万物',
        image: '水风',
        attribute: '养',
        proverb: '井收勿幕，有孚元吉',
        advice: '不断修养自身如井泉不竭，造福他人方显价值'
    },
    '101110': {
        number: 49,
        name: '革 (Gé)',
        meaning: '革，巳日乃孚，元亨利贞，悔亡',
        interpretation: '泽中有火，水火相息，变革除旧，顺天应人',
        image: '泽火',
        attribute: '革',
        proverb: '大人虎变，未占有孚',
        advice: '审时度势果断变革，顺天应人方能成功'
    },
    '011101': {
        number: 50,
        name: '鼎 (Dǐng)',
        meaning: '鼎，元吉亨',
        interpretation: '木上有火，以木生火，鼎新革故，养贤育德',
        image: '火风',
        attribute: '新',
        proverb: '鼎有实，我仇有疾，不我能即，吉',
        advice: '革故鼎新，广纳贤才，以新思维创造新局面'
    },
    '100100': {
        number: 51,
        name: '震 (Zhèn)',
        meaning: '震亨，震来虩虩，笑言哑哑',
        interpretation: '洊雷重震，惊惧奋发，恐惧修省，临危不乱',
        image: '震雷',
        attribute: '动',
        proverb: '震索索，视矍矍，征凶',
        advice: '惊雷震动之时当修省自身，恐惧中求奋进'
    },
    '001001': {
        number: 52,
        name: '艮 (Gèn)',
        meaning: '艮其背，不获其身，行其庭，不见其人，无咎',
        interpretation: '兼山为艮，知止而止，动静有时，适可而止',
        image: '艮山',
        attribute: '止',
        proverb: '艮其背，不获其身，无咎',
        advice: '当止则止，安定其心，不为外物所动方得安宁'
    },
    '001011': {
        number: 53,
        name: '渐 (Jiàn)',
        meaning: '渐，女归吉，利贞',
        interpretation: '山上有木，渐进生长，循序渐进，水到渠成',
        image: '风山',
        attribute: '渐',
        proverb: '鸿渐于陆，夫征不复，妇孕不育，凶',
        advice: '凡事循序渐进，不可操之过急，稳扎稳打终能成功'
    },
    '110100': {
        number: 54,
        name: '归妹 (Guī Mèi)',
        meaning: '归妹，征凶，无攸利',
        interpretation: '泽上有雷，少女从兄，行事须慎，不可逾矩',
        image: '雷泽',
        attribute: '嫁',
        proverb: '帝乙归妹，其君之袂不如其娣之袂良',
        advice: '安分守己，不可越位妄为，恪守本分方能无咎'
    },
    '101100': {
        number: 55,
        name: '丰 (Fēng)',
        meaning: '丰亨，王假之，勿忧，宜日中',
        interpretation: '雷电皆至，盛大丰满，物极必反，居盛戒满',
        image: '雷火',
        attribute: '盛',
        proverb: '丰其蔀，日中见斗',
        advice: '鼎盛之时当明察秋毫，居盛思衰方能持久'
    },
    '001101': {
        number: 56,
        name: '旅 (Lǚ)',
        meaning: '旅，小亨，旅贞吉',
        interpretation: '山上有火，旅行在外，寄人篱下，谨慎柔顺',
        image: '火山',
        attribute: '旅',
        proverb: '旅即次，怀其资，得童仆，贞',
        advice: '客居他乡当谦卑谨慎，小心行事不可张扬'
    },
    '011011': {
        number: 57,
        name: '巽 (Xùn)',
        meaning: '巽，小亨，利有攸往，利见大人',
        interpretation: '随风相继，柔顺谦逊，潜移默化，深入渗透',
        image: '巽风',
        attribute: '顺',
        proverb: '巽在床下，用史巫纷若，吉无咎',
        advice: '以柔顺谦逊之态处世，潜移默化终有所成'
    },
    '110110': {
        number: 58,
        name: '兑 (Duì)',
        meaning: '兑亨，利贞',
        interpretation: '丽泽相悦，朋友讲习，和悦喜乐，以诚相待',
        image: '兑泽',
        attribute: '悦',
        proverb: '孚兑，吉',
        advice: '以和悦之心待人，朋友切磋互益，真诚方得真乐'
    },
    '010011': {
        number: 59,
        name: '涣 (Huàn)',
        meaning: '涣亨，王假有庙，利涉大川，利贞',
        interpretation: '风行水上，涣散离析，以德聚人，化散为聚',
        image: '风水',
        attribute: '散',
        proverb: '涣其群，元吉',
        advice: '涣散之时以精神信仰凝聚人心，破除私见方能重聚'
    },
    '110010': {
        number: 60,
        name: '节 (Jié)',
        meaning: '节亨，苦节不可贞',
        interpretation: '泽上有水，以节制度，适可而止，过犹不及',
        image: '水泽',
        attribute: '节',
        proverb: '甘节，吉，往有尚',
        advice: '凡事有度有节，不可过分苛刻，甘之如饴方为善节'
    },
    '110011': {
        number: 61,
        name: '中孚 (Zhōng Fú)',
        meaning: '中孚，豚鱼吉，利涉大川，利贞',
        interpretation: '泽上有风，中心诚信，至诚感物，信及豚鱼',
        image: '风泽',
        attribute: '信',
        proverb: '鸣鹤在阴，其子和之',
        advice: '以至诚之心待人接物，诚信能感动一切'
    },
    '001100': {
        number: 62,
        name: '小过 (Xiǎo Guò)',
        meaning: '小过亨，利贞，可小事不可大事',
        interpretation: '山上有雷，小有过越，宜小不宜大，谦抑为上',
        image: '雷山',
        attribute: '谨',
        proverb: '飞鸟遗之音，不宜上宜下，大吉',
        advice: '行事不可过分张扬，做力所能及之事，小心谨慎'
    },
    '101010': {
        number: 63,
        name: '既济 (Jì Jì)',
        meaning: '既济亨小，利贞，初吉终乱',
        interpretation: '水在火上，万事已成，功成之后，慎防衰落',
        image: '水火',
        attribute: '成',
        proverb: '繻有衣袽，终日戒',
        advice: '事已成功更须谨慎，初吉终乱当居安思危'
    },
    '010101': {
        number: 64,
        name: '未济 (Wèi Jì)',
        meaning: '未济亨，小狐汔济，濡其尾，无攸利',
        interpretation: '火在水上，万事未成，尚需努力，审慎而行',
        image: '火水',
        attribute: '未',
        proverb: '有孚于饮酒，无咎，濡其首，有孚失是',
        advice: '事未成之时须坚持不懈，审慎辨别方能终达彼岸'
    }
};

// Convert hexagram array to a key format for lookup
function getHexagramKey(hexagram) {
    return hexagram.map(line => line === 'yang' ? '1' : '0').join('');
}

// Get hexagram name from the data dictionary
function getHexagramName(hexagram) {
    const key = getHexagramKey(hexagram);
    
    if (hexagramData[key]) {
        return hexagramData[key].name;
    } else {
        console.warn('Unknown hexagram key:', key);
        return '未知卦象';
    }
}

// Categorize question by keywords
function getQuestionCategory(question) {
    if (!question) return '综合';
    const categoryKeywords = {
        '事业': ['工作', '事业', '职业', '升职', '加薪', '跳槽', '面试', '辞职', '领导', '同事', '项目', '创业', '开店', '生意', '合作'],
        '财运': ['财', '钱', '投资', '股票', '基金', '理财', '收入', '赚', '亏', '借', '债', '买房', '房产', '彩票'],
        '感情': ['感情', '爱情', '婚姻', '恋爱', '对象', '另一半', '老公', '老婆', '男友', '女友', '暗恋', '分手', '复合', '桃花', '姻缘'],
        '学业': ['学习', '考试', '考研', '高考', '成绩', '学业', '留学', '论文', '毕业', '证书', '资格'],
        '健康': ['健康', '身体', '生病', '疾病', '手术', '治疗', '康复', '养生', '怀孕', '备孕']
    };
    for (const [category, keywords] of Object.entries(categoryKeywords)) {
        if (keywords.some(kw => question.includes(kw))) {
            return category;
        }
    }
    return '综合';
}

// Find hexagram data by name (supports partial match)
function getHexagramByName(name) {
    if (!name) return null;
    for (const key in hexagramData) {
        const hex = hexagramData[key];
        if (hex.name === name || hex.name.includes(name.charAt(0)) || name.includes(hex.name.split(' ')[0])) {
            return hex;
        }
    }
    return null;
}

// Generate comprehensive analysis based on hexagram data and question
function generateAnalysis(question, originalName, changedName) {
    const questionCategory = getQuestionCategory(question);
    const originalHexData = getHexagramByName(originalName);
    const changedHexData = getHexagramByName(changedName);

    if (!originalHexData || !changedHexData) {
        return getFallbackAnalysis(question, originalName, changedName);
    }

    // 内部推算吉凶（不对外展示方法论）
    const worldLine = analyzeWorldLine(
        originalName.replace(/[为]/g, '').charAt(0),
        getUseTabooGods(questionCategory)
    );
    const isGood = worldLine.isAuspicious;

    // 根据问题类别生成针对性总结
    const summary = generateCategorySummary(question, questionCategory, originalHexData, changedHexData, isGood);
    // 趋势判断
    const trend = getTrendDescription(originalHexData, changedHexData, isGood);
    // 运势预测
    const fortune = getFortunePrediction(originalHexData, changedHexData, questionCategory);

    return `
        <div class="analysis-section">
            <h4 class="font-semibold text-gray-800 mb-3">解卦结论</h4>
            <div class="p-4 rounded-lg mb-4 ${isGood ? 'bg-green-50 border-l-4 border-green-500' : 'bg-red-50 border-l-4 border-red-500'}">
                <p class="text-sm font-medium ${isGood ? 'text-green-800' : 'text-red-800'} mb-2">${isGood ? '整体趋吉' : '需要留意'}</p>
                <p class="text-sm text-gray-700">${summary}</p>
            </div>
        </div>

        <div class="analysis-section">
            <h4 class="font-semibold text-gray-800 mb-3">卦象解读</h4>
            <div class="bg-blue-50 p-4 rounded-lg mb-3">
                <p class="text-sm text-gray-700 mb-1"><strong>本卦 ${originalHexData.name}：</strong>${originalHexData.meaning}</p>
                <p class="text-sm text-gray-600">${originalHexData.interpretation}</p>
            </div>
            <div class="bg-indigo-50 p-4 rounded-lg mb-3">
                <p class="text-sm text-gray-700 mb-1"><strong>变卦 ${changedHexData.name}：</strong>${changedHexData.meaning}</p>
                <p class="text-sm text-gray-600">${changedHexData.interpretation}</p>
            </div>
            <div class="bg-purple-50 p-4 rounded-lg mb-3">
                <p class="text-sm text-gray-700">${trend}</p>
            </div>
            <div class="bg-gray-50 p-4 rounded-lg">
                <p class="text-sm text-gray-700">${originalHexData.advice}</p>
                ${originalHexData.proverb ? `<p class="text-xs text-gray-500 mt-2 italic">「${originalHexData.proverb}」</p>` : ''}
            </div>
        </div>
    `;
}

// 根据问题类别 + 吉凶生成针对性的总结
function generateCategorySummary(question, category, originalHex, changedHex, isGood) {
    const summaries = {
        '事业': {
            good: `针对您所问"${question}"，卦象显示当前事业运势积极向上。本卦${originalHex.name}呈${originalHex.attribute}象，变卦转为${changedHex.name}之${changedHex.attribute}象，说明事业发展正处于有利阶段。宜积极把握机会，主动出击，贵人运佳，有望取得突破性进展。`,
            bad: `针对您所问"${question}"，卦象提示事业方面需要谨慎。本卦${originalHex.name}呈${originalHex.attribute}象，变卦转为${changedHex.name}之${changedHex.attribute}象，暗示当前可能遇到阻碍或竞争压力。建议暂时收敛锋芒，稳中求进，不宜贸然行动。`
        },
        '财运': {
            good: `针对您所问"${question}"，卦象显示财运较为亨通。本卦${originalHex.name}之${originalHex.attribute}与变卦${changedHex.name}之${changedHex.attribute}相合，预示正财稳定，偏财有望。适合稳健理财和合理投资，但仍需量力而行，切忌贪多。`,
            bad: `针对您所问"${question}"，卦象提示财运方面需要留意。本卦${originalHex.name}转变卦${changedHex.name}，财气有所消耗，近期不宜大额投资或冒险操作。建议控制支出，守住既有成果，待时机成熟再做打算。`
        },
        '感情': {
            good: `针对您所问"${question}"，卦象显示感情方面较为顺遂。本卦${originalHex.name}到变卦${changedHex.name}，阴阳相应，有情者终成眷属之象。双方感情基础牢固，适合加深沟通、增进理解，关系会更进一步。`,
            bad: `针对您所问"${question}"，卦象提示感情方面有些波折。本卦${originalHex.name}转为${changedHex.name}，情感交流可能出现障碍。建议多一些耐心和包容，避免因小事争执伤了感情，退一步海阔天空。`
        },
        '学业': {
            good: `针对您所问"${question}"，卦象显示学业运势良好。本卦${originalHex.name}之${originalHex.attribute}配合变卦${changedHex.name}，思路通达，学有所成。适合专注深耕，考试运佳，付出的努力将得到回报。`,
            bad: `针对您所问"${question}"，卦象提示学业方面需要加倍努力。本卦${originalHex.name}转为${changedHex.name}，学习中可能遇到困惑或效率不高的情况。建议调整学习方法，劳逸结合，必要时寻求师长指点。`
        },
        '健康': {
            good: `针对您所问"${question}"，卦象显示健康状况总体平稳。本卦${originalHex.name}至变卦${changedHex.name}，生机尚旺，正气充足。日常注意作息规律、适量运动，身体状况将保持良好。`,
            bad: `针对您所问"${question}"，卦象提示健康方面需要重视。本卦${originalHex.name}转变卦${changedHex.name}，身体可能出现疲劳或小恙。建议及早调理，注意饮食和休息，必要时就医检查，不可讳疾忌医。`
        },
        '综合': {
            good: `针对您所问"${question}"，卦象整体呈吉象。本卦${originalHex.name}呈${originalHex.attribute}象，变卦${changedHex.name}呈${changedHex.attribute}象，事态正朝有利方向发展。顺势而为、把握时机，自然水到渠成。`,
            bad: `针对您所问"${question}"，卦象提示当前形势复杂，需审慎行事。本卦${originalHex.name}之${originalHex.attribute}转为变卦${changedHex.name}之${changedHex.attribute}，变化中暗藏挑战。建议暂且观望，做好充分准备后再行动。`
        }
    };

    const catSummary = summaries[category] || summaries['综合'];
    return isGood ? catSummary.good : catSummary.bad;
}

// 趋势描述
function getTrendDescription(originalHex, changedHex, isGood) {
    const from = originalHex.attribute;
    const to = changedHex.attribute;

    if (from === to) {
        return `本卦与变卦同属"${from}"性，局势较为稳定，短期内不会出现剧烈变化。宜保持当前节奏，稳步推进。`;
    }

    if (isGood) {
        return `从本卦"${from}"之象转为变卦"${to}"之象，整体趋势向好。变化过程中虽有波动，但总体呈上升态势。把握住转变的关键节点，可以事半功倍。`;
    } else {
        return `从本卦"${from}"之象转为变卦"${to}"之象，变化过程中需保持警惕。当前并非最佳行动时机，建议以守为攻，耐心等待转机出现。逆境中修炼内功，为日后蓄力。`;
    }
}

// 静卦分析（内部逻辑，不对外展示方法论名称）
function analyzeStaticHexagram(question, hexagramName, questionCategory) {
    const coreHexagram = hexagramName.replace(/[为]/g, '');
    const useTabooGods = getUseTabooGods(questionCategory);
    return analyzeWorldLine(coreHexagram, useTabooGods);
}

// Get use god and taboo god based on question category
function getUseTabooGods(category) {
    const godMapping = {
        '事业': { useGod: '官鬼', tabooGod: '子孙' },
        '财运': { useGod: '妻财', tabooGod: '兄弟' },
        '感情': { useGod: '妻财/官鬼', tabooGod: '兄弟/子孙' },
        '学业': { useGod: '父母', tabooGod: '妻财' },
        '健康': { useGod: '子孙', tabooGod: '官鬼' },
        '综合': { useGod: '世爻', tabooGod: '应爻' }
    };
    
    return godMapping[category] || godMapping['综合'];
}

// Analyze world line according to Zhu Chenbin's theory
function analyzeWorldLine(hexagramName, useTabooGods) {
    // Simplified world line analysis - in real implementation, this would involve complex calculations
    // based on the actual hexagram structure, day/month stems, and six relatives
    
    const hexagramAnalysis = {
        '乾': { worldLine: '官鬼', tendency: 'strong' },
        '坤': { worldLine: '子孙', tendency: 'weak' },
        '屯': { worldLine: '兄弟', tendency: 'medium' },
        '蒙': { worldLine: '父母', tendency: 'weak' },
        '需': { worldLine: '妻财', tendency: 'strong' },
        '讼': { worldLine: '官鬼', tendency: 'medium' },
        '师': { worldLine: '子孙', tendency: 'strong' },
        '比': { worldLine: '妻财', tendency: 'medium' },
        '小畜': { worldLine: '兄弟', tendency: 'weak' },
        '履': { worldLine: '官鬼', tendency: 'medium' },
        '泰': { worldLine: '子孙', tendency: 'strong' },
        '否': { worldLine: '父母', tendency: 'weak' },
        '同人': { worldLine: '兄弟', tendency: 'strong' },
        '大有': { worldLine: '妻财', tendency: 'strong' },
        '谦': { worldLine: '官鬼', tendency: 'medium' },
        '豫': { worldLine: '子孙', tendency: 'medium' },
        '随': { worldLine: '妻财', tendency: 'medium' },
        '蛊': { worldLine: '父母', tendency: 'medium' },
        '临': { worldLine: '子孙', tendency: 'strong' },
        '观': { worldLine: '父母', tendency: 'weak' },
        '噬嗑': { worldLine: '官鬼', tendency: 'strong' },
        '贲': { worldLine: '父母', tendency: 'medium' },
        '剥': { worldLine: '兄弟', tendency: 'weak' },
        '复': { worldLine: '子孙', tendency: 'medium' },
        '无妄': { worldLine: '官鬼', tendency: 'strong' },
        '大畜': { worldLine: '父母', tendency: 'strong' },
        '颐': { worldLine: '兄弟', tendency: 'medium' },
        '大过': { worldLine: '妻财', tendency: 'weak' },
        '坎': { worldLine: '兄弟', tendency: 'medium' },
        '离': { worldLine: '父母', tendency: 'strong' },
        '咸': { worldLine: '妻财', tendency: 'strong' },
        '恒': { worldLine: '官鬼', tendency: 'medium' },
        '遁': { worldLine: '父母', tendency: 'medium' },
        '大壮': { worldLine: '兄弟', tendency: 'strong' },
        '晋': { worldLine: '妻财', tendency: 'medium' },
        '明夷': { worldLine: '官鬼', tendency: 'weak' },
        '家人': { worldLine: '父母', tendency: 'strong' },
        '睽': { worldLine: '妻财', tendency: 'medium' },
        '蹇': { worldLine: '官鬼', tendency: 'weak' },
        '解': { worldLine: '子孙', tendency: 'medium' },
        '损': { worldLine: '兄弟', tendency: 'weak' },
        '益': { worldLine: '子孙', tendency: 'strong' },
        '夬': { worldLine: '妻财', tendency: 'strong' },
        '姤': { worldLine: '父母', tendency: 'medium' },
        '萃': { worldLine: '官鬼', tendency: 'medium' },
        '升': { worldLine: '子孙', tendency: 'medium' },
        '困': { worldLine: '兄弟', tendency: 'weak' },
        '井': { worldLine: '父母', tendency: 'medium' },
        '革': { worldLine: '妻财', tendency: 'strong' },
        '鼎': { worldLine: '官鬼', tendency: 'strong' },
        '震': { worldLine: '子孙', tendency: 'strong' },
        '艮': { worldLine: '兄弟', tendency: 'medium' },
        '渐': { worldLine: '父母', tendency: 'medium' },
        '归妹': { worldLine: '妻财', tendency: 'weak' },
        '丰': { worldLine: '官鬼', tendency: 'strong' },
        '旅': { worldLine: '父母', tendency: 'weak' },
        '巽': { worldLine: '兄弟', tendency: 'medium' },
        '兑': { worldLine: '妻财', tendency: 'medium' },
        '涣': { worldLine: '子孙', tendency: 'medium' },
        '节': { worldLine: '官鬼', tendency: 'medium' },
        '中孚': { worldLine: '父母', tendency: 'strong' },
        '小过': { worldLine: '兄弟', tendency: 'weak' },
        '既济': { worldLine: '妻财', tendency: 'medium' },
        '未济': { worldLine: '子孙', tendency: 'weak' }
    };
    
    // Extract first character for analysis
    const firstChar = hexagramName.charAt(0);
    const analysis = hexagramAnalysis[firstChar] || { worldLine: '世爻', tendency: 'medium' };
    
    // Apply Zhu Chenbin's rule: use god holding world = auspicious, taboo god holding world = inauspicious
    const isUseGodHoldingWorld = useTabooGods.useGod.includes(analysis.worldLine);
    const isTabooGodHoldingWorld = useTabooGods.tabooGod.includes(analysis.worldLine);
    
    let result = {
        isAuspicious: true,
        analysis: '卦象平稳，需综合分析。'
    };
    
    if (isUseGodHoldingWorld) {
        result = { isAuspicious: true };
    } else if (isTabooGodHoldingWorld) {
        result = { isAuspicious: false };
    } else {
        result = { isAuspicious: analysis.tendency === 'strong' };
    }
    
    return result;
}

// Helper function to generate fortune predictions
function getFortunePrediction(originalHexData, changedHexData, category) {
    // This would be more sophisticated in a real app
    const predictions = {
        '事业': [
            '当前事业发展处于上升期，宜积极进取，把握机会。',
            '事业遇到一定阻碍，需耐心等待，稳扎稳打。',
            '职场上需谨慎行事，避免卷入是非争端。',
            '适合开展新项目，创新思维将带来突破。',
            '工作中应加强团队协作，共同努力方能成功。'
        ],
        '财运': [
            '财运良好，适合稳健投资，但不宜冒险。',
            '近期财务压力较大，应控制支出，量入为出。',
            '可能有意外收获，但也要防范财务风险。',
            '投资理财应保持谨慎，避免盲目跟风。',
            '财源广进，但须防范贪念，知足常乐。'
        ],
        '感情': [
            '感情发展顺利，双方互相理解，关系融洽。',
            '感情中存在一些隔阂，需要坦诚沟通。',
            '单身者有望遇到心仪对象，不妨主动把握。',
            '感情需要更多耐心和包容，避免冲动决定。',
            '爱情之路并非一帆风顺，但真心付出终有回报。'
        ],
        '健康': [
            '身体状况良好，但仍需注意休息，避免过度疲劳。',
            '有轻微不适，应及时调整作息，加强锻炼。',
            '注意饮食均衡，保持良好心态，健康自然随之而来。',
            '警惕旧疾复发，遵医嘱调养，勿急于求成。',
            '心理压力较大，建议适当放松，多亲近自然。'
        ],
        '学业': [
            '学习进展顺利，思路清晰，成绩将有所提升。',
            '学业压力较大，需调整学习方法，提高效率。',
            '考试成绩取决于平时积累，临时抱佛脚难以奏效。',
            '适合深入研究，专注于自己感兴趣的领域。',
            '团队协作学习效果更佳，不妨多与同学交流。'
        ],
        '家庭': [
            '家庭关系和睦，亲人间相互支持，充满温馨。',
            '家庭中有一些小矛盾，需要相互理解和包容。',
            '与长辈沟通时应尊重其经验，但也可适当表达己见。',
            '家庭和睦是事业成功的基础，应多关心家人。',
            '家庭责任重大，需要耐心与爱心共同经营。'
        ],
        '综合': [
            '整体运势良好，各方面发展平稳，可适度进取。',
            '机遇与挑战并存，保持冷静头脑，理性决策。',
            '人际关系需要维护，诚信为本，以真心换真情。',
            '处事不宜急躁，循序渐进，水到渠成。',
            '内心平和是幸福之源，知足常乐，自得其乐。'
        ]
    };
    
    // Get the attribute of both hexagrams to generate a more tailored prediction
    const originalAttribute = originalHexData.attribute;
    const changedAttribute = changedHexData.attribute;
    
    // Get predictions for this category
    const categoryPredictions = predictions[category] || predictions['综合'];
    
    // Select a prediction based on the hexagram attributes
    let predictionIndex = (originalAttribute.length + changedAttribute.length) % categoryPredictions.length;
    
    return categoryPredictions[predictionIndex] + `（${originalAttribute}到${changedAttribute}，${originalAttribute === changedAttribute ? '平稳过渡' : '变化明显'}）`;
}

// 暴露到全局供 script.js 和 ai-service.js 调用（ES Module 兼容）
window.hexagramData = hexagramData;
window.generateAnalysis = generateAnalysis;
window.getQuestionCategory = getQuestionCategory;
window.getHexagramByName = getHexagramByName;
window.getHexagramKey = getHexagramKey;
window.getHexagramName = getHexagramName;
window.analyzeStaticHexagram = analyzeStaticHexagram;
window.analyzeWorldLine = analyzeWorldLine;

// ==================== 六爻排盘系统（纳甲、六亲、六神、世应）====================

const _DI_ZHI_WUXING = {
    '子':'水','丑':'土','寅':'木','卯':'木','辰':'土','巳':'火',
    '午':'火','未':'土','申':'金','酉':'金','戌':'土','亥':'水'
};
const _GENERATES = {'木':'火','火':'土','土':'金','金':'水','水':'木'};
const _RESTRICTS = {'木':'土','火':'金','土':'水','金':'木','水':'火'};
const _PALACE_WUXING = {'乾':'金','兑':'金','离':'火','震':'木','巽':'木','坎':'水','艮':'土','坤':'土'};

// 纳甲地支（lower=内卦[初,二,三], upper=外卦[四,五,上]）
const _TRIGRAM_NAJIA = {
    '111': {lower:['子','寅','辰'], upper:['午','申','戌']},
    '000': {lower:['未','巳','卯'], upper:['丑','亥','酉']},
    '100': {lower:['子','寅','辰'], upper:['午','申','戌']},
    '011': {lower:['丑','亥','酉'], upper:['卯','巳','未']},
    '010': {lower:['寅','辰','午'], upper:['申','戌','子']},
    '101': {lower:['卯','丑','亥'], upper:['酉','未','巳']},
    '001': {lower:['辰','寅','子'], upper:['戌','申','午']},
    '110': {lower:['巳','卯','丑'], upper:['亥','酉','未']},
};

// 64卦宫归属（key = upper3+lower3，与 script.js hexagramNames 格式一致）
const _HEXAGRAM_PALACE = {
    '111111':{palace:'乾',pos:1},'111011':{palace:'乾',pos:2},'111001':{palace:'乾',pos:3},
    '111000':{palace:'乾',pos:4},'011000':{palace:'乾',pos:5},'001000':{palace:'乾',pos:6},
    '101000':{palace:'乾',pos:7},'101111':{palace:'乾',pos:8},
    '010010':{palace:'坎',pos:1},'010110':{palace:'坎',pos:2},'010100':{palace:'坎',pos:3},
    '010101':{palace:'坎',pos:4},'110101':{palace:'坎',pos:5},'100101':{palace:'坎',pos:6},
    '000101':{palace:'坎',pos:7},'000010':{palace:'坎',pos:8},
    '001001':{palace:'艮',pos:1},'001101':{palace:'艮',pos:2},'001111':{palace:'艮',pos:3},
    '001110':{palace:'艮',pos:4},'101110':{palace:'艮',pos:5},'111110':{palace:'艮',pos:6},
    '011110':{palace:'艮',pos:7},'011001':{palace:'艮',pos:8},
    '100100':{palace:'震',pos:1},'100000':{palace:'震',pos:2},'100010':{palace:'震',pos:3},
    '100011':{palace:'震',pos:4},'000011':{palace:'震',pos:5},'010011':{palace:'震',pos:6},
    '110011':{palace:'震',pos:7},'110100':{palace:'震',pos:8},
    '011011':{palace:'巽',pos:1},'011111':{palace:'巽',pos:2},'011101':{palace:'巽',pos:3},
    '011100':{palace:'巽',pos:4},'111100':{palace:'巽',pos:5},'101100':{palace:'巽',pos:6},
    '001100':{palace:'巽',pos:7},'001011':{palace:'巽',pos:8},
    '101101':{palace:'离',pos:1},'101001':{palace:'离',pos:2},'101011':{palace:'离',pos:3},
    '101010':{palace:'离',pos:4},'001010':{palace:'离',pos:5},'011010':{palace:'离',pos:6},
    '111010':{palace:'离',pos:7},'111101':{palace:'离',pos:8},
    '000000':{palace:'坤',pos:1},'000100':{palace:'坤',pos:2},'000110':{palace:'坤',pos:3},
    '000111':{palace:'坤',pos:4},'100111':{palace:'坤',pos:5},'110111':{palace:'坤',pos:6},
    '010111':{palace:'坤',pos:7},'010000':{palace:'坤',pos:8},
    '110110':{palace:'兑',pos:1},'110010':{palace:'兑',pos:2},'110000':{palace:'兑',pos:3},
    '110001':{palace:'兑',pos:4},'010001':{palace:'兑',pos:5},'000001':{palace:'兑',pos:6},
    '100001':{palace:'兑',pos:7},'100110':{palace:'兑',pos:8},
};

// 世应位置（pos→[世爻(1-based), 应爻(1-based)]）
const _SHI_YING_POS = {1:[6,3],2:[1,4],3:[2,5],4:[3,6],5:[4,1],6:[5,2],7:[4,1],8:[3,6]};

// 六神排列 & 日天干起点
const _SIX_SPIRITS_SEQ = ['青龙','朱雀','勾陈','腾蛇','白虎','玄武'];
const _GAN_SPIRIT_IDX  = {'甲':0,'乙':0,'丙':1,'丁':1,'戊':2,'己':3,'庚':4,'辛':4,'壬':5,'癸':5};

// 旺衰月支表
const _WUXING_STRENGTH = {
    '木':{旺:['寅','卯'],相:['亥','子'],休:['巳','午'],囚:['申','酉'],死:['辰','戌','丑','未']},
    '火':{旺:['巳','午'],相:['寅','卯'],休:['申','酉'],囚:['亥','子'],死:['辰','戌','丑','未']},
    '土':{旺:['辰','戌','丑','未'],相:['巳','午'],休:['亥','子'],囚:['寅','卯'],死:['申','酉']},
    '金':{旺:['申','酉'],相:['辰','戌','丑','未'],休:['亥','子'],囚:['巳','午'],死:['寅','卯']},
    '水':{旺:['亥','子'],相:['申','酉'],休:['寅','卯'],囚:['辰','戌','丑','未'],死:['巳','午']},
};

function _getStrength(el, monthZhi) {
    if (!el || !monthZhi) return '';
    const t = _WUXING_STRENGTH[el];
    if (!t) return '';
    for (const [s, arr] of Object.entries(t)) { if (arr.includes(monthZhi)) return s; }
    return '';
}

function _wuxingRelation(palaceEl, lineEl) {
    if (palaceEl === lineEl) return '兄弟';
    if (_GENERATES[palaceEl] === lineEl) return '子孙';
    if (_RESTRICTS[palaceEl] === lineEl) return '妻财';
    if (_RESTRICTS[lineEl] === palaceEl) return '官鬼';
    if (_GENERATES[lineEl] === palaceEl) return '父母';
    return '兄弟';
}

/**
 * 六爻完整排盘（纳甲/六亲/六神/世应/旺衰）
 * @param {Array} lines  六爻数组 index 0=初爻…5=上爻，每项 {type:'yang'/'yin'/'laoyang'/'laoyin'}
 * @param {string} dayGan   日天干（如'甲'），可空
 * @param {string} monthZhi 月支（如'寅'），可空
 * @returns {Object|null}
 */
function getPaipanData(lines, dayGan, monthZhi) {
    if (!lines || lines.length !== 6) return null;
    const isYang = l => l.type === 'yang' || l.type === 'laoyang' || l.type === 'shaoyang';

    // 卦key（upper3+lower3，匹配 hexagramNames 格式）
    const lowerCode = lines.slice(0,3).map(l => isYang(l)?'1':'0').join('');
    const upperCode = lines.slice(3,6).map(l => isYang(l)?'1':'0').join('');
    const hexKey = upperCode + lowerCode;

    const palaceInfo = _HEXAGRAM_PALACE[hexKey] || {palace:'乾', pos:1};
    const palaceName = palaceInfo.palace;
    const palaceEl   = _PALACE_WUXING[palaceName] || '金';
    const [shiPos, yingPos] = _SHI_YING_POS[palaceInfo.pos] || [6,3];

    const startIdx = _GAN_SPIRIT_IDX[dayGan] !== undefined ? _GAN_SPIRIT_IDX[dayGan] : 0;
    const lowerNajia = (_TRIGRAM_NAJIA[lowerCode] || {lower:['子','寅','辰']}).lower;
    const upperNajia = (_TRIGRAM_NAJIA[upperCode] || {upper:['午','申','戌']}).upper;

    const lineDetails = lines.map((line, i) => {
        const zhi      = i < 3 ? lowerNajia[i] : upperNajia[i-3];
        const el       = _DI_ZHI_WUXING[zhi] || '土';
        const relation = _wuxingRelation(palaceEl, el);
        const spirit   = _SIX_SPIRITS_SEQ[(startIdx + i) % 6];
        const strength = _getStrength(el, monthZhi);
        const changing = line.type === 'laoyang' || line.type === 'laoyin';
        return { type:line.type, changing, zhi, element:el, relation, spirit, strength,
                 isShi:(i+1)===shiPos, isYing:(i+1)===yingPos };
    });

    return { hexKey, palaceName, palaceElement:palaceEl, shiPos, yingPos, lineDetails };
}

window.getPaipanData = getPaipanData;
