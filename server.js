const { Board, Led } = require('johnny-five')
const board = new Board({
  port: 'COM4' // Check if is your Arduino on this port
})

//set up express app
const express = require('express')
const app = express()

//install dependenciesnpm inst
const http = require('http').Server(app)
const bodyParser = require('body-parser')
const engines = require('consolidate')
const { Console } = require('console')
const { title } = require('process')

//setup app
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(express.static('public'))
app.engine('html', engines.hogan)
app.set('views', __dirname + '/views')

//led pin location lists
let pinlocs = [12, 11, 10, 9, 8, 7, 6, 5, 4, 3]

app.get('/', (req, res) => {
    //turn all leds off
    for (let i = 0; i < pinlocs.length; i++) {
      var pin = new Led(pinlocs[i])
      pin.off()
    }
  res.render('index.html')
})

//info objs
var titles = {
  12: "1936: Mussolini helps the General Franco of Spain",
  "11&10": "1940: Italy declares war on Britain and France",
  9: "1902: Mussolini moves to Switzerland",
  8: "1939: Mussolini signs the Pact of Steel",
  7: "1945: Mussolini is captured and executed at Lake Como",
  6: "1912: Mussolini joins Avanti!",
  6.1: "1919: Mussolini founded Italy's fascist movement",
  6.2: "1922: Mussolini leads the March on Rome",
  6.3: "1925: Mussolini asserts himself as dictator",
  6.4: "1929: Mussolini signs the Lateran Pact",
  5: "1883: Mussolini is born in Predappio, Italy",
  4: "1909: Mussolini moves to Austria-Hungary",
  3: "1935: Italy invades Abyssiania"
}

