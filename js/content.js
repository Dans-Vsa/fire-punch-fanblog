/* Content — facts from en.wikipedia "Fire Punch" and the Fire Punch Fandom Wiki
   (character pages + "Story Arcs"), verified 2026-10-09, rewritten in our own words.
   Arc names are fan/community-made, not official. "happened" = SPOILER summary,
   "meaning" = our interpretation, not an official statement by Fujimoto. */

const CAST = [
  { key: "agni", name: "Agni", jp: "アグニ", img: "assets/img/cover.webp", pos: "75% 58%",
    id: "Pemuda dengan Berkah regenerasi yang tubuhnya terus terbakar. Hidup demi balas dendam.",
    en: "A regenerating young man who is always on fire, living for revenge." },
  { key: "luna", name: "Luna", jp: "ルナ", img: "assets/img/cast/luna.webp", pos: "50% 20%",
    id: "Adik Agni. Ia juga memiliki Berkah regenerasi yang sama dengan kakaknya.",
    en: "Agni's sister, who shares his regenerative Blessing." },
  { key: "judah", name: "Judah", jp: "ユダ", img: "assets/img/cast/judah.webp", pos: "50% 15%",
    id: "Prajurit Blessed beregenerasi dari Behemdorg. Wajah dan suaranya nyaris sama dengan Luna.",
    en: "A regenerating Blessed soldier of Behemdorg whose face and voice are almost identical to Luna's." },
  { key: "togata", name: "Togata", jp: "トガタ", img: "assets/img/cast/togata-cam.webp", pos: "50% 10%",
    id: "“Sutradara” beregenerasi yang tergila-gila film. Ia ingin menjadikan Agni bintang filmnya.",
    en: "A regenerating self-styled “director” obsessed with movies who wants Agni to star in his film." },
  { key: "neneto", name: "Neneto", jp: "ねねっと", img: "assets/img/cast/neneto.webp", pos: "50% 20%",
    id: "Gadis cerdas dan jeli yang tiba-tiba ditunjuk menjadi juru kamera Togata.",
    en: "A sharp, observant girl suddenly appointed as Togata's camera operator." },
  { key: "sun", name: "Sun", jp: "サン", img: "assets/img/cast/sun.webp", pos: "50% 12%",
    id: "Bocah dengan Berkah listrik yang diselamatkan Agni, lalu memujanya bak dewa.",
    en: "A boy with an electricity Blessing who is saved by Agni and comes to see him as a god." },
  { key: "doma", name: "Doma", jp: "ドマ", img: "assets/img/cast/doma.webp", pos: "50% 15%", tone: "fire",
    id: "Blessed dari Behemdorg yang apinya tak bisa padam sampai sasarannya jadi abu. Ia membakar desa Agni.",
    en: "A Behemdorg Blessed whose flames won't go out until their target is ash. He burned Agni's village." },
  { key: "witch", name: "Penyihir Es", nameEn: "Ice Witch", jp: "氷の魔女", img: "assets/img/cast/witch.webp", pos: "62% 50%", tone: "ice",
    id: "Sosok legenda yang konon membekukan dunia. Siapa dia sebenarnya?",
    en: "The legendary figure said to have frozen the world. Who is she, really?" }
];

const SIDE = [
  { name: "Jack", jp: "寂駆", img: "assets/img/cast/jack.webp", pos: "50% 30%",
    id: "Prajurit Behemdorg berBerkah penyembuhan. Ramah dan pencinta anjing… di permukaan.",
    en: "A Behemdorg soldier with a healing Blessing. Friendly and dog-loving… on the surface." },
  { name: "Masked Man", jp: "仮面の男", img: "assets/img/cast/masked.webp", pos: "50% 25%",
    id: "Pria bertopeng paruh yang bisa membentuk senjata besi. Dendam pada Behemdorg membawanya ke sisi Agni.",
    en: "A beak-masked man who forges iron weapons. His grudge against Behemdorg brings him to Agni's side." },
  { name: "Spear Woman", jp: "槍の女", img: "assets/img/cast/spear.webp", pos: "50% 30%",
    id: "Pengendali tombak yang bertarung demi keluarganya: lebih dari 160 orang.",
    en: "A spear-wielding Blessed fighting for her family of over 160 people." },
  { name: "Bat Man", jp: "バットマン", img: "assets/img/cast/batman.webp", pos: "50% 20%",
    id: "Salah satu “murid” yang ikut bertarung di sisi Agni membebaskan budak Behemdorg.",
    en: "One of the “disciples” who fights beside Agni to free Behemdorg's slaves." }
];

