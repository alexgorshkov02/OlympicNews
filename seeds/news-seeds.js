const { News } = require("../models");

const newsdata = [
  {
    image_url: "https://www.gannett-cdn.com/presto/2021/06/18/USAT/98172d90-fc59-46a9-a8df-f236a7626fb7-022_1968_W.jpg?crop=3000,1688,x0,y483&width=3000&height=1688&format=pjpg&auto=webp",
    title: "How will the Tokyo Olympic opening ceremony compare to these iconic game openers?",
    description: "As fans and athletes gear up to watch this year's Olympic opening ceremony in Tokyo, it is also the time to spotlight past Olympic opening ceremonies.",
  },
  {
    image_url: "http://media.hotnews.ro/media_server1/image-2021-07-26-24939135-70-anna-kiesenhofer-campioana-ciclism.jpg",
    title: "Anna Kiesenhofer Campioană Olimpică la ciclism. Anonima cât un chibrit care a dat foc Olimpiadei placide VIDEO",
    description: "Anna Kiesenhofer Campioană Olimpică la ciclism. Nu știu cum am ajuns în halul ăsta să mă uit la Olimpiadă. Pierd timpul nu? Și ajung pe Eurosporturi. Pe unul dintre ele, România lua o mamă de bătaie de la Coreea. Am hohotit ca boul. Meciul de fotbal era sărit…",
  },
  {
    image_url: "https://storage0.dms.mpinteractiv.ro/media/1/1/39846/20187758/1/buzarnescu-calificare.jpg?width=640",
    title: "Mihaela Buzărnescu va participa la Jocurile Olimpice de la Tokyo 2020",
    description: "Comitetul Olimpic şi Sportiv Român a anunţat miercuri că Mihaela Buzărnescu a devenit al 101-lea membru pentru Team Romania la Jocurile Olimpice Tokyo 2020.",
  },
];

const seedNews = () => News.bulkCreate(newsdata);

module.exports = seedNews;