var information = {
  12: "In 1936, both Mussolini and Hitler supported the Nationalists in the Spanish Civil War. Mussolini helped the Nationalist cause because they wanted to continue to show power and influence across Europe. Additionally, both Mussolini and Hitler were anti-communist, so they wanted to prevent a commuist control in Spain. Mussolini sent over 50,000 troops to the leader of the Nationalist forces: General Francisco Franco.",
  "11&10": "On September 3, 1939, Britain and France declared war on Germany, due to Hitler’s invasion into Poland. Hitler quickly took Holland and Belgium, and then persuaded Mussolini to believe that Germany would win the war. Mussolini, who cannot deny an opportunity to gain power, agreed to join the war and made it official by declaring war on France and Great Britain on June 10, 1940.",
  9: "Mussolini moved to Switzerland at 19 to avoid compulsory military service, although later on he did serve in the Italian military shortly. In his journals, he described himself as a “bohemian” during these times. In other words, he was a nonconformist to society.\nInspired by his father, Mussolini also joined a Switzerland socialist movement. Embracing his leadership skills, he quickly picked up a reputation as an active member within the movement, often organizing strikes and advocating for violence.",
  8: "On May 22, 1939, Italy and Germany signed a military and political alliance in Berlin, which marked the beginning of the Axis Powers. In the years leading up to this, Germany and Italy already demonstrated common interests and support for each other. Hitler encouraged Mussolini’s endeavors in Ethiopia, and Mussolini supported Hitler’s invasion into Austria in 1938. Additionally, in 1938, Italy passed anti-Semitic laws, following the German example. Mussolini signed the pact out of anticipation for war, and also support for future Balkan invasions.",
  7: "By 1943, Italy’s own people turned on Mussolini, for they saw Italy as losing the war. Mussolini was voted out of power and then imprisoned, while Italy initiated peace talks with the Allies. As a result of Italy switching sides, Hitler took over northern Italy and rescued Mussolini. Hitler then put Mussolini in charge as a puppet leader of German-occupied northern Italy. \n In 1945, allied forces barreled through Italy and German forces surrendered. Mussolini tried to flee by going to Switzerland, yet he was captured and arrested by communist partisans on his way there. Those partisans took Mussolini and his mistress to a nearby lake, Lake Como, and were then executed by a firing squad. Their bodies were then hung upside down in Milan, where crowds kicked and spit on them.",
  6: "Due to Mussolini’s new reputation as a political journalist, he was appointed editor of the official Socialist newspaper, Avanti!, which translates to Forward!. Originally, he wrote many articles in opposition to WW1. This belief was generally accepted by the Socialist Party, for they believed that the war represented workers killing each other out of the interests of their bosses. However, Mussolini soon changed his position, and he began to advocate the war. Mussolini changed his mind after reading about Karl’s Mark’s assertion that social revolution usually follows war. As a result, the Socialist Party expelled him as a traitor, and he resigned from the newspaper.\nHe then created a new newspaper branch, Il Popolo d’Italia (“The People of Italy”). It was the beginning of fascism, as he used the newspaper to advocate for violence and the war. In 1915, he joined the war for two years before getting discharged after an injury.",
  6.1: "From 1918, Mussolini was building his power in Italy through a series of publications, speeches, and protests. In 1919, he founded Italy’s fascist movement. Mussolini’s ideology was deep-rooted in nationalism. He wanted to return Italy to its golden years during the Roman Empire. It was different from socialism in that he wanted to end political corruption and labor strife but maintain capitalism and private property.\nAfter WW1, there was a surge in unemployment as well as anger with Italy’s lack of territory gained during the Paris Peace Conference. Mussolini profited off this discontent, for people were more willing to join his movement out of a desire for change. His supporters often attended rallies and formed their own militias wearing black shirts, for they are known as the Blackshirt squads. Using violence, they forced people to join the movement.",
  6.2: "In 1922, Mussolini sought out government power, and organized a march on Rome to seize it. The march successfully threatened the weak Italian government, and King Victor Emmanuel III accepted Mussolini’s demands. Mussolini became the 40th and youngest Prime Minister of Italy.",
  6.3: "Mussolini did not begin as a dictator, for the first few years, he worked within the parliament to gain power. Nevertheless, the Fascists felt that Mussolini was moving too slowly and it was time for a change. In late 1924, assassins tied with Mussolini killed socialist leader Giacomo Matteotti, who was the leader of opposition against Mussolini’s legislation in parliament. A few days later in 1925, Mussolini stood in front of parliament and took sole responsibility for Matteotii’s assisnation. Thus, setting a precedent for what could happen to people if they opposed Mussolini. He then assumed dictatorship, and nobody stood in his way.",
  6.4: "In 1929, Mussolini signed the Lateran Treaty (the Lateran pact of 1929), which recognized the sovereignty of Vatican City as an independent state. This treaty gave more power to the Church, as the Pope was recognized as the leader of the state. Today the impacts of the Lateran Pact still shine, for it was this treaty that helped the Church acquire international influence. It is the reason why today the pope can travel around the world and address diplomatic delegations.",
  5: "Mussolini was born into a small, poor family in Predappio, Italy. His father was a socialist, and his mother a devout Catholic. Nevertheless his father despised religion, especially the Roman Catholic Church. Mussolini and his father were especially close, and his father served a major role in influencing his political beliefs. \n From a young age, Mussolini was fond of violence. He was constantly inciting fights at school, and was even expelled from his first boarding school for stabbing a classmate.",
  4: "In Austria-Hungary, Mussolini founded a socialisst newspaper La Lotta di Classe. His own paper was extremely successful, but soon he was arrested for using his papers to incite violence. He spent six months in jail and then deported back to Italy.",
  3: "In 1935, Italy invaded Abyssiania, now Ethiopia, instigating the Second Italo-Ethiopian War. Mussolini used a border incident as an excuse to intervene, although in reality he wanted to begin building his Italian Empire and make the Mediterranean Sea his Italian Lake. The war marked a victory for Mussolini, and his military success helped overshadow economic issues and give him more support and power. Additionally, the war demonstrates the ineffectiveness of the League of Nations, who failed to impose economic sanctions on Italy as punishment for the invasion. Lastly, the war empowered many African nationalist movements that would emerge later on."
}

app.post('/turnledon', (req, res) => {
  //turn other leds off
  for (let i = 0; i < pinlocs.length; i++) {
    var pin = new Led(pinlocs[i])
    pin.off()
  }

  //check if need to light both brit and france
  if (req.body.submit == "11&10") {
    console.log(req.body.submit)
    var led1 = new Led(11)
    var led2 = new Led(10)
    led1.on()
    led2.on()
  } else {
    console.log(req.body.submit)
    var led = new Led(parseInt(req.body.submit))
    led.on()
  }
  res.render('info.html', {Info: {Title: titles[req.body.submit], info: information[req.body.submit]}})
})

app.listen(3000, () => {
  console.log('listening on *:3000')
})