const ARCS = [
  {
    no: 1, name: "Behemdorg", jp: "ベヘムドルグ", ch: [1, 33], vol: "1–4", img: "assets/img/vol/vol2.webp",
    tags: { id: ["Dendam", "Regenerasi", "Kota budak"], en: ["Revenge", "Regeneration", "Slave city"] },
    hook: { id: "Desanya dibakar habis. Satu-satunya yang selamat tidak bisa berhenti terbakar.",
            en: "His village is burned to nothing. The only survivor can never stop burning." },
    tease: { id: "Delapan tahun terbakar hidup-hidup, lalu ia berjalan menuju kota musuh. Kenapa salah satu prajurit di sana punya wajah adiknya yang sudah mati?",
             en: "Eight years of burning alive, then he walks toward the enemy city. So why does one of its soldiers wear his dead sister's face?" },
    happened: {
      id: "Agni dan Luna memberi makan desa yang kelaparan dengan memotong anggota tubuh mereka sendiri. Doma, prajurit Behemdorg, menganggap warga desa kanibal lalu membakar semuanya. Luna mati sambil berbisik “Hiduplah”. Agni butuh delapan tahun hanya untuk belajar menahan api, lalu berangkat memburu Doma. Di jalan ia menolong Sun, dipenggal oleh Judah yang mirip Luna, dan mendapati Doma sudah sakit jiwa dan bahkan tidak mengingatnya. Togata membajak kereta, membebaskan kepala Agni, dan menjadikannya aktor utama filmnya. Agni menyerbu Behemdorg, membebaskan para Blessed yang dijadikan sumber energi, dan kota itu hancur terbakar. Di tengah reruntuhan, sosok yang mengaku Penyihir Es membawa pergi kepala Judah.",
      en: "Agni and Luna feed their starving village by cutting off their own limbs. Doma, a Behemdorg soldier, judges the villagers to be cannibals and burns everything. Luna dies whispering “Live”. It takes Agni eight years just to learn to bear the fire, then he sets out to hunt Doma. On the way he saves Sun, is beheaded by Luna-lookalike Judah, and finds that Doma has lost his mind and doesn't even remember him. Togata hijacks a train, frees Agni's head and casts him as the lead of his movie. Agni storms Behemdorg, frees the Blessed being drained as fuel, and the city burns to the ground. In the ruins, a figure claiming to be the Ice Witch carries off Judah's head."
    },
    meaning: {
      id: "Dendam di sini bukan semangat, tapi alat bertahan hidup. Agni sendiri kelak mengaku ia membenci Doma supaya lupa rasa sakit, sampai lupa bahwa ia sedang berakting. Tema “peran” sudah ditanam sejak awal: Togata merekam Agni seperti aktor, dan Behemdorg berdiri di atas kebohongan tentang seorang “Raja” agar warganya tetap patuh.",
      en: "Revenge here isn't passion, it's life support. Agni later admits he hated Doma to forget the pain, until he forgot he was acting. The theme of “roles” is planted early: Togata films Agni like an actor, and Behemdorg stands on a lie about a “King” to keep its people obedient."
    }
  },
  {
    no: 2, name: "Catharsis", jp: "カタルシス", ch: [34, 52], vol: "4–6", img: "assets/img/vol/vol4.webp",
    tags: { id: ["Dewa palsu", "Togata", "Pohon Dunia"], en: ["False god", "Togata", "World Tree"] },
    hook: { id: "Pria yang cuma ingin balas dendam tiba-tiba disembah sebagai dewa.",
            en: "A man who only wanted revenge is suddenly worshipped as a god." },
    tease: { id: "Bisakah seseorang memerankan Tuhan tanpa kehilangan dirinya sendiri? Dan apa jadinya saat Agni akhirnya berdiri di depan Doma lagi?",
             en: "Can someone play God without losing himself? And what happens when Agni finally stands before Doma again?" },
    happened: {
      id: "Para budak yang dibebaskan mulai memuja Agni, dan lahirlah Agniisme. Agni terpaksa memerankan dewa demi orang-orang yang ia lindungi, dimulai dengan mengatasi krisis makanan bersama Togata. Togata yang ternyata seorang pria transgender membuka diri tentang disforia dan 300 tahun hidupnya. Agni menemukan Doma yang kini merawat anak-anak yatim dan memutuskan mengampuninya. Tapi bayangan Luna memintanya “menjadi Fire Punch”. Ia membakar wajahnya sendiri dan membantai Doma beserta anak-anak itu. Dihantam rasa bersalah, Agni mencoba menenggelamkan diri, dan Togata tewas saat menyelamatkannya. Sementara itu Pohon Dunia tumbuh dari tubuh Judah dan menghisap kehidupan untuk menghangatkan bumi. Agni memanjatnya dan meninju Judah sampai pohon itu meledak.",
      en: "The freed slaves begin worshipping Agni, and Agniism is born. Agni is forced to play god for the people he shelters, starting with solving a food crisis alongside Togata. Togata, revealed to be a transgender man, opens up about his dysphoria and his 300 years of life. Agni finds Doma now raising orphans and decides to spare him. But a vision of Luna asks him to “become Fire Punch”. He sets his own face alight and slaughters Doma and the children. Crushed by guilt, Agni tries to drown himself, and Togata dies saving him. Meanwhile a World Tree grows from Judah's body, draining life to warm the planet. Agni climbs it and punches Judah until the tree explodes."
    },
    meaning: {
      id: "Katarsis adalah istilah film untuk pelepasan emosi di klimaks, persis yang dikejar Togata. Ironisnya, “Fire Punch” lahir sebagai topeng: Agni yang ingin berhenti justru memilih peran yang membuatnya melakukan hal paling mengerikan. Arc ini bertanya apakah iman yang dibangun di atas kebohongan bisa tetap menolong orang.",
      en: "Catharsis is the film term for an emotional release at the climax, exactly what Togata is chasing. Ironically, “Fire Punch” is born as a mask: an Agni who wants to stop chooses the role that makes him do the most horrifying thing. The arc asks whether faith built on a lie can still help people."
    }
  },
  {
    no: 3, name: "Amnesia", jp: "記憶喪失", ch: [53, 62], vol: "6–7", img: "assets/img/vol/vol6.webp",
    tags: { id: ["Dunia menghangat", "Kebohongan manis", "Keluarga"], en: ["A warmer world", "Sweet lie", "Family"] },
    hook: { id: "Dunia akhirnya menghangat. Musuh terbesarnya bangun tanpa ingatan apa pun.",
            en: "The world is finally warming. His greatest enemy wakes up with no memories at all." },
    tease: { id: "Kalau kamu bisa memilih kebohongan yang membahagiakan, maukah kamu hidup di dalamnya? Arc paling lembut, sekaligus paling bikin tidak nyaman.",
             en: "If you could choose a lie that makes you happy, would you live inside it? The gentlest arc, and the most uncomfortable." },
    happened: {
      id: "Agni terbangun tanpa api Doma dan tanpa lengan kanan. Judah di sampingnya kehilangan ingatan dan bersikap seperti anak kecil. Niat membunuhnya runtuh, dan Agni malah mengatakan bahwa namanya Luna, adiknya. Mereka ditemukan Tena, murid Doma, lalu hidup tenang bersama sekelompok perempuan di sebuah pabrik garam. Ketenangan itu tidak bertahan: bekas pengikut Agni datang untuk merebut Judah, dan Agni sekali lagi memilih menjadi Fire Punch.",
      en: "Agni wakes without Doma's fire and without his right arm. Judah beside him has lost her memory and acts like a small child. His urge to kill her collapses, and instead he tells her that her name is Luna, his sister. They are found by Tena, Doma's disciple, and live quietly with a group of women at a salt factory. The peace doesn't last: Agni's former followers come to take Judah, and Agni once again chooses to become Fire Punch."
    },
    meaning: {
      id: "Kebahagiaan yang dibangun di atas kebohongan. Agni membentuk Judah menjadi “Luna ideal” versinya, cermin gelap dari kebohongan yang dulu Judah sebarkan di Behemdorg. Fujimoto membiarkan pembaca ikut menikmati kedamaian itu, sambil sadar betul ada yang salah.",
      en: "Happiness built on a lie. Agni shapes Judah into his own “ideal Luna”, a dark mirror of the lies Judah once spread in Behemdorg. Fujimoto lets readers enjoy that peace while knowing full well something is wrong."
    }
  },
  {
    no: 4, name: "Fire Punch", jp: "ファイアパンチ", ch: [63, 80], vol: "7–8", img: "assets/img/vol/vol7.webp",
    tags: { id: ["Agniisme", "Sun", "Legenda vs manusia"], en: ["Agniism", "Sun", "Legend vs man"] },
    hook: { id: "Sepuluh tahun kemudian, Agni sudah menjadi agama, dan agamanya tidak butuh Agni yang asli.",
            en: "Ten years later, Agni has become a religion, and the religion has no need for the real Agni." },
    tease: { id: "Apa yang terjadi saat pengikut lebih mencintai legenda daripada orangnya? Arc yang memakai judul serinya sendiri, dan itu bukan kebetulan.",
             en: "What happens when followers love the legend more than the man? The arc that carries the series' own title, and not by accident." },
    happened: {
      id: "Sun, kini 18 tahun, memimpin Agniisme dan menulis kitab sucinya bersama Jack dan Sulya. Para pengikut berencana menculik Judah untuk dijadikan Pohon Dunia lagi. Agni kembali menyala oleh api Doma dan mengamuk mencari “adiknya”. Sun mengeksekusi Jack dan Sulya sebagai penyesat, lalu menghadapi Agni yang wajahnya sudah habis terbakar. Sun yakin itu bukan dewanya yang asli, dan ia mati terbakar oleh sentuhan Agni. Judah menghancurkan bagian terakhir kepala Agni yang belum terbakar, sehingga lahir Agni baru tanpa api dan tanpa ingatan. Judah lalu membuat perjanjian dengan Neneto: ia menjadi Pohon Dunia, asal Neneto mau merawat Agni.",
      en: "Sun, now 18, leads Agniism and writes its scripture with Jack and Sulya. The followers plan to kidnap Judah and make her the World Tree again. Agni is set ablaze by Doma's fire once more and rampages to find his “sister”. Sun executes Jack and Sulya as heretics, then faces an Agni whose face has burned away. Convinced this isn't his real god, Sun dies burning at Agni's touch. Judah destroys the last unburned part of Agni's head, and a new Agni regenerates with no fire and no memories. Judah then makes a pact with Neneto: she will become the World Tree if Neneto takes care of Agni."
    },
    meaning: {
      id: "Judul seri ini ternyata nama sebuah peran, bukan nama orang. Sun yang dulu polos mengulangi persis kebohongan Behemdorg atas nama Agni. Pertanyaannya: siapa yang tersisa saat mitos menelan manusianya?",
      en: "The series' title turns out to be the name of a role, not a person. Sun, once innocent, repeats Behemdorg's exact lies in Agni's name. The question: who is left when the myth swallows the man?"
    }
  },
  {
    no: 5, name: "Final Film", jp: "最後の映画", ch: [81, 83], vol: "8", img: "assets/img/vol/vol8.webp",
    tags: { id: ["80 tahun", "Bioskop", "Akhir"], en: ["80 years", "Cinema", "The end"] },
    hook: { id: "Delapan puluh tahun kemudian, sebuah bioskop memutar film terakhir umat manusia.",
            en: "Eighty years later, a cinema screens humanity's final film." },
    tease: { id: "Hanya tiga bab, tapi skalanya jauh lebih besar dari yang kamu bayangkan. Bagaimana kisah seperti ini bisa berakhir?",
             en: "Just three chapters, yet the scale is far bigger than you'd imagine. How could a story like this possibly end?" },
    happened: {
      id: "Agni hidup damai selama 80 tahun bersama Neneto, yang memberinya nama “Sun”. Ia tidak ingat masa lalunya sampai seorang murid memberinya kaset video tentang hidupnya sebagai Fire Punch. Jauh setelah umat manusia lenyap, melewati waktu yang tak terbayangkan, Agni bertemu Judah lagi dan keduanya berpelukan.",
      en: "Agni lives peacefully for 80 years with Neneto, who names him “Sun”. He doesn't remember his past until a disciple gives him a videotape of his life as Fire Punch. Long after humanity is gone, across unimaginable stretches of time, Agni meets Judah once more and the two embrace."
    },
    meaning: {
      id: "Film Togata bertahan lebih lama dari dunia itu sendiri. Kisah adalah yang tersisa dari manusia. Sun dan Luna, matahari dan bulan, menutup cerita yang dimulai dengan satu kata: “Hiduplah.” Kali ini Agni hidup sebagai dirinya, bukan sebagai peran.",
      en: "Togata's film outlives the world itself. Stories are what remains of people. Sun and Luna, sun and moon, close a story that began with a single word: “Live.” This time Agni lives as himself, not as a role."
    }
  }
];

const VOLUMES = [
  { v: 1, date: "2016-07-04", ch: "1–8" }, { v: 2, date: "2016-10-04", ch: "9–18" },
  { v: 3, date: "2016-12-02", ch: "19–28" }, { v: 4, date: "2017-03-03", ch: "29–39" },
  { v: 5, date: "2017-06-02", ch: "40–49" }, { v: 6, date: "2017-08-04", ch: "50–60" },
  { v: 7, date: "2017-11-02", ch: "61–71" }, { v: 8, date: "2018-02-02", ch: "72–83" }
];

const TRIVIA = [
  { id: "Fire Punch adalah serial pertama Tatsuki Fujimoto, sebelum Chainsaw Man.",
    en: "Fire Punch is Tatsuki Fujimoto's first serialized manga, before Chainsaw Man." },
  { id: "Terbit di Shōnen Jump+ dari 18 April 2016 sampai 1 Januari 2018.",
    en: "It ran on Shōnen Jump+ from April 18, 2016 to January 1, 2018." },
  { id: "Hampir tanpa promosi saat rilis, tapi langsung viral dan trending di Twitter.",
    en: "It launched with little advertising, yet went viral and trended on Twitter." },
  { id: "Pemimpin redaksi Shōnen Jump+, Shuhei Hosono, menyebutnya manga yang paling cepat menyebar sepanjang 16 tahun kariernya di Shueisha.",
    en: "Shōnen Jump+ chief editor Shuhei Hosono called it the fastest-spreading manga of his 16 years at Shueisha." },
  { id: "Peringkat 3 Kono Manga ga Sugoi! 2017 untuk pembaca laki-laki, dan masuk nominasi Manga Taishō ke-10.",
    en: "Ranked 3rd in Kono Manga ga Sugoi! 2017 (male readers) and was nominated for the 10th Manga Taishō." },
  { id: "Nama Agni diambil dari Agni, dewa api dalam tradisi Weda (Hindu).",
    en: "Agni is named after the Vedic fire god of Hinduism." },
  { id: "Di dalam cerita, Togata membandingkan Agni dengan Human Torch (Fantastic Four) dan Zoro (One Piece).",
    en: "In-story, Togata compares Agni to the Human Torch (Fantastic Four) and Zoro (One Piece)." },
  { id: "Banyak orang di dunia Fire Punch mengira Agni punya dua Berkah: regenerasi dan api. Padahal apinya berasal dari Berkah Doma.",
    en: "Many in Fire Punch's world assume Agni has two Blessings, regeneration and fire. The fire actually comes from Doma's." },
  { id: "Kritikus memuji penggambaran Togata sebagai karakter transgender.",
    en: "Critics praised Togata's portrayal as a transgender character." },
  { id: "Versi Inggris diterbitkan VIZ Media (imprint Viz Signature), 2018–2019.",
    en: "The English edition was published by VIZ Media's Viz Signature imprint, 2018–2019." }
];

const EN = {
  "skip": "Skip to content",
  "net.sub": "All of Tatsuki Fujimoto's works",
  "nav.world": "World", "nav.cast": "Cast", "nav.arcs": "Arcs", "nav.facts": "Facts", "nav.read": "Read",
  "hud.temp": "TEMP",
  "hero.kicker": "Tatsuki Fujimoto · Shōnen Jump+ · 2016–2018",
  "hero.lede": "The world is buried in endless snow. In the middle of it, one man burns and never dies.",
  "hero.hold": "Hold to ignite",
  "hero.down": "Scroll ↓ into the storm",
  "ch1": "The frozen world", "ch2": "The fire that never goes out", "ch3": "Those who endure",
  "ch4": "Five acts in the snow", "ch5": "Notes from the ruins",
  "world.label": "01 / World",
  "world.title": "A winter that never ends",
  "world.p1": "The Earth is frozen and barren. A figure called the <strong>Ice Witch</strong> is tied to this endless winter. Snow never stops, food is scarce, and people survive by any means.",
  "world.p2": "A small number of people are born with extraordinary powers called <strong>Blessings</strong>. They are known as the <em>Blessed</em>.",
  "world.city": "<strong>Behemdorg</strong>, a great city that survives by enslaving the Blessed as “firewood”.",
  "world.p3": "Fire Punch is no ordinary hero story. It's a revenge tale that keeps swerving where you least expect.",
  "agni.cap": "Move your cursor: heat brings back colour",
  "agni.label": "02 / Protagonist",
  "agni.p1": "Agni has the Blessing of <strong>regeneration</strong>: any wound heals on its own. One day his village is destroyed by <strong>inextinguishable fire</strong>.",
  "agni.p2": "That fire clings to his body. He burns every second, but his regeneration won't let him die. Forever ablaze, he vows revenge.",
  "agni.q": "“Live.” The last words of Luna, his sister.",
  "agni.s1": "Blessing", "agni.s1v": "Regeneration",
  "agni.s2": "Status", "agni.s2v": "Burning forever",
  "agni.s3": "Goal", "agni.s3v": "Revenge",
  "cast.label": "03 / Cast",
  "cast.title": "Faces in the storm",
  "cast.note": "Spoiler-free. Hover or tap a panel to set it alight.",
  "cast.side": "Other faces",
  "arcs.label": "04 / Arcs",
  "arcs.title": "Five acts, 83 chapters",
  "arcs.note": "The teasers are spoiler-free. Full summaries are frozen under the ice: <strong>click</strong> to melt it. Arc names come from the fan community, not official titles.",
  "arcs.ruler": "Chapter map",
  "arcs.ch": "Chapters", "arcs.vol": "Vol.",
  "arcs.hold": "Hold to melt the spoiler",
  "arcs.happened": "What happened", "arcs.meaning": "Interpretation",
  "arcs.meaningNote": "Our interpretation, not Fujimoto's official statement.",
  "arcs.close": "Freeze again",
  "facts.label": "05 / Archive",
  "facts.title": "Facts that survived",
  "facts.ch": "Chapters", "facts.vol": "Volumes", "facts.start": "First published", "facts.end": "Ended",
  "facts.shelf": "Volume shelf · Japanese release dates",
  "read.label": "06 / Start reading",
  "read.title": "Ready to walk into the storm?",
  "read.p": "Support the original work through official sources.",
  "read.en": "English", "read.jp": "Japanese",
  "footer.p": "Fan blog, not affiliated with Shueisha or VIZ Media. Fire Punch © Tatsuki Fujimoto / Shueisha.",
  "footer.img": "Character images &amp; volume covers via <a href=\"https://firepunch.fandom.com/\" rel=\"noopener\">Fire Punch Wiki</a> (Fandom), used for fan commentary.",
  "footer.net": "← Back to Fujimoto Archive"
};
